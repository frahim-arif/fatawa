
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Mic } from "lucide-react";
import axios from "axios";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function BanglaHomePage() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [articles, setArticles] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState(null);

  // =====================================================
  // CATEGORY NAME
  // =====================================================

  const getCategoryName = (item) => {
    return item?.name || "";
  };

  // =====================================================
  // QUESTION
  // =====================================================

  const getQuestion = (item) => {
    return item?.question || "";
  };

  // =====================================================
  // ARTICLE TITLE
  // =====================================================

  const getArticleTitle = (item) => {
    return (
      item?.banglaTitle ||
      item?.bnTitle ||
      item?.titleBn ||
      ""
    );
  };

  // =====================================================
  // FETCH BANGLA CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchBanglaCategories = async () => {
      try {
        console.log(
          "Fetching Bangla categories..."
        );

        const res = await axios.get(
          `${backend}/bn/categories`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        console.log(
          "Bangla categories response:",
          res.data
        );

        if (
          res.data?.success &&
          Array.isArray(res.data?.data)
        ) {
          setCategories(res.data.data);

          console.log(
            "Bangla categories loaded:",
            res.data.data
          );
        } else {
          setCategories([]);

          console.error(
            "Invalid Bangla category response:",
            res.data
          );
        }
      } catch (error) {
        console.error(
          "Bangla category fetch error:",
          error.response?.data || error.message
        );

        setCategories([]);
      }
    };

    fetchBanglaCategories();
  }, []);

  // =====================================================
  // FETCH BANGLA QUESTIONS
  // =====================================================

  useEffect(() => {
    const fetchBanglaQuestions = async () => {
      try {
        const res = await axios.get(
          `${backend}/bn/questions?limit=10`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        console.log(
          "Bangla questions response:",
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
          "Bangla questions fetch error:",
          error.response?.data || error.message
        );

        setLatestQuestions([]);
      }
    };

    fetchBanglaQuestions();
  }, []);

  // =====================================================
  // FETCH ARTICLES
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

        if (res.data?.success) {
          const banglaArticles = (
            res.data.data || []
          ).filter((item) =>
            getArticleTitle(item)
          );

          setArticles(
            banglaArticles.slice(0, 5)
          );
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error(
          "Articles fetch error:",
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
        "ভয়েস সার্চ এই ব্রাউজারে সমর্থিত নয়।"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "bn-BD";
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
  // SEARCH QUESTIONS
  // =====================================================

  const filteredQuestions =
    latestQuestions.filter((item) => {
      const question =
        getQuestion(item);

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
  // SEARCH ARTICLES
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
            ইসলামী প্রশ্ন ও উত্তর
          </h1>

          <p className="mt-3 text-base text-yellow-100 md:text-lg">
            কুরআন ও সুন্নাহর আলোকে ইসলামী জ্ঞান
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
              ফজর:{" "}
              {prayerTimes.Fajr?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              যোহর:{" "}
              {prayerTimes.Dhuhr?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              আসর:{" "}
              {prayerTimes.Asr?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              মাগরিব:{" "}
              {prayerTimes.Maghrib?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              এশা:{" "}
              {prayerTimes.Isha?.split(" ")[0]}
            </>
          ) : (
            "নামাজের সময় লোড হচ্ছে..."
          )}

        </div>
      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="mx-auto max-w-6xl px-3 py-8">

        {/* =================================================
            SEARCH
        ================================================= */}

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
              placeholder="প্রশ্ন খুঁজুন..."
              aria-label="প্রশ্ন খুঁজুন"
              className="w-full bg-transparent py-3 text-gray-800 outline-none"
            />

            <button
              type="button"
              onClick={startListening}
              className="shrink-0 px-4"
              aria-label="ভয়েস সার্চ"
            >
              <Mic className="h-5 w-5 text-yellow-600" />
            </button>

          </div>

        </section>

        {/* =================================================
            BANGLA CATEGORIES
        ================================================= */}

        
<section className="mb-10">

  <div className="mb-4 flex items-center justify-between">

    <h2 className="text-2xl font-bold text-[#4b3415]">
      বিষয়সমূহ
    </h2>

    <Link
      href="/bn/categories"
      className="font-semibold text-yellow-700 hover:text-yellow-800"
    >
      সব দেখুন →
    </Link>
  </div>

  {categories.length > 0 ? (

    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

      {categories
        .filter(
          (cat) =>
            cat?.name &&
            cat?.slug
        )
        .map((cat) => (

          <Link
            key={cat._id}
            href={`/bn/categories/${encodeURIComponent(
              cat.slug
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
              {cat.name}
            </span>
          </Link>

        ))}

    </div>

  ) : (

    <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center">

      <p className="text-gray-500">
        কোনো ইসলামী বিষয় পাওয়া যায়নি।
      </p>

    </div>

  )}

</section>



        {/* =================================================
            QUICK LINKS
        ================================================= */}

        <section className="mb-10">

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

            <Link
              href="/bn/fatawa"
              className="rounded-xl bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              ফতোয়া
            </Link>

            <Link
              href="/bn/articles"
              className="rounded-xl bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              প্রবন্ধ
            </Link>

            <Link
              href="/bn/categories"
              className="rounded-xl bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              বিষয়সমূহ
            </Link>

            <Link
              href="/ozan-shariah-calculator"
              className="rounded-xl bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              ইসলামী ক্যালকুলেটর
            </Link>

          </div>

        </section>

        {/* =================================================
            LATEST QUESTIONS
        ================================================= */}

        <section className="mb-10">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              নতুন প্রশ্নসমূহ
            </h2>

            <Link
              href="/bn/fatawa"
              className="font-semibold text-yellow-700 hover:text-yellow-800"
            >
              সব দেখুন →
            </Link>

          </div>

          <div className="space-y-3">

            {filteredQuestions.length > 0 ? (

              filteredQuestions.map((item) => {

                const question =
                  getQuestion(item);

                return (
                  <Link
                    key={item._id}
                    href={`/bn/fatawa/${encodeURIComponent(
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
                      ফতোয়া পড়ুন →
                    </span>

                  </Link>
                );
              })

            ) : (

              <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center">

                <p className="text-gray-500">
                  {query
                    ? "কোনো প্রশ্ন পাওয়া যায়নি।"
                    : "এখনো কোনো বাংলা প্রশ্ন পাওয়া যায়নি।"}
                </p>

              </div>

            )}

          </div>

        </section>

        {/* =================================================
            ARTICLES
        ================================================= */}

        <section>

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              নির্বাচিত প্রবন্ধ
            </h2>

            <Link
              href="/bn/articles"
              className="font-semibold text-yellow-700 hover:text-yellow-800"
            >
              সব দেখুন →
            </Link>

          </div>

          <div className="space-y-3">

            {filteredArticles.length > 0 ? (

              filteredArticles.map((item) => {

                const title =
                  getArticleTitle(item);

                return (
                  <Link
                    key={item._id}
                    href={`/bn/articles/${encodeURIComponent(
                      item.banglaSlug ||
                        item.bnSlug ||
                        item.slug ||
                        item._id
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
                  এখনো কোনো বাংলা প্রবন্ধ পাওয়া যায়নি।
                </p>

              </div>

            )}

          </div>

        </section>

      </div>
    </main>
  );
}

