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
        setBooks(data.books || []);
      })
      .catch(() => setBooks([]));
  }, []);

  if (!books.length) return null;

  const loopBooks = [...books, ...books];

  return (
    <section className="px-2 pb-8 mt-8">
      <div className="rounded-2xl border border-yellow-600/40 bg-white/90 shadow-lg p-4 overflow-hidden">
        <div className="text-center mb-4">
          <BookOpen className="mx-auto text-yellow-700 mb-1" size={28} />
          <h2 className="text-2xl md:text-3xl font-bold text-[#4b3415]">
            تازہ ترین اسلامی کتب
          </h2>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-3 animate-book-scroll w-max">
            {loopBooks.map((book, i) => {
              let fileId = "";

              if (book.pdf?.includes("/d/")) {
                fileId = book.pdf.split("/d/")[1]?.split("/")[0];
              } else if (book.pdf?.includes("id=")) {
                fileId = new URLSearchParams(
                  book.pdf.split("?")[1]
                ).get("id");
              }

              const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

              return (
                <Link
                  key={`${book._id}-${i}`}
                  href={`/books/${book._id}`}
                  className="w-[105px] sm:w-[125px] md:w-[150px] shrink-0"
                >
                  <div className="bg-white rounded-xl border shadow p-2 text-center hover:shadow-lg transition">
                    <iframe
                      src={previewUrl}
                      title={book.title}
                      className="w-full h-[120px] sm:h-[145px] md:h-[175px] rounded-lg border-0 pointer-events-none"
                    />

                    <h3
                      className="mt-2 text-[#2d1f10] text-sm md:text-lg line-clamp-1"
                      style={{
                        fontFamily: "'Jameel Noori Nastaleeq', serif",
                      }}
                    >
                      {book.title}
                    </h3>

                    <div className="mt-2 border border-yellow-600/50 rounded-lg py-1 text-[#6b4515] text-sm">
                      پڑھیں 📖
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-5">
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