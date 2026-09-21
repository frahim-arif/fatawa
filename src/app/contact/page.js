import Script from "next/script";

export const metadata = {
  title: "Contact Us | Maslak e Deoband",
  description:
    "Maslak e Deoband se Islamic questions, fatwa requests, feedback aur website support ke liye rabta karein.",
  alternates: {
    canonical: "https://www.maslakedeoband.in/contact",
  },
  openGraph: {
    title: "Contact Us | Maslak e Deoband",
    description:
      "Islamic questions, fatwa requests, feedback aur website support ke liye Maslak e Deoband se rabta karein.",
    url: "https://www.maslakedeoband.in/contact",
    siteName: "Maslak e Deoband",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactUs() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Maslak e Deoband",
    url: "https://www.maslakedeoband.in",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+919058596626",
        contactType: "Islamic questions and fatwa requests",
        areaServed: "IN",
        availableLanguage: ["Urdu", "Hindi", "English"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+919557171532",
        contactType: "Islamic questions and fatwa requests",
        areaServed: "IN",
        availableLanguage: ["Urdu", "Hindi", "English"],
      },
    ],
  };

  return (
    <>
      <Script
        id="contact-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div
        dir="rtl"
        className="max-w-3xl mx-auto py-8 px-4 text-gray-800"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#174d40] mb-4">
            ہم سے رابطہ کریں
          </h1>

          <p className="text-lg leading-10 text-gray-700">
            اسلامی سوالات، فتاویٰ، ویب سائٹ سے متعلق معلومات، تجاویز یا
            دیگر ضروری امور کے لیے درج ذیل نمبرز پر رابطہ کیا جا سکتا ہے۔
          </p>
        </div>

        <div className="space-y-5">

          {/* Frahim Arif Qasmi */}
          <div className="rounded-2xl border border-[#d8c27d] bg-[#fffaf0] p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#174d40] mb-3">
              مفتی فراہیم عارف قاسمی
            </h2>

            <p className="text-lg text-gray-700 mb-4">
              اسلامی سوالات اور فتاویٰ کے لیے رابطہ:
            </p>

            <a
              href="tel:+919058596626"
              dir="ltr"
              className="inline-block text-xl font-bold text-[#174d40] hover:underline"
            >
              +91 90585 96626
            </a>
          </div>

          {/* Daud Qasmi */}
          <div className="rounded-2xl border border-[#d8c27d] bg-[#fffaf0] p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#174d40] mb-3">
              مفتی داؤد قاسمی
            </h2>

            <p className="text-lg text-gray-700 mb-4">
              اسلامی سوالات اور فتاویٰ کے لیے رابطہ:
            </p>

            <a
              href="tel:+919557171532"
              dir="ltr"
              className="inline-block text-xl font-bold text-[#174d40] hover:underline"
            >
              +91 95571 71532
            </a>
          </div>

        </div>

        <div className="mt-8 rounded-xl bg-[#f8f1df] border border-[#d8c27d] p-5">
          <p className="text-center text-lg leading-9 text-gray-700">
            براہ کرم ضروری اور مختصر معلومات کے ساتھ رابطہ کریں۔
            <br />
            ان شاء اللہ آپ کے سوال کا جواب دینے کی کوشش کی جائے گی۔
          </p>
        </div>
      </div>
    </>
  );
}