export interface BazarPrice {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  category_name: string;
  unit: string;
  price: number;
  prev_price: number;
  change: number;
  is_rising: boolean;
  emoji: string;
  min_price: number;
  max_price: number;
  avg_price: number;
  description?: string;
  bazars: BazarPrice[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
}

export const CATEGORIES_DATA: Category[] = [
  { id: "1", name: "চাল", slug: "chal", icon: "🍚", description: "দেশি ও আমদানিকৃত সকল প্রকার চালের দাম" },
  { id: "2", name: "সবজি", slug: "sobji", icon: "🥔", description: "দৈনন্দিন তরতাজা শাক-সবজির বাজার দর" },
  { id: "3", name: "মাছ ও মাংস", slug: "mach-mangsho", icon: "🐟", description: "দেশি মাছ, ইলিশ, মুরগি ও গরুর মাংসের দাম" },
  { id: "4", name: "ডিম ও তেল", slug: "dhim-tel", icon: "🥚", description: "ফার্মের ডিম, সয়াবিন ও সরিষার তেল" },
  { id: "5", name: "মসলা", slug: "mosla", icon: "🧄", description: "রসুন, আদা, পেঁয়াজ ও অন্যান্য গুড়ো মসলা" },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "স্বর্ণমাছি চাল",
    slug: "swarna-rice",
    category: "chal",
    category_name: "চাল",
    unit: "প্রতি কেজি",
    price: 52,
    prev_price: 50,
    change: 4.0,
    is_rising: true,
    emoji: "🍚",
    min_price: 50,
    max_price: 55,
    avg_price: 52.5,
    description: "দৈনন্দিন ব্যবহারের জন্য জনপ্রিয় মাঝারি চাল।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 51 },
      { name: "মিরপুর কাঁচাবাজার", price: 53 },
      { name: "নিউ মার্কেট", price: 52 }
    ]
  },
  {
    id: "2",
    name: "মিনিকেট চাল",
    slug: "miniket-rice",
    category: "chal",
    category_name: "চাল",
    unit: "প্রতি কেজি",
    price: 68,
    prev_price: 70,
    change: -2.86,
    is_rising: false,
    emoji: "🍚",
    min_price: 65,
    max_price: 72,
    avg_price: 68.5,
    description: "সরু ও সুস্বাদু প্রিমিয়াম মিনিকেট চাল।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 67 },
      { name: "মিরপুর কাঁচাবাজার", price: 69 },
      { name: "নিউ মার্কেট", price: 68 }
    ]
  },
  {
    id: "3",
    name: "নাজিরশাইল চাল",
    slug: "najirshail-rice",
    category: "chal",
    category_name: "চাল",
    unit: "প্রতি কেজি",
    price: 75,
    prev_price: 73,
    change: 2.74,
    is_rising: true,
    emoji: "🍚",
    min_price: 72,
    max_price: 78,
    avg_price: 75.0,
    description: "দীর্ঘাকৃতির সুগন্ধিযুক্ত উন্নত মানের চাল।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 74 },
      { name: "মিরপুর কাঁচাবাজার", price: 76 }
    ]
  },
  {
    id: "4",
    name: "গোল আলু",
    slug: "potato",
    category: "sobji",
    category_name: "সবজি",
    unit: "প্রতি কেজি",
    price: 55,
    prev_price: 60,
    change: -8.33,
    is_rising: false,
    emoji: "🥔",
    min_price: 50,
    max_price: 60,
    avg_price: 55.0,
    description: "দেশি নতুন ডায়মন্ড গোল আলু।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 52 },
      { name: "মিরপুর কাঁচাবাজার", price: 56 }
    ]
  },
  {
    id: "5",
    name: "দেশি পেঁয়াজ",
    slug: "onion",
    category: "sobji",
    category_name: "সবজি",
    unit: "প্রতি কেজি",
    price: 110,
    prev_price: 100,
    change: 10.0,
    is_rising: true,
    emoji: "🧅",
    min_price: 105,
    max_price: 115,
    avg_price: 110.0,
    description: "তরতাজা পাবনার দেশি পেঁয়াজ।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 108 },
      { name: "মিরপুর কাঁচাবাজার", price: 112 }
    ]
  },
  {
    id: "6",
    name: "রুই মাছ",
    slug: "rui-fish",
    category: "mach-mangsho",
    category_name: "মাছ ও মাংস",
    unit: "প্রতি কেজি",
    price: 350,
    prev_price: 330,
    change: 6.06,
    is_rising: true,
    emoji: "🐟",
    min_price: 340,
    max_price: 370,
    avg_price: 355.0,
    description: "নদীর ও মিষ্টি পানির তাজা রুই মাছ (১.৫ - ২ কেজি আকার)।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 345 },
      { name: "মিরপুর কাঁচাবাজার", price: 355 }
    ]
  },
  {
    id: "7",
    name: "পদ্মার ইলিশ মাছ",
    slug: "hilsha-fish",
    category: "mach-mangsho",
    category_name: "মাছ ও মাংস",
    unit: "প্রতি কেজি",
    price: 1450,
    prev_price: 1500,
    change: -3.33,
    is_rising: false,
    emoji: "🐟",
    min_price: 1400,
    max_price: 1550,
    avg_price: 1460.0,
    description: "পদ্মার তাজা ১ কেজি সাইজের রুপালী ইলিশ।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 1420 },
      { name: "মিরপুর কাঁচাবাজার", price: 1480 }
    ]
  },
  {
    id: "8",
    name: "ব্রয়লার মুরগি",
    slug: "broiler-chicken",
    category: "mach-mangsho",
    category_name: "মাছ ও মাংস",
    unit: "প্রতি কেজি",
    price: 180,
    prev_price: 175,
    change: 2.86,
    is_rising: true,
    emoji: "🍗",
    min_price: 175,
    max_price: 190,
    avg_price: 182.0,
    description: "ফার্মের তাজা ড্রেসড ও আস্ত ব্রয়লার মুরগি।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 178 },
      { name: "মিরপুর কাঁচাবাজার", price: 182 }
    ]
  },
  {
    id: "9",
    name: "ফার্মের লাল ডিম",
    slug: "egg",
    category: "dhim-tel",
    category_name: "ডিম ও তেল",
    unit: "প্রতি ডজন",
    price: 150,
    prev_price: 155,
    change: -3.23,
    is_rising: false,
    emoji: "🥚",
    min_price: 145,
    max_price: 155,
    avg_price: 150.0,
    description: "পোল্ট্রি ফার্মের ফ্রেশ লাল ডিম।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 148 },
      { name: "মিরপুর কাঁচাবাজার", price: 152 }
    ]
  },
  {
    id: "10",
    name: "রূপচাঁদা সয়াবিন তেল",
    slug: "soyabean-oil",
    category: "dhim-tel",
    category_name: "ডিম ও তেল",
    unit: "প্রতি লিটার",
    price: 168,
    prev_price: 165,
    change: 1.82,
    is_rising: true,
    emoji: "🫙",
    min_price: 165,
    max_price: 172,
    avg_price: 168.0,
    description: "বোতলজাত পরিশোধিত সয়াবিন তেল।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 167 },
      { name: "মিরপুর কাঁচাবাজার", price: 170 }
    ]
  },
  {
    id: "11",
    name: "দেশি রসুন",
    slug: "garlic",
    category: "mosla",
    category_name: "মসলা",
    unit: "প্রতি কেজি",
    price: 220,
    prev_price: 210,
    change: 4.76,
    is_rising: true,
    emoji: "🧄",
    min_price: 210,
    max_price: 230,
    avg_price: 220.0,
    description: "উন্নত মানের শুকনো দেশি এককোয়া রসুন।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 215 },
      { name: "মিরপুর কাঁচাবাজার", price: 225 }
    ]
  },
  {
    id: "12",
    name: "কাঁচা মরিচ",
    slug: "green-chili",
    category: "sobji",
    category_name: "সবজি",
    unit: "প্রতি কেজি",
    price: 160,
    prev_price: 180,
    change: -11.11,
    is_rising: false,
    emoji: "🌶️",
    min_price: 150,
    max_price: 170,
    avg_price: 160.0,
    description: "ঝাল ও তাজা দেশি সবুজ কাঁচা মরিচ।",
    bazars: [
      { name: "কারওয়ান বাজার", price: 155 },
      { name: "মিরপুর কাঁচাবাজার", price: 165 }
    ]
  }
];

export function toBengaliNumber(num: number | string): string {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
}
