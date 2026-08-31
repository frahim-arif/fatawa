"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BanglaArticleDetail({ params }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const backend = "https://f-backend-vdi1.onrender.com/api";

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const resolvedParams = await params;

        const slug = resolvedParams.slug;

        const res = await fetch(
          `${backend}/majameen`
        );

        const data = await res.json();

        if (data.success) {
          const found = data.data.find(
            (item) =>
              item.slug === slug ||
              item._id === slug
          );

          setArticle(found || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [params]);

  const getTitle = (item) => {
    return (
      item?.banglaTitle ||
      item?.bnTitle ||
      item?.titleBn ||
      item?.title
    );
  };

  const getContent = (item) => {
    return (
      item?.banglaContent ||
      item?.bnContent ||
      item?.contentBn ||
      item?.content ||
      item?.description
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        লোড হচ্ছে...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">

        <h1 className="text-2xl font-bold">
          প্রবন্ধ পাওয়া যায়নি
        </h1>

        <Link
          href="/bn/articles"
          className="mt-4 text-yellow-700"
        >
          ← প্রবন্ধে ফিরে যান
        </Link>

      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3e8] py-8 px-4">

      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-yellow-200">

        {/* TITLE */}
        <div className="bg-[#3b2f2f] px-6 py-7">

          <h1 className="text-2xl md:text-4xl font-bold text-yellow-200">

            {getTitle(article)}

          </h1>

        </div>

        {/* CONTENT */}
        <div
          className="p-6 md:p-10 text-gray-700 leading-8"
          dangerouslySetInnerHTML={{
            __html: getContent(article),
          }}
        />

      </article>

      <div className="max-w-4xl mx-auto mt-6">

        <Link
          href="/bn/articles"
          className="font-semibold text-[#75593f]"
        >
          ← সব প্রবন্ধ
        </Link>

      </div>

    </main>
  );
}