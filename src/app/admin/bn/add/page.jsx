
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function BanglaQuestionAddPage() {
  const router = useRouter();

  // =========================================
  // BACKEND
  // =========================================
  const backend = "https://f-backend-vdi1.onrender.com/api";

  // =========================================
  // STATES
  // =========================================
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
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
  // FETCH CATEGORIES
  // =========================================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);

        const res = await axios.get(`${backend}/categories`);

        if (res.data?.success) {
          setCategories(res.data.data || []);
        } else {
          setCategories([]);
          toast.error(
            res.data?.message || "Failed to load categories"
          );
        }
      } catch (error) {
        console.error(
          "Category fetch error:",
          error.response?.data || error.message
        );

        setCategories([]);

        toast.error(
          error.response?.data?.message ||
            "Failed to load categories"
        );
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // =========================================
  // GET BANGLA CATEGORY NAME
  // =========================================
  const getCategoryName = (category) => {
    return (
      category?.banglaName?.trim() ||
      category?.name?.trim() ||
      "Unnamed Category"
    );
  };

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
  // GENERATE SLUG
  // =========================================
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // =========================================
  // QUESTION CHANGE + AUTO SLUG
  // =========================================
  const handleQuestionChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => {
      const oldGeneratedSlug = generateSlug(
        prev.banglaQuestion
      );

      const shouldUpdateSlug =
        prev.banglaSlug === "" ||
        prev.banglaSlug === oldGeneratedSlug;

      return {
        ...prev,
        banglaQuestion: value,
        banglaSlug: shouldUpdateSlug
          ? generateSlug(value)
          : prev.banglaSlug,
      };
    });
  };

  // =========================================
  // RESET FORM
  // =========================================
  const resetForm = () => {
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
  };

  // =========================================
  // SUBMIT
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // -----------------------------------------
    // VALIDATION
    // -----------------------------------------
    if (!formData.banglaQuestion.trim()) {
      toast.error("বাংলা প্রশ্ন লিখুন");
      return;
    }

    if (!formData.banglaAnswer.trim()) {
      toast.error("বাংলা উত্তর লিখুন");
      return;
    }

    if (!formData.category) {
      toast.error("ক্যাটাগরি নির্বাচন করুন");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        banglaQuestion:
          formData.banglaQuestion.trim(),

        banglaAnswer:
          formData.banglaAnswer.trim(),

        banglaHawala1:
          formData.banglaHawala1.trim(),

        banglaHawala2:
          formData.banglaHawala2.trim(),

        banglaHawala3:
          formData.banglaHawala3.trim(),

        banglaSlug:
          formData.banglaSlug.trim() ||
          generateSlug(formData.banglaQuestion),

        banglaMetaTitle:
          formData.banglaMetaTitle.trim() ||
          formData.banglaQuestion.trim(),

        banglaMetaDescription:
          formData.banglaMetaDescription.trim(),

        banglaKeywords:
          formData.banglaKeywords.trim(),

        category: formData.category,
      };

      // -----------------------------------------
      // API REQUEST
      // -----------------------------------------
      const res = await axios.post(
        `${backend}/bn/questions`,
        payload
      );

      // -----------------------------------------
      // SUCCESS
      // -----------------------------------------
      if (res.data?.success) {
        toast.success(
          res.data.message ||
            "বাংলা প্রশ্ন সফলভাবে যোগ হয়েছে"
        );

        resetForm();

        // Success toast dikhne ke baad Bangla home/list page
        setTimeout(() => {
          router.push("/admin/bn");
        }, 800);
      } else {
        toast.error(
          res.data?.message ||
            "প্রশ্ন যোগ করা যায়নি"
        );
      }
    } catch (error) {
      console.error(
        "Bangla question submit error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "বাংলা প্রশ্ন যোগ করতে ব্যর্থ হয়েছে"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // RENDER
  // =========================================
  return (
    <div
      className="min-h-screen bg-gray-50 px-4 py-8 md:px-8"
      dir="ltr"
    >
      <div className="mx-auto max-w-5xl">

        {/* =========================================
            HEADER
        ========================================= */}
        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Add Bangla Question
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Add Bangla question, answer, references,
                category and SEO details.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/admin/bn")}
              disabled={loading}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Back
            </button>

          </div>
        </div>

        {/* =========================================
            FORM
        ========================================= */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* =========================================
              BANGLA CONTENT
          ========================================= */}
          <section className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 border-b pb-3 text-lg font-semibold text-gray-800">
              Bangla Content
            </h2>

            <div className="space-y-5">

              {/* QUESTION */}
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
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm leading-7 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* ANSWER */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bangla Answer *
                </label>

                <textarea
                  name="banglaAnswer"
                  value={formData.banglaAnswer}
                  onChange={handleChange}
                  rows={14}
                  dir="ltr"
                  placeholder="বাংলা উত্তর লিখুন"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm leading-7 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

            </div>
          </section>

          {/* =========================================
              HAWALA
          ========================================= */}
          <section className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 border-b pb-3 text-lg font-semibold text-gray-800">
              Hawala / References
            </h2>

            <div className="space-y-5">

              {/* HAWALA 1 */}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm leading-7 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* HAWALA 2 */}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm leading-7 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* HAWALA 3 */}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm leading-7 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

            </div>
          </section>

          {/* =========================================
              SEO
          ========================================= */}
          <section className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 border-b pb-3 text-lg font-semibold text-gray-800">
              SEO Settings
            </h2>

            <div className="space-y-5">

              {/* SLUG */}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Slug automatically generates from the question.
                </p>
              </div>

              {/* META TITLE */}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* META DESCRIPTION */}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm leading-7 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Recommended: 150–160 characters.
                </p>
              </div>

              {/* KEYWORDS */}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Separate keywords with commas.
                </p>
              </div>

            </div>
          </section>

          {/* =========================================
              CATEGORY
          ========================================= */}
          <section className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 border-b pb-3 text-lg font-semibold text-gray-800">
              Category
            </h2>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Select Bangla Category *
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={categoryLoading}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="">
                {categoryLoading
                  ? "Loading Categories..."
                  : "Select Category"}
              </option>

              {!categoryLoading &&
                categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {getCategoryName(category)}
                  </option>
                ))}
            </select>

            {!categoryLoading &&
              categories.length === 0 && (
                <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  No categories found. Please add a category first.
                </p>
              )}

          </section>

          {/* =========================================
              ACTIONS
          ========================================= */}
          <div className="flex flex-col gap-3 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => router.push("/admin/bn")}
              disabled={loading}
              className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                categoryLoading ||
                categories.length === 0
              }
              className="min-w-[210px] rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
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

