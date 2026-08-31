
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function BanglaQuestionAddPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    banglaQuestion: "",
    banglaAnswer: "",
    banglaHawala1: "",
    banglaHawala2: "",
    banglaHawala3: "",
    banglaSlug: "",
    banglaMetaTitle: "",
    banglaMetaDescription: "",
    banglaKeywords: "",
    category: "",
  });

  // =========================================
  // GET CATEGORIES
  // =========================================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/admin/categories");

        if (res.data?.success) {
          setCategories(res.data.data || []);
        }
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  // =========================================
  // HANDLE INPUT
  // =========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // AUTO SLUG
  // =========================================
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleQuestionChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      banglaQuestion: value,
      banglaSlug:
        prev.banglaSlug === "" ||
        prev.banglaSlug === generateSlug(prev.banglaQuestion)
          ? generateSlug(value)
          : prev.banglaSlug,
    }));
  };

  // =========================================
  // SUBMIT
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.banglaQuestion.trim()) {
      toast.error("Bangla question is required");
      return;
    }

    if (!formData.banglaAnswer.trim()) {
      toast.error("Bangla answer is required");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        banglaQuestion: formData.banglaQuestion.trim(),

        banglaAnswer: formData.banglaAnswer,

        banglaHawala1: formData.banglaHawala1,
        banglaHawala2: formData.banglaHawala2,
        banglaHawala3: formData.banglaHawala3,

        banglaSlug:
          formData.banglaSlug.trim() ||
          generateSlug(formData.banglaQuestion),

        banglaMetaTitle:
          formData.banglaMetaTitle.trim() ||
          formData.banglaQuestion.trim(),

        banglaMetaDescription:
          formData.banglaMetaDescription.trim(),

        banglaKeywords: formData.banglaKeywords,

        category: formData.category,
      };

      const res = await axios.post(
        "/api/bn/questions",
        payload
      );

      if (res.data?.success) {
        toast.success(
          res.data.message ||
            "Bangla question added successfully"
        );

        setFormData({
          banglaQuestion: "",
          banglaAnswer: "",
          banglaHawala1: "",
          banglaHawala2: "",
          banglaHawala3: "",
          banglaSlug: "",
          banglaMetaTitle: "",
          banglaMetaDescription: "",
          banglaKeywords: "",
          category: "",
        });

        // Question list par jana ho to:
        // router.push("/admin/bn");
      } else {
        toast.error(
          res.data?.message || "Something went wrong"
        );
      }
    } catch (error) {
      console.error(
        "Bangla question submit error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to add Bangla question"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}
        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Add Bangla Question
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Add Bangla question, answer, hawala and SEO details.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/admin/bn")}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Back
            </button>

          </div>
        </div>

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ================================= */}
          {/* BANGLA CONTENT */}
          {/* ================================= */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Bangla Content
            </h2>

            <div className="space-y-5">

              {/* Question */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bangla Question *
                </label>

                <textarea
                  name="banglaQuestion"
                  value={formData.banglaQuestion}
                  onChange={handleQuestionChange}
                  rows={4}
                  dir="ltr"
                  placeholder="বাংলা প্রশ্ন লিখুন"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  required
                />
              </div>

              {/* Answer */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bangla Answer *
                </label>

                <textarea
                  name="banglaAnswer"
                  value={formData.banglaAnswer}
                  onChange={handleChange}
                  rows={10}
                  dir="ltr"
                  placeholder="বাংলা উত্তর লিখুন"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  required
                />
              </div>

            </div>
          </div>

          {/* ================================= */}
          {/* HAWALA */}
          {/* ================================= */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Hawala / References
            </h2>

            <div className="space-y-5">

              {/* Hawala 1 */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Hawala 1
                </label>

                <textarea
                  name="banglaHawala1"
                  value={formData.banglaHawala1}
                  onChange={handleChange}
                  rows={3}
                  dir="ltr"
                  placeholder="প্রথম হাওয়ালা / রেফারেন্স লিখুন"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Hawala 2 */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Hawala 2
                </label>

                <textarea
                  name="banglaHawala2"
                  value={formData.banglaHawala2}
                  onChange={handleChange}
                  rows={3}
                  dir="ltr"
                  placeholder="দ্বিতীয় হাওয়ালা / রেফারেন্স লিখুন"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Hawala 3 */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Hawala 3
                </label>

                <textarea
                  name="banglaHawala3"
                  value={formData.banglaHawala3}
                  onChange={handleChange}
                  rows={3}
                  dir="ltr"
                  placeholder="তৃতীয় হাওয়ালা / রেফারেন্স লিখুন"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

            </div>
          </div>

          {/* ================================= */}
          {/* SEO */}
          {/* ================================= */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              SEO Settings
            </h2>

            <div className="space-y-5">

              {/* Slug */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bangla Slug
                </label>

                <input
                  type="text"
                  name="banglaSlug"
                  value={formData.banglaSlug}
                  onChange={handleChange}
                  placeholder="bangla-question-slug"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Slug automatically generates from the question.
                </p>
              </div>

              {/* Meta Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Meta Title
                </label>

                <input
                  type="text"
                  name="banglaMetaTitle"
                  value={formData.banglaMetaTitle}
                  onChange={handleChange}
                  placeholder="SEO meta title লিখুন"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Meta Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Meta Description
                </label>

                <textarea
                  name="banglaMetaDescription"
                  value={formData.banglaMetaDescription}
                  onChange={handleChange}
                  rows={4}
                  maxLength={160}
                  dir="ltr"
                  placeholder="SEO meta description লিখুন"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Recommended: 150–160 characters.
                </p>
              </div>

              {/* Keywords */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Keywords
                </label>

                <input
                  type="text"
                  name="banglaKeywords"
                  value={formData.banglaKeywords}
                  onChange={handleChange}
                  placeholder="নামাজ, রোজা, যাকাত, ইসলাম"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Separate keywords with commas.
                </p>
              </div>

            </div>
          </div>

          {/* ================================= */}
          {/* CATEGORY */}
          {/* ================================= */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Category
            </h2>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((cat) => (
                <option
                  key={cat._id}
                  value={cat._id}
                >
                  {cat.name ||
                    cat.title ||
                    cat.categoryName}
                </option>
              ))}
            </select>

          </div>

          {/* ================================= */}
          {/* SUBMIT */}
          {/* ================================= */}
          <div className="flex justify-end rounded-xl border bg-white p-6 shadow-sm">

            <button
              type="submit"
              disabled={loading}
              className="min-w-[180px] rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Adding..."
                : "Add Bangla Question"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
