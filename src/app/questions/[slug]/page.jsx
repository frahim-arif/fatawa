import Link from "next/link";

const backend =
  "https://f-backend-vdi1.onrender.com/api/website/questions";

// ✅ GET QUESTION
async function getQuestion(slug) {
  try {
    const res = await fetch(
      `${backend}/slug/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data.success ? data.data : null;

  } catch (err) {
    console.log("fetch question error", err);
    return null;
  }
}

// ✅ GET RELATED
async function getRelated() {
  try {
    const res = await fetch(
      `${backend}?limit=10`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data.success ? data.data : [];

  } catch (err) {
    console.log("related error", err);
    return [];
  }
}

// ✅ SEO
export async function generateMetadata({ params }) {

  const question = await getQuestion(params.slug);

  if (!question) {
    return {
      title: "سوال نہیں ملا",
    };
  }

  const title =
    question.metaTitle ||
    `${question.question} | Maslak e Deoband`;

  const description =
    question.metaDescription ||
    question.answer
      ?.replace(/<[^>]*>/g, "")
      ?.slice(0, 150);

  return {
    title,
    description,

    alternates: {
      canonical: `https://www.maslakedeoband.in/questions/${params.slug}`,
    },

    openGraph: {
      title,
      description,
      url: `https://www.maslakedeoband.in/questions/${params.slug}`,
      type: "article",
    },
  };
}

// ✅ AUTO LINK
function autoLink(text, related, slug) {

  if (!text) return "";

  let updatedText = text;

  let linkCount = 0;

  const MAX_LINKS = 3;

  related.forEach((item) => {

    if (linkCount >= MAX_LINKS) return;

    if (!item?.keywords?.length) return;

    if (item.slug === slug) return;

    item.keywords.forEach((word) => {

      if (linkCount >= MAX_LINKS) return;

      if (!word) return;

      const regex = new RegExp(`(${word})`, "i");

      if (regex.test(updatedText)) {

        updatedText = updatedText.replace(
          regex,
          `<a href="/questions/${item.slug}" class="text-blue-600 underline">$1</a>`
        );

        linkCount++;
      }
    });
  });

  return updatedText;
}

// ✅ PAGE
export default async function SingleQuestion({ params }) {

  const slug = params.slug;

  const question = await getQuestion(slug);

  const related = await getRelated();

  if (!question) {
    return (
      <h1 className="text-center mt-10">
        ❌ سوال نہیں ملا
      </h1>
    );
  }

  const hawalas = [
    question.hawala1,
    question.hawala2,
    question.hawala3,
  ].filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-6 text-right">

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-2">

        <Link href="/">Home</Link>

        {" / "}

        <Link href={`/category/${question.category}`}>
          {question.category}
        </Link>

        {" / "}

        <span>{question.question}</span>

      </nav>

      {/* Answer */}
      <div className="p-5 md:p-6 rounded-2xl border bg-gray-100 shadow-sm leading-9">

        <div
          className="text-black text-[18px] md:text-[20px]"
          dangerouslySetInnerHTML={{
            __html: autoLink(
              question.answer,
              related,
              slug
            ),
          }}
        />

      </div>

      {/* Hawala */}
      <div className="p-5 rounded-2xl border bg-gray-100 space-y-4 text-black">

        {hawalas.map((h, index) => (
          <p
            key={index}
            className="arabic text-black leading-8"
          >
            📖 {h}
          </p>
        ))}

      </div>

      {/* Related */}
      {related.length > 0 && (

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">

          <h3 className="font-bold mb-2">
            مزید متعلقہ سوالات
          </h3>

          <ul className="space-y-2">

            {related.slice(0, 5).map((item) => (

              <li key={item._id}>

                <Link
                  href={`/questions/${item.slug}`}
                  className="text-blue-600 underline"
                >
                  {item.question}
                </Link>

              </li>
            ))}

          </ul>

        </div>
      )}
    </div>
  );
}