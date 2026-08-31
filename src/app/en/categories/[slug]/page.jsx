
import Link from "next/link";

const backend = "https://f-backend-vdi1.onrender.com/api";

async function getCategory(slug) {
  try {
    const res = await fetch(
      `${backend}/categories/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (!data.success) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return null;
  }
}

async function getQuestions(slug) {
  try {
    const res = await fetch(
      `${backend}/questions/category/${encodeURIComponent(slug)}?limit=20`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    if (!data.success) {
      return [];
    }

    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch category questions:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const category = await getCategory(slug);

  const categoryName =
    category?.englishName ||
    category?.enName ||
    category?.nameEn ||
    category?.name ||
    slug
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");

  return {
    title: `${categoryName} | Islamic Fatwas | Maslak-e-Deoband`,
    description: `Read authentic Islamic Fatwas and Articles related to ${categoryName} according to the Quran and Sunnah.`,
    alternates: {
      canonical: `https://www.maslakedeoband.in/en/categories/${slug}`,
      languages: {
        ur: `https://www.maslakedeoband.in/categories/${slug}`,
        bn: `https://www.maslakedeoband.in/bn/categories/${slug}`,
        en: `https://www.maslakedeoband.in/en/categories/${slug}`,
      },
    },
  };
}

export default async function EnglishCategoryPage({ params }) {
  const { slug } = await params;

  const [category, questions] = await Promise.all([
    getCategory(slug),
    getQuestions(slug),
  ]);

  const categoryName =
    category?.englishName ||
    category?.enName ||
    category?.nameEn ||
    category?.name ||
    slug
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">

        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">

          <Link
            href="/en"
            className="hover:text-yellow-700"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/en/categories"
            className="hover:text-yellow-700"
          >
            Categories
          </Link>

          <span className="mx-2">/</span>

          <span>{categoryName}</span>

        </div>

        {/* Category Header */}
        <div className="mb-8">

          <p className="text-sm text-yellow-700 font-semibold mb-3">
            Islamic Category
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#3b2f2f]">
            {categoryName}
          </h1>

          <p className="mt-3 text-gray-600 leading-7">
            Explore authentic Islamic Fatwas and Articles
            related to {categoryName} according to the Quran
            and Sunnah.
          </p>

        </div>

        {/* Questions */}
        <section>

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold text-[#3b2f2f]">
              Fatwas
            </h2>

            <span className="text-sm text-gray-500">
              {questions.length} Results
            </span>

          </div>

          {questions.length > 0 ? (

            <div className="space-y-3">

              {questions.map((item) => {

                const question =
                  item.englishQuestion ||
                  item.enQuestion ||
                  item.questionEn ||
                  item.question;

                return (
                  <Link
                    key={item._id}
                    href={`/en/fatawa/${item.slug}`}
                    className="
                      block
                      bg-white
                      border border-gray-200
                      rounded-xl
                      p-5
                      shadow-sm
                      hover:border-yellow-500
                      hover:shadow-md
                      transition
                    "
                  >

                    <h3 className="text-lg font-semibold text-gray-800 leading-7">
                      {question}
                    </h3>

                    <span className="inline-block mt-2 text-sm text-yellow-700 font-semibold">
                      Read Fatwa →
                    </span>

                  </Link>
                );

              })}

            </div>

          ) : (

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">

              <p className="text-gray-500">
                No Fatwas found in this category.
              </p>

            </div>

          )}

        </section>

      </section>

    </main>
  );
}

