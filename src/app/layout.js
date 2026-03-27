import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Nastaliq_Urdu, Amiri } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "./components/HeaderWrapper";
import Footer from "./components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const nastaleeq = Noto_Nastaliq_Urdu({ subsets: ["arabic"], weight: ["400","700"], variable: "--font-nastaleeq" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400","700"], variable: "--font-amiri" });

export const metadata = {
  title: "Maslakedeoband",
  description: "Islamic Q&A Platform",
  icons: { icon: [{ url: "/favicon.ico", type: "image/x-icon" }] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Self-hosted Jameel Noori Nastaleeq */}
        <link
          rel="stylesheet"
          href="/fonts/jameelnoori.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nastaleeq.variable} ${amiri.variable} bg-gray-50 min-h-screen`}
      >
        <HeaderWrapper />
        <main className="max-w-5xl mx-auto py-6 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}