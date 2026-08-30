
import Link from "next/link";

export const metadata = {
  title: "Islamic Categories | Maslak-e-Deoband",
  description:
    "Explore Islamic Fatwas and Articles by category.",
};

const categories = [
  {
    name: "Prayer",
    slug: "prayer",
  },
  {
    name: "Purification",
    slug: "purification",
  },
  {
    name: "Fasting",
    slug: "fasting",
  },
  {
    name: "Zakat",
    slug: "zakat",
  },
  {
    name: "Hajj & Umrah",
    slug: "hajj-umrah",
  },
  {
    name: "Marriage",
    slug: "marriage",
  },
  {
    name: "Divorce",
    slug: "divorce",
  },
  {
    name: "Business",
    slug: "business",
  },
  {
    name: "Inheritance",
    slug: "inheritance",
  },
  {
    name: "Aqeedah",
    slug: "aqeedah",
  },
  {
    name: "Quran",
    slug: "quran",
  },
  {
    name: "Hadith",
    slug: "hadith",
  },
];

export default function EnglishCategoriesPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">

      <section className="max-w-6xl mx-auto px-4 py-12">

        <h1 className="text-3xl md:text-4xl font-bold text-[#3b2f2f]">
          Islamic Categories
        </h1>

        <p className="mt-3 text-gray-600">
          Explore Islamic knowledge by subject.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/en/categories/${category.slug}`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
            >
              <h2 className="text-lg font-bold text-[#3b2f2f]">
                {category.name}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Explore →
              </p>
            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}

