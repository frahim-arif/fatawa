
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BookOpen, Layers, ArrowLeft } from "lucide-react";

export default function LatestBooksSlider() {
  const [books, setBooks] = useState([]);
  const sliderRef = useRef(null);

  /* =====================================================
     SLOW GREEN BORDER ANIMATION
  ===================================================== */

  useEffect(() => {
    const style = document.createElement("style");

    style.innerHTML = `
      @keyframes slow-spin {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }

      .animate-slow-spin {
        animation: slow-spin 10s linear infinite;
      }

      .books-scroll::-webkit-scrollbar {
        display: none;
      }

      .books-scroll {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  /* =====================================================
     FETCH BOOKS
  ===================================================== */

  useEffect(() => {
    fetch("https://f-backend-vdi1.onrender.com/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.books || []))
      .catch(() => setBooks([]));
  }, []);

  /* =====================================================
     AUTO SLIDER
  ===================================================== */

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || books.length <= 4) return;

    const timer = setInterval(() => {
      const cardWidth = slider.clientWidth / 4;

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - 5
      ) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        slider.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [books]);

  /* =====================================================
     NO BOOKS
  ===================================================== */

  if (!books.length) return null;

  /* =====================================================
     BOOK COVER
  ===================================================== */

  const getCover = (book) => {
    if (book.image) return book.image;

    let fileId = "";

    if (book.pdf?.includes("/d/")) {
      fileId = book.pdf
        .split("/d/")[1]
        ?.split("/")[0];
    } else if (book.pdf?.includes("id=")) {
      try {
        fileId = new URLSearchParams(
          book.pdf.split("?")[1]
        ).get("id");
      } catch {
        fileId = "";
      }
    }

    return fileId
      ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
      : "";
  };

  /* =====================================================
     DUPLICATE FOR CONTINUOUS SLIDER
  ===================================================== */

  const displayBooks = [...books, ...books];

  /* =====================================================
     UI
  ===================================================== */

  return (
    <section className="w-full px-2 pb-5 mt-7 relative z-10">
      <div
        className="
          relative
          overflow-hidden
          border
          border-[#C6E2C8]
          bg-[#F5FAF5]/95
          dark:bg-[#F5FAF5]/95
          shadow-[0_8px_28px_rgba(0,0,0,0.10)]
        "
      >
        {/* =================================================
            TOP GREEN LINE
        ================================================= */}

        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-[#75C178]
            to-transparent
          "
        />

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="px-3 pt-5 pb-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="hidden sm:block h-px w-12 bg-[#75C178]/60" />

            <div
              className="
                flex
                items-center
                justify-center
                w-9
                h-9
                border
                border-[#C6E2C8]
                bg-[#EAF5EA]
                text-[#75C178]
              "
            >
              <BookOpen size={20} />
            </div>

            <span className="hidden sm:block h-px w-12 bg-[#75C178]/60" />
          </div>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              text-[#333333]
            "
            style={{
              fontFamily:
                "'Jameel Noori Nastaleeq', serif",
              direction: "rtl",
            }}
          >
            تازہ ترین اسلامی کتب
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-[#63B56A]
            "
            style={{
              fontFamily:
                "'Jameel Noori Nastaleeq', serif",
              direction: "rtl",
            }}
          >
            اسلامی مطالعہ کے لیے منتخب کتب
          </p>
        </div>

        {/* =================================================
            BOOK SLIDER
        ================================================= */}

        <div
          ref={sliderRef}
          className="
            books-scroll
            flex
            overflow-x-scroll
            scroll-smooth
            px-2
            pb-2
          "
        >
          {displayBooks.map((book, i) => {
            const cover = getCover(book);

            return (
              <Link
                key={`${book._id}-${i}`}
                href={`/books/${book._id}`}
                className="
                  min-w-[25%]
                  px-1
                  group
                "
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    border
                    border-[#C6E2C8]
                    bg-white
                    dark:bg-white
                    p-1
                    text-center
                    shadow-[0_3px_12px_rgba(0,0,0,0.08)]
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:border-[#75C178]
                    group-hover:shadow-[0_7px_18px_rgba(0,0,0,0.14)]
                  "
                >
                  {/* BOOK COVER */}

                  <div className="relative h-[82px] overflow-hidden">
                    {/* Animated green frame */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-[conic-gradient(from_0deg,#63B56A,#C6E2C8,#75C178,#63B56A,#EAF5EA)]
                        animate-slow-spin
                      "
                    />

                    {/* Inner frame */}

                    <div
                      className="
                        absolute
                        inset-[2px]
                        overflow-hidden
                        bg-[#EAF5EA]
                      "
                    >
                      {cover ? (
                        <img
                          src={cover}
                          alt={book.title}
                          className="
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                          "
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="
                            w-full
                            h-full
                            flex
                            items-center
                            justify-center
                            bg-[#EAF5EA]
                          "
                        >
                          <BookOpen
                            className="text-[#75C178]"
                            size={30}
                          />
                        </div>
                      )}

                      {/* Subtle overlay */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/15
                          via-transparent
                          to-transparent
                          pointer-events-none
                        "
                      />
                    </div>
                  </div>

                  {/* BOOK TITLE */}

                  <h3
                    className="
                      mt-2
                      px-1
                      line-clamp-1
                      text-[12px]
                      text-[#333333]
                      dark:text-[#333333]
                    "
                    style={{
                      fontFamily:
                        "'Jameel Noori Nastaleeq', serif",
                      direction: "rtl",
                    }}
                  >
                    {book.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* =================================================
            VIEW ALL
        ================================================= */}

        <div className="text-center px-3 pt-3 pb-4">
          <Link
            href="/books"
            className="
              group
              inline-flex
              items-center
              gap-2
              border
              border-[#75C178]
              bg-[#75C178]
              px-5
              py-2
              text-sm
              text-white
              shadow-[0_3px_12px_rgba(0,0,0,0.10)]
              transition-all
              duration-300
              hover:bg-[#63B56A]
              hover:border-[#63B56A]
              hover:shadow-[0_5px_16px_rgba(117,193,120,0.25)]
            "
            style={{
              fontFamily:
                "'Jameel Noori Nastaleeq', serif",
              direction: "rtl",
            }}
          >
            <Layers size={16} />

            <span>تمام کتب دیکھیں</span>

            <ArrowLeft
              size={15}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

