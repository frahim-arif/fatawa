
import Link from "next/link";

const backend = "https://f-backend-vdi1.onrender.com/api";

// =====================================================
// GET BANGLA CATEGORIES
// =====================================================

async function getCategories() {
  try {
    const res = await fetch(
      `${backend}/bn/categories`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    if (!data.success) {
      return [];
    }

    return data.data || [];
  } catch (error) {
    console.error(
      "Bangla categories fetch error:",
      error
    );

    return [];
  }
}

// =====================================================
// GET BANGLA QUESTIONS
// =====================================================

async function getQuestions() {
  try {
    const res = await fetch(
      `${backend}/bn/questions?limit=20&skip=0`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    if (!data.success) {
      return [];
    }

    return data.data || [];
  } catch (error) {
    console.error(
      "Bangla questions fetch error:",
      error
    );

    return [];
  }
}

// =====================================================
// SEO
// =====================================================

export const metadata = {
  title:
    "মাসলাকে দেওবন্দ | বাংলা ইসলামী ফতোয়া ও প্রশ্নোত্তর",

  description:
    "কুরআন ও সুন্নাহর আলোকে বাংলা ভাষায় প্রামাণিক ইসলামী ফতোয়া, প্রশ্নোত্তর ও ইসলামী বিষয়সমূহ পড়ুন।",

  alternates: {
    canonical:
      "https://www.maslakedeoband.in/bn",

    languages: {
      ur:
        "https://www.maslakedeoband.in",

      en:
        "https://www.maslakedeoband.in/en",

      bn:
        "https://www.maslakedeoband.in/bn",
    },
  },

  openGraph: {
    title:
      "মাসলাকে দেওবন্দ | বাংলা ইসলামী ফতোয়া",

    description:
      "কুরআন ও সুন্নাহর আলোকে বাংলা ভাষায় প্রামাণিক ইসলামী ফতোয়া ও প্রশ্নোত্তর।",

    url:
      "https://www.maslakedeoband.in/bn",

    siteName:
      "Maslak-e-Deoband",

    type:
      "website",

    locale:
      "bn_BD",
  },
};

// =====================================================
// PAGE
// =====================================================

export default async function BanglaHomePage() {

  const [
    categories,
    questions,
  ] = await Promise.all([
    getCategories(),
    getQuestions(),
  ]);

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#3b2f2f]
          px-4
          py-16
          md:py-20
        "
      >

        <div className="mx-auto max-w-6xl text-center">

          <p className="mb-3 text-sm font-semibold text-yellow-300 md:text-base">
            মাসলাকে দেওবন্দ
          </p>

          <h1
            className="
              text-3xl
              font-bold
              leading-relaxed
              text-white
              md:text-5xl
            "
          >
            বাংলা ইসলামী ফতোয়া
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-base
              leading-8
              text-yellow-100
              md:text-lg
            "
          >
            কুরআন ও সুন্নাহর আলোকে প্রামাণিক
            ইসলামী প্রশ্ন ও উত্তর
          </p>

          {/* BUTTONS */}

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/bn/fatawa"
              className="
                rounded-xl
                bg-yellow-500
                px-6
                py-3
                font-bold
                text-[#3b2f2f]
                transition
                hover:bg-yellow-400
              "
            >
              সকল ফতোয়া দেখুন
            </Link>

            <Link
              href="/bn/categories"
              className="
                rounded-xl
                border
                border-yellow-300
                px-6
                py-3
                font-bold
                text-yellow-200
                transition
                hover:bg-white/10
              "
            >
              ইসলামী বিষয়সমূহ
            </Link>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <section className="mx-auto max-w-6xl px-4 py-10">

        {/* ================================================= */}
        {/* CATEGORIES */}
        {/* ================================================= */}

        <div className="mb-10">

          <div className="mb-5 flex items-center justify-between gap-3">

            <h2
              className="
                text-2xl
                font-bold
                text-[#4b3415]
                md:text-3xl
              "
            >
              ইসলামী বিষয়সমূহ
            </h2>

            <Link
              href="/bn/categories"
              className="
                shrink-0
                text-sm
                font-semibold
                text-yellow-700
                hover:text-yellow-900
              "
            >
              সব দেখুন →
            </Link>

          </div>

          {categories.length > 0 ? (

            <div
              className="
                grid
                grid-cols-2
                gap-4
                md:grid-cols-4
              "
            >

              {categories
                .slice(0, 8)
                .map((category) => (

                  <Link
                    key={category._id}
                    href={`/bn/categories/${encodeURIComponent(
                      category.slug
                    )}`}
                    className="
                      flex
                      min-h-[100px]
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-[#c8b27a]
                      bg-gradient-to-b
                      from-[#f6f0dd]
                      via-[#e6d4a3]
                      to-[#c9ab63]
                      px-4
                      text-center
                      font-bold
                      text-[#4b3415]
                      shadow-md
                      transition
                      hover:scale-[1.02]
                      hover:shadow-lg
                    "
                  >
                    {category.name}
                  </Link>

                ))}

            </div>

          ) : (

            <div className="rounded-xl bg-white p-8 text-center shadow-sm">

              <p className="text-gray-500">
                কোনো বিষয় পাওয়া যায়নি।
              </p>

            </div>

          )}

        </div>

        {/* ================================================= */}
        {/* LATEST FATWAS */}
        {/* ================================================= */}

        <div>

          <div className="mb-5 flex items-center justify-between gap-3">

            <h2
              className="
                text-2xl
                font-bold
                text-[#4b3415]
                md:text-3xl
              "
            >
              সর্বশেষ ফতোয়া
            </h2>

            <Link
              href="/bn/fatawa"
              className="
                shrink-0
                text-sm
                font-semibold
                text-yellow-700
                hover:text-yellow-900
              "
            >
              সব ফতোয়া →
            </Link>

          </div>

          {questions.length > 0 ? (

            <div className="space-y-3">

              {questions.map((item) => {

                const question =
                  item.question || "";

                const slug =
                  item.slug || item._id;

                return (

                  <Link
                    key={item._id}
                    href={`/bn/fatawa/${encodeURIComponent(
                      slug
                    )}`}
                    className="
                      block
                      rounded-xl
                      border
                      border-yellow-200
                      bg-white
                      p-5
                      shadow-sm
                      transition
                      hover:-translate-y-[1px]
                      hover:border-yellow-500
                      hover:shadow-md
                    "
                  >

                    <h3
                      className="
                        text-lg
                        font-semibold
                        leading-8
                        text-[#3b2f2f]
                        md:text-xl
                      "
                    >
                      {question}
                    </h3>

                    <div className="mt-3 flex items-center justify-between">

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-yellow-700
                        "
                      >
                        ফতোয়া পড়ুন →
                      </span>

                      {item.category?.name && (
                        <span
                          className="
                            rounded-full
                            bg-[#f7f3e8]
                            px-3
                            py-1
                            text-xs
                            text-gray-600
                          "
                        >
                          {item.category.name}
                        </span>
                      )}

                    </div>

                  </Link>

                );
              })}

            </div>

          ) : (

            <div
              className="
                rounded-2xl
                border
                border-yellow-200
                bg-white
                p-10
                text-center
                shadow-sm
              "
            >

              <div className="mb-4 text-4xl">
                📚
              </div>

              <h3 className="text-xl font-bold text-[#3b2f2f]">
                কোনো বাংলা ফতোয়া পাওয়া যায়নি
              </h3>

              <p className="mt-2 text-gray-500">
                শীঘ্রই এখানে বাংলা ফতোয়া প্রকাশ করা হবে।
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );

