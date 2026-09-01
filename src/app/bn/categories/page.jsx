
import Link from "next/link";

const backend = "https://f-backend-vdi1.onrender.com/api";

// =====================================================
// GET BANGLA CATEGORIES
// =====================================================

async function getCategories() {
  try {
    const res = await fetch(`${backend}/bn/categories`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      console.error(
        "Bangla categories API error:",
        res.status
      );

      return [];
    }

    const data = await res.json();

    if (!data.success) {
      console.error(
        "Bangla categories API failed:",
        data.message
      );

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
// SEO
// =====================================================

export const metadata = {
  title:
    "ইসলামী বিষয়সমূহ | বাংলা ইসলামী ফতোয়া | মাসলাকে দেওবন্দ",

  description:
    "কুরআন ও সুন্নাহর আলোকে নামাজ, রোজা, যাকাত, হজ, নিকাহসহ বিভিন্ন ইসলামী বিষয়ের বাংলা ফতোয়া ও প্রশ্নোত্তর পড়ুন।",

  alternates: {
    canonical:
      "https://www.maslakedeoband.in/bn/categories",

    languages: {
      ur:
        "https://www.maslakedeoband.in/categories",

      en:
        "https://www.maslakedeoband.in/en/categories",

      bn:
        "https://www.maslakedeoband.in/bn/categories",
    },
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      "ইসলামী বিষয়সমূহ | বাংলা ইসলামী ফতোয়া | মাসলাকে দেওবন্দ",

    description:
      "কুরআন ও সুন্নাহর আলোকে বিভিন্ন ইসলামী বিষয়ের বাংলা ফতোয়া ও প্রশ্নোত্তর।",

    url:
      "https://www.maslakedeoband.in/bn/categories",

    siteName:
      "Maslak-e-Deoband",

    type:
      "website",

    locale:
      "bn_BD",
  },

  twitter: {
    card: "summary",

    title:
      "ইসলামী বিষয়সমূহ | বাংলা ইসলামী ফতোয়া",

    description:
      "কুরআন ও সুন্নাহর আলোকে বিভিন্ন ইসলামী বিষয়ের বাংলা ফতোয়া ও প্রশ্নোত্তর।",
  },
};

// =====================================================
// PAGE
// =====================================================

export default async function BanglaCategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section
        className="
          relative
          overflow-hidden
          px-4
          py-14
          md:py-20
        "
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",

          backgroundSize: "cover",

          backgroundPosition: "center",
        }}
      >

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-black/60" />

        {/* CONTENT */}

        <div className="relative mx-auto max-w-6xl text-center">

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
            ইসলামী বিষয়সমূহ
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
            ইসলামী বিষয় অনুযায়ী বাংলা প্রশ্ন,
            উত্তর ও ফতোয়া পড়ুন
          </p>

        </div>

      </section>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <section
        className="
          mx-auto
          max-w-6xl
          px-4
          py-10
          md:py-12
        "
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          className="
            mb-7
            flex
            items-center
            justify-between
            gap-4
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-[#4b3415]
                md:text-3xl
              "
            >
              বিষয়সমূহ
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              আপনার প্রয়োজনীয় ইসলামী বিষয় নির্বাচন করুন
            </p>

          </div>

          <Link
            href="/bn"
            className="
              shrink-0
              rounded-lg
              border
              border-yellow-300
              bg-white
              px-4
              py-2
              text-sm
              font-semibold
              text-yellow-700
              transition
              hover:bg-yellow-50
            "
          >
            হোম →
          </Link>

        </div>

        {/* ================================================= */}
        {/* CATEGORIES */}
        {/* ================================================= */}

        {categories.length > 0 ? (

          <div
            className="
              grid
              grid-cols-2
              gap-4
              sm:grid-cols-3
              md:grid-cols-4
            "
          >

            {categories.map((category) => {

              const categoryName =
                category?.name || "ইসলামী বিষয়";

              const categorySlug =
                category?.slug || category?._id;

              return (

                <Link
                  key={category._id}
                  href={`/bn/categories/${encodeURIComponent(
                    categorySlug
                  )}`}
                  className="
                    group
                    flex
                    min-h-[110px]
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[#c8b27a]
                    bg-gradient-to-b
                    from-[#f8f3e3]
                    via-[#e8d7aa]
                    to-[#c9ab63]
                    px-4
                    py-5
                    text-center
                    shadow-md
                    transition
                    duration-200
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >

                  <div>

                    <div
                      className="
                        text-base
                        font-bold
                        leading-7
                        text-[#4b3415]
                        transition
                        group-hover:text-[#2f2418]
                        md:text-lg
                      "
                    >
                      {categoryName}
                    </div>

                    <div
                      className="
                        mt-2
                        text-xs
                        font-semibold
                        text-[#75593f]
                        opacity-80
                      "
                    >
                      ফতোয়া পড়ুন →
                    </div>

                  </div>

                </Link>

              );
            })}

          </div>

        ) : (

          /* ================================================= */
          /* EMPTY STATE */
          /* ================================================= */

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

            <h3
              className="
                text-xl
                font-bold
                text-[#3b2f2f]
              "
            >
              কোনো ইসলামী বিষয় পাওয়া যায়নি
            </h3>

            <p className="mt-2 text-gray-500">
              বর্তমানে কোনো বাংলা ইসলামী বিষয় উপলব্ধ নেই।
            </p>

            <Link
              href="/bn"
              className="
                mt-5
                inline-block
                rounded-lg
                bg-yellow-600
                px-5
                py-2.5
                font-semibold
                text-white
                transition
                hover:bg-yellow-700
              "
            >
              বাংলা হোমে ফিরে যান
            </Link>

          </div>

        )}

      </section>

    </main>
  );
}

