// components/LatestBooksSlider.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { BookOpen, Layers } from "lucide-react";

export default function LatestBooksSlider() {
  const [books, setBooks] = useState([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      direction: "ltr",
      slidesToScroll: 1,
      containScroll: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 1600,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  useEffect(() => {
    fetch("https://f-backend-vdi1.onrender.com/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.books || []))
      .catch(() => setBooks([]));
  }, []);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, books]);

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

  if (!books.length) return null;

  const displayBooks = [...books, ...books, ...books, ...books];

  return (
    <section className="w-full px-1 pb-5 mt-6">
      <div className="w-full overflow-hidden rounded-2xl border border-yellow-600/40 bg-white/95 shadow-lg p-3">
        <div className="text-center mb-3">
          <BookOpen className="mx-auto text-blue-950 mb-1" size={24} />
          <h2
            className="text-2xl font-bold text-[#4b3415]"
            style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
          >
            تازہ ترین اسلامی کتب
          </h2>
        </div>

        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex">
            {displayBooks.map((book, index) => {
              const cover = getCover(book);

              return (
                <div
                  key={`${book._id}-${index}`}
                  className="
                    flex-[0_0_25%]
                    sm:flex-[0_0_22%]
                    md:flex-[0_0_16.666%]
                    lg:flex-[0_0_14.285%]
                    px-1
                  "
                >
                  <Link href={`/books/${book._id}`}>
                    <div className="rounded-xl border border-yellow-200 bg-white shadow hover:shadow-lg transition-all duration-300 p-1.5 text-center">
                      <div className="h-[75px] sm:h-[115px] md:h-[145px] overflow-hidden rounded-lg border-2 border-yellow-600 bg-[#14532d]">
                        {cover ? (
                          <img
                            src={cover}
                            alt={book.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="text-yellow-300" size={32} />
                          </div>
                        )}
                      </div>

                      <h3
                        className="mt-1.5 line-clamp-1 text-[#2d1f10] text-[11px] sm:text-[13px] md:text-base leading-5"
                        style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
                      >
                        {book.title}
                      </h3>

                      <div className="mt-1.5 rounded-lg bg-gradient-to-b from-yellow-500 to-yellow-700 py-1 text-[10px] text-white">
                        📖 پڑھیں
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
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