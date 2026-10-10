import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

const font = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর — আজকের বাজারের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দৈনিক বাজারদর।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="bazardor">
      <body className={`${font.className} flex min-h-screen flex-col bg-base-200 text-base-content`}>
        <Navbar />
        <PriceTicker />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}