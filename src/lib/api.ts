import {
  CATEGORIES_DATA,
  PRODUCTS_DATA,
  type BazarPrice,
  type Category,
  type Product,
} from "./data";

/** Primary and fallback endpoints provided by the assignment. */
const API_BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

const REQUEST_TIMEOUT_MS = 8000;

type ApiRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ApiRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/** Reads a numeric value even when the API sends Bengali digits or formatted text. */
function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const bengaliToLatin: Record<string, string> = {
      "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
      "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
    };
    const latin = value.replace(/[০-৯]/g, (digit) => bengaliToLatin[digit] ?? digit);
    const parsed = Number(latin.replace(/[^0-9.-]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }

  return fallback;
}

function toText(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

/** Maps an API category value (slug or Bengali name) onto a known category slug. */
function resolveCategorySlug(value: unknown): string {
  const text = toText(value).trim();
  if (!text) return "";
  const known = CATEGORIES_DATA.find((item) => item.slug === text || item.name === text);
  return known ? known.slug : text;
}

function normalizeBazar(raw: unknown): BazarPrice | null {
  const record = isRecord(raw) ? raw : {};
  const name = toText(
    record.name ?? record.bazar ?? record.bazar_name ?? record.market ?? record.market_name,
  ).trim();
  const price = toNumber(
    record.price ?? record.today_price ?? record.value ?? record.dam,
    Number.NaN,
  );

  if (!name || !Number.isFinite(price)) return null;
  return { name, price };
}

/**
 * Converts one raw API record into the internal `Product` shape. The API field
 * names are read defensively because the assignment only documents the routes,
 * not the exact JSON keys, and the endpoints may change.
 */
function normalizeProduct(raw: unknown, index: number): Product | null {
  const record = isRecord(raw) ? raw : {};
  const name = toText(record.name ?? record.title ?? record.product_name).trim();
  if (!name) return null;

  const id = toText(record.id ?? record._id ?? record.product_id, String(index + 1));
  const categorySlug = resolveCategorySlug(
    record.category ?? record.category_slug ?? record.categoryName,
  );
  const knownCategory = CATEGORIES_DATA.find((item) => item.slug === categorySlug);

  const bazars = toArray(
    record.bazars ?? record.bazar_prices ?? record.markets ?? record.bazarPrices,
  )
    .map(normalizeBazar)
    .filter((bazar): bazar is BazarPrice => bazar !== null);

  const price = toNumber(record.price ?? record.current_price ?? record.today_price, 0);
  const prevPrice = toNumber(record.prev_price ?? record.previous_price ?? record.yesterday_price, price);
  const computedChange =
    prevPrice > 0 ? Number((((price - prevPrice) / prevPrice) * 100).toFixed(2)) : 0;
  const change = toNumber(record.change ?? record.price_change ?? record.change_percent, computedChange);

  const bazarPrices = bazars.map((bazar) => bazar.price);
  const minPrice = toNumber(
    record.min_price ?? record.minPrice,
    bazarPrices.length > 0 ? Math.min(...bazarPrices) : price,
  );
  const maxPrice = toNumber(
    record.max_price ?? record.maxPrice,
    bazarPrices.length > 0 ? Math.max(...bazarPrices) : price,
  );
  const avgPrice = toNumber(
    record.avg_price ?? record.avgPrice,
    bazarPrices.length > 0
      ? Number((bazarPrices.reduce((sum, item) => sum + item, 0) / bazarPrices.length).toFixed(2))
      : price,
  );

  return {
    id,
    name,
    slug: toText(record.slug ?? record.product_slug).trim() || id,
    category: categorySlug,
    category_name: toText(
      record.category_name ?? record.categoryName,
      knownCategory?.name ?? categorySlug,
    ),
    unit: toText(record.unit ?? record.unit_name, "প্রতি কেজি"),
    price,
    prev_price: prevPrice,
    change,
    is_rising: typeof record.is_rising === "boolean" ? record.is_rising : change > 0,
    emoji: toText(record.emoji ?? record.icon, knownCategory?.icon ?? "🛒"),
    min_price: minPrice,
    max_price: maxPrice,
    avg_price: avgPrice,
    description: toText(record.description ?? record.desc).trim() || undefined,
    bazars,
  };
}

function normalizeCategory(raw: unknown, index: number): Category | null {
  const record = isRecord(raw) ? raw : {};
  const name = toText(record.name ?? record.title).trim();
  if (!name) return null;

  const slug = toText(record.slug, "").trim() || resolveCategorySlug(name);
  const known = CATEGORIES_DATA.find((item) => item.slug === slug || item.name === name);

  return {
    id: toText(record.id ?? record._id, String(index + 1)),
    name,
    slug,
    icon: toText(record.icon ?? record.emoji, known?.icon ?? "🛒"),
    description: toText(record.description, known?.description ?? ""),
  };
}

/** Some endpoints wrap arrays in `{ data: [...] }` or `{ products: [...] }`. */
function extractList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (isRecord(payload)) {
    for (const key of ["data", "products", "categories", "result", "items", "results"]) {
      const value = payload[key];
      if (Array.isArray(value)) return value;
    }
  }
  return [];
}

function extractObject(payload: unknown): unknown {
  if (isRecord(payload) && !Array.isArray(payload)) {
    for (const key of ["data", "product", "result"]) {
      const value = payload[key];
      if (isRecord(value)) return value;
    }
  }
  return payload;
}

async function fetchApi(path: string): Promise<unknown | null> {
  for (const baseUrl of API_BASE_URLS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const response = await fetch(`${baseUrl}${path}`, {
        signal: controller.signal,
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      clearTimeout(timeoutId);

      if (!response.ok) continue;

      const payload: unknown = await response.json();
      if (payload) return payload;
    } catch (error) {
      console.warn(`[BazarDor] ${baseUrl}${path} is unavailable, trying next source.`, error);
    }
  }

  return null;
}

/**
 * Fetches products from the API and falls back to the bundled dataset when the
 * remote endpoints are unreachable (they are rate limited from time to time).
 */
export async function fetchProducts(categorySlug?: string): Promise<Product[]> {
  const path = categorySlug ? `/products?category=${encodeURIComponent(categorySlug)}` : "/products";
  const payload = await fetchApi(path);

  const remote = extractList(payload)
    .map((item, index) => normalizeProduct(item, index))
    .filter((product): product is Product => product !== null);

  if (remote.length > 0) {
    return categorySlug
      ? remote.filter((product) => product.category === categorySlug)
      : remote;
  }

  const fallback = categorySlug
    ? PRODUCTS_DATA.filter((product) => product.category === categorySlug)
    : PRODUCTS_DATA;

  return fallback.map((product) => ({ ...product }));
}

export async function fetchSingleProduct(slug: string): Promise<Product | null> {
  const direct = await fetchApi(`/products/${encodeURIComponent(slug)}`);
  const normalizedDirect = normalizeProduct(extractObject(direct), 0);

  if (normalizedDirect && normalizedDirect.name) {
    return normalizedDirect;
  }

  // The API only guarantees numeric ids for `/products/:id`, so the slug is
  // resolved against the full product list as a second attempt.
  const list = await fetchProducts();
  const match = list.find((product) => product.slug === slug || product.id === slug);
  if (match) return match;

  const localMatch = PRODUCTS_DATA.find((product) => product.slug === slug || product.id === slug);
  return localMatch ? { ...localMatch } : null;
}

export async function fetchCategories(): Promise<Category[]> {
  const payload = await fetchApi("/categories");

  const remote = extractList(payload)
    .map((item, index) => normalizeCategory(item, index))
    .filter((category): category is Category => category !== null);

  return remote.length > 0 ? remote : CATEGORIES_DATA.map((category) => ({ ...category }));
}
