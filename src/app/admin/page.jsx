"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminPage() {
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
  const router = useRouter();

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

  // ✅ FIXED SLUG (Urdu support)
  const generateSlug = (text) => {
    return text
      .toString()
      .normalize("NFKD")
      .replace(/[\u064B-\u0652]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u0600-\u06FF-]+/g, "");
  };

  const autoGenerateSEO = () => {
    if (question) setMetaTitle(question);
    if (answer) setMetaDescription(answer.substring(0, 150) + "...");
    setKeywords(`${question}, ${category}`);
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

        // reset
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
    <div className="min-h-screen bg-gray-100 dark:bg-black px-4 md:px-6 py-10 flex justify-center">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 md:p-8 w-full max-w-2xl">

        <h1 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-6">
          سوال شامل کریں
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="">زمرہ منتخب کریں</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Question */}
          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              autoGenerateSEO();
            }}
            placeholder="سوال لکھیں..."
            rows={3}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
            required
          />

          {/* Answer */}
          <textarea
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              autoGenerateSEO();
            }}
            placeholder="جواب لکھیں..."
            rows={4}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
            required
          />

          {/* Hawala */}
          <textarea
            value={hawala1}
            onChange={(e) => setHawala1(e.target.value)}
            placeholder="حوالہ 1"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
          />

          <textarea
            value={hawala2}
            onChange={(e) => setHawala2(e.target.value)}
            placeholder="حوالہ 2"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
          />

          <textarea
            value={hawala3}
            onChange={(e) => setHawala3(e.target.value)}
            placeholder="حوالہ 3"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
          />

          {/* SEO */}
          <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Meta Title"
              className="w-full p-2 mb-2 border rounded dark:bg-gray-900 dark:text-white"
            />

            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Meta Description"
              className="w-full p-2 mb-2 border rounded dark:bg-gray-900 dark:text-white"
            />

            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Keywords"
              className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
            سوال جمع کریں
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}