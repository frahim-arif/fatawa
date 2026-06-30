// components/LatestBooksSlider.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";

export default function LatestBooksSlider() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://f-backend-vdi1.onrender.com/api/books")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBooks(data.data || []);
      })
      .catch(() => setBooks([]));
  }, []);

  if (!books.length) return null;

  const loopBooks = [...books, ...books];

  return (
    <section className="px-2 pb-8 mt-8">
      <div className="overflow-hidden rounded-2xl border border-yellow-600/40 bg-white/90 shadow-lg p-4">
        <div className="text-center mb-4">
          <BookOpen className="mx-auto text-yellow-700 mb-1" size={28} />
          <h2 className="text-2xl md:text-3xl font-bold text-[#4b3415]">
            تازہ ترین اسلامی کتب
          </h2>
          <p className="text-[#7a5f3e] text-sm md:text-lg mt-1">
            مستند اسلامی کتابیں، آسان مطالعہ اور ڈاؤنلوڈ
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-3 animate-book-scroll w-max">
            {loopBooks.map((book, i) => (
              <Link
                key={`${book._id}-${i}`}
                href={`/books/${book._id}`}
                className="w-[110px] sm:w-[130px] md:w-[160px] shrink-0"
              >
                <div className="bg-white rounded-xl border shadow p-2 text-center hover:shadow-lg transition">
                  <div className="h-[110px] sm:h-[130px] md:h-[170px] rounded-lg bg-gradient-to-b from-[#123b2a] to-[#061812] border-2 border-yellow-700 flex items-center justify-center overflow-hidden">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="text-yellow-400" size={34} />
                    )}
                  </div>

                  <h3 className="mt-2 text-[#2d1f10] text-sm md:text-lg font-semibold line-clamp-1">
                    {book.title}
                  </h3>

                  <div className="mt-2 border border-yellow-600/50 rounded-lg py-1 text-[#6b4515] text-sm md:text-base">
                    پڑھیں 📖
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-5">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-b from-yellow-500 to-yellow-700 text-white shadow text-base md:text-xl"
          >
            <Layers size={18} />
            تمام کتب دیکھیں
          </Link>
        </div>
      </div>
    </section>
  );
}