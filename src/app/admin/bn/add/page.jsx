"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const backend = "https://f-backend-vdi1.onrender.com/api";

const initialFormData = {
  question: "",
  answer: "",
  hawala1: "",
  hawala2: "",
  hawala3: "",
  slug: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  category: "",
};

// =====================================================
// BANGLA → ROMAN
// =====================================================

const banglaToRoman = (text = "") => {
  const map = {
    "অ": "a",
    "আ": "a",
    "ই": "i",
    "ঈ": "i",
    "উ": "u",
    "ঊ": "u",
    "ঋ": "ri",
    "এ": "e",
    "ঐ": "oi",
    "ও": "o",
    "ঔ": "ou",

    "ক": "k",
    "খ": "kh",
    "গ": "g",
    "ঘ": "gh",
    "ঙ": "ng",

    "চ": "ch",
    "ছ": "chh",
    "জ": "j",
    "ঝ": "jh",
    "ঞ": "n",

    "ট": "t",
    "ঠ": "th",
    "ড": "d",
    "ঢ": "dh",
    "ণ": "n",

    "ত": "t",
    "থ": "th",
    "দ": "d",
    "ধ": "dh",
    "ন": "n",

    "প": "p",
    "ফ": "ph",
    "ব": "b",
    "ভ": "bh",
    "ম": "m",

    "য": "j",
    "র": "r",
    "ল": "l",

    "শ": "sh",
    "ষ": "sh",
    "স": "s",
    "হ": "h",

    "ড়": "r",
    "ঢ়": "rh",
    "য়": "y",

    "ৎ": "t",
    "ং": "ng",
    "ঃ": "h",
    "ঁ": "n",
    "্": "",

    "া": "a",
    "ি": "i",
    "ী": "i",
    "ু": "u",
    "ূ": "u",
    "ৃ": "ri",
    "ে": "e",
    "ৈ": "oi",
    "ো": "o",
    "ৌ": "ou",

    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  return text
    .split("")
    .map((char) => map[char] ?? char)
    .join("");
};

// =====================================================
// GENERATE ROMAN SLUG
// =====================================================

const generateSlug = (text = "") => {
  const romanText = banglaToRoman(text);

  return romanText
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .filter(Boolean)
    .slice(0, 12)
    .join("-");
};

export default function BanglaQuestionAddPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] =
    useState(initialFormData);

  // =====================================================
  // GET BANGLA CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);

        const res = await axios.get(
          `${backend}/bn/categories`,
          {
            timeout: 30000,
          }
        );

        console.log(
          "Bangla categories API:",
          res.data
        );

        if (
          res.data?.success &&
          Array.isArray(res.data?.data)
        ) {
          setCategories(res.data.data);
        } else {
          setCategories([]);

          toast.error(
            res.data?.message ||
              "Bangla categories not found"
          );
        }
      } catch (error) {
        console.error(
          "Bangla category fetch error:",
          error.response?.data ||
            error.message
        );

        setCategories([]);

        toast.error(
          error.response?.data?.message ||
            "Failed to load Bangla categories"
        );
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // =====================================================
  // NORMAL INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // QUESTION CHANGE
  // AUTO GENERATE ROMAN SLUG
  // =====================================================

  const handleQuestionChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,

      question: value,

      // Always keep slug synchronized with question
      slug: generateSlug(value),
    }));
  };

  // =====================================================
  // SLUG CHANGE
  // ONLY ROMAN CHARACTERS ALLOWED
  // =====================================================

  const handleSlugChange = (e) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    setFormData((prev) => ({
      ...prev,
      slug: value,
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question.trim()) {
      toast.error(
        "Bangla question is required"
      );
      return;
    }

    if (!formData.answer.trim()) {
      toast.error(
        "Bangla answer is required"
      );
      return;
    }

    if (!formData.category) {
      toast.error(
        "Please select a Bangla category"
      );
      return;
    }

    try {
      setLoading(true);

      // IMPORTANT:
      // Slug is always generated from question.
      const generatedSlug =
        generateSlug(formData.question);

      const payload = {
        question:
          formData.question.trim(),

        answer:
          formData.answer.trim(),

        hawala1:
          formData.hawala1.trim(),

        hawala2:
          formData.hawala2.trim(),

        hawala3:
          formData.hawala3.trim(),

        slug: generatedSlug,

        metaTitle:
          formData.metaTitle.trim() ||
          formData.question.trim(),

        metaDescription:
          formData.metaDescription.trim(),

        keywords:
          formData.keywords.trim(),

        category:
          formData.category,
      };

      console.log(
        "================================="
      );

      console.log(
        "Bangla question payload:",
        payload
      );

      console.log(
        "Generated Roman slug:",
        generatedSlug
      );

      console.log(
        "================================="
      );

      const res = await axios.post(
        `${backend}/bn/questions`,
        payload,
        {
          timeout: 30000,
        }
      );

      console.log(
        "Bangla question response:",
        res.data
      );

      if (res.data?.success) {
        toast.success(
          res.data.message ||
            "Bangla question added successfully"
        );

        // Reset form
        setFormData({
          ...initialFormData,
        });
      } else {
        toast.error(
          res.data?.message ||
            "Failed to add Bangla question"
        );
      }
    } catch (error) {
      console.error(
        "Bangla question submit error:",
        error.response?.data ||
          error.message
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

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Add Bangla Question
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Add Bangla question, answer,
                references, category and SEO details.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                router.push("/admin/bn")
              }
              disabled={loading}
              className="
                rounded-lg
                border
                border-gray-300
                px-4
                py-2
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              Back
            </button>

          </div>
        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ================================================= */}
          {/* BANGLA CONTENT */}
          {/* ================================================= */}

          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Bangla Content
            </h2>

            <div className="space-y-5">

              {/* QUESTION */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bangla Question *
                </label>

                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleQuestionChange}
                  rows={4}
                  dir="auto"
                  placeholder="বাংলা প্রশ্ন লিখুন"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
                  required
                />
              </div>

              {/* ANSWER */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bangla Answer *
                </label>

                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  rows={12}
                  dir="auto"
                  placeholder="বাংলা উত্তর লিখুন"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
                  required
                />
              </div>

            </div>
          </div>

          {/* ================================================= */}
          {/* HAWALA */}
          {/* ================================================= */}

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
                  name="hawala1"
                  value={formData.hawala1}
                  onChange={handleChange}
                  rows={3}
                  dir="auto"
                  placeholder="প্রথম হাওয়ালা / রেফারেন্স লিখুন"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Hawala 2
                </label>

                <textarea
                  name="hawala2"
                  value={formData.hawala2}
                  onChange={handleChange}
                  rows={3}
                  dir="auto"
                  placeholder="দ্বিতীয় হাওয়ালা / রেফারেন্স লিখুন"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Hawala 3
                </label>

                <textarea
                  name="hawala3"
                  value={formData.hawala3}
                  onChange={handleChange}
                  rows={3}
                  dir="auto"
                  placeholder="তৃতীয় হাওয়ালা / রেফারেন্স লিখুন"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
                />
              </div>

            </div>
          </div>

          {/* ================================================= */}
          {/* SEO */}
          {/* ================================================= */}

          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              SEO Settings
            </h2>

            <div className="space-y-5">

              {/* ROMAN SLUG */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Roman URL Slug
                </label>

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleSlugChange}
                  placeholder="roman-question-slug"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-gray-50
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
                />

                <p className="mt-1 text-xs text-gray-400">
                  Automatically generated in Roman
                  characters from the Bangla question.
                </p>
              </div>

              {/* META TITLE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Meta Title
                </label>

                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  placeholder="SEO meta title লিখুন"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
                />
              </div>

              {/* META DESCRIPTION */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Meta Description
                </label>

                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows={4}
                  maxLength={160}
                  dir="auto"
                  placeholder="SEO meta description লিখুন"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
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
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="নামাজ, রোজা, যাকাত, ইসলাম"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
                />

                <p className="mt-1 text-xs text-gray-400">
                  Separate keywords with commas.
                </p>
              </div>

            </div>
          </div>

          {/* ================================================= */}
          {/* CATEGORY */}
          {/* ================================================= */}

          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Bangla Category
            </h2>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={categoriesLoading}
              required
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-green-600
                focus:ring-2
                focus:ring-green-100
                disabled:cursor-not-allowed
                disabled:bg-gray-100
              "
            >

              <option value="">
                {categoriesLoading
                  ? "Loading Bangla categories..."
                  : "Select Bangla Category"}
              </option>

              {!categoriesLoading &&
                categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                  >
                    {cat.name}
                  </option>
                ))}

            </select>

            {!categoriesLoading &&
              categories.length > 0 && (
                <p className="mt-2 text-xs text-green-600">
                  {categories.length} Bangla categories loaded
                </p>
              )}

            {!categoriesLoading &&
              categories.length === 0 && (
                <p className="mt-2 text-sm text-red-500">
                  No Bangla categories found.
                </p>
              )}

          </div>

          {/* ================================================= */}
          {/* SUBMIT */}
          {/* ================================================= */}

          <div className="flex justify-end rounded-xl border bg-white p-6 shadow-sm">

            <button
              type="submit"
              disabled={
                loading ||
                categoriesLoading ||
                categories.length === 0
              }
              className="
                min-w-[220px]
                rounded-lg
                bg-green-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-green-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
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