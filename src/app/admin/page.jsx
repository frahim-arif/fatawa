"use client";
import { useState, useEffect } from "react";
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

  // ✅ Safe slug generator for Urdu/Arabic
  const generateSlug = (text) => {
    if (!text) return "no-slug";
    return encodeURIComponent(
      text
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .toLowerCase()
    );
  };

  // ✅ Auto-generate keywords & metaTitle
  const autoGenerateSEO = () => {
    if (question && !metaTitle) setMetaTitle(question);
    setKeywords(
      `${question || ""}, ${category || ""}, ${hawala1 || ""}, ${hawala2 || ""}, ${
        hawala3 || ""
      }`
    );
  };

  // ✅ MetaDescription auto-update when answer changes
  useEffect(() => {
    if (answer && !metaDescription)
      setMetaDescription(answer.substring(0, 150) + "...");
  }, [answer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate required fields
    if (!category || !question || !answer) {
      setMessage("❌ براہ کرم تمام ضروری فیلڈز بھرے۔");
      return;
    }

    try {
      const backend = "https://f-backend-vdi1.onrender.com/api/admin/questions"; // Render backend URL
      const slug = generateSlug(question);

      // ✅ Fallbacks for SEO fields to avoid server errors
      const titleToSend = metaTitle || question || "No Title";
      const descriptionToSend =
        metaDescription || answer.substring(0, 150) || "No description";
      const keywordsToSend =
        keywords || `${question}, ${category}, ${hawala1}, ${hawala2}, ${hawala3}`;

      // ✅ Log payload for debugging
      console.log({
        category,
        question,
        answer,
        hawala1,
        hawala2,
        hawala3,
        slug,
        metaTitle: titleToSend,
        metaDescription: descriptionToSend,
        keywords: keywordsToSend,
      });

      // const res = await axios.post(`${backend}/`, {
      //   category,
      //   question,
      //   answer,
      //   hawala1,
      //   hawala2,
      //   hawala3,
      //   slug,
      //   metaTitle: titleToSend,
      //   metaDescription: descriptionToSend,
      //   keywords: keywordsToSend,
      // });

      if (res.status === 200 && res.data.success) {
        setMessage("✅ سوال کامیابی سے شامل کر دیا گیا ہے!");
        // Clear all fields
        setCategory("");
        setQuestion("");
        setAnswer("");
        setHawala1("");
        setHawala2("");
        setHawala3("");
        setMetaTitle("");
        setMetaDescription("");
        setKeywords("");
        router.push("/"); // redirect after submit
      } else {
        setMessage("❌ کچھ غلط ہو گیا، دوبارہ کوشش کریں۔");
      }
    } catch (err) {
      if (err.response) {
        console.error("Axios Response Error:", err.response.data);
        setMessage(
          "❌ Backend error: " +
            (err.response.data?.message || "Try again later")
        );
      } else if (err.request) {
        console.error("Axios Request Error:", err.request);
        setMessage("❌ Backend request failed. Check network.");
      } else {
        console.error("Axios General Error:", err.message);
        setMessage("❌ کچھ غلط ہو گیا، دوبارہ کوشش کریں۔");
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
          {/* Category Dropdown */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              زمرہ منتخب کریں
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                autoGenerateSEO();
              }}
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

          {/* Question */}
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
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">جواب</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 font-jameel"
            />
          </div>

          {/* Hawala fields */}
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <label className="block mb-2 font-semibold text-gray-700">
                حوالہ {i}
              </label>
              <textarea
                value={i === 1 ? hawala1 : i === 2 ? hawala2 : hawala3}
                onChange={(e) =>
                  i === 1
                    ? setHawala1(e.target.value)
                    : i === 2
                    ? setHawala2(e.target.value)
                    : setHawala3(e.target.value)
                }
                rows={3}
                className="w-full border rounded-lg p-2 h-24 focus:ring-2 focus:ring-green-500 quran-text"
              />
            </div>
          ))}

          {/* SEO */}
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
            />

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