"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BanglaCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const backend = "https://f-backend-vdi1.onrender.com/api";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${backend}/categories`
        );

        const data = await res.json();

        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryName = (item) => {
    return (
      item.banglaName ||
      item.bnName ||
      item.nameBn ||
      item.name
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      <section className="bg-[#3b2f2f] py-10 text-center">

        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300">
          বিষয়সমূহ
        </h1>

        <p className="mt-2 text-yellow-100">
          ইসলামী বিষয় অনুযায়ী প্রশ্নসমূহ
        </p>

      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {loading ? (

          <p className="text-center">
            লোড হচ্ছে...
          </p>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {categories.map((item) => (

              <Link
                key={item._id}
                href={`/bn/categories/${encodeURIComponent(
                  item.slug || item.name
                )}`}
                className="
                  min-h-[110px]
                  flex
                  items-center
                  justify-center
                  text-center
                  p-4
                  rounded-2xl
                  border border-[#c8b27a]
                  bg-gradient-to-b
                  from-[#f6f0dd]
                  via-[#e6d4a3]
                  to-[#c9ab63]
                  text-[#4b3415]
                  font-bold
                  shadow-md
                  hover:scale-[1.03]
                  transition
                "
              >
                {getCategoryName(item)}
              </Link>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}