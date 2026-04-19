import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Summer Internships 2026 | Verified IIT, NIT & Corporate Opportunities",
  description: "High-signal internship discovery platform for the 2026 cycle. Verified listings from top institutes and global companies.",
  icons: {
    icon: "/logo.svg",
  },
};

function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="bg-white/70 backdrop-blur-2xl border border-primary/10 px-6 py-3 rounded-full shadow-lg shadow-primary/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="SummerInterns.in Logo" className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-primary tracking-tight">SummerInterns<span className="text-primary/40">.in</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-primary/60">
          <a href="/#explorer" className="hover:text-primary transition-colors">Explorer</a>
          <a href="/#institutes" className="hover:text-primary transition-colors">Institutes</a>
          <a href="/about" className="hover:text-primary transition-colors">About</a>
          <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
        </div>

        <button className="bg-primary text-milk px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all">
          Join Community
        </button>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-milk selection:bg-primary selection:text-milk">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
