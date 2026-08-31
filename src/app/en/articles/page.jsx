
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function EnglishArticlesPage() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================
  // FETCH ARTICLES
  // =========================================
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${backend}/majameen`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await res.json();

        if (data.success) {
          setArticles(data.data || []);
        }
      } catch (error) {
        console.error("Articles fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // =========================================
  // ENGLISH ARTICLE TITLE ONLY
  // =========================================
  const getEnglishTitle = (item) => {
    return (
      item.englishTitle ||
      item.enTitle ||
      item.titleEn ||
      ""
    );
  };

  // =========================================
  // FILTER ENGLISH ARTICLES ONLY
  // =========================================
  const filteredArticles = articles.filter((item) => {
    const title = getEnglishTitle(item);

    // English title nahi hai to show nahi hoga
    if (!title) {
      return false;
    }

    return title
      .toLowerCase()
      .includes(query.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <section className="relative overflow-hidden py-12 px-4 bg-[#3b2f2f]">

        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-3xl md:text-5xl font-bold text-yellow-300">
            Islamic Articles
          </h1>

          <p className="mt-3 text-yellow-100 text-base md:text-lg">
            Explore useful Islamic articles and educational
            content based on the Quran and Sunnah.
          </p>

        </div>

      </section>

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <section className="max-w-6xl mx-auto px-3 py-8">

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

          <span className="text-gray-700">
            Articles
          </span>

        </div>

        {/* ================================= */}
        {/* SEARCH */}
        {/* ================================= */}

        <div className="mb-8">

          <div className="flex items-center bg-white border border-yellow-600 rounded-2xl shadow-md overflow-hidden">

            <div className="px-3">
              <Search className="w-5 h-5 text-yellow-600" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Islamic articles..."
              className="
                w-full
                py-3
                outline-none
                text-gray-800
                bg-transparent
              "
            />

          </div>

        </div>

        {/* ================================= */}
        {/* ARTICLES */}
        {/* ================================= */}

        <section>

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl md:text-3xl font-bold text-[#4b3415]">
              Islamic Articles
            </h2>

            {!loading && (
              <span className="text-sm text-gray-500">
                {filteredArticles.length} Results
              </span>
            )}

          </div>

          {/* ================================= */}
          {/* LOADING */}
          {/* ================================= */}

          {loading ? (

            <div className="bg-white rounded-xl p-10 text-center shadow-sm">

              <p className="text-gray-500">
                Loading articles...
              </p>

            </div>

          ) : filteredArticles.length > 0 ? (

            /* ================================= */
            /* ARTICLE GRID */
            /* ================================= */

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {filteredArticles.map((item) => {

                const title = getEnglishTitle(item);

                return (
                  <Link
                    key={item._id}
                    href={`/en/articles/${
                      item.slug || item._id
                    }`}
                    className="
                      group
                      block
                      bg-white
                      rounded-xl
                      border border-yellow-200
                      p-6
                      shadow-md
                      hover:shadow-xl
                      hover:border-yellow-500
                      hover:-translate-y-1
                      transition-all
                      duration-200
                    "
                  >

                    {/* LABEL */}

                    <p className="text-xs text-yellow-700 font-semibold mb-3">
                      Islamic Article
                    </p>

                    {/* TITLE */}

                    <h3 className="
                      text-lg
                      md:text-xl
                      font-bold
                      text-[#3b2f2f]
                      leading-7
                      group-hover:text-yellow-700
                      transition
                    ">
                      {title}
                    </h3>

                    {/* READ MORE */}

                    <span className="
                      inline-block
                      mt-5
                      text-yellow-700
                      font-semibold
                    ">
                      Read Article →
                    </span>

                  </Link>
                );

              })}

            </div>

          ) : (

            /* ================================= */
            /* NO ARTICLES */
            /* ================================= */

            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center shadow-sm">

              <p className="text-gray-500">
                No English articles found.
              </p>

            </div>

          )}

        </section>

      </section>

    </main>
  );
}

