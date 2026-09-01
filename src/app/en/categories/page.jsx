
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
        console.error("English categories error:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // =========================================
  // CATEGORY NAME
  // =========================================
  const getCategoryName = (category) => {
    return (
      category?.englishName ||
      category?.enName ||
      category?.nameEn ||
      category?.name ||
      ""
    );
  };

  // =========================================
  // CATEGORY SLUG
  // =========================================
  const getCategorySlug = (category) => {
    return (
      category?.englishSlug ||
      category?.enSlug ||
      category?.slugEn ||
      category?.slug ||
      ""
    );
  };

  // =========================================
  // CLEAN CATEGORIES
  // =========================================
  const englishCategories = categories.filter((category) => {
    const name = getCategoryName(category);
    const slug = getCategorySlug(category);

    return Boolean(name && slug);
  });

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =========================================
          HERO
      ========================================= */}
      <section
        className="relative overflow-hidden px-4 py-12"
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold text-yellow-300 md:text-5xl">
            Islamic Categories
          </h1>

          <p className="mt-3 text-base text-yellow-100 md:text-lg">
            Explore Islamic questions by category
          </p>
        </div>
      </section>

      {/* =========================================
          CONTENT
      ========================================= */}
      <section className="mx-auto max-w-6xl px-3 py-10 md:px-4">

        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-bold text-[#4b3415] md:text-3xl">
              Categories
            </h2>

            {!loading && englishCategories.length > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                {englishCategories.length} categories available
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
                  animate-pulse
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                "
              />
            ))}

          </div>
        )}

        {/* =========================================
            CATEGORIES
        ========================================= */}
        {!loading && englishCategories.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">

            {englishCategories.map((category) => {
              const categoryName = getCategoryName(category);
              const categorySlug = getCategorySlug(category);

              return (
                <Link
                  key={category?._id || categorySlug}
                  href={`/en/categories/${encodeURIComponent(
                    categorySlug
                  )}`}
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
                    hover:border-yellow-600
                    hover:shadow-lg
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
            EMPTY
        ========================================= */}
        {!loading && englishCategories.length === 0 && (
          <div className="rounded-2xl border border-yellow-200 bg-white px-6 py-12 text-center shadow-sm">

            <div className="mb-3 text-4xl">
              📚
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
              No English Categories Available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              No English categories were returned by the server.
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

