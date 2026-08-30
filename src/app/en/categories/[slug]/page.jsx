
export default async function EnglishCategoryPage({ params }) {
  const { slug } = await params;

  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      <section className="max-w-6xl mx-auto px-4 py-12">

        <h1 className="text-3xl md:text-4xl font-bold text-[#3b2f2f]">
          {categoryName}
        </h1>

        <p className="mt-3 text-gray-600">
          Islamic Fatwas and Articles related to {categoryName}.
        </p>

        <div className="mt-10 bg-white rounded-xl shadow-md p-8 text-center">

          <p className="text-gray-600">
            Content for this category will appear here.
          </p>

        </div>

      </section>

    </main>
  );
}

