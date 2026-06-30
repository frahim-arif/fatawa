"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
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

  return (
    <section className="latest-books-section">
      <div className="latest-books-header">
        <BookOpen size={24} />
        <h2>تازہ ترین اسلامی کتب</h2>
      </div>

      <Marquee
        speed={28}
        gradient={false}
        pauseOnHover
        autoFill
      >
        {books.map((book) => {
          const cover = getCover(book);

          return (
            <Link
              key={book._id}
              href={`/books/${book._id}`}
              className="book-card"
            >
              <div className="book-image">
                {cover ? (
                  <img
                    src={cover}
                    alt={book.title}
                    loading="lazy"
                  />
                ) : (
                  <BookOpen size={34} color="#fff" />
                )}
              </div>

              <h3>{book.title}</h3>

              <span>📖 پڑھیں</span>
            </Link>
          );
        })}
      </Marquee>

      <div className="books-btn-wrap">
        <Link href="/books" className="books-btn">
          <Layers size={16} />
          تمام کتب دیکھیں
        </Link>
      </div>
    </section>
  );
}