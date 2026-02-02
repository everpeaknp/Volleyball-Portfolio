import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "नेपाल भलिबल क्लब हामबर्ग e.V. | Nepal Volleyball Club Hamburg",
  description: "जर्मनीको हामबर्गमा स्थापित नेपाली भलिबल क्लब। खेलकुद, एकता र सांस्कृतिक संरक्षणमा समर्पित।",
  keywords: "Nepal Volleyball, Hamburg, Nepali Community, Sportverein, Hamburg Volleyball, Nepalese in Germany",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ne">
      <body className="antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
