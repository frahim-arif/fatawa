"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminAddQuestion() {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hawala1, setHawala1] = useState("");
  const [hawala2, setHawala2] = useState("");
  const [hawala3, setHawala3] = useState("");

  // ✅ SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  // ✅ SLUG (IMPORTANT)
  const [slug, setSlug] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  // ✅ SLUG GENERATOR (Urdu + English support)
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // ✅ AUTO SEO GENERATION
  useEffect(() => {
    if (question && !metaTitle) {
      setMetaTitle(`${question} | Maslak e Deoband`);
    }

    // 🔥 slug sirf tab auto banega jab empty ho
    if (!slug && (metaTitle || question)) {
      setSlug(generateSlug(metaTitle || question));
    }

    if (answer) {
      setMetaDescription(answer.substring(0, 155));
    }

    if (question && category) {
      setKeywords(
        `${question}, ${category}, اسلامی سوال جواب, فتوی, islamic fatwa`
      );
    }
  }, [question, answer, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !question || !answer) {
      setMessage("❌ براہ کرم تمام ضروری فیلڈز بھرے۔");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const backend =
        "https://f-backend-vdi1.onrender.com/api/admin/questions";

      const payload = {
        category,
        question,
        answer,
        hawala1,
        hawala2,
        hawala3,
        metaTitle,
        metaDescription,
        keywords,
        slug, // ✅ MUST
      };

      const res = await axios.post(`${backend}/`, payload);

      if (res.status === 200 && res.data.success) {
        setMessage("✅ سوال کامیابی سے شامل کر دیا گیا ہے!");

        // Reset
        setCategory("");
        setQuestion("");
        setAnswer("");
        setHawala1("");
        setHawala2("");
        setHawala3("");
        setMetaTitle("");
        setMetaDescription("");
        setKeywords("");
        setSlug("");

        router.push("/");
      } else {
        setMessage("❌ کچھ غلط ہو گیا، دوبارہ کوشش کریں۔");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ سرور ایرر، دوبارہ کوشش کریں۔");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          سوال شامل کریں
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold">زمرہ منتخب کریں</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">زمرہ منتخب کریں</option>
              {categories.map((cat, i) => (
                <option key={i}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Question */}
          <div>
            <label className="block mb-2 font-semibold">سوال</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block mb-2 font-semibold">جواب</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border p-2 rounded"
              rows={4}
            />
          </div>

          {/* Hawala */}
          {[1, 2, 3].map((i) => (
            <textarea
              key={i}
              placeholder={`حوالہ ${i}`}
              value={i === 1 ? hawala1 : i === 2 ? hawala2 : hawala3}
              onChange={(e) =>
                i === 1
                  ? setHawala1(e.target.value)
                  : i === 2
                    ? setHawala2(e.target.value)
                    : setHawala3(e.target.value)
              }
              className="w-full border p-2 rounded quran-text"
            />
          ))}

          {/* SEO */}
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-bold mb-2">SEO</h2>

            <input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Meta Title"
              className="w-full border p-2 mb-2"
            />

            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Meta Description"
              className="w-full border p-2 mb-2"
            />

            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Keywords"
              className="w-full border p-2"
            />
          </div>

          {/* SLUG Preview */}
          <div>
            <label className="font-semibold">Slug (URL)</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading ? "⏳..." : "سوال جمع کریں"}
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}