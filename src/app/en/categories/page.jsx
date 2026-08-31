
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function EnglishCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backend}/categories`);
        const data = await res.json();

        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getEnglishCategory = (category) => {
    return (
      category.englishName ||
      category.enName ||
      category.nameEn ||
      category.name
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* HERO */}
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

      {/* CATEGORIES */}
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

        {loading ? (

          <div className="text-center py-12 text-gray-500">
            Loading categories...
          </div>

        ) : categories.length > 0 ? (

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            {categories.map((category) => (

              <Link
                key={category._id}
                href={`/en/categories/${encodeURIComponent(
                  category.slug || category.name
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
                {getEnglishCategory(category)}
              </Link>

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-xl p-10 text-center shadow-sm">

            <p className="text-gray-500">
              No categories found.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

