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

  // ✅ FIXED SLUG (Urdu supported)
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

      console.log("RESPONSE:", res.data);

      if (res.status === 200 && res.data.success) {
        setMessage("✅ سوال کامیابی سے شامل ہو گیا");

        // reset
        setCategory("");
        setQuestion("");
        setAnswer("");
        setHawala1("");
        setHawala2("");
        setHawala3("");

        // ✅ redirect FIXED
        router.push(`/questions/${slug}`);
      }
    } catch (err) {
      console.error("❌ ERROR:", err);

      if (err.response) {
        console.log("🔥 BACKEND:", err.response.data);
        setMessage(err.response.data.message || "❌ Bad Request");
      } else {
        setMessage("❌ Network Error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          سوال شامل کریں
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">زمرہ منتخب کریں</option>
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>

          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              autoGenerateSEO();
            }}
            placeholder="سوال"
            className="w-full border p-2 rounded"
          />

          <textarea
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              autoGenerateSEO();
            }}
            placeholder="جواب"
            className="w-full border p-2 rounded"
          />

          <button className="w-full bg-green-600 text-white p-2 rounded">
            جمع کریں
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}