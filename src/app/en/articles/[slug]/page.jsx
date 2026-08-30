
export default async function EnglishArticleDetailPage({ params }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      <article className="max-w-4xl mx-auto px-4 py-12">

        <div className="bg-white rounded-xl shadow-md p-6 md:p-10">

          <p className="text-sm text-yellow-700 font-semibold">
            Islamic Article
          </p>

          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#3b2f2f]">
            Article Title
          </h1>

          <div className="mt-8 text-gray-700 leading-8">

            <p>
              The English article content will appear here.
            </p>

          </div>

        </div>

      </article>

    </main>
  );
}
