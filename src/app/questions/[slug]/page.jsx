"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SingleQuestion() {
  const { slug } = useParams();

  const backend = "https://f-backend-vdi1.onrender.com/api";

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
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [slug]);

  if (loading)
    return (
      <h1 className="text-center mt-10 text-gray-700 dark:text-gray-300">
        ⏳ لوڈ ہو رہا ہے...
      </h1>
    );

  if (!question)
    return (
      <h1 className="text-center mt-10 text-red-600">
        ❌ سوال نہیں ملا
      </h1>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 text-right">

      {/* ✅ SEO META */}
      <head>
        <title>{question.metaTitle || question.question}</title>
        <meta
          name="description"
          content={
            question.metaDescription ||
            question.answer?.slice(0, 150)
          }
        />
        <meta
          name="keywords"
          content={question.keywords || "Islamic fatwa, سوال جواب"}
        />
      </head>

      {/* ✅ SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Question",
            "name": question.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": question.answer,
            },
          }),
        }}
      />

      {/* 🟡 Question Box */}
      <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 p-5 rounded-xl shadow">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-yellow-300 leading-relaxed">
          {question.question}
        </h1>
      </div>

      {/* 🟢 Answer Box */}
      <div className="bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 p-5 rounded-xl shadow">
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
          {question.answer}
        </p>
      </div>

      {/* 📖 Hawala (Arabic Styled) */}
      {[question.hawala1, question.hawala2, question.hawala3].map(
        (h, i) =>
          h && (
            <div
              key={i}
              className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-5 rounded-xl shadow text-green-800 dark:text-green-300"
              style={{
                direction: "rtl",
                fontFamily: "Amiri, serif",
                lineHeight: "2.2",
                fontSize: "18px",
              }}
            >
              <strong>📖 حوالہ {i + 1}:</strong>
              <p className="mt-2">{h}</p>
            </div>
          )
      )}

      {/* 🔗 Share Buttons */}
      <div className="flex gap-3 justify-center pt-4">
        <button
          onClick={() =>
            navigator.share
              ? navigator.share({
                  title: question.question,
                  text: question.answer,
                  url: window.location.href,
                })
              : alert("Sharing not supported")
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          شیئر کریں
        </button>
      </div>
    </div>
  );
}