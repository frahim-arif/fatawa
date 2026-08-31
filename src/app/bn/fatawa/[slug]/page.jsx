"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BanglaFatawaDetail({ params }) {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const backend = "https://f-backend-vdi1.onrender.com/api";

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const resolvedParams = await params;
        const slug = resolvedParams.slug;

        const res = await fetch(
          `${backend}/admin/questions?limit=5000`
        );

        const data = await res.json();

        if (data.success) {
          const found = data.data.find(
            (item) => item.slug === slug
          );

          setQuestion(found || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [params]);

  const getQuestion = (item) => {
    return (
      item?.banglaQuestion ||
      item?.bnQuestion ||
      item?.questionBn ||
      item?.question
    );
  };

  const getAnswer = (item) => {
    return (
      item?.banglaAnswer ||
      item?.bnAnswer ||
      item?.answerBn ||
      item?.answer
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        লোড হচ্ছে...
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">

        <h1 className="text-2xl font-bold">
          ফতোয়া পাওয়া যায়নি
        </h1>

        <Link
          href="/bn/fatawa"
          className="mt-4 text-yellow-700"
        >
          ← ফতোয়া তালিকায় ফিরে যান
        </Link>

      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3e8] py-8 px-4">

      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-yellow-200 overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#3b2f2f] px-6 py-6">

          <p className="text-yellow-400 mb-2">
            প্রশ্ন
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-white">

            {getQuestion(question)}

          </h1>

        </div>

        {/* ANSWER */}
        <div className="p-6 md:p-8">

          <h2 className="text-2xl font-bold text-[#4b3415] mb-5">
            উত্তর
          </h2>

          <div
            className="text-gray-700 leading-8 whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: getAnswer(question),
            }}
          />

        </div>

      </article>

      <div className="max-w-4xl mx-auto mt-6">

        <Link
          href="/bn/fatawa"
          className="text-[#75593f] font-semibold"
        >
          ← সব ফতোয়া দেখুন
        </Link>

      </div>

    </main>
  );
}