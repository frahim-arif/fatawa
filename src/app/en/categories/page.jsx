
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
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // =========================================
  // ENGLISH CATEGORY NAME
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
  // ENGLISH CATEGORY SLUG
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

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =========================================
          HERO
      ========================================= */}
      <section
        className="relative overflow-hidden py-10 px-4"
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

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
          CATEGORIES
      ========================================= */}
      <section className="max-w-6xl mx-auto px-3 py-10">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl md:text-3xl font-bold text-[#4b3415]">
            Categories
          </h2>

          <Link
            href="/en"
            className="text-yellow-700 font-semibold"
          >
            Home →
          </Link>

        </div>

        {/* =========================================
            LOADING
        ========================================= */}
        {loading ? (

          <div className="text-center py-12 text-gray-500">
            Loading categories...
          </div>

        ) : englishCategories.length > 0 ? (

          /* =========================================
             CATEGORY GRID
          ========================================= */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            {englishCategories.map((category) => {

              const categoryName =
                getEnglishCategory(category);

              const categorySlug =
                getEnglishCategorySlug(category);

              return (
                <Link
                  key={category._id}
                 href={`/en/categories/${encodeURIComponent(
  category.englishSlug || category.slug || category.name
)}`}
                  className="
                    flex items-center justify-center
                    min-h-[80px]
                    rounded-2xl
                    border border-[#c8b27a]
                    bg-gradient-to-b
                    from-[#f6f0dd]
                    via-[#e6d4a3]
                    to-[#c9ab63]
                    text-[#4b3415]
                    text-center
                    font-semibold
                    shadow-md
                    hover:scale-[1.02]
                    hover:shadow-lg
                    transition
                    px-3
                  "
                >
                  {categoryName}
                </Link>
              );
            })}

          </div>

        ) : (

          /* =========================================
             NO ENGLISH CATEGORIES
          ========================================= */
          <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-gray-200">

            <p className="text-gray-500">
              No English categories available.
            </p>

            <p className="text-sm text-gray-400 mt-2">
              English category names and slugs have not been added yet.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

