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
      .then((data) => setBooks(data.books || []))
      .catch(() => setBooks([]));
  }, []);

  if (!books.length) return null;

  const loopBooks = [...books, ...books, ...books, ...books];

  return (
    <section className="w-full px-1 pb-5 mt-6">
      <div className="w-full overflow-hidden rounded-2xl border border-yellow-600/40 bg-white/95 shadow-lg p-3">
        <div className="text-center mb-3">
          <BookOpen className="mx-auto text-yellow-700 mb-1" size={24} />
          <h2
            className="text-2xl font-bold text-[#4b3415]"
            style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
          >
            تازہ ترین اسلامی کتب
          </h2>
        </div>

        <div className="relative overflow-hidden w-full">
          <div className="book-slider-track">
            {loopBooks.map((book, i) => (
              <Link
                key={`${book._id}-${i}`}
                href={`/books/${book._id}`}
                className="w-[95px] sm:w-[115px] md:w-[145px] shrink-0"
              >
                <div className="rounded-xl border border-yellow-200 bg-white shadow p-2 text-center">
                  <div className="h-[95px] sm:h-[115px] md:h-[145px] rounded-lg bg-gradient-to-b from-[#14532d] via-[#166534] to-[#052e16] border-2 border-yellow-600 flex items-center justify-center px-1">
                    <BookOpen className="text-yellow-300 absolute opacity-20" size={52} />

                    <h3
                      className="relative z-10 text-white text-[15px] sm:text-[17px] md:text-xl leading-7 line-clamp-3"
                      style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
                    >
                      {book.title}
                    </h3>
                  </div>

                  <div className="mt-2 rounded-lg bg-yellow-600 text-white py-1 text-xs">
                    پڑھیں
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-b from-yellow-500 to-yellow-700 text-white shadow text-sm"
          >
            <Layers size={16} />
            تمام کتب دیکھیں
          </Link>
        </div>
      </div>
    </section>
  );
}