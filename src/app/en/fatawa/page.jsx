"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function EnglishFatawaPage() {
  const [query, setQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const backend = "https://f-backend-vdi1.onrender.com/api";

  // =========================================
  // GET ENGLISH QUESTIONS
  // =========================================
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${backend}/en/questions?limit=50`,
          {
            cache: "no-store",
          }
        );

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
        console.error(
          "English questions fetch error:",
          error
        );

        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // =========================================
  // ENGLISH QUESTION
  // =========================================
  const getEnglishQuestion = (item) => {
    return item?.question || "";
  };

  // =========================================
  // FILTER QUESTIONS
  // =========================================
  const filteredQuestions = questions.filter((item) => {
    const question = getEnglishQuestion(item);

    if (!question) {
      return false;
    }

    return question
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
            Islamic Fatwas
          </h1>

          <p className="mt-3 text-yellow-100 text-base md:text-lg">
            Answers to Islamic questions according to the Quran,
            Sunnah and authentic Islamic scholarship.
          </p>

        </div>

      </section>

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <section className="max-w-6xl mx-auto px-3 py-8">

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
              placeholder="Search Islamic questions..."
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
        {/* QUESTIONS */}
        {/* ================================= */}

        <section>

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              Latest Fatwas
            </h2>

            {!loading && (
              <span className="text-sm text-gray-500">
                {filteredQuestions.length} Results
              </span>
            )}

          </div>

          {/* ================================= */}
          {/* LOADING */}
          {/* ================================= */}

          {loading ? (

            <p className="text-center text-gray-500 py-10">
              Loading Fatwas...
            </p>

          ) : filteredQuestions.length > 0 ? (

            <div className="space-y-3">

              {filteredQuestions.map((item) => {

                const question =
                  getEnglishQuestion(item);

                return (
                  <Link
                    key={item._id}
                    href={`/en/fatawa/${item.slug}`}
                    className="
                      block
                      bg-white
                      border border-yellow-200
                      rounded-xl
                      p-5
                      shadow-sm
                      hover:border-yellow-500
                      hover:shadow-md
                      transition
                    "
                  >

                    <h3 className="text-gray-800 font-semibold text-lg leading-7">
                      {question}
                    </h3>

                    <span className="inline-block mt-2 text-sm text-yellow-700 font-semibold">
                      Read Fatwa →
                    </span>

                  </Link>
                );

              })}

            </div>

          ) : (

            <div className="bg-white rounded-xl p-8 text-center shadow-sm">

              <p className="text-gray-500">
                No English Fatwas found.
              </p>

            </div>

          )}

        </section>

      </section>

    </main>
  );
}