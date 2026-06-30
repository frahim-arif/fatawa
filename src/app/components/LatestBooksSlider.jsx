// components/LatestBooksSlider.jsx
"use client";

import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";

export default function LatestBooksSlider({ books = [] }) {
  const demoBooks = [
    { title: "صحیح بخاری", category: "حدیث", link: "/books" },
    { title: "صحیح مسلم", category: "حدیث", link: "/books" },
    { title: "تفسیر ابن کثیر", category: "تفسیر", link: "/books" },
    { title: "زاد المعاد", category: "عقیدہ", link: "/books" },
    { title: "ریاض الصالحین", category: "دعائیں", link: "/books" },
    { title: "بلوغ المرام", category: "فقہ", link: "/books" },
  ];

  const items = books.length ? books : demoBooks;
  const loopItems = [...items, ...items];

  return (
    <section className="px-3 pb-10 mt-8">
      <div className="relative overflow-hidden rounded-[28px] border border-yellow-600/50 bg-white/85 shadow-xl p-5 md:p-8">
        <div className="text-center mb-6">
          <BookOpen className="mx-auto text-yellow-700 mb-2" size={34} />
          <h2 className="text-3xl md:text-4xl font-bold text-[#4b3415]">
            تازہ ترین اسلامی کتب
          </h2>
          <p className="text-[#7a5f3e] mt-2 text-lg">
            مستند اسلامی کتابوں کا انتخاب، آسان مطالعہ اور ڈاؤنلوڈ
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-4 animate-book-scroll w-max">
            {loopItems.map((book, i) => (
              <Link
                key={i}
                href={book.link || `/books/${book._id}`}
                className="w-[145px] md:w-[180px] shrink-0"
              >
                <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition p-3 text-center">
                  <div className="h-[150px] md:h-[190px] rounded-xl bg-gradient-to-b from-[#153d2b] to-[#071b13] border-4 border-yellow-700 flex items-center justify-center">
                    <BookOpen className="text-yellow-400" size={44} />
                  </div>

                  <h3 className="mt-3 text-[#2d1f10] text-lg md:text-xl font-semibold line-clamp-1">
                    {book.title}
                  </h3>

                  <span className="inline-block mt-2 px-4 py-1 rounded-full bg-gray-100 text-[#7a5f3e] text-sm">
                    {book.category || "اسلامی کتاب"}
                  </span>

                  <div className="mt-3 border border-yellow-600/50 rounded-xl py-2 text-[#6b4515]">
                    پڑھیں 📖
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-7">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-b from-yellow-500 to-yellow-700 text-white shadow-lg text-xl"
          >
            <Layers size={20} />
            تمام کتب دیکھیں
          </Link>
        </div>
      </div>
    </section>
  );
}