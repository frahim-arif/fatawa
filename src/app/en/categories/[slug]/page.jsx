"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function EnglishCategoryPage() {
  const params = useParams();

  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug;

  const decodedSlug = slug
    ? decodeURIComponent(slug)
    : "";

  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH CATEGORY + QUESTIONS
  // =====================================================

  useEffect(() => {
    if (!decodedSlug) return;

    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError("");

        // =================================================
        // 1. CATEGORY
        // =================================================

        const categoryRes = await fetch(
          `${backend}/en/categories/${encodeURIComponent(
            decodedSlug
          )}`,
          {
            cache: "no-store",
          }
        );

        if (!categoryRes.ok) {
          throw new Error(
            `Category API failed: ${categoryRes.status}`
          );
        }

        const categoryData =
          await categoryRes.json();

        if (
          categoryData?.success &&
          categoryData?.data
        ) {
          setCategory(categoryData.data);
        } else {
          setCategory(null);
        }

        // =================================================
        // 2. QUESTIONS BY CATEGORY
        // =================================================

        const questionsRes = await fetch(
          `${backend}/en/questions?category=${encodeURIComponent(
            decodedSlug
          )}&limit=100`,
          {
            cache: "no-store",
          }
        );

        if (!questionsRes.ok) {
          throw new Error(
            `Questions API failed: ${questionsRes.status}`
          );
        }

        const questionsData =
          await questionsRes.json();

        if (
          questionsData?.success &&
          Array.isArray(questionsData?.data)
        ) {
          setQuestions(questionsData.data);
        } else {
          setQuestions([]);
        }

      } catch (err) {
        console.error(
          "English category page error:",
          err
        );

        setError(
          err?.message ||
            "Unable to load category."
        );

        setCategory(null);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [decodedSlug]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f3e8]">

        <div className="mx-auto max-w-6xl px-4 py-16">

          <div className="rounded-2xl border border-yellow-200 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-yellow-200 border-t-yellow-700" />

            <p className="text-lg text-gray-500">
              Loading category...
            </p>

          </div>

        </div>

      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <main className="min-h-screen bg-[#f7f3e8]">

        <div className="mx-auto max-w-6xl px-4 py-16">

          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center shadow-sm">

            <div className="mb-3 text-4xl">
              ⚠️
            </div>

            <h1 className="text-2xl font-bold text-red-700">
              Unable to Load Category
            </h1>

            <p className="mt-3 text-gray-600">
              {error}
            </p>

            <p className="mt-3 break-all text-sm text-gray-400">
              Slug: {decodedSlug}
            </p>

            <Link
              href="/en/categories"
              className="mt-6 inline-block rounded-xl bg-[#3b2f2f] px-6 py-3 font-semibold text-yellow-200"
            >
              ← Back to Categories
            </Link>

          </div>

        </div>

      </main>
    );
  }

  // =====================================================
  // CATEGORY NOT FOUND
  // =====================================================

  if (!category) {
    return (
      <main className="min-h-screen bg-[#f7f3e8]">

        <div className="mx-auto max-w-6xl px-4 py-16">

          <div className="rounded-2xl border border-yellow-200 bg-white p-10 text-center shadow-sm">

            <div className="mb-3 text-4xl">
              📚
            </div>

            <h1 className="text-2xl font-bold text-[#4b3415]">
              Category Not Found
            </h1>

            <p className="mt-3 text-gray-500">
              No English category was found for:
            </p>

            <p className="mt-2 font-semibold text-yellow-700">
              {decodedSlug}
            </p>

            <Link
              href="/en/categories"
              className="mt-6 inline-block rounded-xl bg-[#3b2f2f] px-6 py-3 font-semibold text-yellow-200"
            >
              ← Back to Categories
            </Link>

          </div>

        </div>

      </main>
    );
  }

  // =====================================================
  // CATEGORY NAME
  // =====================================================

  const categoryName =
    category?.englishName ||
    category?.enName ||
    category?.nameEn ||
    category?.name ||
    "English Category";

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="relative overflow-hidden px-4 py-14 md:py-20"
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative mx-auto max-w-6xl text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-300">
            Maslak-e-Deoband
          </p>

          <h1 className="mt-3 text-3xl font-bold text-yellow-300 md:text-5xl">
            {categoryName}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-yellow-100 md:text-lg">
            Islamic questions and answers related to{" "}
            {categoryName}.
          </p>

        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-6xl px-3 py-8 md:px-4">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <div className="mb-7 flex flex-wrap items-center gap-2 text-sm">

          <Link
            href="/en"
            className="font-semibold text-yellow-700 hover:text-yellow-900"
          >
            Home
          </Link>

          <span className="text-gray-400">
            /
          </span>

          <Link
            href="/en/categories"
            className="font-semibold text-yellow-700 hover:text-yellow-900"
          >
            Categories
          </Link>

          <span className="text-gray-400">
            /
          </span>

          <span className="text-gray-600">
            {categoryName}
          </span>

        </div>

        {/* =================================================
            CATEGORY INFO
        ================================================= */}

        <div className="mb-8 rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-widest text-yellow-700">
                Islamic Category
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#4b3415] md:text-3xl">
                {categoryName}
              </h2>

            </div>

            <div className="rounded-xl bg-[#f7f3e8] px-4 py-3 text-center">

              <p className="text-2xl font-bold text-[#4b3415]">
                {questions.length}
              </p>

              <p className="text-xs text-gray-500">
                Questions
              </p>

            </div>

          </div>

          {category?.description && (
            <p className="mt-4 leading-7 text-gray-600">
              {category.description}
            </p>
          )}

        </div>

        {/* =================================================
            QUESTIONS HEADER
        ================================================= */}

        <div className="mb-5">

          <p className="text-xs font-semibold uppercase tracking-widest text-yellow-700">
            Questions & Answers
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#4b3415] md:text-3xl">
            {categoryName} Questions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Browse Islamic questions related to{" "}
            {categoryName}.
          </p>

        </div>

        {/* =================================================
            QUESTIONS
        ================================================= */}

        {questions.length > 0 ? (

          <div className="space-y-3">

            {questions.map((item) => {

              const question =
                item?.question ||
                item?.englishQuestion ||
                item?.enQuestion ||
                item?.questionEn ||
                "";

              const questionSlug =
                item?.slug ||
                item?._id;

              if (!question) {
                return null;
              }

              return (
                <Link
                  key={
                    item?._id ||
                    questionSlug
                  }
                  href={`/en/fatawa/${encodeURIComponent(
                    questionSlug
                  )}`}
                  className="
                    group
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

                  <h3 className="
                    text-base
                    font-semibold
                    leading-7
                    text-gray-800
                    transition
                    group-hover:text-[#5a421c]
                    md:text-lg
                  ">
                    {question}
                  </h3>

                  <span className="
                    mt-3
                    inline-block
                    text-sm
                    font-semibold
                    text-yellow-700
                  ">
                    Read Fatwa →
                  </span>

                </Link>
              );
            })}

          </div>

        ) : (

          <div className="rounded-2xl border border-yellow-200 bg-white p-10 text-center shadow-sm">

            <div className="mb-3 text-4xl">
              📖
            </div>

            <h3 className="text-xl font-semibold text-[#4b3415]">
              No Questions Found
            </h3>

            <p className="mt-2 text-gray-500">
              There are currently no English questions
              available in this category.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">

              <Link
                href="/en/categories"
                className="rounded-xl border border-yellow-300 px-5 py-2.5 font-semibold text-yellow-800"
              >
                Browse Categories
              </Link>

              <Link
                href="/en/fatawa"
                className="rounded-xl bg-[#3b2f2f] px-5 py-2.5 font-semibold text-yellow-200"
              >
                View All Fatwas
              </Link>

            </div>

          </div>
        )}

      </section>
    </main>
  );
}