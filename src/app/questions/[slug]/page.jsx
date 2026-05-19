// app/questions/[slug]/page.jsx

import Link from "next/link";

const backend =
  "https://f-backend-vdi1.onrender.com/api/admin/questions";

// ✅ SSR FETCH QUESTION
async function getQuestion(slug) {
  try {
    const res = await fetch(
      `${backend}/slug/${slug}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (data.success) {
      return data.data;
    }

    return null;
  } catch (err) {
    console.error("❌ Error fetching question:", err);
    return null;
  }
}

// ✅ SSR FETCH RELATED
async function getRelated() {
  try {
    const res = await fetch(
      `${backend}?limit=10`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (data.success) {
      return data.data;
    }

    return [];
  } catch (err) {
    console.error("❌ Error fetching related:", err);
    return [];
  }
}

// ✅ SEO METADATA
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
      ?.slice(0, 150) ||
    "اسلامی سوال و جواب";

  const url =
    `https://www.maslakedeoband.in/questions/${params.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      type: "article",

      images: [
        {
          url:
            "https://www.maslakedeoband.in/og-image.jpg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ✅ AUTO LINK
function autoLink(text, related, slug) {
  try {
    if (!text || !Array.isArray(related)) return text;

    let updatedText = text;

    let linkCount = 0;

    const MAX_LINKS = 3;

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
            `<a href="/questions/${item.slug}" class="text-blue-600 underline">$1</a>`
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
}

// ✅ SSR PAGE
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

      {/* Related Questions */}
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

      {/* JSON LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",

            "@type": "QAPage",

            mainEntity: {
              "@type": "Question",

              name: question.question,

              acceptedAnswer: {
                "@type": "Answer",

                text:
                  question.answer?.replace(
                    /<[^>]*>/g,
                    ""
                  ),
              },
            },
          }),
        }}
      />
    </div>
  );
}