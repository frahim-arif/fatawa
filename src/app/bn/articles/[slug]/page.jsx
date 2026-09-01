import Link from "next/link";
import { notFound } from "next/navigation";

const backend =
  "https://f-backend-vdi1.onrender.com/api";

const siteUrl =
  "https://www.maslakedeoband.in";

// =========================================
// GET ARTICLE
// =========================================
async function getArticle(slug) {
  try {
    const res = await fetch(
      `${backend}/majameen`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      console.error(
        "Article API error:",
        res.status
      );

      return null;
    }

    const data = await res.json();

    if (
      !data.success ||
      !Array.isArray(data.data)
    ) {
      return null;
    }

    const article =
      data.data.find((item) => {

        // Current slug
        if (item?.slug === slug) {
          return true;
        }

        // Mongo ID
        if (item?._id === slug) {
          return true;
        }

        // Old slugs
        if (
          Array.isArray(item?.oldSlugs) &&
          item.oldSlugs.includes(slug)
        ) {
          return true;
        }

        // Bangla slug fields
        if (
          item?.banglaSlug === slug ||
          item?.bnSlug === slug ||
          item?.slugBn === slug
        ) {
          return true;
        }

        return false;
      });

    return article || null;

  } catch (error) {
    console.error(
      "Bangla article fetch error:",
      error
    );

    return null;
  }
}

// =========================================
// BANGLA TITLE
// =========================================
function getBanglaTitle(article) {
  return (
    article?.banglaTitle ||
    article?.bnTitle ||
    article?.titleBn ||
    ""
  );
}

// =========================================
// BANGLA CONTENT
// =========================================
function getBanglaContent(article) {
  return (
    article?.banglaContent ||
    article?.bnContent ||
    article?.contentBn ||
    ""
  );
}

// =========================================
// REMOVE HTML
// =========================================
function stripHtml(text = "") {
  return text
    .toString()
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// =========================================
// METADATA
// =========================================
export async function generateMetadata({
  params,
}) {
  const { slug } = await params;

  const article =
    await getArticle(slug);

  if (!article) {
    return {
      title:
        "প্রবন্ধ পাওয়া যায়নি | মাসলাকে দেওবন্দ",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    article?.banglaMetaTitle ||
    article?.bnMetaTitle ||
    article?.metaTitleBn ||
    getBanglaTitle(article) ||
    "ইসলামী প্রবন্ধ";

  const content =
    getBanglaContent(article);

  const description =
    article?.banglaMetaDescription ||
    article?.bnMetaDescription ||
    article?.metaDescriptionBn ||
    stripHtml(content).slice(0, 155) ||
    "কুরআন ও সুন্নাহর আলোকে ইসলামী প্রবন্ধ পড়ুন।";

  const articleSlug =
    article?.slug || slug;

  const canonical =
    `${siteUrl}/bn/articles/${encodeURIComponent(
      articleSlug
    )}`;

  return {
    title: `${title} | মাসলাকে দেওবন্দ`,

    description,

    keywords:
      article?.banglaKeywords ||
      article?.bnKeywords ||
      article?.keywordsBn ||
      [],

    alternates: {
      canonical,

      languages: {
        ur: `${siteUrl}/articles/${articleSlug}`,

        en: `${siteUrl}/en/articles/${articleSlug}`,

        bn: canonical,
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: `${title} | মাসলাকে দেওবন্দ`,
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
export default async function BanglaArticleDetail({
  params,
}) {
  const { slug } = await params;

  const article =
    await getArticle(slug);

  if (!article) {
    notFound();
  }

  const title =
    getBanglaTitle(article);

  const content =
    getBanglaContent(article);

  // Bangla content না থাকলে অন্য ভাষার content দেখাবো না
  if (!title.trim() || !content.trim()) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      <article className="max-w-4xl mx-auto px-4 py-10 md:py-14">

        <div
          className="
            bg-white
            rounded-2xl
            shadow-lg
            border
            border-yellow-200
            overflow-hidden
          "
        >

          {/* HEADER */}
          <header
            className="
              bg-[#3b2f2f]
              px-6
              py-8
              md:px-10
            "
          >

            <p
              className="
                text-sm
                md:text-base
                text-yellow-400
                font-semibold
                mb-3
              "
            >
              ইসলামী প্রবন্ধ
            </p>

            <h1
              className="
                text-2xl
                md:text-4xl
                font-bold
                text-yellow-200
                leading-9
                md:leading-[1.8]
              "
            >
              {title}
            </h1>

          </header>

          {/* CONTENT */}
          <div
            className="
              px-6
              py-8
              md:px-10
              md:py-10
            "
          >

            <div
              className="
                prose
                prose-lg
                max-w-none
                text-gray-700
                leading-9

                [&_p]:mb-5

                [&_h2]:text-[#3b2f2f]
                [&_h2]:font-bold
                [&_h2]:mt-8
                [&_h2]:mb-4

                [&_h3]:text-[#3b2f2f]
                [&_h3]:font-bold
                [&_h3]:mt-6
                [&_h3]:mb-3

                [&_strong]:text-[#3b2f2f]

                [&_a]:text-yellow-700
                [&_a]:underline
              "
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />

          </div>

        </div>

        {/* BACK */}
        <div className="mt-6">

          <Link
            href="/bn/articles"
            className="
              inline-flex
              items-center
              font-semibold
              text-[#75593f]
              hover:text-yellow-700
              transition
            "
          >
            ← সব প্রবন্ধ দেখুন
          </Link>

        </div>

      </article>

    </main>
  );
}