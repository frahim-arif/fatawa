
import Link from "next/link";

const backend = "https://f-backend-vdi1.onrender.com/api";

// =========================================
// GET ENGLISH CATEGORY
// =========================================
async function getCategory(slug) {
  try {
    const res = await fetch(
      `${backend}/en/categories/slug/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Category API error:", res.status);
      return null;
    }

    const data = await res.json();

    console.log("English Category:", data);

    if (!data.success || !data.data) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error("Failed to fetch English category:", error);
    return null;
  }
}

// =========================================
// GET QUESTIONS OF CATEGORY
// =========================================
async function getCategoryQuestions(slug) {
  try {
    const res = await fetch(
      `${backend}/en/categories/slug/${encodeURIComponent(slug)}/questions`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    console.log("Category Questions:", data);

    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch category questions:", error);
    return [];
  }
}

// =========================================
// SEO
// =========================================
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "Islamic Category | Maslak-e-Deoband",
      description:
        "Browse authentic Islamic questions and answers according to the Quran and Sunnah.",
    };
  }

  const name =
    category.englishName ||
    category.enName ||
    category.nameEn ||
    category.name ||
    "Islamic Category";

  return {
    title: `${name} | Maslak-e-Deoband`,
    description: `Read Islamic questions and answers about ${name} according to the Quran and Sunnah.`,

    alternates: {
      canonical: `https://www.maslakedeoband.in/en/categories/${slug}`,
    },

    openGraph: {
      title: `${name} | Maslak-e-Deoband`,
      description: `Read Islamic questions and answers about ${name}.`,
      type: "website",
      url: `https://www.maslakedeoband.in/en/categories/${slug}`,
      siteName: "Maslak-e-Deoband",
    },
  };
}

// =========================================
// PAGE
// =========================================
export default async function EnglishCategoryPage({ params }) {
  const { slug } = await params;

  // Get category
  const category = await getCategory(slug);

  // =========================================
  // NOT FOUND
  // =========================================
  if (!category) {
    return (
      <main className="min-h-screen bg-[#faf9f6]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="rounded-xl border border-gray-200 bg-white p-10 shadow-sm">

            <h1 className="text-2xl font-bold text-gray-800">
              Category Not Found
            </h1>

            <p className="mt-3 text-gray-500">
              The requested Islamic category could not be found.
            </p>

            <Link
              href="/en/categories"
              className="
                mt-6
                inline-block
                rounded-lg
                bg-[#3b2f2f]
                px-5
                py-3
                font-semibold
                text-yellow-200
                transition
                hover:bg-[#4a3a3a]
              "
            >
              Browse Categories
            </Link>

          </div>
        </div>
      </main>
    );
  }

  // =========================================
  // CATEGORY NAME
  // =========================================
  const categoryName =
    category.englishName ||
    category.enName ||
    category.nameEn ||
    category.name ||
    "Islamic Category";

  // =========================================
  // QUESTIONS
  // =========================================
  const questions = await getCategoryQuestions(slug);

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">

        {/* =========================================
            BREADCRUMB
        ========================================= */}
        <div className="mb-6 text-sm text-gray-500">

          <Link
            href="/en"
            className="transition hover:text-yellow-700"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/en/categories"
            className="transition hover:text-yellow-700"
          >
            Categories
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            {categoryName}
          </span>

        </div>

        {/* =========================================
            CATEGORY HEADER
        ========================================= */}
        <section className="mb-10 rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm md:p-10">

          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-700">
            Islamic Category
          </p>

          <h1 className="mt-2 text-3xl font-bold leading-tight text-[#3b2f2f] md:text-5xl">
            {categoryName}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 md:text-lg">
            Browse authentic Islamic questions and answers related to{" "}
            <strong>{categoryName}</strong>.
          </p>

        </section>

        {/* =========================================
            QUESTIONS
        ========================================= */}
        <section>

          <div className="mb-5 flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-yellow-700">
                Questions & Answers
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#4b3415] md:text-3xl">
                {categoryName} Fatwas
              </h2>
            </div>

            <span className="text-sm text-gray-500">
              {questions.length} Questions
            </span>

          </div>

          {questions.length > 0 ? (

            <div className="space-y-4">

              {questions.map((item) => {

                const question =
                  item?.question ||
                  item?.englishQuestion ||
                  item?.enQuestion ||
                  item?.questionEn ||
                  "";

                const questionSlug =
                  item?.slug ||
                  item?._id;

                if (!question || !questionSlug) {
                  return null;
                }

                return (
                  <Link
                    key={item?._id || questionSlug}
                    href={`/en/fatawa/${encodeURIComponent(
                      questionSlug
                    )}`}
                    className="
                      group
                      block
                      rounded-xl
                      border
                      border-yellow-200
                      bg-white
                      p-5
                      shadow-sm
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:border-yellow-500
                      hover:shadow-md
                    "
                  >

                    <h3
                      className="
                        text-base
                        font-semibold
                        leading-7
                        text-gray-800
                        transition
                        group-hover:text-[#5a421c]
                        md:text-lg
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
                      Read Fatwa →
                    </span>

                  </Link>
                );
              })}

            </div>

          ) : (

            <div className="rounded-xl border border-yellow-200 bg-white p-10 text-center">

              <h3 className="text-xl font-semibold text-gray-800">
                No Questions Found
              </h3>

              <p className="mt-2 text-gray-500">
                There are currently no English questions available
                in this category.
              </p>

              <Link
                href="/en/fatawa"
                className="
                  mt-5
                  inline-block
                  rounded-lg
                  bg-[#3b2f2f]
                  px-5
                  py-3
                  font-semibold
                  text-yellow-200
                  transition
                  hover:bg-[#4a3a3a]
                "
              >
                Browse All Fatwas
              </Link>

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

