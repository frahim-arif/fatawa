"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";

export default function SingleQuestion() {
  const { slug } = useParams();

  const backend = "https://f-backend-vdi1.onrender.com/api/admin/questions";

  const [question, setQuestion] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchQuestion = async () => {
      try {
        const res = await fetch(`${backend}/slug/${slug}`);
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

    const fetchRelated = async () => {
      try {
        const res = await fetch(`${backend}`);
        const data = await res.json();

        if (data.success) {
          setRelated(data.data);
        }
      } catch (err) {
        console.error("❌ Error fetching related:", err);
      }
    };

    fetchQuestion();
    fetchRelated();
  }, [slug]);

  // ✅ KEYWORD-BASED AUTOLINK (BEST VERSION)
  const autoLink = (text, related) => {
    try {
      if (!text || !Array.isArray(related)) return text;

      let updatedText = text;
      let linkCount = 0;
      const MAX_LINKS = 5;

      const escapeRegExp = (string) =>
        string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      related.forEach((item) => {
        if (linkCount >= MAX_LINKS) return;
        if (!item?.keywords?.length || !item?.slug) return;
        if (item.slug === slug) return;

        item.keywords.forEach((word) => {
          if (linkCount >= MAX_LINKS) return;
          if (!word) return;

          const safeKeyword = escapeRegExp(word);
          const regex = new RegExp(`(${safeKeyword})`, "i");

          if (regex.test(updatedText)) {
            updatedText = updatedText.replace(
              regex,
              `<a href="/questions/${item.slug}" class="text-blue-600 font-semibold underline">$1</a>`
            );
            linkCount++;
          }
        });
      });

      return updatedText;
    } catch (err) {
      console.error("❌ autoLink error:", err);
      return text;
    }
  };

  if (loading)
    return <h1 className="text-center mt-10">⏳ لوڈ ہو رہا ہے...</h1>;

  if (!question)
    return <h1 className="text-center mt-10">❌ سوال نہیں ملا</h1>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 text-right">

      <Head>
        <title>
          {question.metaTitle || question.question} | اسلامی فتاویٰ
        </title>

        <meta
          name="description"
          content={
            question.metaDescription ||
            question.answer?.slice(0, 150)
          }
        />

        <meta
          name="keywords"
          content={
            question.keywords?.join(", ") ||
            "Islamic fatwa, سوال جواب, فتوی"
          }
        />
      </Head>

      {/* Question */}
      <div className="p-5 rounded-xl border bg-yellow-50">
        <h1 className="text-xl md:text-2xl font-bold text-green-800">
          {question.question}
        </h1>
      </div>

      {/* ✅ AUTO LINK ANSWER */}
      <div className="p-5 rounded-xl border bg-green-50 dark:bg-gray-800 leading-8">
        {question?.answer && (
          <p
            className="text-gray-900 dark:text-gray-100"
            dangerouslySetInnerHTML={{
              __html: autoLink(question.answer, related),
            }}
          />
        )}
      </div>

      {/* Hawala */}


      {/* Hawala */}
      <div className="mt-6 p-5 rounded-2xl border bg-gray-50 dark:bg-[#111111] space-y-4">

        <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">
          📚 حوالہ جات
        </h2>

        <div className="space-y-3 text-lg md:text-xl leading-9 text-gray-900 dark:text-gray-200">

          {question.hawala1 && (
            <p className="border-r-4 border-emerald-500 pr-4 arabic">
              📖 {question.hawala1}
            </p>
          )}

          {question.hawala2 && (
            <p className="border-r-4 border-emerald-500 pr-4 arabic">
              📖 {question.hawala2}
            </p>
          )}

          {question.hawala3 && (
            <p className="border-r-4 border-emerald-500 pr-4 arabic">
              📖 {question.hawala3}
            </p>
          )}

        </div>
      </div>
      </div>
      );
}