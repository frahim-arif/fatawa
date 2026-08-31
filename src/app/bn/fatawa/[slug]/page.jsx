"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BanglaFatawaDetail({ params }) {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const backend =
    "https://f-backend-vdi1.onrender.com/api";

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const resolvedParams = await params;
        const slug = resolvedParams.slug;

        const res = await fetch(
          `${backend}/bn/questions/slug/${encodeURIComponent(slug)}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (data.success) {
          setQuestion(data.data);
        } else {
          setQuestion(null);
        }
      } catch (error) {
        console.error("Bangla Fatwa Error:", error);
        setQuestion(null);
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f3e8]">
        <p className="text-gray-600">
          লোড হচ্ছে...
        </p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f3e8] px-4">

        <h1 className="text-2xl font-bold text-[#3b2f2f]">
          ফতোয়া পাওয়া যায়নি
        </h1>

        <Link
          href="/bn/fatawa"
          className="mt-4 text-yellow-700 font-semibold"
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
        <div className="bg-[#3b2f2f] px-6 py-7">

          <p className="text-yellow-400 mb-3 font-semibold">
            ইসলামী ফতোয়া
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-white leading-9">
            {question.question}
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
              __html: question.answer || "",
            }}
          />

          {/* REFERENCES */}
          {(question.hawala1 ||
            question.hawala2 ||
            question.hawala3) && (
            <div className="mt-10 border-t border-yellow-200 pt-6">

              <h2 className="text-xl font-bold text-[#4b3415] mb-4">
                তথ্যসূত্র
              </h2>

              {question.hawala1 && (
                <p className="text-gray-600 mb-2">
                  {question.hawala1}
                </p>
              )}

              {question.hawala2 && (
                <p className="text-gray-600 mb-2">
                  {question.hawala2}
                </p>
              )}

              {question.hawala3 && (
                <p className="text-gray-600">
                  {question.hawala3}
                </p>
              )}

            </div>
          )}

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