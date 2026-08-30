
export const metadata = {
  title: "English Fatwas | Maslak-e-Deoband",
  description:
    "Read Islamic Fatwas and answers to Islamic questions.",
};

export default function EnglishFatawaPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">

      <section className="max-w-6xl mx-auto px-4 py-12">

        <h1 className="text-3xl md:text-4xl font-bold text-[#3b2f2f]">
          Islamic Fatwas
        </h1>

        <p className="mt-3 text-gray-600">
          Find answers to Islamic questions based on the Quran,
          Sunnah and authentic Islamic scholarship.
        </p>

        {/* Search */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search Islamic questions..."
            className="w-full md:w-2/3 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Temporary message */}
        <div className="mt-10 bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-600">
            English Fatwas will appear here.
          </p>
        </div>

      </section>

    </main>
  );
}

