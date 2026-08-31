"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BanglaCategoryDetail({ params }) {
  const [questions, setQuestions] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const backend = "https://f-backend-vdi1.onrender.com/api";

  useEffect(() => {
    const loadData = async () => {
      try {
        const resolvedParams = await params;

        const slug = decodeURIComponent(
          resolvedParams.slug
        );

        // Find category
        const categoryRes = await fetch(
          `${backend}/categories`
        );

        const categoryData =
          await categoryRes.json();

        let actualCategory = slug;

        if (categoryData.success) {
          const foundCategory =
            categoryData.data.find(
              (item) =>
                item.slug === slug ||
                item.name === slug
            );

          if (foundCategory) {
            actualCategory =
              foundCategory.name;

            setCategoryName(
              foundCategory.banglaName ||
              foundCategory.bnName ||
              foundCategory.nameBn ||
              foundCategory.name
            );
          }
        }

        // Fetch questions
        const questionRes = await fetch(
          `${backend}/admin/questions/category/${encodeURIComponent(
            actualCategory
          )}?skip=0&limit=5000`
        );

        const questionData =
          await questionRes.json();

        if (questionData.success) {
          setQuestions(questionData.data);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params]);

  const getQuestion = (item) => {
    return (
      item.banglaQuestion ||
      item.bnQuestion ||
      item.questionBn ||
      item.question
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      <section className="bg-[#3b2f2f] py-10 px-4 text-center">

        <p className="text-yellow-300 mb-2">
          বিষয়
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-white">

          {categoryName || "প্রশ্নসমূহ"}

        </h1>

      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {loading ? (

          <p className="text-center">
            লোড হচ্ছে...
          </p>

        ) : questions.length > 0 ? (

          <div className="space-y-3">

            {questions.map((item) => (

              <Link
                key={item._id}
                href={`/bn/fatawa/${item.slug}`}
                className="
                  block
                  bg-white
                  border border-yellow-200
                  rounded-xl
                  p-5
                  shadow-sm
                  hover:border-yellow-500
                  hover:shadow-md
                  transition
                "
              >
                <h2 className="font-semibold text-[#3b2f2f]">

                  {getQuestion(item)}

                </h2>

              </Link>

            ))}

          </div>

        ) : (

          <div className="text-center">

            <p className="text-gray-500 text-lg">
              এই বিভাগে কোনো প্রশ্ন পাওয়া যায়নি।
            </p>

          </div>

        )}

        <div className="mt-8">

          <Link
            href="/bn/categories"
            className="font-semibold text-[#75593f]"
          >
            ← সব বিষয় দেখুন
          </Link>

        </div>

      </div>

    </main>
  );
}