"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function EnglishCategoriesPage() {
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);

// =========================================
// FETCH CATEGORIES
// =========================================
useEffect(() => {
const fetchCategories = async () => {
try {
setLoading(true);

    const res = await fetch(`${backend}/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();

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
""
);
};

// =========================================
// ONLY ENGLISH CATEGORIES
// =========================================
const englishCategories = categories.filter((category) => {
const name = getEnglishCategory(category);
const slug = getEnglishCategorySlug(category);


return Boolean(name && slug);


});

return ( <main className="min-h-screen bg-[#f7f3e8]">


  {/* =========================================
      HERO
  ========================================= */}
  <section
    className="relative overflow-hidden py-12 px-4"
    style={{
      backgroundImage:
        "url('/images/ramadan_15_03_2022_1.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60" />

    <div className="relative max-w-6xl mx-auto text-center">

      <h1 className="text-3xl md:text-5xl font-bold text-yellow-300">
        Islamic Categories
      </h1>

      <p className="mt-3 text-yellow-100 text-base md:text-lg">
        Explore Islamic knowledge by different subjects
      </p>

    </div>
  </section>

  {/* =========================================
      CONTENT
  ========================================= */}
  <section className="max-w-6xl mx-auto px-3 sm:px-4 py-10">

    {/* =========================================
        HEADER
    ========================================= */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#4b3415]">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
              min-h-[90px]
              rounded-2xl
              bg-white
              border
              border-gray-200
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">

        {englishCategories.map((category) => {

          const categoryName =
            getEnglishCategory(category);

          const categorySlug =
            getEnglishCategorySlug(category);

          return (
            <Link
              key={category._id}
              href={`/en/categories/${encodeURIComponent(
                categorySlug
              )}`}
              className="
                group
                flex
                items-center
                justify-center
                min-h-[90px]
                md:min-h-[105px]
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
                md:text-base
                font-bold
                text-[#4b3415]
                shadow-md
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-lg
                hover:border-[#a88942]
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
      <div className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        px-6
        py-12
        text-center
        shadow-sm
      ">

        <div className="text-4xl mb-3">
          📚
        </div>

        <h3 className="text-lg font-semibold text-gray-700">
          No English Categories Available
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          English category names and slugs have not been
          added yet.
        </p>

        <Link
          href="/en"
          className="
            inline-block
            mt-5
            rounded-lg
            bg-[#3b2f2f]
            px-5
            py-2.5
            text-sm
            font-semibold
            text-yellow-200
            hover:bg-[#4a3a3a]
            transition
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
