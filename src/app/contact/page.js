import Script from "next/script";
import { Noto_Nastaliq_Urdu, Noto_Naskh_Arabic } from "next/font/google";

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  display: "swap",
});

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
  {
    title: "سوال مختصر لکھیں",
    text: "ایک پیغام میں ایک ہی مسئلہ پوچھیں، بات صاف اور سیدھی رکھیں۔",
  },
  {
    title: "تفصیل واضح کریں",
    text: "مسئلے کی ضروری صورتِ حال لکھیں تاکہ درست جواب دیا جا سکے۔",
  },
  {
    title: "اپنا نام اور شہر بتائیں",
    text: "جواب دینے اور دوبارہ رابطہ کرنے میں آسانی رہتی ہے۔",
  },
];

/* 8-point star lattice used as the hero texture */
const starPattern =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='%23d8c27d' stroke-opacity='.25' stroke-width='1'%3E%3Crect x='16' y='16' width='32' height='32'/%3E%3Crect x='16' y='16' width='32' height='32' transform='rotate(45 32 32)'/%3E%3C/g%3E%3C/svg%3E\")";

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
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
      className="h-6 w-6 shrink-0"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.46 9.47zM20.52 3.45A11.4 11.4 0 0 0 12.05 0C5.73 0 .59 5.14.59 11.45c0 2.02.53 3.99 1.53 5.73L.5 23l5.97-1.57a11.43 11.43 0 0 0 5.58 1.42h.01c6.31 0 11.45-5.14 11.45-11.45 0-3.06-1.19-5.93-3.35-8.1z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
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

      <main
        dir="rtl"
        className={`${naskh.className} min-h-screen bg-[#f3f6f4] text-[#1c2b26]`}
      >
        {/* ---------- Hero ---------- */}
        <section
          className="relative overflow-hidden bg-[#0f3d32] px-5 pb-28 pt-16 text-center md:pb-36 md:pt-24"
          style={{ backgroundImage: starPattern, backgroundSize: "64px 64px" }}
        >
          <div className="mx-auto max-w-2xl">
            <p className="mb-5 text-lg text-[#d8c27d] md:text-xl">
              مسلکِ دیوبند
            </p>

            <h1
              className={`${nastaliq.className} mb-6 text-4xl font-bold leading-[2.1] text-white md:text-6xl md:leading-[2]`}
            >
              ہم سے رابطہ کریں
            </h1>

            <p className="mx-auto max-w-xl text-lg leading-10 text-[#cfe0d8] md:text-xl md:leading-[2.6rem]">
              دینی سوالات اور فتاویٰ کے لیے علمائے کرام سے براہِ راست کال
              یا واٹس ایپ پر رابطہ کریں۔
            </p>
          </div>

          {/* curved bottom edge */}
          <div className="absolute inset-x-0 -bottom-px h-14 rounded-t-[100%] bg-[#f3f6f4] md:h-20" />
        </section>

        {/* ---------- Contact cards ---------- */}
        <section className="mx-auto -mt-12 max-w-3xl space-y-6 px-4 md:-mt-16">
          {contacts.map((c) => (
            <article
              key={c.tel}
              className="overflow-hidden rounded-3xl border border-[#dbe5df] bg-white md:flex"
            >
              {/* Mihrab panel */}
              <div className="flex items-center justify-center bg-[#e8f0ec] px-6 py-7 md:w-52 md:shrink-0 md:py-0">
                <div className="flex h-36 w-28 items-end justify-center rounded-t-full rounded-b-xl border-2 border-[#0f3d32] bg-[#0f3d32] p-1.5 md:h-44 md:w-32">
                  <div className="flex h-full w-full items-center justify-center rounded-t-full rounded-b-lg border border-[#d8c27d] pt-4">
                    <span
                      className={`${nastaliq.className} text-5xl leading-none text-[#f0dd9b] md:text-6xl`}
                    >
                      {c.initial}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 p-6 md:p-8">
                <h2
                  className={`${nastaliq.className} text-2xl font-bold leading-[2.2] text-[#0f3d32] md:text-3xl`}
                >
                  {c.name}
                </h2>
                <p className="text-lg text-[#58706a]">{c.role}</p>

                <div
                  dir="ltr"
                  className="mt-4 flex items-center justify-end gap-2 text-2xl font-bold tabular-nums text-[#1c2b26] md:justify-start"
                >
                  <PhoneIcon />
                  <span>{c.display}</span>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`https://wa.me/${c.wa}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.name} کو واٹس ایپ پر پیغام بھیجیں`}
                    className="flex min-h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-2xl bg-[#1fa855] px-5 text-lg font-bold text-white transition-colors hover:bg-[#178a45] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1fa855]/40"
                  >
                    <WhatsAppIcon />
                    واٹس ایپ پر پوچھیں
                  </a>

                  <a
                    href={`tel:${c.tel}`}
                    aria-label={`${c.name} کو کال کریں`}
                    className="flex min-h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-2xl border-2 border-[#0f3d32] px-5 text-lg font-bold text-[#0f3d32] transition-colors hover:bg-[#0f3d32] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0f3d32]/30"
                  >
                    <PhoneIcon />
                    کال کریں
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ---------- How to ask ---------- */}
        <section className="mx-auto max-w-3xl px-4 pb-20 pt-14">
          <h2
            className={`${nastaliq.className} mb-8 text-center text-2xl font-bold leading-[2.2] text-[#0f3d32] md:text-3xl`}
          >
            سوال بھیجنے سے پہلے
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {tips.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-[#dbe5df] bg-white p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#0f3d32] text-[#f0dd9b]">
                  <CheckIcon />
                </div>
                <h3 className="mb-1 text-lg font-bold text-[#0f3d32]">
                  {t.title}
                </h3>
                <p className="leading-8 text-[#4d625c]">{t.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-lg leading-9 text-[#4d625c]">
            ان شاء اللہ آپ کے سوال کا جواب دینے کی کوشش کی جائے گی۔
          </p>
        </section>
      </main>
    </>
  );
}