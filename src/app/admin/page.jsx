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

  // ✅ Urdu + Clean Slug
  const generateSlug = (text) => {
    return text
      .toString()
      .normalize("NFKD")
      .replace(/[\u064B-\u0652]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u0600-\u06FF-]+/g, "");
  };

  // ✅ Smart SEO Auto Fill
  const autoGenerateSEO = () => {
    if (question) setMetaTitle(question);

    if (answer) {
      setMetaDescription(
        answer.replace(/<[^>]+>/g, "").substring(0, 160) + "..."
      );
    }

    setKeywords(`${question}, ${category}, اسلامی فتاویٰ`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = generateSlug(question);

    if (!category || !question || !answer) {
      setMessage("⚠️ ضروری فیلڈز مکمل کریں");
      return;
    }

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

        // RESET
        setCategory("");
        setQuestion("");
        setAnswer("");
        setHawala1("");
        setHawala2("");
        setHawala3("");
        setMetaTitle("");
        setMetaDescription("");
        setKeywords("");

        // ✅ Redirect
        router.push(`/questions/${slug}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black px-4 py-8 flex justify-center">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 w-full max-w-2xl">

        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          سوال شامل کریں
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Category */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              زمرہ
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
            >
              <option value="">منتخب کریں</option>
              {categories.map((c, i) => (
                <option key={i}>{c}</option>
              ))}
            </select>
          </div>

          {/* Question */}
          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              autoGenerateSEO();
            }}
            placeholder="سوال لکھیں"
            className="w-full p-2 border rounded text-right dark:bg-gray-800 dark:text-white"
          />

          {/* Answer */}
          <textarea
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              autoGenerateSEO();
            }}
            placeholder="جواب لکھیں"
            className="w-full p-2 border rounded text-right dark:bg-gray-800 dark:text-white"
          />

          {/* Hawala Arabic */}
          {[hawala1, hawala2, hawala3].map((val, i) => (
            <textarea
              key={i}
              value={val}
              onChange={(e) => {
                if (i === 0) setHawala1(e.target.value);
                if (i === 1) setHawala2(e.target.value);
                if (i === 2) setHawala3(e.target.value);
              }}
              placeholder={`حوالہ ${i + 1}`}
              className="w-full p-2 border rounded text-right text-lg leading-8
              dark:bg-gray-800 dark:text-green-300"
              style={{
                fontFamily: "Amiri, serif",
                direction: "rtl",
              }}
            />
          ))}

          {/* SEO */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded border">
            <h2 className="text-lg font-semibold mb-3 text-green-700">
              🔍 SEO Settings
            </h2>

            <input
              type="text"
              placeholder="Meta Title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full p-2 border rounded mb-2 dark:bg-gray-900 dark:text-white"
            />

            <textarea
              placeholder="Meta Description"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full p-2 border rounded mb-2 dark:bg-gray-900 dark:text-white"
            />

            <input
              type="text"
              placeholder="Keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            سوال جمع کریں
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}