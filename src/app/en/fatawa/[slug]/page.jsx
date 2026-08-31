
import Link from "next/link";

const backend = "https://f-backend-vdi1.onrender.com/api";

// =========================================
// GET ENGLISH FATWA
// =========================================
async function getFatwa(slug) {
  try {
    const res = await fetch(
      `${backend}/en/questions/slug/${encodeURIComponent(slug)}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (!data.success || !data.data) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error("Failed to fetch English Fatwa:", error);
    return null;
  }
}

// =========================================
// CLEAN HTML FOR META DESCRIPTION
// =========================================
function cleanHtml(text = "") {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// =========================================
// SEO
// =========================================
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const item = await getFatwa(slug);

  if (!item) {
    return {
      title: "Islamic Fatwa | Maslak-e-Deoband",
      description:
        "Read authentic Islamic Fatwas according to the Quran and Sunnah.",
    };
  }

  const title =
    item.englishMetaTitle ||
    item.englishQuestion ||
    "Islamic Fatwa | Maslak-e-Deoband";

  const description =
    item.englishMetaDescription ||
    cleanHtml(item.englishAnswer || "").slice(0, 155) ||
    "Read authentic Islamic Fatwas according to the Quran and Sunnah.";

  return {
    title,

    description,

    keywords: item.englishKeywords || [],

    alternates: {
      canonical: `https://www.maslakedeoband.in/en/fatawa/${slug}`,
    },

    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.maslakedeoband.in/en/fatawa/${slug}`,
      siteName: "Maslak-e-Deoband",
    },
  };
}

// =========================================
// PAGE
// =========================================
export default async function EnglishFatwaDetailPage({
  params,
}) {
  const { slug } = await params;

  const item = await getFatwa(slug);

  // =========================================
  // NOT FOUND
  // =========================================
  if (!item) {
    return (
      <main className="min-h-screen bg-[#faf9f6]">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10">

            <h1 className="text-2xl font-bold text-gray-800">
              Fatwa Not Found
            </h1>

            <p className="mt-3 text-gray-500">
              The requested Islamic Fatwa could not be found.
            </p>

            <Link
              href="/en/fatawa"
              className="
                inline-block
                mt-6
                rounded-lg
                bg-[#3b2f2f]
                px-5
                py-3
                text-yellow-200
                font-semibold
                hover:bg-[#4a3a3a]
                transition
              "
            >
              Browse Fatwas
            </Link>

          </div>

        </div>
      </main>
    );
  }

  const question =
    item.englishQuestion ||
    item.enQuestion ||
    item.questionEn ||
    "";

  const answer =
    item.englishAnswer ||
    item.enAnswer ||
    item.answerEn ||
    "";

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      <article className="max-w-4xl mx-auto px-4 py-8 md:py-14">

        {/* ================================= */}
        {/* BREADCRUMB */}
        {/* ================================= */}

        <div className="mb-6 text-sm text-gray-500">

          <Link
            href="/en"
            className="hover:text-yellow-700 transition"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/en/fatawa"
            className="hover:text-yellow-700 transition"
          >
            Fatwas
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            Islamic Fatwa
          </span>

        </div>

        {/* ================================= */}
        {/* FATWA CONTENT */}
        {/* ================================= */}

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-10">

          {/* LABEL */}

          <p className="text-sm text-yellow-700 font-semibold mb-4">
            Islamic Fatwa
          </p>

          {/* QUESTION */}

          <h1 className="text-2xl md:text-4xl font-bold text-[#3b2f2f] leading-relaxed">
            {question}
          </h1>

          {/* ANSWER */}

          {answer && (
            <div className="mt-10 border-t border-gray-200 pt-8">

              <h2 className="text-xl md:text-2xl font-bold text-[#3b2f2f]">
                Answer
              </h2>

              <div
                className="
                  mt-5
                  text-gray-700
                  leading-8
                  prose
                  prose-lg
                  max-w-none
                  prose-headings:text-[#3b2f2f]
                  prose-a:text-yellow-700
                "
                dangerouslySetInnerHTML={{
                  __html: answer,
                }}
              />

            </div>
          )}

          {/* REFERENCES */}

          {(item.englishHawala1 ||
            item.englishHawala2 ||
            item.englishHawala3) && (

            <div className="mt-10 border-t border-gray-200 pt-8">

              <h2 className="text-xl md:text-2xl font-bold text-[#3b2f2f]">
                References
              </h2>

              <div className="mt-5 space-y-3 text-gray-600 leading-7">

                {item.englishHawala1 && (
                  <p>{item.englishHawala1}</p>
                )}

                {item.englishHawala2 && (
                  <p>{item.englishHawala2}</p>
                )}

                {item.englishHawala3 && (
                  <p>{item.englishHawala3}</p>
                )}

              </div>

            </div>
          )}

        </div>

      </article>

    </main>
  );
}

