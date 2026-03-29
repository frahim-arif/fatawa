"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const backend = "https://f-backend-vdi1.onrender.com/api";

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`${backend}/questions`);
        const data = await res.json();

        // ✅ FIX: backend returns { success, data }
        if (data.success) {
          setQuestions(data.data);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
        ⏳ سوالات لوڈ ہو رہے ہیں...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

      {/* ✅ SEO META */}
      <head>
        <title>اسلامی سوالات | Maslak e Deoband</title>
        <meta
          name="description"
          content="اسلامی مسائل اور سوالات کے جوابات پڑھیں"
        />
        <meta
          name="keywords"
          content="اسلامی سوالات, فتوی, اسلامی مسائل"
        />
      </head>

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-yellow-400 border-r-4 border-yellow-400 pr-3 text-right">
        اسلامی سوالات
      </h1>

      {/* Questions List */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow space-y-4 text-right">

        {questions.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            کوئی سوال موجود نہیں۔
          </p>
        ) : (
          questions.map((q) => (
            <div
              key={q._id}
              className="border-b border-gray-200 dark:border-gray-700 pb-3"
            >
              {/* ✅ IMPORTANT FIX: use slug instead of _id */}
              <Link href={`/questions/${q.slug}`}>
                <h2 className="text-lg font-semibold text-green-900 dark:text-green-300 hover:text-yellow-600 cursor-pointer transition leading-relaxed">
                  {q.question}
                </h2>
              </Link>

              {/* Answer preview */}
              <p className="text-gray-700 dark:text-gray-400 mt-1 text-sm">
                {q.answer?.slice(0, 120)}...
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}