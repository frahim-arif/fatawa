export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `https://f-backend-vdi1.onrender.com/api/en/questions/slug/${slug}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const data = await res.json();

    if (!data.success) {
      return {
        title: "Islamic Fatwa | Maslak-e-Deoband",
      };
    }

    const item = data.data;

    return {
      title:
        item.englishMetaTitle ||
        item.englishQuestion ||
        "Islamic Fatwa | Maslak-e-Deoband",

      description:
        item.englishMetaDescription ||
        item.englishAnswer
          ?.replace(/<[^>]*>/g, "")
          .slice(0, 155),

      keywords: item.englishKeywords || [],
    };
  } catch {
    return {
      title: "Islamic Fatwa | Maslak-e-Deoband",
    };
  }
}


export default async function EnglishFatwaDetailPage({
  params,
}) {
  const { slug } = await params;

  const res = await fetch(
    `https://f-backend-vdi1.onrender.com/api/en/questions/slug/${slug}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    return (
      <main className="min-h-screen bg-[#faf9f6]">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Fatwa Not Found
          </h1>
        </div>
      </main>
    );
  }

  const data = await res.json();

  if (!data.success || !data.data) {
    return (
      <main className="min-h-screen bg-[#faf9f6]">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Fatwa Not Found
          </h1>
        </div>
      </main>
    );
  }

  const item = data.data;

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      <article className="max-w-4xl mx-auto px-4 py-10 md:py-14">

        <div className="bg-white rounded-xl shadow-md p-6 md:p-10">

          {/* LABEL */}
          <p className="text-sm text-yellow-700 font-semibold mb-4">
            Islamic Fatwa
          </p>

          {/* QUESTION */}
          <h1 className="text-2xl md:text-4xl font-bold text-[#3b2f2f] leading-relaxed">
            {item.englishQuestion}
          </h1>


          {/* QUESTION */}
          <div className="mt-8">

            <h2 className="text-xl font-bold text-[#3b2f2f]">
              Question
            </h2>

            <div
              className="mt-3 text-gray-700 leading-8 prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: item.englishQuestion || "",
              }}
            />

          </div>


          {/* ANSWER */}
          <div className="mt-10 border-t pt-8">

            <h2 className="text-xl font-bold text-[#3b2f2f]">
              Answer
            </h2>

            <div
              className="mt-4 text-gray-700 leading-8 prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: item.englishAnswer || "",
              }}
            />

          </div>


          {/* REFERENCES */}
          {(item.englishHawala1 ||
            item.englishHawala2 ||
            item.englishHawala3) && (

            <div className="mt-10 border-t pt-8">

              <h2 className="text-xl font-bold text-[#3b2f2f]">
                References
              </h2>

              <div className="mt-4 space-y-3 text-gray-600 leading-7">

                {item.englishHawala1 && (
                  <p>{item.englishHawala1}</p>
                )}

                {item.englishHawala2 && (
                  <p>{item.englishHawala2}</p>
                )}

                {item.englishHawala3 && (
                  <p>{item.englishHawala3}</p>
                )}

              </div>

            </div>
          )}

        </div>

      </article>

    </main>
  );
}