"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function EnglishCategoryPage({ params }) {
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GET SLUG
  // =====================================================

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSlug(decodeURIComponent(resolvedParams.slug || ""));
    };

    getParams();
  }, [params]);

  // =====================================================
  // FETCH CATEGORY + QUESTIONS
  // =====================================================

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // -------------------------------------------------
        // FETCH CATEGORIES
        // -------------------------------------------------

        const categoryRes = await fetch(
          `${backend}/en/categories`,
          {
            cache: "no-store",
          }
        );

        if (!categoryRes.ok) {
          throw new Error("Failed to fetch categories");
        }

        const categoryData = await categoryRes.json();

        const categories = Array.isArray(categoryData?.data)
          ? categoryData.data
          : [];

        // Find selected category
        const selectedCategory = categories.find((cat) => {
          const categorySlug =
            cat?.englishSlug ||
            cat?.enSlug ||
            cat?.slugEn ||
            cat?.slug ||
            "";

          return categorySlug === slug;
        });

        setCategory(selectedCategory || null);

        // -------------------------------------------------
        // FETCH ALL ENGLISH QUESTIONS
        // -------------------------------------------------

        const questionRes = await fetch(
          `${backend}/en/questions?limit=5000`,
          {
            cache: "no-store",
          }
        );

        if (!questionRes.ok) {
          throw new Error("Failed to fetch English questions");
        }

        const questionData = await questionRes.json();

        const allQuestions = Array.isArray(questionData?.data)
          ? questionData.data
          : [];

        // -------------------------------------------------
        // FILTER QUESTIONS BY CATEGORY
        // -------------------------------------------------

        const categoryId = selectedCategory?._id;

        const categoryQuestions = allQuestions.filter((item) => {
          const itemCategory = item?.category;

          if (!itemCategory) {
            return false;
          }

          // If populated category object
          if (typeof itemCategory === "object") {
            const itemCategoryId = itemCategory?._id;

            const itemCategorySlug =
              itemCategory?.englishSlug ||
              itemCategory?.enSlug ||
              itemCategory?.slugEn ||
              itemCategory?.slug ||
              "";

            return (
              (categoryId &&
                String(itemCategoryId) ===
                  String(categoryId)) ||
              itemCategorySlug === slug
            );
          }

          // If category is only ObjectId
          return (
            categoryId &&
            String(itemCategory) === String(categoryId)
          );
        });

        setQuestions(categoryQuestions);
      } catch (err) {
        console.error(
          "English category page error:",
          err
        );

        setError(
          err.message ||
            "Failed to load category questions."
        );

        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // =====================================================
  // HELPERS
  // =====================================================

  const getQuestion = (item) => {
    return (
      item?.question ||
      item?.englishQuestion ||
      item?.enQuestion ||
      item?.questionEn ||
      ""
    );
  };

  const filteredQuestions = questions.filter((item) =>
    getQuestion(item)
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  // =====================================================
  // CATEGORY NAME
  // =====================================================

  const categoryName =
    category?.englishName ||
    category?.enName ||
    category?.nameEn ||
    category?.name ||
    "Islamic Questions";

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="relative overflow-hidden px-4 py-12 md:py-16"
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative mx-auto max-w-6xl text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-300">
            Maslak-e-Deoband
          </p>

          <h1 className="mt-3 text-3xl font-bold text-yellow-300 md:text-5xl">
            {categoryName}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-yellow-100 md:text-lg">
            Islamic questions and answers related to{" "}
            {categoryName}
          </p>

        </div>
      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="mx-auto max-w-6xl px-3 py-8 md:px-4">

        {/* =================================================
            BACK
        ================================================= */}

        <div className="mb-6">
          <Link
            href="/en/categories"
            className="inline-flex items-center gap-2 font-semibold text-yellow-700 transition hover:text-yellow-900"
          >
            <ArrowLeft className="h-4 w-4" />
            All Categories
          </Link>
        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="mb-8">

          <div className="flex items-center overflow-hidden rounded-2xl border border-yellow-600 bg-white shadow-md">

            <div className="shrink-0 px-3">
              <Search className="h-5 w-5 text-yellow-600" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder={`Search questions in ${categoryName}...`}
              className="w-full bg-transparent py-3 text-gray-800 outline-none"
            />

          </div>

        </section>

        {/* =================================================
            TITLE
        ================================================= */}

        <section className="mb-6">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-2xl font-bold text-[#4b3415] md:text-3xl">
                Questions in {categoryName}
              </h2>

              {!loading && (
                <p className="mt-1 text-sm text-gray-500">
                  {questions.length} question
                  {questions.length !== 1 ? "s" : ""} found
                </p>
              )}
            </div>

          </div>

        </section>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="rounded-2xl border border-yellow-200 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">
              Loading questions...
            </p>
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

            <p className="font-semibold text-red-600">
              {error}
            </p>

          </div>
        )}

        {/* =================================================
            QUESTIONS
        ================================================= */}

        {!loading &&
          !error &&
          filteredQuestions.length > 0 && (
            <section className="space-y-3">

              {filteredQuestions.map((item) => {

                const question = getQuestion(item);

                return (
                  <Link
                    key={item._id}
                    href={`/en/fatawa/${encodeURIComponent(
                      item.slug || item._id
                    )}`}
                    className="
                      block
                      rounded-2xl
                      border
                      border-yellow-200
                      bg-white
                      p-5
                      shadow-sm
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:border-yellow-500
                      hover:shadow-md
                    "
                  >

                    <h3 className="font-semibold leading-7 text-gray-800">
                      {question}
                    </h3>

                    <span className="mt-2 inline-block text-sm font-semibold text-yellow-700">
                      Read Fatwa →
                    </span>

                  </Link>
                );
              })}

            </section>
          )}

        {/* =================================================
            NO QUESTIONS
        ================================================= */}

        {!loading &&
          !error &&
          filteredQuestions.length === 0 && (
            <div className="rounded-2xl border border-yellow-200 bg-white p-10 text-center shadow-sm">

              <h3 className="text-lg font-semibold text-gray-700">
                {query
                  ? "No questions found."
                  : `No questions found in ${categoryName}.`}
              </h3>

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-4 font-semibold text-yellow-700 hover:text-yellow-900"
                >
                  Clear Search
                </button>
              )}

            </div>
          )}

      </div>
    </main>
  );
}