
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Mic } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function EnglishHomePage() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [majameen, setMajameen] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState(null);

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
        console.error("English categories fetch error:", error);
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
          throw new Error("Failed to fetch English questions");
        }

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setLatestQuestions(data.data.slice(0, 5));
        } else {
          setLatestQuestions([]);
        }
      } catch (error) {
        console.error("English questions fetch error:", error);
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
        console.error("Articles fetch error:", error);
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

        if (!res.ok) {
          throw new Error("Failed to fetch prayer times");
        }

        const data = await res.json();

        if (data.code === 200) {
          setPrayerTimes(data.data.timings);
        }
      } catch (error) {
        console.error("Prayer time error:", error);
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
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      setQuery(event.results[0][0].transcript);
    };

    recognition.onerror = (event) => {
      console.error("Voice search error:", event.error);
    };

    recognition.start();
  };

  // =========================================
  // GET ENGLISH QUESTION
  // =========================================
  const getEnglishQuestion = (item) => {
    return (
      item?.englishQuestion ||
      item?.enQuestion ||
      item?.question ||
      ""
    );
  };

  // =========================================
  // GET ENGLISH CATEGORY NAME
  // =========================================
  const getEnglishCategory = (item) => {
    return (
      item?.name ||
      item?.englishName ||
      item?.enName ||
      item?.nameEn ||
      ""
    );
  };

  // =========================================
  // GET ENGLISH CATEGORY SLUG
  // =========================================
  const getEnglishCategorySlug = (item) => {
    return (
      item?.slug ||
      item?.englishSlug ||
      item?.enSlug ||
      item?.slugEn ||
      ""
    );
  };

  // =========================================
  // GET ENGLISH ARTICLE TITLE
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
  // ENGLISH CATEGORIES
  // =========================================
  const englishCategories = categories.filter((cat) => {
    const name = getEnglishCategory(cat);
    const slug = getEnglishCategorySlug(cat);

    return Boolean(name && slug);
  });

  // =========================================
  // FILTER QUESTIONS
  // =========================================
  const filteredQuestions = latestQuestions.filter((item) => {
    const question = getEnglishQuestion(item);

    if (!question) {
      return false;
    }

    return question
      .toLowerCase()
      .includes(query.trim().toLowerCase());
  });

  // =========================================
  // FILTER ARTICLES
  // =========================================
  const filteredArticles = majameen.filter((item) => {
    const title = getEnglishArticleTitle(item);

    if (!title) {
      return false;
    }

    return title
      .toLowerCase()
      .includes(query.trim().toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =========================================
          HERO
      ========================================= */}
      <section
        className="relative overflow-hidden px-4 py-10"
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold text-yellow-300 md:text-5xl">
            Islamic Questions & Answers
          </h1>

          <p className="mt-3 text-base text-yellow-100 md:text-lg">
            Islamic knowledge based on the Quran and Sunnah
          </p>
        </div>
      </section>

      {/* =========================================
          PRAYER TIMES
      ========================================= */}
      <div className="border-b-2 border-[#75593f] bg-black">
        <div className="mx-auto max-w-6xl overflow-x-auto whitespace-nowrap px-3 py-2 text-center text-sm text-yellow-400 md:text-base">
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

      {/* =========================================
          MAIN
      ========================================= */}
      <div className="mx-auto max-w-6xl px-3 py-8">

        {/* =========================================
            SEARCH
        ========================================= */}
        <section className="mb-8">
          <div className="flex items-center overflow-hidden rounded-2xl border border-yellow-600 bg-white shadow-md">

            <div className="shrink-0 px-3">
              <Search className="h-5 w-5 text-yellow-600" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Islamic questions..."
              aria-label="Search Islamic questions"
              className="
                w-full
                bg-transparent
                py-3
                text-gray-800
                outline-none
              "
            />

            <button
              type="button"
              onClick={startListening}
              className="shrink-0 px-4"
              aria-label="Voice Search"
            >
              <Mic className="h-5 w-5 text-yellow-600" />
            </button>

          </div>
        </section>

        {/* =========================================
            ENGLISH CATEGORIES
        ========================================= */}
        <section className="mb-10">

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#4b3415]">
              Categories
            </h2>

            <Link
              href="/en/categories"
              className="font-semibold text-yellow-700 hover:text-yellow-800"
            >
              View All →
            </Link>
          </div>

          {englishCategories.length > 0 ? (

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

              {englishCategories
                .slice(0, 10)
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
                        flex
                        min-h-[90px]
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[#c8b27a]
                        bg-gradient-to-b
                        from-[#f6f0dd]
                        via-[#e6d4a3]
                        to-[#c9ab63]
                        px-3
                        text-center
                        font-semibold
                        text-[#4b3415]
                        shadow-md
                        transition
                        hover:-translate-y-0.5
                        hover:scale-[1.02]
                        hover:shadow-lg
                      "
                    >
                      <span className="text-base leading-6 md:text-lg">
                        {categoryName}
                      </span>
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

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

            <Link
              href="/en/fatawa"
              className="rounded-xl bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              Fatwas
            </Link>

            <Link
              href="/en/articles"
              className="rounded-xl bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              Articles
            </Link>

            <Link
              href="/en/categories"
              className="rounded-xl bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              Categories
            </Link>

            <Link
              href="/ozan-shariah-calculator"
              className="rounded-xl bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              Islamic Calculator
            </Link>

          </div>

        </section>

        {/* =========================================
            LATEST QUESTIONS
        ========================================= */}
        <section className="mb-10">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              Latest Questions
            </h2>

            <Link
              href="/en/fatawa"
              className="font-semibold text-yellow-700 hover:text-yellow-800"
            >
              View All →
            </Link>

          </div>

          <div className="space-y-3">

            {filteredQuestions.length > 0 ? (

              filteredQuestions.map((item) => {

                const question =
                  getEnglishQuestion(item);

                return (
                  <Link
                    key={item._id}
                    href={`/en/fatawa/${encodeURIComponent(
                      item.slug || item._id
                    )}`}
                    className="
                      block
                      rounded-xl
                      border
                      border-yellow-200
                      bg-white
                      p-4
                      shadow-sm
                      transition
                      hover:border-yellow-500
                      hover:shadow-md
                    "
                  >
                    <h3 className="font-semibold leading-7 text-gray-800">
                      {question}
                    </h3>

                    <span className="mt-2 inline-block text-sm font-semibold text-yellow-700">
                      Read Fatwa →
                    </span>
                  </Link>
                );
              })

            ) : (

              <div className="rounded-xl bg-white p-8 text-center">
                <p className="text-gray-500">
                  {query
                    ? "No questions found."
                    : "No English questions available yet."}
                </p>
              </div>

            )}

          </div>

        </section>

        {/* =========================================
            LATEST ARTICLES
        ========================================= */}
        <section>

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              Selected Articles
            </h2>

            <Link
              href="/en/articles"
              className="font-semibold text-yellow-700 hover:text-yellow-800"
            >
              View All →
            </Link>

          </div>

          <div className="space-y-3">

            {filteredArticles.length > 0 ? (

              filteredArticles.map((item) => {

                const title =
                  getEnglishArticleTitle(item);

                const articleSlug =
                  item.englishSlug ||
                  item.enSlug ||
                  item.slug ||
                  item._id;

                return (
                  <Link
                    key={item._id}
                    href={`/en/articles/${encodeURIComponent(
                      articleSlug
                    )}`}
                    className="
                      block
                      rounded-xl
                      border
                      border-yellow-200
                      bg-white
                      p-4
                      font-semibold
                      text-gray-800
                      shadow-sm
                      transition
                      hover:border-yellow-500
                      hover:shadow-md
                    "
                  >
                    {title}
                  </Link>
                );
              })

            ) : (

              <div className="rounded-xl bg-white p-8 text-center">
                <p className="text-gray-500">
                  No English articles found.
                </p>
              </div>

            )}

          </div>

        </section>

      </div>
    </main>
  );
}

