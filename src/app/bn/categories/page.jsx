
import Link from "next/link";

const backend = "https://f-backend-vdi1.onrender.com/api";

// =========================================
// GET CATEGORIES
// =========================================
async function getCategories() {
  try {
    const res = await fetch(`${backend}/categories`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    if (!data.success) {
      return [];
    }

    return data.data || [];
  } catch (error) {
    console.error("Bangla categories fetch error:", error);
    return [];
  }
}

// =========================================
// GET BANGLA CATEGORY NAME
// =========================================
function getBanglaCategoryName(category) {
  return (
    category?.banglaName ||
    category?.bnName ||
    category?.nameBn ||
    null
  );
}

// =========================================
// SEO
// =========================================
export const metadata = {
  title: "ইসলামী বিষয়সমূহ | মাসলাকে দেওবন্দ",
  description:
    "কুরআন ও সুন্নাহর আলোকে বিভিন্ন ইসলামী বিষয়ের প্রশ্ন ও ফতোয়া পড়ুন।",

  alternates: {
    canonical: "https://www.maslakedeoband.in/bn/categories",

    languages: {
      ur: "https://www.maslakedeoband.in/categories",
      en: "https://www.maslakedeoband.in/en/categories",
      bn: "https://www.maslakedeoband.in/bn/categories",
    },
  },
};

// =========================================
// PAGE
// =========================================
export default async function BanglaCategoriesPage() {
  const categories = await getCategories();

  const banglaCategories = categories.filter((category) =>
    getBanglaCategoryName(category)
  );

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* HERO */}
      <section
        className="relative overflow-hidden py-12 px-4"
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative max-w-6xl mx-auto text-center">

          <h1 className="text-3xl md:text-5xl font-bold text-yellow-300">
            ইসলামী বিষয়সমূহ
          </h1>

          <p className="mt-3 text-yellow-100 text-base md:text-lg">
            ইসলামী বিষয় অনুযায়ী প্রশ্ন ও ফতোয়া
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 py-10">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-[#4b3415]">
            বিষয়সমূহ
          </h2>

          <Link
            href="/bn"
            className="text-yellow-700 font-semibold"
          >
            হোম →
          </Link>

        </div>

        {banglaCategories.length > 0 ? (

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {banglaCategories.map((category) => (

              <Link
                key={category._id}
                href={`/bn/categories/${encodeURIComponent(
                  category.slug || category.name
                )}`}
                className="
                  flex
                  items-center
                  justify-center
                  min-h-[100px]
                  rounded-2xl
                  border border-[#c8b27a]
                  bg-gradient-to-b
                  from-[#f6f0dd]
                  via-[#e6d4a3]
                  to-[#c9ab63]
                  px-4
                  text-center
                  text-[#4b3415]
                  font-bold
                  shadow-md
                  hover:scale-[1.02]
                  hover:shadow-lg
                  transition
                "
              >
                {getBanglaCategoryName(category)}
              </Link>

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-xl p-10 text-center shadow-sm">

            <p className="text-gray-500">
              কোনো ইসলামী বিষয় পাওয়া যায়নি।
            </p>

          </div>

        )}

      </section>

    </main>
  );
}
