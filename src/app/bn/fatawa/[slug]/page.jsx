
import { notFound } from "next/navigation";

const backend = "https://f-backend-vdi1.onrender.com/api";

// =========================================
// GET BANGLA FATWA
// =========================================
async function getFatwa(slug) {
  try {
    const decodedSlug = decodeURIComponent(slug);

    const url = `${backend}/bn/questions/slug/${encodeURIComponent(decodedSlug)}`;

    console.log("================================");
    console.log("BN SLUG:", slug);
    console.log("DECODED SLUG:", decodedSlug);
    console.log("API URL:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

    console.log("API STATUS:", res.status);

    const text = await res.text();

    console.log("API RESPONSE:", text);
    console.log("================================");

    if (!res.ok) {
      return null;
    }

    const data = JSON.parse(text);

    if (!data.success || !data.data) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error("Bangla Fatwa fetch error:", error);
    return null;
  }
}

// =========================================
// REMOVE HTML
// =========================================
function stripHtml(text = "") {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// =========================================
// SEO METADATA
// =========================================
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const fatwa = await getFatwa(slug);

  if (!fatwa) {
    return {
      title: "ফতোয়া পাওয়া যায়নি | Maslak-e-Deoband",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    fatwa.metaTitle ||
    fatwa.question ||
    "ইসলামী ফতোয়া";

  const description =
    fatwa.metaDescription ||
    stripHtml(fatwa.answer).slice(0, 155) ||
    "কুরআন ও সুন্নাহর আলোকে প্রামাণিক ইসলামী ফতোয়া ও প্রশ্নোত্তর।";

  const keywords = Array.isArray(fatwa.keywords)
    ? fatwa.keywords
    : [];

  const canonical =
    `https://www.maslakedeoband.in/bn/fatawa/${fatwa.slug || slug}`;

  return {
    title: `${title} | Maslak-e-Deoband`,

    description,

    keywords,

    alternates: {
      canonical,

      languages: {
        ur: `https://www.maslakedeoband.in/fatawa/${fatwa.slug || slug}`,

        bn: canonical,

        en: `https://www.maslakedeoband.in/en/fatawa/${fatwa.slug || slug}`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: `${title} | Maslak-e-Deoband`,
      description,
      url: canonical,
      siteName: "Maslak-e-Deoband",
      type: "article",
      locale: "bn_BD",
    },

    twitter: {
      card: "summary",
      title: `${title} | Maslak-e-Deoband`,
      description,
    },
  };
}

// =========================================
// PAGE
// =========================================
export default async function BanglaFatwaDetailPage({
  params,
}) {
  const { slug } = await params;

  const fatwa = await getFatwa(slug);

  if (!fatwa) {
    notFound();
  }

  // =========================================
  // BANGLA QUESTION
  // =========================================
  const question = fatwa.question || "";

  // =========================================
  // BANGLA ANSWER
  // =========================================
  const answer = fatwa.answer || "";

  // =========================================
  // REFERENCES
  // =========================================
  const hawala1 = fatwa.hawala1 || "";
  const hawala2 = fatwa.hawala2 || "";
  const hawala3 = fatwa.hawala3 || "";

  return (
    <main
      className="min-h-screen bg-[#f7f3e8]"
      dir="ltr"
    >
      <article className="mx-auto max-w-4xl px-4 py-8 md:py-12">

        <div className="overflow-hidden rounded-2xl border border-yellow-200 bg-white shadow-lg">

          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}

          <div className="bg-[#3b2f2f] px-6 py-7 md:px-10 md:py-9">

            <p className="mb-3 text-sm font-semibold text-yellow-400 md:text-base">
              ইসলামী ফতোয়া
            </p>

            <h1
              className="
                text-2xl
                font-bold
                leading-relaxed
                text-white
                md:text-4xl
              "
              dir="ltr"
            >
              {question}
            </h1>

          </div>

          {/* ================================= */}
          {/* CONTENT */}
          {/* ================================= */}

          <div className="px-6 py-7 md:px-10 md:py-10">

            {/* QUESTION */}

            <section>

              <h2 className="mb-4 text-xl font-bold text-[#4b3415] md:text-2xl">
                প্রশ্ন
              </h2>

              <div
                className="
                  prose
                  max-w-none
                  text-base
                  leading-8
                  text-gray-700
                  md:text-lg
                "
                dir="ltr"
                dangerouslySetInnerHTML={{
                  __html: question,
                }}
              />

            </section>

            {/* ANSWER */}

            <section className="mt-10 border-t border-yellow-200 pt-8">

              <h2 className="mb-5 text-xl font-bold text-[#4b3415] md:text-2xl">
                উত্তর
              </h2>

              <div
                className="
                  prose
                  max-w-none
                  text-base
                  leading-8
                  text-gray-700
                  md:text-lg
                "
                dir="ltr"
                dangerouslySetInnerHTML={{
                  __html: answer,
                }}
              />

            </section>

            {/* REFERENCES */}

            

{(hawala1 || hawala2 || hawala3) && (
  <div className="mt-10 border-t border-gray-200 pt-8">

    <h2 className="text-xl font-bold text-[#3b2f2f] md:text-2xl">
      তথ্যসূত্র
    </h2>

    <div className="mt-5 space-y-4 text-gray-600">

      {hawala1 && (
        <div
          dir="rtl"
          className="font-amiri text-right text-lg leading-[2.2]"
          dangerouslySetInnerHTML={{
            __html: hawala1,
          }}
        />
      )}

      {hawala2 && (
        <div
          dir="rtl"
          className="font-amiri text-right text-lg leading-[2.2]"
          dangerouslySetInnerHTML={{
            __html: hawala2,
          }}
        />
      )}

      {hawala3 && (
        <div
          dir="rtl"
          className="font-amiri text-right text-lg leading-[2.2]"
          dangerouslySetInnerHTML={{
            __html: hawala3,
          }}
        />
      )}

    </div>
  </div>
)}




          </div>

        </div>

        {/* ================================= */}
        {/* BACK LINK */}
        {/* ================================= */}

        <div className="mt-6">

          <a
            href="/bn/fatawa"
            className="
              font-semibold
              text-[#75593f]
              transition
              hover:text-yellow-700
            "
          >
            ← সব ফতোয়া দেখুন
          </a>

        </div>

      </article>
    </main>
  );
}

