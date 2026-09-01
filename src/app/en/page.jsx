"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Mic } from "lucide-react";
import axios from "axios";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function EnglishHomePage() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [articles, setArticles] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState(null);

  // =====================================================
  // CATEGORY NAME
  // =====================================================

  const getCategoryName = (item) => {
    return (
      item?.englishName ||
      item?.enName ||
      item?.nameEn ||
      item?.name ||
      ""
    );
  };

  // =====================================================
  // CATEGORY SLUG
  // =====================================================

  const getCategorySlug = (item) => {
    return (
      item?.englishSlug ||
      item?.enSlug ||
      item?.slugEn ||
      item?.slug ||
      ""
    );
  };

  // =====================================================
  // QUESTION
  // =====================================================

  const getQuestion = (item) => {
    return (
      item?.question ||
      item?.englishQuestion ||
      item?.enQuestion ||
      item?.questionEn ||
      ""
    );
  };

  // =====================================================
  // ARTICLE TITLE
  // =====================================================

  const getArticleTitle = (item) => {
    return (
      item?.englishTitle ||
      item?.enTitle ||
      item?.titleEn ||
      ""
    );
  };

  // =====================================================
  // FETCH ENGLISH CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching English categories...");

        const res = await axios.get(
          `${backend}/en/categories`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        console.log(
          "English categories response:",
          res.data
        );

        if (
          res.data?.success &&
          Array.isArray(res.data?.data)
        ) {
          setCategories(res.data.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error(
          "English category fetch error:",
          error.response?.data || error.message
        );

        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // =====================================================
  // FETCH ENGLISH QUESTIONS
  // =====================================================

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `${backend}/en/questions?limit=10`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        console.log(
          "English questions response:",
          res.data
        );

        if (
          res.data?.success &&
          Array.isArray(res.data?.data)
        ) {
          setLatestQuestions(
            res.data.data.slice(0, 5)
          );
        } else {
          setLatestQuestions([]);
        }
      } catch (error) {
        console.error(
          "English questions fetch error:",
          error.response?.data || error.message
        );

        setLatestQuestions([]);
      }
    };

    fetchQuestions();
  }, []);

  // =====================================================
  // FETCH ENGLISH ARTICLES
  // =====================================================

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          `${backend}/majameen`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        console.log(
          "Articles response:",
          res.data
        );

        if (
          res.data?.success &&
          Array.isArray(res.data?.data)
        ) {
          const englishArticles =
            res.data.data.filter((item) =>
              getArticleTitle(item)
            );

          setArticles(
            englishArticles.slice(0, 5)
          );
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error(
          "English articles fetch error:",
          error.response?.data || error.message
        );

        setArticles([]);
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

        if (!res.ok) {
          throw new Error(
            "Failed to fetch prayer times"
          );
        }

        const data = await res.json();

        if (data.code === 200) {
          setPrayerTimes(
            data.data.timings
          );
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

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error(
        "Voice search error:",
        event.error
      );
    };

    recognition.start();
  };

  // =====================================================
  // FILTER QUESTIONS
  // =====================================================

  const filteredQuestions =
    latestQuestions.filter((item) => {
      const question = getQuestion(item);

      if (!question) {
        return false;
      }

      return question
        .toLowerCase()
        .includes(
          query.trim().toLowerCase()
        );
    });

  // =====================================================
  // FILTER ARTICLES
  // =====================================================

  const filteredArticles =
    articles.filter((item) => {
      const title =
        getArticleTitle(item);

      if (!title) {
        return false;
      }

      return title
        .toLowerCase()
        .includes(
          query.trim().toLowerCase()
        );
    });

  // =====================================================
  // VALID CATEGORIES
  // =====================================================

  const validCategories =
    categories.filter((cat) => {
      return (
        getCategoryName(cat) &&
        getCategorySlug(cat)
      );
    });

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =================================================
          HERO
      ================================================= */}

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
            Islamic knowledge in the light of
            the Quran and Sunnah
          </p>

        </div>
      </section>


      {/* =================================================
          PRAYER TIMES
      ================================================= */}

      <div className="border-b-2 border-[#75593f] bg-black">

        <div className="mx-auto max-w-6xl overflow-x-auto whitespace-nowrap px-3 py-2 text-center text-sm text-yellow-400 md:text-base">

          {prayerTimes ? (
            <>
              Fajr:{" "}
              {prayerTimes.Fajr?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              Dhuhr:{" "}
              {prayerTimes.Dhuhr?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              Asr:{" "}
              {prayerTimes.Asr?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              Maghrib:{" "}
              {prayerTimes.Maghrib?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              Isha:{" "}
              {prayerTimes.Isha?.split(" ")[0]}
            </>
          ) : (
            "Loading prayer times..."
          )}

        </div>

      </div>


      {/* =================================================
          MAIN
      ================================================= */}

      <div className="mx-auto max-w-6xl px-3 py-8">

        {/* =============================================
            SEARCH
        ============================================= */}

        <section className="mb-8">

          <div className="flex items-center overflow-hidden rounded-2xl border border-yellow-600 bg-white shadow-md">

            <div className="shrink-0 px-3">
              <Search className="h-5 w-5 text-yellow-600" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search Islamic questions..."
              aria-label="Search Islamic questions"
              className="w-full bg-transparent py-3 text-gray-800 outline-none"
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


        {/* =============================================
            ENGLISH CATEGORIES
        ============================================= */}

        <section className="mb-10">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              Islamic Categories
            </h2>

            <Link
              href="/en/categories"
              className="font-semibold text-yellow-700 hover:text-yellow-800"
            >
              View All →
            </Link>

          </div>


          {validCategories.length > 0 ? (

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

              {validCategories
                .slice(0, 8)
                .map((cat) => {

                  const name =
                    getCategoryName(cat);

                  const slug =
                    getCategorySlug(cat);

                  return (
                    <Link
                      key={cat._id}
                      href={`/en/categories/${encodeURIComponent(
                        slug
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
                        hover:scale-[1.02]
                        hover:shadow-lg
                      "
                    >
                      <span className="text-base leading-6 md:text-lg">
                        {name}
                      </span>
                    </Link>
                  );
                })}

            </div>

          ) : (

            <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center">

              <p className="text-gray-500">
                No Islamic categories available.
              </p>

            </div>

          )}

        </section>


        {/* =============================================
            QUICK LINKS
        ============================================= */}

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


        {/* =============================================
            LATEST QUESTIONS
        ============================================= */}

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
                  getQuestion(item);

                const slug =
                  item?.slug ||
                  item?._id;

                return (
                  <Link
                    key={item._id}
                    href={`/en/fatawa/${encodeURIComponent(
                      slug
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

              <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center">

                <p className="text-gray-500">
                  {query
                    ? "No questions found."
                    : "No English questions available yet."}
                </p>

              </div>

            )}

          </div>

        </section>


        {/* =============================================
            ARTICLES
        ============================================= */}

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
                  getArticleTitle(item);

                const slug =
                  item?.englishSlug ||
                  item?.enSlug ||
                  item?.slug ||
                  item?._id;

                return (
                  <Link
                    key={item._id}
                    href={`/en/articles/${encodeURIComponent(
                      slug
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
                      {title}
                    </h3>

                  </Link>
                );
              })

            ) : (

              <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center">

                <p className="text-gray-500">
                  No English articles available yet.
                </p>

              </div>

            )}

          </div>

        </section>

      </div>

    </main>
  );
}