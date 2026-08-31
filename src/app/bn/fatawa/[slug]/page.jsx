
import { notFound } from "next/navigation";

const backend = "https://f-backend-vdi1.onrender.com/api";

// =========================================
// GET BANGLA FATWA
// =========================================
async function getFatwa(slug) {
  try {
    const res = await fetch(
      `${backend}/bn/questions/slug/${encodeURIComponent(slug)}`,
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
    console.error("Bangla Fatwa fetch error:", error);
    return null;
  }
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
    fatwa.banglaMetaTitle ||
    fatwa.bnMetaTitle ||
    fatwa.metaTitleBn ||
    fatwa.banglaQuestion ||
    fatwa.bnQuestion ||
    fatwa.questionBn ||
    "ইসলামী ফতোয়া";

  const description =
    fatwa.banglaMetaDescription ||
    fatwa.bnMetaDescription ||
    fatwa.metaDescriptionBn ||
    fatwa.banglaAnswer
      ?.replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 155) ||
    "কুরআন ও সুন্নাহর আলোকে প্রামাণিক ইসলামী ফতোয়া ও প্রশ্নোত্তর।";

  const canonical = `https://www.maslakedeoband.in/bn/fatawa/${slug}`;

  return {
    title: `${title} | Maslak-e-Deoband`,

    description,

    keywords:
      fatwa.banglaKeywords ||
      fatwa.bnKeywords ||
      fatwa.keywordsBn ||
      [],

    alternates: {
      canonical,

      languages: {
        ur: `https://www.maslakedeoband.in/fatawa/${fatwa.slug || slug}`,

        bn: canonical,

        en: `https://www.maslakedeoband.in/en/fatawa/${
          fatwa.englishSlug || fatwa.slug || slug
        }`,
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
  const question =
    fatwa.banglaQuestion ||
    fatwa.bnQuestion ||
    fatwa.questionBn ||
    "";

  // =========================================
  // BANGLA ANSWER
  // =========================================
  const answer =
    fatwa.banglaAnswer ||
    fatwa.bnAnswer ||
    fatwa.answerBn ||
    "";

  // =========================================
  // BANGLA REFERENCES
  // =========================================
  const hawala1 =
    fatwa.banglaHawala1 ||
    fatwa.bnHawala1 ||
    fatwa.hawalaBn1 ||
    "";

  const hawala2 =
    fatwa.banglaHawala2 ||
    fatwa.bnHawala2 ||
    fatwa.hawalaBn2 ||
    "";

  const hawala3 =
    fatwa.banglaHawala3 ||
    fatwa.bnHawala3 ||
    fatwa.hawalaBn3 ||
    "";

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">

        <div className="bg-white rounded-2xl shadow-lg border border-yellow-200 overflow-hidden">

          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}

          <div className="bg-[#3b2f2f] px-6 py-7 md:px-10 md:py-9">

            <p className="text-sm md:text-base text-yellow-400 font-semibold mb-3">
              ইসলামী ফতোয়া
            </p>

            <h1 className="text-2xl md:text-4xl font-bold text-white leading-relaxed">
              {question}
            </h1>

          </div>

          {/* ================================= */}
          {/* CONTENT */}
          {/* ================================= */}

          <div className="px-6 py-7 md:px-10 md:py-10">

            {/* QUESTION */}
            <section>

              <h2 className="text-xl md:text-2xl font-bold text-[#4b3415] mb-4">
                প্রশ্ন
              </h2>

              <div
                className="
                  prose
                  max-w-none
                  text-gray-700
                  leading-8
                  text-base
                  md:text-lg
                "
                dangerouslySetInnerHTML={{
                  __html: question,
                }}
              />

            </section>

            {/* ANSWER */}
            <section className="mt-10 border-t border-yellow-200 pt-8">

              <h2 className="text-xl md:text-2xl font-bold text-[#4b3415] mb-5">
                উত্তর
              </h2>

              <div
                className="
                  prose
                  max-w-none
                  text-gray-700
                  leading-8
                  text-base
                  md:text-lg
                "
                dangerouslySetInnerHTML={{
                  __html: answer,
                }}
              />

            </section>

            {/* REFERENCES */}
            {(hawala1 || hawala2 || hawala3) && (
              <section className="mt-10 border-t border-yellow-200 pt-8">

                <h2 className="text-xl md:text-2xl font-bold text-[#4b3415] mb-5">
                  তথ্যসূত্র
                </h2>

                <div className="space-y-3 text-gray-600 leading-7">

                  {hawala1 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: hawala1,
                      }}
                    />
                  )}

                  {hawala2 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: hawala2,
                      }}
                    />
                  )}

                  {hawala3 && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: hawala3,
                      }}
                    />
                  )}

                </div>

              </section>
            )}

          </div>

        </div>

        {/* ================================= */}
        {/* BACK LINK */}
        {/* ================================= */}

        <div className="mt-6">

          <a
            href="/bn/fatawa"
            className="text-[#75593f] font-semibold hover:text-yellow-700 transition"
          >
            ← সব ফতোয়া দেখুন
          </a>

        </div>

      </article>

    </main>
  );
}
