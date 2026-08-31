
import Link from "next/link";
import { notFound } from "next/navigation";

const backend = "https://f-backend-vdi1.onrender.com/api";

// =========================================
// GET ENGLISH ARTICLE
// =========================================
async function getArticle(slug) {
  try {
    const res = await fetch(
      `${backend}/majameen/${encodeURIComponent(slug)}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (!data.success || !data.data) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error("English article fetch error:", error);
    return null;
  }
}

// =========================================
// CLEAN HTML
// =========================================
function cleanHtml(text = "") {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// =========================================
// GET ENGLISH TITLE
// =========================================
function getEnglishTitle(article) {
  return (
    article?.englishTitle ||
    article?.enTitle ||
    article?.titleEn ||
    ""
  );
}

// =========================================
// GET ENGLISH CONTENT
// =========================================
function getEnglishContent(article) {
  return (
    article?.englishContent ||
    article?.enContent ||
    article?.contentEn ||
    ""
  );
}

// =========================================
// SEO METADATA
// =========================================
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | Maslak-e-Deoband",
      description: "The requested Islamic article could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    getEnglishTitle(article) ||
    "Islamic Article";

  const content = getEnglishContent(article);

  const description =
    article?.englishMetaDescription ||
    article?.enMetaDescription ||
    article?.metaDescription ||
    cleanHtml(content).slice(0, 155) ||
    "Read authentic Islamic articles based on the Quran and Sunnah.";

  const canonical =
    `https://www.maslakedeoband.in/en/articles/${slug}`;

  return {
    title: `${title} | Maslak-e-Deoband`,

    description,

    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: `${title} | Maslak-e-Deoband`,
      description,
      url: canonical,
      siteName: "Maslak-e-Deoband",
      type: "article",
    },
  };
}

// =========================================
// PAGE
// =========================================
export default async function EnglishArticleDetailPage({
  params,
}) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const title = getEnglishTitle(article);
  const content = getEnglishContent(article);

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      <article className="max-w-4xl mx-auto px-4 py-8 md:py-14">

        {/* ================================= */}
        {/* BREADCRUMB */}
        {/* ================================= */}

        <div className="mb-6 text-sm text-gray-500">

          <Link
            href="/en"
            className="hover:text-yellow-700 transition"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/en/articles"
            className="hover:text-yellow-700 transition"
          >
            Articles
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            Article
          </span>

        </div>

        {/* ================================= */}
        {/* ARTICLE */}
        {/* ================================= */}

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-10">

          {/* LABEL */}

          <p className="text-sm text-yellow-700 font-semibold">
            Islamic Article
          </p>

          {/* TITLE */}

          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#3b2f2f] leading-tight">
            {title || "Islamic Article"}
          </h1>

          {/* CONTENT */}

          {content ? (
            <div
              className="
                mt-8
                text-gray-700
                leading-8
                text-base
                md:text-lg
                prose
                prose-lg
                max-w-none
                prose-headings:text-[#3b2f2f]
                prose-a:text-yellow-700
                prose-strong:text-[#3b2f2f]
              "
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          ) : (
            <p className="mt-8 text-gray-500">
              No English content is available for this article.
            </p>
          )}

        </div>

      </article>

    </main>
  );
}

