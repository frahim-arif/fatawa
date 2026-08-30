
import Link from "next/link";

export const metadata = {
  title: "Maslak-e-Deoband | Islamic Guidance & Fatwas",
  description:
    "Authentic Islamic guidance, Fatwas, Articles and Islamic knowledge based on the Quran and Sunnah.",
};

export default function EnglishHomePage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">

      {/* Hero */}
      <section className="bg-[#3b2f2f] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-3xl md:text-5xl font-bold text-yellow-300">
            Islamic Guidance Based on Quran & Sunnah
          </h1>

          <p className="mt-5 text-lg text-yellow-100 max-w-2xl mx-auto">
            Explore authentic Islamic Fatwas, Articles and knowledge
            according to the teachings of the Quran and Sunnah.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              href="/en/fatawa"
              className="px-6 py-3 rounded-lg font-semibold text-black"
              style={{
                background:
                  "linear-gradient(90deg,#d4af37,#facc15)",
              }}
            >
              Browse Fatwas
            </Link>

            <Link
              href="/en/articles"
              className="px-6 py-3 rounded-lg border border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black transition"
            >
              Read Articles
            </Link>

          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="max-w-6xl mx-auto px-4 py-14">

        <div className="grid md:grid-cols-3 gap-6">

          {/* Fatwa */}
          <Link
            href="/en/fatawa"
            className="bg-white rounded-xl p-7 shadow-md hover:shadow-xl transition border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-[#3b2f2f]">
              Fatwas
            </h2>

            <p className="mt-3 text-gray-600">
              Find answers to Islamic questions according to
              authentic Islamic scholarship.
            </p>

            <span className="inline-block mt-5 text-yellow-700 font-semibold">
              View Fatwas →
            </span>
          </Link>

          {/* Articles */}
          <Link
            href="/en/articles"
            className="bg-white rounded-xl p-7 shadow-md hover:shadow-xl transition border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-[#3b2f2f]">
              Islamic Articles
            </h2>

            <p className="mt-3 text-gray-600">
              Read useful articles about Islamic beliefs,
              worship, family and daily life.
            </p>

            <span className="inline-block mt-5 text-yellow-700 font-semibold">
              Read Articles →
            </span>
          </Link>

          {/* Categories */}
          <Link
            href="/en/categories"
            className="bg-white rounded-xl p-7 shadow-md hover:shadow-xl transition border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-[#3b2f2f]">
              Islamic Categories
            </h2>

            <p className="mt-3 text-gray-600">
              Explore Islamic knowledge by different
              categories and subjects.
            </p>

            <span className="inline-block mt-5 text-yellow-700 font-semibold">
              Explore Categories →
            </span>
          </Link>

        </div>

      </section>

    </main>
  );
}

