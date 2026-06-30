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

  const loopBooks = [...books, ...books];

  return (
    <section className="w-full px-1 sm:px-2 pb-6 mt-6">
      <div className="w-full overflow-hidden rounded-2xl border border-yellow-600/40 bg-white/90 shadow-lg p-3">
        <div className="text-center mb-3">
          <BookOpen className="mx-auto text-yellow-700 mb-1" size={26} />
          <h2
            className="text-2xl md:text-3xl font-bold text-[#4b3415]"
            style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
          >
            تازہ ترین اسلامی کتب
          </h2>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-3 w-max animate-book-scroll">
            {loopBooks.map((book, i) => {
              let fileId = "";

              if (book.pdf?.includes("/d/")) {
                fileId = book.pdf.split("/d/")[1]?.split("/")[0];
              } else if (book.pdf?.includes("id=")) {
                fileId = new URLSearchParams(book.pdf.split("?")[1]).get("id");
              }

              const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

              return (
                <Link
                  key={`${book._id}-${i}`}
                  href={`/books/${book._id}`}
                  className="w-[145px] sm:w-[160px] md:w-[175px] shrink-0"
                >
                  <div className="bg-white rounded-xl border border-yellow-200 shadow p-2 text-center hover:shadow-lg transition">
                    <iframe
                      src={previewUrl}
                      title={book.title}
                      className="w-full h-[95px] sm:h-[115px] md:h-[135px] rounded-lg border-0 pointer-events-none"
                    />

                    <h3
                      className="mt-2 text-[#2d1f10] text-[16px] md:text-lg line-clamp-1"
                      style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
                    >
                      {book.title}
                    </h3>

                    <div className="mt-2 rounded-lg border border-yellow-600/50 py-1 text-[#6b4515] text-sm">
                      پڑھیں 📖
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-4">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-b from-yellow-500 to-yellow-700 text-white shadow text-base"
          >
            <Layers size={18} />
            تمام کتب دیکھیں
          </Link>
        </div>
      </div>
    </section>
  );
}