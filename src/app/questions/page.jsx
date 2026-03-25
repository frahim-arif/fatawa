"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:5000/api/questions");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading questions...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-green-800 border-r-4 border-yellow-400 pr-3 text-right">
        اسلامی سوالات
      </h1>

      <div className="bg-white p-5 rounded-xl shadow text-right space-y-4">
        {questions.length === 0 ? (
          <p className="text-gray-600">کوئی سوال موجود نہیں۔</p>
        ) : (
          questions.map((q) => (
            <div key={q._id} className="border-b border-gray-200 pb-3">
              <Link href={`/questions/${q._id}`}>
                <h2 className="text-lg font-semibold text-green-900 hover:text-yellow-600 transition">
                  {q.question}
                </h2>
              </Link>
              <p className="text-gray-700 mt-1">{q.answer}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
