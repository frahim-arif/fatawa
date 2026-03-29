"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";

export default function SingleQuestion() {
  const params = useParams();
  const slug = params.slug;

  const backend = "https://f-backend-vdi1.onrender.com/api"; // ✅ production URL

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchQuestion = async () => {
      try {
        const res = await fetch(`${backend}/questions/slug/${slug}`);
        const data = await res.json();

        if (data.success) {
          setQuestion(data.data);
        } else {
          setQuestion(null);
        }
      } catch (err) {
        console.error("❌ Error fetching question:", err);
        setQuestion(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [slug]);

  if (loading)
    return (
      <h1 className="text-center mt-10 text-lg text-gray-600">
        ⏳ لوڈ ہو رہا ہے...
      </h1>
    );

  if (!question)
    return (
      <h1 className="text-center mt-10 text-red-500">
        ❌ سوال نہیں ملا
      </h1>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6 text-right">

      {/* ✅ SEO */}
      <Head>
        <title>{question.question} | اسلامی فتاویٰ</title>
        <meta name="description" content={question.answer?.slice(0, 150)} />
        <meta name="keywords" content="Islamic fatwa, سوال جواب, فتوی" />
      </Head>

      {/* 🔹 Question */}
      <div
        className="p-5 rounded-xl border bg-yellow-50 border-yellow-300 shadow-md"
        style={{
          direction: "rtl",
          fontFamily: "'Jameel Noori Nastaleeq', serif",
          lineHeight: "2.2",
        }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">
          {question.question}
        </h1>
      </div>

      {/* 🔹 Answer */}
      <div
        className="p-5 rounded-xl border bg-green-50 border-green-300 shadow-md text-black"
        style={{
          direction: "rtl",
          fontFamily: "'Jameel Noori Nastaleeq', serif",
          lineHeight: "2.3",
        }}
      >
        <p>{question.answer}</p>
      </div>

      {/* 🔹 References */}
      <div className="space-y-3">
        {question.hawala1 && (
          <div
            className="p-4 rounded-lg border bg-gray-100 border-gray-300 text-green-800"
            style={{
              direction: "rtl",
              fontFamily: "Amiri, serif",
              lineHeight: "2",
            }}
          >
            <strong>📖 حوالہ 1:</strong> {question.hawala1}
          </div>
        )}

        {question.hawala2 && (
          <div
            className="p-4 rounded-lg border bg-gray-100 border-gray-300 text-green-800"
            style={{
              direction: "rtl",
              fontFamily: "Amiri, serif",
              lineHeight: "2",
            }}
          >
            <strong>📖 حوالہ 2:</strong> {question.hawala2}
          </div>
        )}

        {question.hawala3 && (
          <div
            className="p-4 rounded-lg border bg-gray-100 border-gray-300 text-green-800"
            style={{
              direction: "rtl",
              fontFamily: "Amiri, serif",
              lineHeight: "2",
            }}
          >
            <strong>📖 حوالہ 3:</strong> {question.hawala3}
          </div>
        )}
      </div>
    </div>
  );
}