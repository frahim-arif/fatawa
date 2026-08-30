
export default async function EnglishFatwaDetailPage({ params }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      <article className="max-w-4xl mx-auto px-4 py-12">

        <div className="bg-white rounded-xl shadow-md p-6 md:p-10">

          <p className="text-sm text-yellow-700 font-semibold mb-4">
            Islamic Fatwa
          </p>

          <h1 className="text-2xl md:text-4xl font-bold text-[#3b2f2f]">
            Islamic Question
          </h1>

          <div className="mt-8">

            <h2 className="text-xl font-bold text-[#3b2f2f]">
              Question
            </h2>

            <p className="mt-3 text-gray-700 leading-8">
              The English question will appear here.
            </p>

          </div>

          <div className="mt-10 border-t pt-8">

            <h2 className="text-xl font-bold text-[#3b2f2f]">
              Answer
            </h2>

            <p className="mt-3 text-gray-700 leading-8">
              The detailed Islamic answer will appear here.
            </p>

          </div>

          <div className="mt-10 border-t pt-6">

            <h2 className="font-bold text-[#3b2f2f]">
              References
            </h2>

            <p className="mt-2 text-gray-600">
              References will appear here.
            </p>

          </div>

        </div>

      </article>

    </main>
  );
}

