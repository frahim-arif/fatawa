"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function EnglishQuestionAddPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    englishQuestion: "",
    englishAnswer: "",
    englishHawala1: "",
    englishHawala2: "",
    englishHawala3: "",
    englishSlug: "",
    englishMetaTitle: "",
    englishMetaDescription: "",
    englishKeywords: "",
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
      englishQuestion: value,
      englishSlug:
        prev.englishSlug === "" ||
        prev.englishSlug === generateSlug(prev.englishQuestion)
          ? generateSlug(value)
          : prev.englishSlug,
    }));
  };

  // =========================================
  // SUBMIT
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.englishQuestion.trim()) {
      toast.error("English question is required");
      return;
    }

    if (!formData.englishAnswer.trim()) {
      toast.error("English answer is required");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        englishQuestion: formData.englishQuestion.trim(),
        englishAnswer: formData.englishAnswer,

        englishHawala1: formData.englishHawala1,
        englishHawala2: formData.englishHawala2,
        englishHawala3: formData.englishHawala3,

        englishSlug:
          formData.englishSlug.trim() ||
          generateSlug(formData.englishQuestion),

        englishMetaTitle:
          formData.englishMetaTitle.trim() ||
          formData.englishQuestion.trim(),

        englishMetaDescription:
          formData.englishMetaDescription.trim(),

        englishKeywords: formData.englishKeywords,

        category: formData.category,
      };

      const res = await axios.post(
        "/api/en/questions",
        payload
      );

      if (res.data?.success) {
        toast.success(
          res.data.message ||
            "English question added successfully"
        );

        setFormData({
          englishQuestion: "",
          englishAnswer: "",
          englishHawala1: "",
          englishHawala2: "",
          englishHawala3: "",
          englishSlug: "",
          englishMetaTitle: "",
          englishMetaDescription: "",
          englishKeywords: "",
          category: "",
        });

        // Optional: question list par bhejna
        // router.push("/admin/en");
      } else {
        toast.error(
          res.data?.message || "Something went wrong"
        );
      }
    } catch (error) {
      console.error(
        "English question submit error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to add English question"
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
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm border">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Add English Question
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Add English question, answer, hawala and SEO details.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/admin/en")}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
          {/* QUESTION */}
          {/* ================================= */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              English Content
            </h2>

            <div className="space-y-5">

              {/* Question */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  English Question *
                </label>

                <textarea
                  name="englishQuestion"
                  value={formData.englishQuestion}
                  onChange={handleQuestionChange}
                  rows={4}
                  placeholder="Enter English question"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  required
                />
              </div>

              {/* Answer */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  English Answer *
                </label>

                <textarea
                  name="englishAnswer"
                  value={formData.englishAnswer}
                  onChange={handleChange}
                  rows={10}
                  placeholder="Enter English answer"
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

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Hawala 1
                </label>

                <textarea
                  name="englishHawala1"
                  value={formData.englishHawala1}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter first reference"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Hawala 2
                </label>

                <textarea
                  name="englishHawala2"
                  value={formData.englishHawala2}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter second reference"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Hawala 3
                </label>

                <textarea
                  name="englishHawala3"
                  value={formData.englishHawala3}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter third reference"
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
                  English Slug
                </label>

                <input
                  type="text"
                  name="englishSlug"
                  value={formData.englishSlug}
                  onChange={handleChange}
                  placeholder="english-question-slug"
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
                  name="englishMetaTitle"
                  value={formData.englishMetaTitle}
                  onChange={handleChange}
                  placeholder="Enter SEO meta title"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Meta Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Meta Description
                </label>

                <textarea
                  name="englishMetaDescription"
                  value={formData.englishMetaDescription}
                  onChange={handleChange}
                  rows={4}
                  maxLength={160}
                  placeholder="Enter SEO meta description"
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
                  name="englishKeywords"
                  value={formData.englishKeywords}
                  onChange={handleChange}
                  placeholder="islam, namaz, roza, zakat"
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
                  {cat.name || cat.title || cat.categoryName}
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
                : "Add English Question"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}