"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function BanglaArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================================
  // GET BANGLA TITLE
  // =========================================
  const getBanglaTitle = (item) => {
    return (
      item?.banglaTitle ||
      item?.bnTitle ||
      item?.titleBn ||
      ""
    );
  };

  // =========================================
  // GET BANGLA CONTENT
  // =========================================
  const getBanglaContent = (item) => {
    return (
      item?.banglaContent ||
      item?.bnContent ||
      item?.contentBn ||
      ""
    );
  };

  // =========================================
  // FETCH ARTICLES
  // =========================================
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${backend}/majameen`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            `Articles API error: ${res.status}`
          );
        }

        const data = await res.json();

        console.log(
          "BANGLA ARTICLES API RESPONSE:",
          data
        );

        if (
          data.success &&
          Array.isArray(data.data)
        ) {
          const banglaArticles =
            data.data.filter((item) => {
              const title =
                getBanglaTitle(item);

              const content =
                getBanglaContent(item);

              return (
                title.trim() &&
                content.trim()
              );
            });

          console.log(
            "BANGLA ARTICLES:",
            banglaArticles
          );

          setArticles(banglaArticles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error(
          "Bangla articles fetch error:",
          error
        );

        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // =========================================
  // SEARCH
  // =========================================
  const filteredArticles =
    articles.filter((item) => {
      const title =
        getBanglaTitle(item);

      return title
        .toLowerCase()
        .includes(
          query.trim().toLowerCase()
        );
    });

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =========================================
          HERO
      ========================================= */}
      <section className="relative overflow-hidden bg-[#3b2f2f] py-10 px-4">

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-sm md:text-base text-yellow-400 font-semibold mb-2">
            ইসলামী জ্ঞান
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-yellow-300">
            ইসলামী প্রবন্ধ
          </h1>

          <p className="mt-3 text-yellow-100 text-base md:text-lg">
            কুরআন ও সুন্নাহর আলোকে নির্বাচিত ইসলামী প্রবন্ধসমূহ
          </p>

        </div>

      </section>

      {/* =========================================
          CONTENT
      ========================================= */}
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-10">

        {/* SEARCH */}
        <div className="max-w-3xl mx-auto mb-8">

          <div
            className="
              flex
              items-center
              bg-white
              border
              border-yellow-500
              rounded-2xl
              shadow-md
              overflow-hidden
              focus-within:ring-2
              focus-within:ring-yellow-300
            "
          >

            <div className="px-4 shrink-0">
              <Search
                className="w-5 h-5 text-yellow-600"
                aria-hidden="true"
              />
            </div>

            <input
              type="search"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="প্রবন্ধ খুঁজুন..."
              aria-label="প্রবন্ধ খুঁজুন"
              className="
                w-full
                py-3.5
                pr-4
                outline-none
                text-gray-800
                bg-transparent
                placeholder:text-gray-400
              "
            />

          </div>

        </div>

        {/* HEADER */}
        <div className="flex items-center justify-between gap-3 mb-5">

          <h2 className="text-2xl md:text-3xl font-bold text-[#4b3415]">
            ইসলামী প্রবন্ধসমূহ
          </h2>

          {!loading && (
            <span className="text-sm text-gray-500 whitespace-nowrap">
              {query
                ? `${filteredArticles.length} টি পাওয়া গেছে`
                : `${articles.length} টি প্রবন্ধ`}
            </span>
          )}

        </div>

        {/* LOADING */}
        {loading && (
          <div
            className="
              bg-white
              rounded-2xl
              border
              border-yellow-200
              p-10
              text-center
              shadow-sm
            "
          >
            <p className="text-gray-500">
              প্রবন্ধ লোড হচ্ছে...
            </p>
          </div>
        )}

        {/* ARTICLES */}
        {!loading &&
          filteredArticles.length > 0 && (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

              {filteredArticles.map((item) => {

                const title =
                  getBanglaTitle(item);

                const slug =
                  item?.slug ||
                  item?._id;

                return (
                  <Link
                    key={item._id}
                    href={`/bn/articles/${encodeURIComponent(
                      slug
                    )}`}
                    className="
                      group
                      block
                      bg-white
                      rounded-2xl
                      border
                      border-yellow-200
                      p-5
                      shadow-sm
                      hover:border-yellow-500
                      hover:shadow-lg
                      hover:-translate-y-1
                      transition-all
                      duration-200
                    "
                  >

                    <div className="flex flex-col h-full">

                      <h3
                        className="
                          text-lg
                          md:text-xl
                          font-bold
                          text-[#3b2f2f]
                          leading-8
                          group-hover:text-yellow-700
                          transition-colors
                        "
                      >
                        {title}
                      </h3>

                      <div
                        className="
                          mt-4
                          text-sm
                          font-semibold
                          text-yellow-700
                        "
                      >
                        প্রবন্ধ পড়ুন →
                      </div>

                    </div>

                  </Link>
                );
              })}

            </div>
          )}

        {/* NO RESULT */}
        {!loading &&
          filteredArticles.length === 0 && (

            <div
              className="
                bg-white
                rounded-2xl
                border
                border-yellow-200
                p-10
                text-center
                shadow-sm
              "
            >

              <div className="text-4xl mb-4">
                📚
              </div>

              <h3 className="text-xl font-bold text-[#3b2f2f]">
                কোনো প্রবন্ধ পাওয়া যায়নি
              </h3>

              <p className="mt-2 text-gray-500">
                {query
                  ? "আপনার অনুসন্ধানের সাথে মিলছে এমন কোনো প্রবন্ধ পাওয়া যায়নি।"
                  : "এখনো কোনো বাংলা প্রবন্ধ পাওয়া যায়নি।"}
              </p>

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="
                    mt-5
                    px-5
                    py-2.5
                    rounded-xl
                    bg-[#3b2f2f]
                    text-yellow-200
                    font-semibold
                    hover:bg-[#4a3a3a]
                    transition
                  "
                >
                  অনুসন্ধান মুছে দিন
                </button>
              )}

            </div>
          )}

      </section>

    </main>
  );
}