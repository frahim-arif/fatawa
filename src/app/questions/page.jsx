"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 20;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(
        "https://f-backend-vdi1.onrender.com/api/admin/questions"
      );

      const data = await res.json();

      if (data.success) {
        setQuestions(data.data);
        setFiltered(data.data);
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);

    const result = questions.filter((q) =>
      `${q.question} ${q.answer} ${q.category}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFiltered(result);
  };

  const totalPages = Math.ceil(filtered.length / limit);

  const currentQuestions = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaf3] px-4 py-8">
      <div className="max-w-4xl mx-auto">

        <h1
          className="text-3xl font-bold text-[#8b6b1b] text-center mb-6"
          style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
        >
          اسلامی سوالات
        </h1>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="سوال تلاش کریں..."
          className="w-full mb-6 border border-[#e5d39a] rounded-xl px-4 py-3 outline-none text-right bg-white shadow-sm"
          style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
        />

        <div className="bg-white p-5 rounded-xl shadow text-right space-y-4">
          {currentQuestions.length === 0 ? (
            <p className="text-gray-600 text-center">
              کوئی سوال موجود نہیں۔
            </p>
          ) : (
            currentQuestions.map((q) => (
              <div key={q._id} className="border-b pb-4">

                <Link href={`/questions/${q.slug}`}>
                  <h2
                    className="text-xl font-semibold text-green-900 hover:text-yellow-600 cursor-pointer"
                    style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
                  >
                    {q.question}
                  </h2>
                </Link>

                <p className="text-xs text-gray-500 mt-1">
                  📂 {q.category || "عام"}
                </p>

                <p
                  className="text-gray-700 mt-2 leading-8"
                  style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
                >
                  {q.answer?.slice(0, 180)}...
                </p>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-lg bg-[#d4b24c] disabled:bg-gray-300"
            >
              Previous
            </button>

            <span className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-lg bg-[#d4b24c] disabled:bg-gray-300"
            >
              Next
            </button>

          </div>
        )}
      </div>
    </div>
  );
}