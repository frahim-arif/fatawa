
import Link from "next/link";
import { notFound } from "next/navigation";

const backend = "https://f-backend-vdi1.onrender.com/api";

// =====================================================
// GET SINGLE BANGLA CATEGORY
// =====================================================

async function getCategory(slug) {
  try {
    const res = await fetch(
      `${backend}/bn/categories/${encodeURIComponent(slug)}`,
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
    console.error("Bangla category fetch error:", error);
    return null;
  }
}

// =====================================================
// GET BANGLA QUESTIONS
// =====================================================

async function getQuestions(categoryId) {
  try {
    const res = await fetch(
      `${backend}/bn/questions?limit=5000&skip=0`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    if (!data.success) {
      return [];
    }

    const questions = data.data || [];

    // Category ID অনুযায়ী filter
    return questions.filter((item) => {
      const itemCategory =
        item.category?._id || item.category;

      return String(itemCategory) === String(categoryId);
    });
  } catch (error) {
    console.error(
      "Bangla category questions fetch error:",
      error
    );

    return [];
  }
}

// =====================================================
// SEO METADATA
// =====================================================

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "বিষয় পাওয়া যায়নি | Maslak-e-Deoband",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const categoryName = category.name || "ইসলামী বিষয়";

  const canonical =
    `https://www.maslakedeoband.in/bn/categories/${category.slug}`;

  return {
    title: `${categoryName} | ইসলামী ফতোয়া | Maslak-e-Deoband`,

    description:
      `কুরআন ও সুন্নাহর আলোকে ${categoryName} সম্পর্কিত প্রামাণিক ইসলামী ফতোয়া ও প্রশ্নোত্তর পড়ুন।`,

    alternates: {
      canonical,

      languages: {
        ur: `https://www.maslakedeoband.in/categories/${category.slug}`,

        bn: canonical,

        en: `https://www.maslakedeoband.in/en/categories/${category.slug}`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: `${categoryName} | ইসলামী ফতোয়া | Maslak-e-Deoband`,

      description:
        `কুরআন ও সুন্নাহর আলোকে ${categoryName} সম্পর্কিত প্রামাণিক ইসলামী ফতোয়া ও প্রশ্নোত্তর।`,

      url: canonical,

      siteName: "Maslak-e-Deoband",

      type: "website",

      locale: "bn_BD",
    },

    twitter: {
      card: "summary",

      title:
        `${categoryName} | ইসলামী ফতোয়া | Maslak-e-Deoband`,

      description:
        `কুরআন ও সুন্নাহর আলোকে ${categoryName} সম্পর্কিত প্রামাণিক ইসলামী ফতোয়া ও প্রশ্নোত্তর।`,
    },
  };
}

// =====================================================
// PAGE
// =====================================================

export default async function BanglaCategoryDetail({
  params,
}) {
  const { slug } = await params;

  // ---------------------------------------------------
  // CATEGORY
  // ---------------------------------------------------

  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const categoryName =
    category.name || "ইসলামী বিষয়";

  // ---------------------------------------------------
  // QUESTIONS
  // ---------------------------------------------------

  const questions = await getQuestions(
    category._id
  );

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-[#3b2f2f] px-4 py-10">

        <div className="mx-auto max-w-6xl text-center">

          <p className="mb-2 text-sm font-semibold text-yellow-300 md:text-base">
            ইসলামী বিষয়
          </p>

          <h1 className="text-3xl font-bold leading-relaxed text-white md:text-4xl">
            {categoryName}
          </h1>

          <p className="mt-3 text-sm text-yellow-100 md:text-base">
            {categoryName} সম্পর্কিত ইসলামী ফতোয়া ও প্রশ্নোত্তর
          </p>

        </div>

      </section>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <section className="mx-auto max-w-5xl px-4 py-8 md:py-10">

        {/* ================================================= */}
        {/* BREADCRUMB */}
        {/* ================================================= */}

        <div className="mb-6 text-sm text-gray-500">

          <Link
            href="/bn"
            className="transition hover:text-yellow-700"
          >
            হোম
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/bn/categories"
            className="transition hover:text-yellow-700"
          >
            বিষয়সমূহ
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            {categoryName}
          </span>

        </div>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-5 flex items-center justify-between gap-3">

          <h2 className="text-2xl font-bold text-[#4b3415] md:text-3xl">
            {categoryName} - ফতোয়া
          </h2>

          <span className="shrink-0 text-sm text-gray-500">
            {questions.length} টি
          </span>

        </div>

        {/* ================================================= */}
        {/* QUESTIONS */}
        {/* ================================================= */}

        {questions.length > 0 ? (

          <div className="space-y-3">

            {questions.map((item) => {

              const question =
                item.question || "";

              const questionSlug =
                item.slug || item._id;

              return (
                <Link
                  key={item._id}
                  href={`/bn/fatawa/${encodeURIComponent(
                    questionSlug
                  )}`}
                  className="
                    block
                    rounded-xl
                    border
                    border-yellow-200
                    bg-white
                    p-5
                    shadow-sm
                    transition
                    hover:-translate-y-[1px]
                    hover:border-yellow-500
                    hover:shadow-md
                  "
                >

                  <h3
                    className="
                      text-lg
                      font-semibold
                      leading-8
                      text-[#3b2f2f]
                      md:text-xl
                    "
                  >
                    {question}
                  </h3>

                  <span
                    className="
                      mt-3
                      inline-block
                      text-sm
                      font-semibold
                      text-yellow-700
                    "
                  >
                    ফতোয়া পড়ুন →
                  </span>

                </Link>
              );
            })}

          </div>

        ) : (

          <div
            className="
              rounded-2xl
              border
              border-yellow-200
              bg-white
              p-10
              text-center
              shadow-sm
            "
          >

            <div className="mb-4 text-4xl">
              📚
            </div>

            <p className="text-lg text-gray-500">
              এই বিভাগে কোনো বাংলা ফতোয়া পাওয়া যায়নি।
            </p>

          </div>

        )}

        {/* ================================================= */}
        {/* BACK */}
        {/* ================================================= */}

        <div className="mt-8">

          <Link
            href="/bn/categories"
            className="
              font-semibold
              text-[#75593f]
              transition
              hover:text-yellow-700
            "
          >
            ← সব বিষয় দেখুন
          </Link>

        </div>

      </section>

    </main>
  );
}

