
import Link from "next/link";

const backend = "https://f-backend-vdi1.onrender.com/api";

async function getFatwa(slug) {
  try {
    const res = await fetch(
      `${backend}/admin/questions/slug/${encodeURIComponent(slug)}`,
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
    console.error("Failed to fetch English fatwa:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const fatwa = await getFatwa(slug);

  if (!fatwa) {
    return {
      title: "Fatwa Not Found | Maslak-e-Deoband",
      description: "The requested Islamic fatwa could not be found.",
    };
  }

  const question =
    fatwa.englishQuestion ||
    fatwa.enQuestion ||
    fatwa.questionEn ||
    fatwa.question ||
    "Islamic Question";

  return {
    title: `${question} | Maslak-e-Deoband`,
    description:
      fatwa.englishAnswer?.slice(0, 160) ||
      fatwa.answer?.slice(0, 160) ||
      "Authentic Islamic guidance based on the Quran and Sunnah.",
    alternates: {
      canonical: `https://www.maslakedeoband.in/en/fatawa/${fatwa.slug}`,
      languages: {
        ur: `https://www.maslakedeoband.in/questions/${fatwa.slug}`,
        bn: `https://www.maslakedeoband.in/bn/fatawa/${fatwa.slug}`,
        en: `https://www.maslakedeoband.in/en/fatawa/${fatwa.slug}`,
      },
    },
  };
}

export default async function EnglishFatwaDetailPage({ params }) {
  const { slug } = await params;

  const fatwa = await getFatwa(slug);

  if (!fatwa) {
    return (
      <main className="min-h-screen bg-[#faf9f6]">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-[#3b2f2f]">
            Fatwa Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            The requested Islamic fatwa could not be found.
          </p>

          <Link
            href="/en/fatawa"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-[#3b2f2f] text-yellow-200 font-semibold"
          >
            Browse Fatwas
          </Link>
        </div>
      </main>
    );
  }

  const englishQuestion =
    fatwa.englishQuestion ||
    fatwa.enQuestion ||
    fatwa.questionEn ||
    fatwa.question ||
    "Islamic Question";

  const englishAnswer =
    fatwa.englishAnswer ||
    fatwa.enAnswer ||
    fatwa.answerEn ||
    fatwa.answer ||
    "Answer not available.";

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      <article className="max-w-4xl mx-auto px-4 py-10 md:py-14">

        <div className="bg-white rounded-xl shadow-md p-6 md:p-10">

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
              href="/en/fatawa"
              className="hover:text-yellow-700"
            >
              Fatwas
            </Link>
          </div>

          {/* Label */}
          <p className="text-sm text-yellow-700 font-semibold mb-4">
            Islamic Fatwa
          </p>

          {/* Question */}
          <h1 className="text-2xl md:text-4xl font-bold text-[#3b2f2f] leading-relaxed">
            {englishQuestion}
          </h1>

          {/* Question Section */}
          <div className="mt-8">

            <h2 className="text-xl md:text-2xl font-bold text-[#3b2f2f]">
              Question
            </h2>

            <div className="mt-4 text-gray-700 leading-8 text-base md:text-lg whitespace-pre-line">
              {englishQuestion}
            </div>

          </div>

          {/* Answer */}
          <div className="mt-10 border-t border-gray-200 pt-8">

            <h2 className="text-xl md:text-2xl font-bold text-[#3b2f2f]">
              Answer
            </h2>

            <div className="mt-4 text-gray-700 leading-8 text-base md:text-lg whitespace-pre-line">
              {englishAnswer}
            </div>

          </div>

          {/* References */}
          {(fatwa.hawala1 ||
            fatwa.hawala2 ||
            fatwa.hawala3) && (
            <div className="mt-10 border-t border-gray-200 pt-8">

              <h2 className="text-xl md:text-2xl font-bold text-[#3b2f2f]">
                References
              </h2>

              <div className="mt-4 space-y-3 text-gray-600 leading-7">

                {fatwa.hawala1 && (
                  <p>{fatwa.hawala1}</p>
                )}

                {fatwa.hawala2 && (
                  <p>{fatwa.hawala2}</p>
                )}

                {fatwa.hawala3 && (
                  <p>{fatwa.hawala3}</p>
                )}

              </div>

            </div>
          )}

        </div>

      </article>

    </main>
  );
}

