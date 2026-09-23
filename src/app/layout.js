
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Nastaliq_Urdu, Amiri } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import HeaderWrapper from "./components/HeaderWrapper";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nastaleeq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-nastaleeq",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const siteUrl = "https://www.maslakedeoband.in";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Maslak-e-Deoband | اسلامی سوال و جواب اور فتاویٰ",
    template: "%s | Maslak-e-Deoband",
  },

  description:
    "اسلامی سوال و جواب، فقہی مسائل اور مستند حوالہ جات کے ساتھ فتاویٰ۔ نماز، روزہ، زکوٰۃ، حج، نکاح، طلاق اور دیگر دینی مسائل کے جوابات۔",

  applicationName: "Maslak-e-Deoband",

  keywords: [
    "اسلامی سوال و جواب",
    "فتاویٰ",
    "دینی مسائل",
    "فقہی مسائل",
    "اسلامی مسائل",
    "مسائل کا جواب",
    "آن لائن فتویٰ",
    "Maslak e Deoband",
    "Islamic Questions Answers",
    "Islamic Fatawa",
  ],

  authors: [
    {
      name: "Maslak-e-Deoband",
      url: siteUrl,
    },
  ],

  creator: "Maslak-e-Deoband",
  publisher: "Maslak-e-Deoband",

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "ur_PK",
    url: siteUrl,
    siteName: "Maslak-e-Deoband",

    title: "Maslak-e-Deoband | اسلامی سوال و جواب اور فتاویٰ",

    description:
      "اسلامی سوال و جواب، فقہی مسائل اور حوالہ جات کے ساتھ فتاویٰ۔",

    images: [
      {
        url: "/images/ramadan_15_03_2022_1.jpg",
        width: 1200,
        height: 630,
        alt: "Maslak-e-Deoband",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Maslak-e-Deoband | اسلامی سوال و جواب اور فتاویٰ",

    description:
      "اسلامی سوال و جواب، فقہی مسائل اور حوالہ جات کے ساتھ فتاویٰ۔",

    images: ["/images/ramadan_15_03_2022_1.jpg"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
  },

  verification: {
    google: "3fty9OBokUbw9CvP3IvulB5srEIpqdVaAfOWbvu1t_M",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nastaleeq.variable} ${amiri.variable} bg-gray-50 min-h-screen`}
      >
        {/* Google AdSense */}
        <Script
          id="google-adsense"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1540204802615671"
          crossOrigin="anonymous"
        />

        <HeaderWrapper />

        <main className="max-w-5xl mx-auto py-6 px-4">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

