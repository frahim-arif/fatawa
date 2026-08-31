
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function EnglishFatawaPage() {
  const [query, setQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const backend = "https://f-backend-vdi1.onrender.com/api";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `${backend}/questions?limit=50`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (data.success) {
          setQuestions(data.data);
        }
      } catch (error) {
        console.error("Questions fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const getEnglishQuestion = (item) => {
    return (
      item.englishQuestion ||
      item.enQuestion ||
      item.questionEn ||
      item.question
    );
  };

  const filteredQuestions = questions.filter((item) =>
    getEnglishQuestion(item)
      ?.toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* HERO */}
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

        {/* QUESTIONS */}
        <section>

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              Latest Fatwas
            </h2>

          </div>

          {loading ? (

            <p className="text-center text-gray-500 py-10">
              Loading Fatwas...
            </p>

          ) : filteredQuestions.length > 0 ? (

            <div className="space-y-3">

              {filteredQuestions.map((item) => (

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

                  <h3 className="text-gray-800 font-semibold text-lg">
                    {getEnglishQuestion(item)}
                  </h3>

                </Link>

              ))}

            </div>

          ) : (

            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500">
                No Islamic questions found.
              </p>
            </div>

          )}

        </section>

      </section>

    </main>
  );
}

