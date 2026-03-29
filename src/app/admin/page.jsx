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

  // ✅ SLUG GENERATOR (SAFE)
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  // ✅ AUTO SEO
  const autoGenerateSEO = () => {
    if (question) setMetaTitle(question);
    if (answer) setMetaDescription(answer.substring(0, 150));
    setKeywords(`${question}, ${category}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !question || !answer) {
      setMessage("⚠️ ضروری فیلڈز مکمل کریں");
      return;
    }

    try {
      const backend = "https://f-backend-vdi1.onrender.com/api/admin";
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

      if (res.data.success) {
        setMessage("✅ سوال شامل ہو گیا!");

        // RESET
        setCategory("");
        setQuestion("");
        setAnswer("");
        setHawala1("");
        setHawala2("");
        setHawala3("");

        // ✅ REDIRECT TO SLUG PAGE
        router.push(`/questions/${slug}`);
      } else {
        setMessage("❌ کچھ غلط ہو گیا");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black px-4 py-10 flex justify-center">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 w-full max-w-2xl">

        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          سوال شامل کریں
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
          >
            <option value="">زمرہ منتخب کریں</option>
            {categories.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

          {/* Question */}
          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              autoGenerateSEO();
            }}
            placeholder="سوال لکھیں"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white text-right"
          />

          {/* Answer */}
          <textarea
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              autoGenerateSEO();
            }}
            placeholder="جواب لکھیں"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white text-right"
          />

          {/* HAWALA (ARABIC STYLE) */}
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
                fontFamily: "Amiri, serif", // ✅ ARABIC FONT
                direction: "rtl",
              }}
            />
          ))}

          {/* BUTTON */}
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            جمع کریں
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}