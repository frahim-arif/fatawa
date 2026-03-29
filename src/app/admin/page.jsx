"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hawala1, setHawala1] = useState("");
  const [hawala2, setHawala2] = useState("");
  const [hawala3, setHawala3] = useState("");

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const [message, setMessage] = useState("");

  const backend = "https://f-backend-vdi1.onrender.com/api/admin";

  const categories = [
    "جدید مسائل",
    "نماز",
    "حج",
    "زکات",
    "عقیقہ",
    "طہارت",
    "رمضان",
    "قربانی",
    "نکاح",
    "بیوع",
  ];

  // ✅ Urdu + English slug support
  const generateSlug = (text) => {
    return text
      .toString()
      .normalize("NFKD")
      .replace(/[\u064B-\u0652]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u0600-\u06FF-]+/g, "");
  };

  // ✅ Auto SEO
  const autoGenerateSEO = (q, a) => {
    if (q) setMetaTitle(q);
    if (a) setMetaDescription(a.substring(0, 150));
    setKeywords(`${q}, ${category}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = generateSlug(question);

    if (!slug) {
      setMessage("❌ slug generate nahi ho raha");
      return;
    }

    try {
      const res = await axios.post(`${backend}/add-question`, {
        category,
        question,
        answer,
        hawala1,
        hawala2,
        hawala3,
        slug,
        metaTitle,
        metaDescription,
        keywords,
      });

      if (res.status === 200 && res.data.success) {
        setMessage("✅ سوال کامیابی سے شامل ہو گیا");

        // reset form
        setCategory("");
        setQuestion("");
        setAnswer("");
        setHawala1("");
        setHawala2("");
        setHawala3("");
        setMetaTitle("");
        setMetaDescription("");
        setKeywords("");

        // ✅ redirect to new page
        router.push(`/questions/${slug}`);
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        setMessage(err.response.data.message || "❌ Bad Request");
      } else {
        setMessage("❌ Network Error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 py-10 flex justify-center">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          سوال شامل کریں
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Category */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
              زمرہ
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            >
              <option value="">منتخب کریں</option>
              {categories.map((cat, i) => (
                <option key={i}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Question */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
              سوال
            </label>
            <textarea
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                autoGenerateSEO(e.target.value, answer);
              }}
              required
              rows={3}
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white font-jameel"
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
              جواب
            </label>
            <textarea
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                autoGenerateSEO(question, e.target.value);
              }}
              required
              rows={4}
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white font-jameel"
            />
          </div>

          {/* Hawala Fields */}
          {[hawala1, hawala2, hawala3].map((h, i) => (
            <div key={i}>
              <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                حوالہ {i + 1}
              </label>
              <textarea
                value={h}
                onChange={(e) => {
                  if (i === 0) setHawala1(e.target.value);
                  if (i === 1) setHawala2(e.target.value);
                  if (i === 2) setHawala3(e.target.value);
                }}
                rows={2}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                style={{
                  direction: "rtl",
                  fontFamily: "Amiri, serif",
                }}
              />
            </div>
          ))}

          {/* SEO */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="font-bold mb-2 text-green-700">🔍 SEO</h2>

            <input
              type="text"
              placeholder="Meta Title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
            />

            <textarea
              placeholder="Meta Description"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
            />

            <input
              type="text"
              placeholder="Keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            سوال جمع کریں
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}