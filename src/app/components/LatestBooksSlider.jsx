"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";

export default function LatestBooksSlider() {
  const [books, setBooks] = useState([]);
  const [start, setStart] = useState(0);

  useEffect(() => {
    fetch("https://f-backend-vdi1.onrender.com/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.books || []))
      .catch(() => setBooks([]));
  }, []);

  useEffect(() => {
    if (books.length <= 4) return;

    const timer = setInterval(() => {
      setStart((prev) => (prev + 1) % books.length);
    }, 1800);

    return () => clearInterval(timer);
  }, [books]);

  if (!books.length) return null;

  const getCover = (book) => {
    if (book.image) return book.image;

    let fileId = "";
    if (book.pdf?.includes("/d/")) {
      fileId = book.pdf.split("/d/")[1]?.split("/")[0];
    } else if (book.pdf?.includes("id=")) {
      fileId = new URLSearchParams(book.pdf.split("?")[1]).get("id");
    }

    return fileId
      ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
      : "";
  };

  const visibleBooks = Array.from({ length: 4 }, (_, i) => {
    return books[(start + i) % books.length];
  });

  return (
    <section className="w-full px-2 pb-6 mt-6">
      <div className="rounded-2xl border border-yellow-600/40 bg-white/95 shadow-lg p-3 overflow-hidden">
        <div className="text-center mb-3">
          <BookOpen className="mx-auto text-blue-950 mb-1" size={24} />
          <h2 className="text-2xl font-bold text-[#4b3415]">
            تازہ ترین اسلامی کتب
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-2 transition-all duration-700 ease-in-out">
          {visibleBooks.map((book) => {
            const cover = getCover(book);

            return (
              <Link key={book._id} href={`/books/${book._id}`}>
                <div className="rounded-xl border border-yellow-200 bg-white shadow p-1 text-center transition-all duration-700 ease-in-out">
                  <div className="h-[75px] sm:h-[105px] md:h-[135px] overflow-hidden rounded-lg border-2 border-yellow-600 bg-[#14532d]">
                    {cover ? (
                      <img
                        src={cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="text-yellow-300" size={30} />
                      </div>
                    )}
                  </div>

                  <h3 className="mt-1 line-clamp-1 text-[#2d1f10] text-[11px] sm:text-[13px]">
                    {book.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-4">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-yellow-500 to-yellow-700 px-5 py-2 text-sm text-white shadow"
          >
            <Layers size={16} />
            تمام کتب دیکھیں
          </Link>
        </div>
      </div>
    </section>
  );
}