import { notFound } from "next/navigation";

// 🔥 Fetch question
async function getQuestion(slug) {
  try {
    const res = await fetch(
      `https://f-backend-vdi1.onrender.com/api/admin/questions/slug/${slug}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

// 🔥 SEO Metadata
export async function generateMetadata({ params }) {
  const question = await getQuestion(params.slug);

  if (!question) {
    return { title: "Question Not Found" };
  }

  return {
    title: `${question.metaTitle || question.question} | اسلامی فتاویٰ`,
    description:
      question.metaDescription ||
      question.answer?.slice(0, 150),
    keywords:
      question.keywords?.join(", ") ||
      "Islamic fatwa, سوال جواب",

    alternates: {
      canonical: `https://www.maslakedeoband.in/questions/${params.slug}`,
    },
  };
}

// 🔥 Page (SSR)
export default async function SingleQuestion({ params }) {
  const question = await getQuestion(params.slug);

  if (!question) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-6 text-right">

      {/* Question */}
      <div className="p-5 rounded-2xl border bg-yellow-50">
        <h1 className="text-lg md:text-2xl font-bold text-green-800 leading-8">
          {question.question}
        </h1>
      </div>

      {/* Answer */}
      <div className="p-5 md:p-6 rounded-2xl border bg-white leading-9">
        <div
          className="text-[18px] md:text-[20px] text-black"
          dangerouslySetInnerHTML={{
            __html: question.answer || "",
          }}
        />
      </div>

      {/* Hawala */}
      <div className="p-5 rounded-2xl border bg-gray-50 space-y-4">

        {question.hawala1 && (
          <p className="px-4 py-3 rounded-lg bg-white">
            {question.hawala1}
          </p>
        )}

        {question.hawala2 && (
          <p className="px-4 py-3 rounded-lg bg-white">
            {question.hawala2}
          </p>
        )}

        {question.hawala3 && (
          <p className="px-4 py-3 rounded-lg bg-white">
            {question.hawala3}
          </p>
        )}

      </div>
    </div>
  );
}