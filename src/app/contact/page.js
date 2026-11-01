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

const contacts = [
  {
    name: "مفتی فراہیم عارف قاسمی",
    initial: "ف",
    role: "اسلامی سوالات اور فتاویٰ",
    display: "+91 90585 96626",
    tel: "+919058596626",
    wa: "919058596626",
  },
  {
    name: "مفتی داؤد قاسمی",
    initial: "د",
    role: "اسلامی سوالات اور فتاویٰ",
    display: "+91 95571 71532",
    tel: "+919557171532",
    wa: "919557171532",
  },
];

const waMessage = encodeURIComponent(
  "السلام علیکم و رحمۃ اللہ و برکاتہ\nمجھے ایک شرعی مسئلہ دریافت کرنا ہے۔"
);

const tips = [
  "سوال صاف اور مختصر الفاظ میں لکھیں۔",
  "مسئلے کی ضروری تفصیل ضرور بتائیں۔",
  "اپنا نام اور شہر لکھ دیں تاکہ جواب دینے میں آسانی رہے۔",
];

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.46 9.47zM20.52 3.45A11.4 11.4 0 0 0 12.05 0C5.73 0 .59 5.14.59 11.45c0 2.02.53 3.99 1.53 5.73L.5 23l5.97-1.57a11.43 11.43 0 0 0 5.58 1.42h.01c6.31 0 11.45-5.14 11.45-11.45 0-3.06-1.19-5.93-3.35-8.1z" />
    </svg>
  );
}

export default function ContactUs() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Maslak e Deoband",
    url: "https://www.maslakedeoband.in",
    contactPoint: contacts.map((c) => ({
      "@type": "ContactPoint",
      telephone: c.tel,
      contactType: "Islamic questions and fatwa requests",
      areaServed: "IN",
      availableLanguage: ["Urdu", "Hindi", "English"],
    })),
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

      <main dir="rtl" className="min-h-screen bg-[#f6f3ea] text-gray-800">
        {/* Header */}
        <section
          className="relative overflow-hidden bg-[#174d40] px-4 pb-20 pt-14 text-center text-white md:pb-24 md:pt-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(216,194,125,0.18) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        >
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-5 text-4xl font-bold leading-[1.6] md:text-5xl">
              ہم سے رابطہ کریں
            </h1>
            <p className="text-lg leading-10 text-[#e9e2c8] md:text-xl">
              اسلامی سوالات، فتاویٰ، ویب سائٹ سے متعلق معلومات یا تجاویز
              کے لیے براہِ راست کال کریں یا واٹس ایپ پر پیغام بھیجیں۔
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#d8c27d]" />
        </section>

        {/* Contact cards */}
        <section className="mx-auto -mt-10 grid max-w-4xl gap-6 px-4 md:grid-cols-2">
          {contacts.map((c) => (
            <article
              key={c.tel}
              className="flex flex-col rounded-3xl border border-[#d8c27d] bg-white p-7 shadow-[0_10px_30px_-12px_rgba(23,77,64,0.35)]"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#174d40] text-3xl font-bold text-[#f0dd9b] ring-4 ring-[#f1e7c3]">
                  {c.initial}
                </div>
                <div>
                  <h2 className="text-2xl font-bold leading-snug text-[#174d40]">
                    {c.name}
                  </h2>
                  <p className="mt-1 text-base text-gray-600">{c.role}</p>
                </div>
              </div>

              <div
                dir="ltr"
                className="mb-6 rounded-xl bg-[#f8f1df] px-4 py-3 text-center text-2xl font-bold tracking-wide text-[#174d40]"
              >
                {c.display}
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${c.wa}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.name} کو واٹس ایپ پر پیغام بھیجیں`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#1fa855] px-4 py-3.5 text-lg font-bold text-white transition hover:bg-[#188a45] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1fa855]/40"
                >
                  <WhatsAppIcon />
                  واٹس ایپ
                </a>

                <a
                  href={`tel:${c.tel}`}
                  aria-label={`${c.name} کو کال کریں`}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#174d40] bg-[#174d40] px-4 py-3.5 text-lg font-bold text-white transition hover:bg-[#0f3a30] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#174d40]/40"
                >
                  <PhoneIcon />
                  کال کریں
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* How to ask */}
        <section className="mx-auto max-w-4xl px-4 pb-16 pt-10">
          <div className="rounded-3xl border border-[#d8c27d] bg-[#f8f1df] p-7 md:p-9">
            <h2 className="mb-4 text-2xl font-bold text-[#174d40]">
              سوال بھیجنے سے پہلے
            </h2>
            <ul className="space-y-3 text-lg leading-9 text-gray-700">
              {tips.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-4 h-2 w-2 shrink-0 rounded-full bg-[#b89a3e]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-[#d8c27d]/70 pt-5 text-lg leading-9 text-gray-700">
              ان شاء اللہ آپ کے سوال کا جواب دینے کی کوشش کی جائے گی۔
            </p>
          </div>
        </section>
      </main>
    </>
  );
}