"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";

export default function SingleQuestion() {
  const { slug } = useParams();

  const backend = "https://f-backend-vdi1.onrender.com/api/admin/questions";

  const [question, setQuestion] = useState(null);
  const [related, setRelated] = useState([]); // ✅ added
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

  // ✅ IMPROVED autoLink (safe + limited)
  const autoLink = (text, related) => {
    if (!text || !related.length) return text;

    let updatedText = text;
    let linkCount = 0;
    const MAX_LINKS = 5; // 🔥 control

    related.forEach((item) => {
      if (linkCount >= MAX_LINKS) return;
      if (!item.question || !item.slug) return;
      if (item.slug === slug) return; // ❌ same page skip

      const keyword = item.question.split(" ").slice(0, 3).join(" ");
      if (!keyword) return;

      const regex = new RegExp(`(${keyword})`, "i");

      if (regex.test(updatedText)) {
        updatedText = updatedText.replace(
          regex,
          `<a href="/questions/${item.slug}" class="text-blue-600 font-semibold underline">$1</a>`
        );
        linkCount++;
      }
    });

    return updatedText;
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
            question.keywords ||
            "Islamic fatwa, سوال جواب, فتوی"
          }
        />
      </Head>

      {/* Question */}
      <div className="p-5 rounded-xl border bg-yellow-50">
        <h1 className="text-3xl font-bold text-green-800">
          {question.question}
        </h1>
      </div>

      {/* ✅ UPDATED Answer */}
      <div className="p-5 rounded-xl border bg-green-50 leading-8">
        <p
          dangerouslySetInnerHTML={{
            __html: autoLink(question.answer, related),
          }}
        />
      </div>

      {/* Hawala */}
      <div className="space-y-3 text-gray-800">
        {question.hawala1 && <p>📖 {question.hawala1}</p>}
        {question.hawala2 && <p>📖 {question.hawala2}</p>}
        {question.hawala3 && <p>📖 {question.hawala3}</p>}
      </div>
    </div>
  );
}