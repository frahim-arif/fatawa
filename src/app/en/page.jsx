
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Mic } from "lucide-react";

export default function EnglishHomePage() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [majameen, setMajameen] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState(null);

  const backend = "https://f-backend-vdi1.onrender.com/api";

  // =========================================
  // FETCH ENGLISH CATEGORIES
  // =========================================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backend}/en/categories`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch English categories");
        }

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error(
          "English categories fetch error:",
          error
        );

        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // =========================================
  // FETCH LATEST ENGLISH QUESTIONS
  // =========================================
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `${backend}/en/questions?limit=5`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch English questions"
          );
        }

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setLatestQuestions(data.data);
        } else {
          setLatestQuestions([]);
        }
      } catch (error) {
        console.error(
          "English questions fetch error:",
          error
        );

        setLatestQuestions([]);
      }
    };

    fetchQuestions();
  }, []);

  // =========================================
  // FETCH ARTICLES
  // =========================================
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${backend}/majameen`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setMajameen(data.data.slice(0, 5));
        } else {
          setMajameen([]);
        }
      } catch (error) {
        console.error(
          "Articles fetch error:",
          error
        );

        setMajameen([]);
      }
    };

    fetchArticles();
  }, []);

  // =========================================
  // PRAYER TIMES
  // =========================================
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Guwahati&country=India&method=1"
        );

        const data = await res.json();

        if (data.code === 200) {
          setPrayerTimes(data.data.timings);
        }
      } catch (error) {
        console.error(
          "Prayer time error:",
          error
        );
      }
    };

    fetchPrayerTimes();
  }, []);

  // =========================================
  // VOICE SEARCH
  // =========================================
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice search is not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      setQuery(
        event.results[0][0].transcript
      );
    };

    recognition.start();
  };

  // =========================================
  // ENGLISH QUESTION
  // =========================================
  const getEnglishQuestion = (item) => {
    return item?.question || "";
  };

  // =========================================
  // ENGLISH CATEGORY
  // =========================================
  const getEnglishCategory = (item) => {
    return item?.name || "";
  };

  // =========================================
  // ENGLISH CATEGORY SLUG
  // =========================================
  const getEnglishCategorySlug = (item) => {
    return item?.slug || "";
  };

  // =========================================
  // ENGLISH ARTICLE TITLE
  // =========================================
  const getEnglishArticleTitle = (item) => {
    return (
      item?.englishTitle ||
      item?.enTitle ||
      item?.titleEn ||
      ""
    );
  };

  // =========================================
  // FILTER ENGLISH CATEGORIES
  // =========================================
  const englishCategories = categories.filter(
    (cat) => {
      const name = getEnglishCategory(cat);
      const slug = getEnglishCategorySlug(cat);

      return Boolean(name && slug);
    }
  );

  // =========================================
  // FILTER ENGLISH QUESTIONS
  // =========================================
  const filteredQuestions =
    latestQuestions.filter((item) => {
      const question =
        getEnglishQuestion(item);

      if (!question) {
        return false;
      }

      return question
        .toLowerCase()
        .includes(query.toLowerCase());
    });

  // =========================================
  // FILTER ENGLISH ARTICLES
  // =========================================
  const filteredArticles =
    majameen.filter((item) => {
      const title =
        getEnglishArticleTitle(item);

      if (!title) {
        return false;
      }

      return title
        .toLowerCase()
        .includes(query.toLowerCase());
    });

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =========================================
          HERO
      ========================================= */}

      <section
        className="relative overflow-hidden py-10 px-4"
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative max-w-6xl mx-auto text-center">

          <h1 className="text-3xl md:text-5xl font-bold text-yellow-300">
            Islamic Questions & Answers
          </h1>

          <p className="mt-3 text-yellow-100 text-base md:text-lg">
            Islamic knowledge based on the Quran and Sunnah
          </p>

        </div>
      </section>

      {/* =========================================
          PRAYER TIMES
      ========================================= */}

      <div className="bg-black border-b-2 border-[#75593f]">

        <div className="max-w-6xl mx-auto py-2 px-3 text-center text-yellow-400 text-sm md:text-base">

          {prayerTimes ? (
            <>
              Fajr: {prayerTimes.Fajr?.split(" ")[0]}

              <span className="mx-3">|</span>

              Dhuhr: {prayerTimes.Dhuhr?.split(" ")[0]}

              <span className="mx-3">|</span>

              Asr: {prayerTimes.Asr?.split(" ")[0]}

              <span className="mx-3">|</span>

              Maghrib: {prayerTimes.Maghrib?.split(" ")[0]}

              <span className="mx-3">|</span>

              Isha: {prayerTimes.Isha?.split(" ")[0]}
            </>
          ) : (
            "Loading prayer times..."
          )}

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-3 py-8">

        {/* =========================================
            SEARCH
        ========================================= */}

        <div className="relative mb-8">

          <div className="flex items-center bg-white border border-yellow-600 rounded-2xl shadow-md overflow-hidden">

            <div className="px-3">
              <Search className="w-5 h-5 text-yellow-600" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search Islamic questions..."
              className="
                w-full
                py-3
                outline-none
                text-gray-800
                bg-transparent
              "
            />

            <button
              onClick={startListening}
              className="px-4"
              type="button"
              aria-label="Voice Search"
            >
              <Mic className="w-5 h-5 text-yellow-600" />
            </button>

          </div>

        </div>

        {/* =========================================
            ENGLISH CATEGORIES
        ========================================= */}

        <section className="mb-10">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              Categories
            </h2>

            <Link
              href="/en/categories"
              className="text-yellow-700 font-semibold"
            >
              View All →
            </Link>

          </div>

          {englishCategories.length > 0 ? (

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              {englishCategories
                .slice(0, 8)
                .map((cat) => {

                  const categoryName =
                    getEnglishCategory(cat);

                  const categorySlug =
                    getEnglishCategorySlug(cat);

                  return (
                    <Link
                      key={cat._id}
                      href={`/en/categories/${encodeURIComponent(
                        categorySlug
                      )}`}
                      className="
                        flex items-center justify-center
                        min-h-[80px]
                        rounded-2xl
                        border border-[#c8b27a]
                        bg-gradient-to-b
                        from-[#f6f0dd]
                        via-[#e6d4a3]
                        to-[#c9ab63]
                        text-[#4b3415]
                        text-center
                        font-semibold
                        shadow-md
                        hover:scale-[1.02]
                        transition
                        px-3
                      "
                    >
                      {categoryName}
                    </Link>
                  );
                })}

            </div>

          ) : (

            <div className="rounded-xl border border-yellow-200 bg-white p-6 text-center text-gray-500">
              No English categories available.
            </div>

          )}

        </section>

        {/* =========================================
            QUICK LINKS
        ========================================= */}

        <section className="mb-10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            <Link
              href="/en/fatawa"
              className="
                rounded-xl
                bg-[#3b2f2f]
                text-yellow-200
                text-center
                py-4
                font-semibold
                hover:bg-[#4a3a3a]
              "
            >
              Fatwas
            </Link>

            <Link
              href="/en/articles"
              className="
                rounded-xl
                bg-[#3b2f2f]
                text-yellow-200
                text-center
                py-4
                font-semibold
                hover:bg-[#4a3a3a]
              "
            >
              Articles
            </Link>

            <Link
              href="/en/categories"
              className="
                rounded-xl
                bg-[#3b2f2f]
                text-yellow-200
                text-center
                py-4
                font-semibold
                hover:bg-[#4a3a3a]
              "
            >
              Categories
            </Link>

            <Link
              href="/ozan-shariah-calculator"
              className="
                rounded-xl
                bg-[#3b2f2f]
                text-yellow-200
                text-center
                py-4
                font-semibold
                hover:bg-[#4a3a3a]
              "
            >
              Islamic Calculator
            </Link>

          </div>

        </section>

        {/* =========================================
            LATEST ENGLISH QUESTIONS
        ========================================= */}

        <section className="mb-10">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              Latest Questions
            </h2>

            <Link
              href="/en/fatawa"
              className="text-yellow-700 font-semibold"
            >
              View All →
            </Link>

          </div>

          <div className="space-y-3">

            {filteredQuestions.length > 0 ? (

              filteredQuestions.map((item) => (

                <Link
                  key={item._id}
                  href={`/en/fatawa/${item.slug}`}
                  className="
                    block
                    bg-white
                    border border-yellow-200
                    rounded-xl
                    p-4
                    shadow-sm
                    hover:border-yellow-500
                    hover:shadow-md
                    transition
                  "
                >

                  <h3 className="text-gray-800 font-semibold">
                    {getEnglishQuestion(item)}
                  </h3>

                </Link>

              ))

            ) : (

              <p className="text-center text-gray-500 py-5">
                No English questions found.
              </p>

            )}

          </div>

        </section>

        {/* =========================================
            LATEST ARTICLES
        ========================================= */}

        <section>

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              Selected Articles
            </h2>

            <Link
              href="/en/articles"
              className="text-yellow-700 font-semibold"
            >
              View All →
            </Link>

          </div>

          <div className="space-y-3">

            {filteredArticles.length > 0 ? (

              filteredArticles.map((item) => (

                <Link
                  key={item._id}
                  href={`/en/articles/${
                    item.englishSlug ||
                    item.slug ||
                    item._id
                  }`}
                  className="
                    block
                    bg-white
                    border border-yellow-200
                    rounded-xl
                    p-4
                    shadow-sm
                    hover:border-yellow-500
                    hover:shadow-md
                    transition
                  "
                >
                  {getEnglishArticleTitle(item)}
                </Link>

              ))

            ) : (

              <p className="text-center text-gray-500 py-5">
                No English articles found.
              </p>

            )}

          </div>

        </section>

      </div>

    </main>
  );
}

