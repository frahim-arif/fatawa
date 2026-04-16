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


  // ✅ AUTO LINK FUNCTION (KEYWORDS BASED)
  const autoLink = (text, related) => {
    try {
      if (!text || !Array.isArray(related)) return text;

      let updatedText = text;
      let linkCount = 0;
      const MAX_LINKS = 5;

      const escapeRegExp = (string) =>
        string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      related.forEach((item) => {
        if (linkCount >= MAX_LINKS) return;
        if (!item?.keywords?.length || !item?.slug) return;
        if (item.slug === slug) return;

        item.keywords.forEach((word) => {
          if (linkCount >= MAX_LINKS) return;
          if (!word) return;

          const safeKeyword = escapeRegExp(word);
          const regex = new RegExp(`(${safeKeyword})`, "i");

          if (regex.test(updatedText)) {
            updatedText = updatedText.replace(
              regex,
              `<a href="/questions/${item.slug}" class="text-blue-600 dark:text-blue-400 font-semibold underline">$1</a>`
            );
            linkCount++;
          }
        });
      });

      return updatedText;
    } catch (err) {
      console.error("❌ autoLink error:", err);
      return text;
    }
  };

  if (loading)
    return <h1 className="text-center mt-10">⏳ لوڈ ہو رہا ہے...</h1>;

  if (!question)
    return <h1 className="text-center mt-10">❌ سوال نہیں ملا</h1>;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-6 text-right">

      {/* SEO */}
      <Head>
        <title>
          {question.metaTitle || question.question} | اسلامی فتاویٰ
        </title>

        <meta
          name="description"
          content={
            question.metaDescription ||
            question.answer?.slice(0, 150)
          }
        />

        <meta
          name="keywords"
          content={
            question.keywords?.join(", ") ||
            "Islamic fatwa, سوال جواب, فتوی"
          }
        />
      </Head>

      {/* Question */}
      <div className="p-5 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-yellow-50 dark:bg-gray-800 shadow-sm">
        <h1 className="text-lg md:text-2xl font-bold text-green-800 dark:text-green-400 leading-8">
          {question.question}
        </h1>
      </div>

      {/* Answer */}
      <div className="p-5 md:p-6 rounded-2xl border border-gray-300 bg-white shadow-sm leading-9">        {question?.answer && (
        <p
          className="text-black text-[18px] md:text-[20px]"
          dangerouslySetInnerHTML={{
            __html: autoLink(question.answer, related),
          }}
        />
      )}
      </div>

      {/* Hawala */}
<div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121212] shadow-sm space-y-4">


  <div className="space-y-3 text-[17px] md:text-[19px] leading-9 text-gray-900 dark:text-gray-200">

    {question.hawala1 && (
      <p className="px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] transition arabic">
        {question.hawala1}
      </p>
    )}

    {question.hawala2 && (
      <p className="px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] transition arabic">
        {question.hawala2}
      </p>
    )}

    {question.hawala3 && (
      <p className="px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] transition arabic">
        {question.hawala3}
      </p>
    )}

  </div>
</div>
</div>
  );
}