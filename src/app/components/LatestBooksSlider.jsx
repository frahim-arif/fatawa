"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";

export default function LatestBooksSlider() {
  const [books, setBooks] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");

    style.innerHTML = `
      @keyframes slow-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .animate-slow-spin {
        animation: slow-spin 8s linear infinite;
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    fetch("https://f-backend-vdi1.onrender.com/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.books || []))
      .catch(() => setBooks([]));
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || books.length <= 4) return;

    const timer = setInterval(() => {
      const cardWidth = slider.clientWidth / 4;

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [books]);

  if (!books.length) return null;

 const getCover = (book) => {
  if (book.image) {
    return book.image;
  }

  let fileId = "";

  if (book.pdf?.includes("/d/")) {
    fileId = book.pdf.split("/d/")[1]?.split("/")[0];
  } else if (book.pdf?.includes("id=")) {
    try {
      fileId = new URL(book.pdf).searchParams.get("id") || "";
    } catch {
      fileId = "";
    }
  }

  return fileId
    ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
    : "";
};

  const displayBooks = [...books, ...books];

  return (
    <section className="w-full px-2 pb-6 mt-6">
      <div className="rounded-2xl border border-yellow-600/40 bg-white/95 shadow-lg p-3 overflow-hidden">
        <div className="text-center mb-3">
          <BookOpen className="mx-auto text-blue-950 mb-1" size={24} />

          <h2 className="text-2xl font-bold text-[#4b3415]">
            تازہ ترین اسلامی کتب
          </h2>
        </div>

        <div
          ref={sliderRef}
          className="flex overflow-x-scroll scroll-smooth no-scrollbar"
        >
          {displayBooks.map((book, i) => {
            const cover = getCover(book);

            return (
              <Link
                key={`${book._id}-${i}`}
                href={`/books/${book._id}`}
                className="min-w-[25%] px-1"
              >
                <div className="rounded-xl border border-blue-200 bg-white shadow p-1 text-center hover:shadow-lg transition">
                  <div className="relative h-[75px] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 rounded-lg bg-[conic-gradient(from_0deg,#06b6d4,#2563eb,#1d4ed8,#38bdf8,#06b6d4)] animate-slow-spin"></div>

                    <div className="absolute inset-[2px] rounded-[6px] bg-[#14532d] overflow-hidden">
                      {cover ? (
                        <img
                          src={cover}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="text-cyan-300" size={30} />
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-1 line-clamp-1 text-[#2d1f10] text-[11px]">
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