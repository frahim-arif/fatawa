export const revalidate = 3600;

const API =
  "https://f-backend-vdi1.onrender.com/api/admin/questions";

// =======================
// FETCH QUESTION
// =======================
async function getQuestion(slug) {
  try {
    const res = await fetch(`${API}/slug/${slug}`, {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (!data.success) {
      return null;
    }

    return data.data;
  } catch (err) {
    console.error("SSR QUESTION ERROR:", err);
    return null;
  }
}

// =======================
// FETCH RELATED
// =======================
async function getRelated() {
  try {
    const res = await fetch(`${API}?limit=10`, {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data.success ? data.data : [];
  } catch (err) {
    console.error("SSR RELATED ERROR:", err);
    return [];
  }
}

// =======================
// AUTO LINK
// =======================
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

      if (!item?.keywords?.length) return;
      if (!item?.slug) return;
      if (item.slug === slug) return;

      item.keywords.forEach((word) => {
        if (linkCount >= MAX_LINKS) return;
        if (!word) return;

        const regex = new RegExp(
          `(${escapeRegExp(word)})`,
          "i"
        );

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
    console.error(err);
    return text;
  }
}

// =======================
// SEO METADATA
// =======================
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
    question.answer?.slice(0, 150);

  const url = `https://www.maslakedeoband.in/questions/${params.slug}`;

  return {
    title,
    description,

    keywords: Array.isArray(question.keywords)
      ? question.keywords.join(", ")
      : "",

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
          url: "https://www.maslakedeoband.in/og-image.jpg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        "https://www.maslakedeoband.in/og-image.jpg",
      ],
    },
  };
}

// =======================
// PAGE
// =======================
export default async function Page({ params }) {
  const { slug } = params;

  const question = await getQuestion(slug);

  const related = await getRelated();

  // =======================
  // NOT FOUND
  // =======================
  if (!question) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">
          ❌ سوال نہیں ملا
        </h1>
      </div>
    );
  }

  const hawalas = [
    question.hawala1,
    question.hawala2,
    question.hawala3,
  ].filter(Boolean);

  return (
    <>
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
                text: question.answer,
              },
            },
          }),
        }}
      />

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-6 text-right">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-2">
          <a href="/">Home</a> /{" "}

          <a href={`/category/${question.category}`}>
            {question.category}
          </a>{" "}
          / <span>{question.question}</span>
        </nav>

        {/* Question */}
        <div className="p-5 rounded-2xl border bg-yellow-50">
          <h1 className="text-xl md:text-2xl font-bold text-green-800 leading-8">
            {question.metaTitle || question.question}
          </h1>
        </div>

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
        {hawalas.length > 0 && (
          <div className="p-5 rounded-2xl border bg-gray-100 space-y-4 text-black">
            {hawalas.map((h, index) => (
              <p
                key={index}
                className="arabic leading-8"
              >
                📖 {h}
              </p>
            ))}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">

            <h3 className="font-bold mb-2">
              مزید متعلقہ سوالات
            </h3>

            <ul className="space-y-2">
              {related
                .filter((i) => i.slug !== slug)
                .slice(0, 5)
                .map((item) => (
                  <li key={item._id}>
                    <a
                      href={`/questions/${item.slug}`}
                      className="text-blue-600 underline"
                    >
                      {item.question}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}