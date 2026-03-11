import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import NewsletterPopup from "@/components/NewsletterPopup";

export const metadata: Metadata = {
  title: "Reverie — Clothing for a Better Future",
  description:
    "Shop the Reverie collection. Sustainable, stylish clothing made with intention. Dresses, tops, bottoms and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <NewsletterPopup />
      </body>
    </html>
  );
}
