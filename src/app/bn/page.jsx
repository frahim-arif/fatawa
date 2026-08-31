
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

  // =========================
  // Categories
  // =========================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backend}/categories`);
        const data = await res.json();

        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Categories error:", error);
      }
    };

    fetchCategories();
  }, []);

  // =========================
  // Latest English Questions
  // =========================
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `${backend}/admin/questions?limit=10`
        );

        const data = await res.json();

        if (data.success) {
          // ❗ Sirf English questions
          const englishQuestions = data.data.filter(
            (item) =>
              item.englishQuestion ||
              item.enQuestion ||
              item.questionEn
          );

          setLatestQuestions(englishQuestions.slice(0, 5));
        }
      } catch (error) {
        console.error("Questions error:", error);
      }
    };

    fetchQuestions();
  }, []);

  // =========================
  // Latest English Articles
  // =========================
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${backend}/majameen`);
        const data = await res.json();

        if (data.success) {
          // ❗ Sirf English articles
          const englishArticles = data.data.filter(
            (item) =>
              item.englishTitle ||
              item.enTitle ||
              item.titleEn
          );

          setMajameen(englishArticles.slice(0, 5));
        }
      } catch (error) {
        console.error("Articles error:", error);
      }
    };

    fetchArticles();
  }, []);

  // =========================
  // Prayer Times
  // =========================
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

  // =========================
  // Voice Search
  // =========================
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

    recognition.onresult = (event) => {
      setQuery(event.results[0][0].transcript);
    };

    recognition.start();
  };

  // =========================
  // English Question
  // =========================
  const getEnglishQuestion = (item) => {
    return (
      item.englishQuestion ||
      item.enQuestion ||
      item.questionEn ||
      null
    );
  };

  // =========================
  // English Category
  // =========================
  const getEnglishCategory = (item) => {
    return (
      item.englishName ||
      item.enName ||
      item.nameEn ||
      null
    );
  };

  // =========================
  // English Article
  // =========================
  const getEnglishArticleTitle = (item) => {
    return (
      item.englishTitle ||
      item.enTitle ||
      item.titleEn ||
      null
    );
  };

  // =========================
  // Search
  // =========================
  const filteredQuestions = latestQuestions.filter((item) => {
    const question = getEnglishQuestion(item);

    return (
      question &&
      question.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =========================
          HERO
      ========================= */}
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

      {/* =========================
          PRAYER TIMES
      ========================= */}
      <div className="bg-black border-b-2 border-[#75593f]">

        <div className="max-w-6xl mx-auto py-2 px-3 text-center text-yellow-400 text-sm md:text-base">

          {prayerTimes ? (
            <>
              Fajr: {prayerTimes.Fajr.split(" ")[0]}

              <span className="mx-3">|</span>

              Dhuhr: {prayerTimes.Dhuhr.split(" ")[0]}

              <span className="mx-3">|</span>

              Asr: {prayerTimes.Asr.split(" ")[0]}

              <span className="mx-3">|</span>

              Maghrib: {prayerTimes.Maghrib.split(" ")[0]}

              <span className="mx-3">|</span>

              Isha: {prayerTimes.Isha.split(" ")[0]}
            </>
          ) : (
            "Loading prayer times..."
          )}

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 py-8">

        {/* =========================
            SEARCH
        ========================= */}
        <div className="relative mb-8">

          <div className="flex items-center bg-white border border-yellow-600 rounded-2xl shadow-md overflow-hidden">

            <div className="px-3">
              <Search className="w-5 h-5 text-yellow-600" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
              aria-label="Voice Search"
            >
              <Mic className="w-5 h-5 text-yellow-600" />
            </button>

          </div>

        </div>

        {/* =========================
            CATEGORIES
        ========================= */}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            {categories
              .filter((cat) => getEnglishCategory(cat))
              .slice(0, 8)
              .map((cat) => (

                <Link
                  key={cat._id}
                  href={`/en/categories/${encodeURIComponent(
                    cat.slug || cat.name
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
                  "
                >
                  {getEnglishCategory(cat)}
                </Link>

              ))}

          </div>

        </section>

        {/* =========================
            QUICK LINKS
        ========================= */}
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

        {/* =========================
            LATEST QUESTIONS
        ========================= */}
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

              <p className="text-center text-gray-500 py-4">
                No English questions available yet.
              </p>

            )}

          </div>

        </section>

        {/* =========================
            LATEST ARTICLES
        ========================= */}
        <section>

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              Featured Articles
            </h2>

            <Link
              href="/en/articles"
              className="text-yellow-700 font-semibold"
            >
              View All →
            </Link>

          </div>

          <div className="space-y-3">

            {majameen.length > 0 ? (

              majameen.map((item) => (

                <Link
                  key={item._id}
                  href={`/en/articles/${
                    item.slug || item._id
                  }`}
                  className="
                    block
                    bg-white
                    border border-yellow-200
                    rounded-xl
                    p-4
                    shadow-sm
                    hover:border-yellow-500
                    transition
                  "
                >
                  {getEnglishArticleTitle(item)}
                </Link>

              ))

            ) : (

              <p className="text-center text-gray-500 py-4">
                No English articles available yet.
              </p>

            )}

          </div>

        </section>

      </div>

    </main>
  );
}

