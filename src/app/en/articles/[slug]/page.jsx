
import { notFound } from "next/navigation";

const backend = "https://f-backend-vdi1.onrender.com/api";

// ================================
// Fetch Article
// ================================
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

    if (!data.success) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error("Article fetch error:", error);
    return null;
  }
}

// ================================
// SEO Metadata
// ================================
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | Maslak-e-Deoband",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    article.englishTitle ||
    article.enTitle ||
    article.titleEn ||
    article.title ||
    "Islamic Article";

  const description =
    article.englishMetaDescription ||
    article.enMetaDescription ||
    article.metaDescription ||
    article.content?.slice(0, 160) ||
    "Read authentic Islamic articles based on the Quran and Sunnah.";

  const canonical =
    `https://www.maslakedeoband.in/en/articles/${article.slug}`;

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

// ================================
// Page
// ================================
export default async function EnglishArticleDetailPage({
  params,
}) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const title =
    article.englishTitle ||
    article.enTitle ||
    article.titleEn ||
    article.title ||
    "Islamic Article";

  const content =
    article.englishContent ||
    article.enContent ||
    article.contentEn ||
    article.content ||
    "";

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      <article className="max-w-4xl mx-auto px-4 py-10 md:py-14">

        <div className="bg-white rounded-xl shadow-md p-6 md:p-10">

          {/* Label */}
          <p className="text-sm text-yellow-700 font-semibold">
            Islamic Article
          </p>

          {/* Title */}
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#3b2f2f] leading-tight">
            {title}
          </h1>

          {/* Content */}
          <div
            className="
              mt-8
              text-gray-700
              leading-8
              text-base
              md:text-lg
              whitespace-pre-line
            "
          >
            {content}
          </div>

        </div>

      </article>

    </main>
  );
}

