import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.BETTER_AUTH_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: {
    default: "বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর, দাম বাড়া-কমার তথ্য, বাজারভিত্তিক মূল্য এবং ক্যাটাগরি অনুযায়ী তালিকা এক জায়গায় দেখুন।",
  keywords: ["বাজার দর", "BazarDor", "দৈনিক বাজার দর", "পণ্যের দাম", "বাংলাদেশ বাজার দর"],
  openGraph: {
    title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    description:
      "প্রতিদিনের বাজার দর, দাম উঠানামার হিসাব এবং বিভিন্ন বাজারের নিখুঁত পর্যবেক্ষণ।",
    type: "website",
    locale: "bn_BD",
    images: ["/bazardor-home.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 antialiased">
        <Providers>
          <Navbar />
          <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-6 md:py-8">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
