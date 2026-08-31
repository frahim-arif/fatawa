
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function EnglishArticlesPage() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const backend = "https://f-backend-vdi1.onrender.com/api";

  // ================================
  // Fetch Articles
  // ================================
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${backend}/majameen`);

        const data = await res.json();

        if (data.success) {
          setArticles(data.data);
        }
      } catch (error) {
        console.error("Articles fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // ================================
  // English Article Title
  // ================================
  const getEnglishTitle = (item) => {
    return (
      item.englishTitle ||
      item.enTitle ||
      item.titleEn ||
      item.title
    );
  };

  // ================================
  // Filter
  // ================================
  const filteredArticles = articles.filter((item) =>
    getEnglishTitle(item)
      ?.toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* HERO */}
      <section className="relative overflow-hidden py-12 px-4 bg-[#3b2f2f]">

        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-3xl md:text-5xl font-bold text-yellow-300">
            Islamic Articles
          </h1>

          <p className="mt-3 text-yellow-100 text-base md:text-lg">
            Explore useful Islamic articles and educational content.
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-3 py-8">

        {/* SEARCH */}
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

        {/* ARTICLES */}
        <section>

          <h2 className="text-2xl font-bold text-[#4b3415] mb-5">
            Islamic Articles
          </h2>

          {loading ? (

            <p className="text-center text-gray-500 py-10">
              Loading articles...
            </p>

          ) : filteredArticles.length > 0 ? (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {filteredArticles.map((item) => (

                <Link
                  key={item._id}
                  href={`/en/articles/${
                    item.slug || item._id
                  }`}
                  className="
                    block
                    bg-white
                    rounded-xl
                    border border-yellow-200
                    p-6
                    shadow-md
                    hover:shadow-xl
                    hover:border-yellow-500
                    hover:-translate-y-1
                    transition
                  "
                >

                  <h3 className="text-xl font-bold text-[#3b2f2f]">
                    {getEnglishTitle(item)}
                  </h3>

                  <span className="inline-block mt-4 text-yellow-700 font-semibold">
                    Read Article →
                  </span>

                </Link>

              ))}

            </div>

          ) : (

            <div className="bg-white rounded-xl p-8 text-center">

              <p className="text-gray-500">
                No articles found.
              </p>

            </div>

          )}

        </section>

      </section>

    </main>
  );
}

