
import Link from "next/link";
import { notFound } from "next/navigation";

const backend = "https://f-backend-vdi1.onrender.com/api";

// =========================================
// GET CATEGORY
// =========================================
async function getCategory(slug) {
  try {
    const res = await fetch(`${backend}/categories`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (!data.success) {
      return null;
    }

    const categories = data.data || [];

    const decodedSlug = decodeURIComponent(slug);

    return (
      categories.find(
        (item) =>
          item.slug === decodedSlug ||
          item.name === decodedSlug
      ) || null
    );
  } catch (error) {
    console.error("Bangla category fetch error:", error);
    return null;
  }
}

// =========================================
// GET QUESTIONS BY CATEGORY
// =========================================
async function getQuestions(categoryName) {
  try {
    const res = await fetch(
      `${backend}/admin/questions/category/${encodeURIComponent(
        categoryName
      )}?skip=0&limit=5000`,
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

    // শুধুমাত্র বাংলা প্রশ্ন
    return (data.data || []).filter(
      (item) =>
        item.banglaQuestion ||
        item.bnQuestion ||
        item.questionBn
    );
  } catch (error) {
    console.error(
      "Bangla category questions fetch error:",
      error
    );

    return [];
  }
}

// =========================================
// BANGLA CATEGORY NAME
// =========================================
function getBanglaCategoryName(category, slug) {
  return (
    category?.banglaName ||
    category?.bnName ||
    category?.nameBn ||
    decodeURIComponent(slug)
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ")
  );
}

// =========================================
// BANGLA QUESTION
// =========================================
function getBanglaQuestion(item) {
  return (
    item.banglaQuestion ||
    item.bnQuestion ||
    item.questionBn ||
    ""
  );
}

// =========================================
// SEO METADATA
// =========================================
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const category = await getCategory(slug);

  const categoryName = getBanglaCategoryName(
    category,
    slug
  );

  const canonical = `https://www.maslakedeoband.in/bn/categories/${slug}`;

  return {
    title: `${categoryName} | ইসলামী ফতোয়া | Maslak-e-Deoband`,

    description: `কুরআন ও সুন্নাহর আলোকে ${categoryName} সম্পর্কিত প্রামাণিক ইসলামী ফতোয়া ও প্রশ্নোত্তর পড়ুন।`,

    alternates: {
      canonical,

      languages: {
        ur: `https://www.maslakedeoband.in/categories/${
          category?.slug || slug
        }`,

        bn: canonical,

        en: `https://www.maslakedeoband.in/en/categories/${
          category?.slug || slug
        }`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: `${categoryName} | ইসলামী ফতোয়া | Maslak-e-Deoband`,
      description: `কুরআন ও সুন্নাহর আলোকে ${categoryName} সম্পর্কিত প্রামাণিক ইসলামী ফতোয়া ও প্রশ্নোত্তর।`,
      url: canonical,
      siteName: "Maslak-e-Deoband",
      type: "website",
      locale: "bn_BD",
    },
  };
}

// =========================================
// PAGE
// =========================================
export default async function BanglaCategoryDetail({
  params,
}) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const categoryName = getBanglaCategoryName(
    category,
    slug
  );

  const questions = await getQuestions(category.name);

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <section className="relative overflow-hidden bg-[#3b2f2f] py-10 px-4">

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-sm md:text-base text-yellow-300 font-semibold mb-2">
            ইসলামী বিষয়
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-relaxed">
            {categoryName}
          </h1>

          <p className="mt-3 text-yellow-100 text-sm md:text-base">
            {categoryName} সম্পর্কিত ইসলামী ফতোয়া ও প্রশ্নোত্তর
          </p>

        </div>

      </section>

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <section className="max-w-5xl mx-auto px-4 py-8 md:py-10">

        {/* ================================= */}
        {/* BREADCRUMB */}
        {/* ================================= */}

        <div className="mb-6 text-sm text-gray-500">

          <Link
            href="/bn"
            className="hover:text-yellow-700"
          >
            হোম
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/bn/categories"
            className="hover:text-yellow-700"
          >
            বিষয়সমূহ
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            {categoryName}
          </span>

        </div>

        {/* ================================= */}
        {/* SECTION HEADER */}
        {/* ================================= */}

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl md:text-3xl font-bold text-[#4b3415]">
            {categoryName} - ফতোয়া
          </h2>

          <span className="text-sm text-gray-500">
            {questions.length} টি ফলাফল
          </span>

        </div>

        {/* ================================= */}
        {/* QUESTIONS */}
        {/* ================================= */}

        {questions.length > 0 ? (

          <div className="space-y-3">

            {questions.map((item) => {

              const question =
                getBanglaQuestion(item);

              const slug =
                item.slug || item._id;

              return (

                <Link
                  key={item._id}
                  href={`/bn/fatawa/${encodeURIComponent(
                    slug
                  )}`}
                  className="
                    block
                    bg-white
                    border border-yellow-200
                    rounded-xl
                    p-5
                    shadow-sm
                    hover:border-yellow-500
                    hover:shadow-md
                    hover:-translate-y-[1px]
                    transition
                  "
                >

                  <h3 className="
                    text-lg
                    md:text-xl
                    font-semibold
                    text-[#3b2f2f]
                    leading-8
                  ">
                    {question}
                  </h3>

                  <span className="
                    inline-block
                    mt-3
                    text-sm
                    text-yellow-700
                    font-semibold
                  ">
                    ফতোয়া পড়ুন →
                  </span>

                </Link>

              );
            })}

          </div>

        ) : (

          <div className="
            bg-white
            border border-yellow-200
            rounded-2xl
            shadow-sm
            p-10
            text-center
          ">

            <p className="text-gray-500 text-lg">
              এই বিভাগে কোনো বাংলা ফতোয়া পাওয়া যায়নি।
            </p>

          </div>

        )}

        {/* ================================= */}
        {/* BACK TO CATEGORIES */}
        {/* ================================= */}

        <div className="mt-8">

          <Link
            href="/bn/categories"
            className="
              text-[#75593f]
              font-semibold
              hover:text-yellow-700
              transition
            "
          >
            ← সব বিষয় দেখুন
          </Link>

        </div>

      </section>

    </main>
  );
}

