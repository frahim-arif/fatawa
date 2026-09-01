
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function EnglishCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================
  // FETCH ENGLISH CATEGORIES
  // =========================================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        // IMPORTANT:
        // English categories API
        const res = await fetch(`${backend}/en/categories`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch English categories");
        }

        const data = await res.json();

        console.log("English Categories:", data);

        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("English categories fetch error:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // =========================================
  // GET ENGLISH CATEGORY NAME
  // =========================================
  const getEnglishCategory = (category) => {
    return (
      category?.englishName ||
      category?.enName ||
      category?.nameEn ||
      category?.name ||
      ""
    );
  };

  // =========================================
  // GET ENGLISH CATEGORY SLUG
  // =========================================
  const getEnglishCategorySlug = (category) => {
    return (
      category?.englishSlug ||
      category?.enSlug ||
      category?.slugEn ||
      category?.slug ||
      ""
    );
  };

  // =========================================
  // ONLY VALID ENGLISH CATEGORIES
  // =========================================
  const englishCategories = categories.filter((category) => {
    const name = getEnglishCategory(category);
    const slug = getEnglishCategorySlug(category);

    return Boolean(name && slug);
  });

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =========================================
          HERO
      ========================================= */}
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

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-300">
            Maslak-e-Deoband
          </p>

          <h1 className="text-3xl font-bold text-yellow-300 md:text-5xl">
            Islamic Categories
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base text-yellow-100 md:text-lg">
            Explore Islamic knowledge by different subjects
          </p>

        </div>
      </section>

      {/* =========================================
          CONTENT
      ========================================= */}
      <section className="mx-auto max-w-6xl px-3 py-8 md:px-4 md:py-10">

        {/* =========================================
            HEADER
        ========================================= */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-yellow-700">
              Explore
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#4b3415] md:text-3xl">
              Categories
            </h2>

            {!loading && englishCategories.length > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                {englishCategories.length} Islamic categories
              </p>
            )}

          </div>

          <Link
            href="/en"
            className="
              inline-flex
              items-center
              justify-center
              rounded-lg
              bg-[#3b2f2f]
              px-4
              py-2
              text-sm
              font-semibold
              text-yellow-200
              transition
              hover:bg-[#4a3a3a]
            "
          >
            ← Home
          </Link>

        </div>

        {/* =========================================
            LOADING
        ========================================= */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">

            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="
                  min-h-[90px]
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  animate-pulse
                "
              />
            ))}

          </div>
        )}

        {/* =========================================
            CATEGORY GRID
        ========================================= */}
        {!loading && englishCategories.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">

            {englishCategories.map((category) => {

              const categoryName =
                getEnglishCategory(category);

              const categorySlug =
                getEnglishCategorySlug(category);

              const categoryHref =
                `/en/categories/${encodeURIComponent(
                  categorySlug
                )}`;

              return (
                <Link
                  key={
                    category?._id ||
                    categorySlug
                  }
                  href={categoryHref}
                  className="
                    group
                    flex
                    min-h-[90px]
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[#c8b27a]
                    bg-gradient-to-b
                    from-[#f8f3e4]
                    via-[#e8d7a8]
                    to-[#c9ab63]
                    px-3
                    py-4
                    text-center
                    text-sm
                    font-bold
                    text-[#4b3415]
                    shadow-md
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:border-[#a88942]
                    hover:shadow-lg
                    md:min-h-[105px]
                    md:text-base
                  "
                >
                  <span className="leading-6">
                    {categoryName}
                  </span>
                </Link>
              );
            })}

          </div>
        )}

        {/* =========================================
            NO CATEGORIES
        ========================================= */}
        {!loading && englishCategories.length === 0 && (
          <div
            className="
              rounded-2xl
              border
              border-yellow-200
              bg-white
              px-6
              py-12
              text-center
              shadow-sm
            "
          >

            <div className="mb-3 text-4xl">
              📚
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
              No English Categories Available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              No English categories were found.
            </p>

            <Link
              href="/en"
              className="
                mt-5
                inline-block
                rounded-lg
                bg-[#3b2f2f]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-yellow-200
                transition
                hover:bg-[#4a3a3a]
              "
            >
              Back to Home
            </Link>

          </div>
        )}

      </section>

    </main>
  );
}

