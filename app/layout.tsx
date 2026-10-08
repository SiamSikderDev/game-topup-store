import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SupportFloat from "@/components/SupportFloat";
import { LangProvider } from "@/lib/i18n";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "TopUpGhor — Instant UID Game Top-Up Bangladesh",
  description:
    "Free Fire diamonds, PUBG UC, MLBB diamonds, CODM CP — শুধু Player UID দিয়ে ইনস্ট্যান্ট টপ-আপ। bKash/Nagad পেমেন্ট। পাসওয়ার্ড কখনো চাওয়া হয় না।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className={`${fraunces.variable} ${inter.variable} font-sans`}>
        <LangProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <SupportFloat />
        </LangProvider>
      </body>
    </html>
  );
}
