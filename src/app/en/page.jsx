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

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

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
        console.error("English categories error:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // =====================================================
  // FETCH LATEST QUESTIONS
  // =====================================================

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
          throw new Error("Failed to fetch questions");
        }

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setLatestQuestions(data.data);
        } else {
          setLatestQuestions([]);
        }
      } catch (error) {
        console.error("English questions error:", error);
        setLatestQuestions([]);
      }
    };

    fetchQuestions();
  }, []);

  // =====================================================
  // FETCH ARTICLES
  // =====================================================

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
        console.error("Articles error:", error);
        setMajameen([]);
      }
    };

    fetchArticles();
  }, []);

  // =====================================================
  // PRAYER TIMES
  // =====================================================

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
        console.error("Prayer time error:", error);
      }
    };

    fetchPrayerTimes();
  }, []);

  // =====================================================
  // VOICE SEARCH
  // =====================================================

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
      setQuery(event.results[0][0].transcript);
    };

    recognition.start();
  };

  // =====================================================
  // HELPERS
  // =====================================================

  const getCategoryName = (category) => {
    return (
      category?.englishName ||
      category?.enName ||
      category?.nameEn ||
      category?.name ||
      ""
    );
  };

  const getCategorySlug = (category) => {
    return (
      category?.englishSlug ||
      category?.enSlug ||
      category?.slugEn ||
      category?.slug ||
      ""
    );
  };

  const getQuestion = (item) => {
    return (
      item?.question ||
      item?.englishQuestion ||
      item?.enQuestion ||
      item?.questionEn ||
      ""
    );
  };

  const getArticleTitle = (item) => {
    return (
      item?.englishTitle ||
      item?.enTitle ||
      item?.titleEn ||
      item?.title ||
      ""
    );
  };

  // =====================================================
  // FILTER
  // =====================================================

  const englishCategories = categories.filter((cat) => {
    return Boolean(
      getCategoryName(cat) &&
        getCategorySlug(cat)
    );
  });

  const filteredQuestions = latestQuestions.filter(
    (item) =>
      getQuestion(item)
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  const filteredArticles = majameen.filter(
    (item) =>
      getArticleTitle(item)
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="relative overflow-hidden px-4 py-12 md:py-16"
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative mx-auto max-w-6xl text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-300">
            Maslak-e-Deoband
          </p>

          <h1 className="mt-3 text-3xl font-bold text-yellow-300 md:text-5xl">
            Islamic Questions & Answers
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-yellow-100 md:text-lg">
            Islamic knowledge based on the Quran and Sunnah
          </p>

        </div>
      </section>

      {/* =====================================================
          PRAYER TIMES
      ===================================================== */}

      <div className="border-b-2 border-[#75593f] bg-black">
        <div className="mx-auto max-w-6xl overflow-x-auto px-3 py-2 text-center text-sm text-yellow-400 md:text-base">

          {prayerTimes ? (
            <div className="whitespace-nowrap">

              Fajr: {prayerTimes.Fajr?.split(" ")[0]}

              <span className="mx-3">|</span>

              Dhuhr: {prayerTimes.Dhuhr?.split(" ")[0]}

              <span className="mx-3">|</span>

              Asr: {prayerTimes.Asr?.split(" ")[0]}

              <span className="mx-3">|</span>

              Maghrib: {prayerTimes.Maghrib?.split(" ")[0]}

              <span className="mx-3">|</span>

              Isha: {prayerTimes.Isha?.split(" ")[0]}

            </div>
          ) : (
            "Loading prayer times..."
          )}

        </div>
      </div>

      <div className="mx-auto max-w-6xl px-3 py-8 md:px-4">

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <div className="mb-10">

          <div className="flex items-center overflow-hidden rounded-2xl border border-yellow-600 bg-white shadow-md">

            <div className="px-3">
              <Search className="h-5 w-5 text-yellow-600" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Islamic questions..."
              className="w-full bg-transparent py-3 text-gray-800 outline-none"
            />

            <button
              type="button"
              onClick={startListening}
              className="px-4"
              aria-label="Voice Search"
            >
              <Mic className="h-5 w-5 text-yellow-600" />
            </button>

          </div>

        </div>

        {/* =====================================================
            CATEGORIES
        ===================================================== */}

        <section className="mb-12">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-[#4b3415] md:text-3xl">
                Islamic Categories
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Explore Islamic questions by topic
              </p>
            </div>

            <Link
              href="/en/categories"
              className="font-semibold text-yellow-700 hover:text-yellow-900"
            >
              View All →
            </Link>

          </div>

          {englishCategories.length > 0 ? (

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">

              {englishCategories.slice(0, 10).map((category) => {

                const name = getCategoryName(category);
                const slug = getCategorySlug(category);

                return (
                  <Link
                    key={category._id}
                    href={`/en/categories/${encodeURIComponent(slug)}`}
                    className="
                      group
                      flex
                      min-h-[90px]
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-[#c8b27a]
                      bg-gradient-to-b
                      from-[#f8f3e4]
                      via-[#e8d7a8]
                      to-[#c9ab63]
                      px-3
                      py-4
                      text-center
                      font-bold
                      text-[#4b3415]
                      shadow-md
                      transition-all
                      duration-200
                      hover:-translate-y-1
                      hover:shadow-lg
                    "
                  >
                    <span className="leading-6">
                      {name}
                    </span>
                  </Link>
                );
              })}

            </div>

          ) : (

            <div className="rounded-2xl border border-yellow-200 bg-white p-8 text-center text-gray-500">
              No English categories available.
            </div>

          )}

        </section>

        {/* =====================================================
            QUICK LINKS
        ===================================================== */}

        <section className="mb-12">

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

        {/* =====================================================
            LATEST QUESTIONS
        ===================================================== */}

        <section className="mb-12">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-[#4b3415] md:text-3xl">
                Latest Questions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Recently added Islamic questions
              </p>
            </div>

            <Link
              href="/en/fatawa"
              className="font-semibold text-yellow-700"
            >
              View All →
            </Link>

          </div>

          <div className="space-y-3">

            {filteredQuestions.length > 0 ? (

              filteredQuestions.map((item) => {

                const question = getQuestion(item);

                return (
                  <Link
                    key={item._id}
                    href={`/en/fatawa/${encodeURIComponent(item.slug)}`}
                    className="
                      block
                      rounded-2xl
                      border
                      border-yellow-200
                      bg-white
                      p-5
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

              <p className="py-5 text-center text-gray-500">
                No English questions found.
              </p>

            )}

          </div>

        </section>

        {/* =====================================================
            ARTICLES
        ===================================================== */}

        <section>

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-[#4b3415] md:text-3xl">
              Selected Articles
            </h2>

            <Link
              href="/en/articles"
              className="font-semibold text-yellow-700"
            >
              View All →
            </Link>

          </div>

          <div className="space-y-3">

            {filteredArticles.length > 0 ? (

              filteredArticles.map((item) => {

                const slug =
                  item?.englishSlug ||
                  item?.slug ||
                  item?._id;

                return (
                  <Link
                    key={item._id}
                    href={`/en/articles/${encodeURIComponent(slug)}`}
                    className="
                      block
                      rounded-2xl
                      border
                      border-yellow-200
                      bg-white
                      p-5
                      shadow-sm
                      transition
                      hover:border-yellow-500
                      hover:shadow-md
                    "
                  >
                    <h3 className="font-semibold text-gray-800">
                      {getArticleTitle(item)}
                    </h3>
                  </Link>
                );
              })

            ) : (

              <p className="py-5 text-center text-gray-500">
                No English articles found.
              </p>

            )}

          </div>

        </section>

      </div>
    </main>
  );
}