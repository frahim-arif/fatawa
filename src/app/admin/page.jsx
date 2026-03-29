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

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const [message, setMessage] = useState("");
  const router = useRouter();

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

  // Improved slug generator (never empty)
  const generateSlug = (text) => {
    let slug = text
      .toString()
      .normalize("NFKD")
      .replace(/[\u064B-\u0652]/g, "") // remove tashkeel
      .replace(/[\u0600-\u06FF]/g, "") // remove Arabic chars
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    if (!slug) slug = "question-" + Date.now();
    return slug;
  };

  const autoGenerateSEO = () => {
    if (question) setMetaTitle(question);
    if (answer) setMetaDescription(answer.substring(0, 150) + "...");
    setKeywords(`${question}, ${category}, ${hawala1}, ${hawala2}, ${hawala3}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backend = "http://localhost:5000/api/admin";
      const slug = generateSlug(question);

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
        setMessage("✅ سوال کامیابی سے شامل کر دیا گیا ہے!");
        setCategory("");
        setQuestion("");
        setAnswer("");
        setHawala1("");
        setHawala2("");
        setHawala3("");
        setMetaTitle("");
        setMetaDescription("");
        setKeywords("");
        router.push("/");
      } else {
        setMessage("❌ کچھ غلط ہو گیا، دوبارہ کوشش کریں۔");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ کچھ غلط ہو گیا، دوبارہ کوشش کریں۔");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          سوال شامل کریں
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Dropdown */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              زمرہ منتخب کریں
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="">زمرہ منتخب کریں</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Question (Urdu) */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">سوال</label>
            <textarea
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                autoGenerateSEO();
              }}
              rows={3}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 font-jameel"
            ></textarea>
          </div>

          {/* Answer (Urdu) */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">جواب</label>
            <textarea
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                autoGenerateSEO();
              }}
              rows={4}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 font-jameel"
            ></textarea>
          </div>

          {/* Hawala 1 (Arabic Font) */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">حوالہ 1</label>
            <textarea
              value={hawala1}
              onChange={(e) => {
                setHawala1(e.target.value);
                autoGenerateSEO();
              }}
              rows={3}
              className="w-full border rounded-lg p-2 h-24 focus:ring-2 focus:ring-green-500 quran-text"
            ></textarea>
          </div>

          {/* Hawala 2 (Arabic Font) */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">حوالہ 2</label>
            <textarea
              value={hawala2}
              onChange={(e) => {
                setHawala2(e.target.value);
                autoGenerateSEO();
              }}
              rows={3}
              className="w-full border rounded-lg p-2 h-24 focus:ring-2 focus:ring-green-500 quran-text"
            ></textarea>
          </div>

          {/* Hawala 3 (Arabic Font) */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">حوالہ ۳</label>
            <textarea
              value={hawala3}
              onChange={(e) => {
                setHawala3(e.target.value);
                autoGenerateSEO();
              }}
              rows={3}
              className="w-full border rounded-lg p-2 h-24 focus:ring-2 focus:ring-green-500 quran-text"
            ></textarea>
          </div>

          {/* SEO SECTION */}
          <div className="bg-gray-100 p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-3 text-green-800">
              🔍 SEO Settings
            </h2>

            <label className="block font-semibold mb-1">Meta Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full border rounded-lg p-2 mb-3"
            />

            <label className="block font-semibold mb-1">Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              className="w-full border rounded-lg p-2 mb-3"
            ></textarea>

            <label className="block font-semibold mb-1">Keywords</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            سوال جمع کریں
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-medium text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}