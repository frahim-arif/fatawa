
export const metadata = {
  title: "Islamic Articles | Maslak-e-Deoband",
  description:
    "Read Islamic articles about Quran, Hadith, Fiqh, worship, family and daily life.",
};

export default function EnglishArticlesPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">

      <section className="max-w-6xl mx-auto px-4 py-12">

        <h1 className="text-3xl md:text-4xl font-bold text-[#3b2f2f]">
          Islamic Articles
        </h1>

        <p className="mt-3 text-gray-600">
          Explore useful Islamic articles and educational content.
        </p>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <article className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#3b2f2f]">
              Islamic Knowledge
            </h2>

            <p className="mt-3 text-gray-600">
              Islamic articles will appear here.
            </p>
          </article>

          <article className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#3b2f2f]">
              Quran & Hadith
            </h2>

            <p className="mt-3 text-gray-600">
              Quran and Hadith articles will appear here.
            </p>
          </article>

          <article className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#3b2f2f]">
              Islamic Fiqh
            </h2>

            <p className="mt-3 text-gray-600">
              Fiqh related articles will appear here.
            </p>
          </article>

        </div>

      </section>

    </main>
  );
}

