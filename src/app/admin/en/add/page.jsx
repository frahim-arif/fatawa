"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function EnglishFatawaPage() {
const [query, setQuery] = useState("");
const [questions, setQuestions] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchQuestions = async () => {
try {
setLoading(true);


    const res = await fetch(`${backend}/en/questions?limit=50`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch English questions");
    }

    const data = await res.json();

    if (data.success && Array.isArray(data.data)) {
      setQuestions(data.data);
    } else {
      setQuestions([]);
    }
  } catch (error) {
    console.error("English questions fetch error:", error);
    setQuestions([]);
  } finally {
    setLoading(false);
  }
};

fetchQuestions();


}, []);

const filteredQuestions = questions.filter((item) => {
const question = item?.question || "";


return question
  .toLowerCase()
  .includes(query.toLowerCase());

});

return ( <main className="min-h-screen bg-[#f7f3e8]">

  <section className="relative overflow-hidden py-12 px-4 bg-[#3b2f2f]">
    <div className="absolute inset-0 bg-black/10" />

    <div className="relative max-w-6xl mx-auto text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-yellow-300">
        Islamic Fatwas
      </h1>

      <p className="mt-3 text-yellow-100 text-base md:text-lg max-w-2xl mx-auto">
        Answers to Islamic questions according to the
        Quran, Sunnah and authentic Islamic scholarship.
      </p>
    </div>
  </section>

  <section className="max-w-6xl mx-auto px-3 sm:px-4 py-8 md:py-10">

    <div className="mb-5 text-sm text-gray-500">
      <Link
        href="/en"
        className="hover:text-yellow-700 transition"
      >
        Home
      </Link>

      <span className="mx-2">/</span>

      <span className="text-gray-700">
        Fatwas
      </span>
    </div>

    <div className="mb-8">
      <div className="flex items-center bg-white border border-yellow-600 rounded-2xl shadow-md overflow-hidden">

        <div className="px-3">
          <Search className="w-5 h-5 text-yellow-600" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Islamic questions..."
          className="
            w-full
            py-3.5
            px-1
            outline-none
            text-gray-800
            bg-transparent
          "
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="
              px-4
              text-sm
              text-gray-500
              hover:text-gray-800
            "
          >
            Clear
          </button>
        )}
      </div>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">

      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#4b3415]">
          Latest Fatwas
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Browse our latest Islamic questions and answers.
        </p>
      </div>

      {!loading && (
        <span className="text-sm text-gray-500">
          {filteredQuestions.length} Results
        </span>
      )}
    </div>

    {loading && (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              bg-white
              border
              border-gray-200
              rounded-xl
              p-5
              animate-pulse
            "
          >
            <div className="h-5 bg-gray-200 rounded w-11/12" />
            <div className="h-4 bg-gray-100 rounded w-28 mt-4" />
          </div>
        ))}
      </div>
    )}

    {!loading && filteredQuestions.length > 0 && (
      <div className="space-y-3">
        {filteredQuestions.map((item) => {
          const question = item?.question || "";
          const slug = item?.slug || item?._id;

          if (!question || !slug) {
            return null;
          }

          return (
            <Link
              key={item._id}
              href={`/en/fatawa/${encodeURIComponent(slug)}`}
              className="
                group
                block
                bg-white
                border
                border-yellow-200
                rounded-xl
                p-5
                shadow-sm
                hover:border-yellow-500
                hover:shadow-md
                hover:-translate-y-[1px]
                transition-all
                duration-200
              "
            >
              <h3
                className="
                  text-gray-800
                  font-semibold
                  text-base
                  md:text-lg
                  leading-7
                  group-hover:text-[#5b431b]
                "
              >
                {question}
              </h3>

              <span
                className="
                  inline-block
                  mt-2
                  text-sm
                  text-yellow-700
                  font-semibold
                "
              >
                Read Fatwa →
              </span>
            </Link>
          );
        })}
      </div>
    )}

    {!loading && filteredQuestions.length === 0 && (
      <div
        className="
          bg-white
          rounded-2xl
          p-10
          md:p-14
          text-center
          shadow-sm
          border
          border-gray-200
        "
      >
        <div className="text-4xl mb-4">
          📚
        </div>

        <h3 className="text-xl font-semibold text-gray-700">
          No English Fatwas Found
        </h3>

        <p className="mt-2 text-gray-500">
          {query
            ? `No fatwas match "${query}".`
            : "No English fatwas are available yet."
          }
        </p>

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="
              mt-5
              rounded-lg
              bg-[#3b2f2f]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-yellow-200
              hover:bg-[#4a3a3a]
              transition
            "
          >
            Show All Fatwas
          </button>
        )}
      </div>
    )}
  </section>
</main>

);
}
