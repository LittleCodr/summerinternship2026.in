import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Summer Internships 2026 | Verified IIT, NIT & Corporate Opportunities",
  description: "High-signal internship discovery platform for the 2026 cycle. Verified listings from top institutes and global companies.",
  icons: {
    icon: "/logo.svg",
  },
  other: {
    "google-adsense-account": "ca-pub-4399385504426408",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4399385504426408" 
        crossOrigin="anonymous" 
        strategy="afterInteractive"
      />
      <body className={`${inter.variable} font-sans selection:bg-primary selection:text-milk`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
