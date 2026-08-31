
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Mic } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function BanglaHomePage() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [articles, setArticles] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState(null);

  // =========================================
  // GET BANGLA CATEGORY
  // =========================================
  const getBanglaCategory = (item) => {
    return (
      item.banglaName ||
      item.bnName ||
      item.nameBn ||
      null
    );
  };

  // =========================================
  // GET BANGLA QUESTION
  // =========================================
  const getBanglaQuestion = (item) => {
    return (
      item.banglaQuestion ||
      item.bnQuestion ||
      item.questionBn ||
      null
    );
  };

  // =========================================
  // GET BANGLA ARTICLE TITLE
  // =========================================
  const getBanglaArticleTitle = (item) => {
    return (
      item.banglaTitle ||
      item.bnTitle ||
      item.titleBn ||
      null
    );
  };

  // =========================================
  // CATEGORIES
  // =========================================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backend}/categories`);

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        if (data.success) {
          setCategories(data.data || []);
        }
      } catch (error) {
        console.error("Categories fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  // =========================================
  // LATEST QUESTIONS
  // =========================================
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `${backend}/admin/questions?limit=10`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await res.json();

        if (data.success) {
          const banglaQuestions = (data.data || []).filter(
            (item) => getBanglaQuestion(item)
          );

          setLatestQuestions(
            banglaQuestions.slice(0, 5)
          );
        }
      } catch (error) {
        console.error("Questions fetch error:", error);
      }
    };

    fetchQuestions();
  }, []);

  // =========================================
  // LATEST ARTICLES
  // =========================================
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${backend}/majameen`);

        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await res.json();

        if (data.success) {
          const banglaArticles = (data.data || []).filter(
            (item) => getBanglaArticleTitle(item)
          );

          setArticles(
            banglaArticles.slice(0, 5)
          );
        }
      } catch (error) {
        console.error("Articles fetch error:", error);
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
      alert("ভয়েস সার্চ এই ব্রাউজারে সমর্থিত নয়।");
      return;
    }

    const recognition = new SpeechRecognition();

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

  // =========================================
  // SEARCH QUESTIONS
  // =========================================
  const filteredQuestions = latestQuestions.filter(
    (item) => {
      const question = getBanglaQuestion(item);

      if (!question) {
        return false;
      }

      return question
        .toLowerCase()
        .includes(query.toLowerCase());
    }
  );

  // =========================================
  // SEARCH ARTICLES
  // =========================================
  const filteredArticles = articles.filter(
    (item) => {
      const title = getBanglaArticleTitle(item);

      if (!title) {
        return false;
      }

      return title
        .toLowerCase()
        .includes(query.toLowerCase());
    }
  );

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
            ইসলামী প্রশ্ন ও উত্তর
          </h1>

          <p className="mt-3 text-yellow-100 text-base md:text-lg">
            কুরআন ও সুন্নাহর আলোকে ইসলামী জ্ঞান
          </p>

        </div>
      </section>

      {/* =========================================
          PRAYER TIMES
      ========================================= */}
      <div className="bg-black border-b-2 border-[#75593f]">

        <div className="max-w-6xl mx-auto py-2 px-3 text-center text-yellow-400 text-sm md:text-base overflow-x-auto whitespace-nowrap">

          {prayerTimes ? (
            <>
              ফজর: {prayerTimes.Fajr?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              যোহর: {prayerTimes.Dhuhr?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              আসর: {prayerTimes.Asr?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              মাগরিব: {prayerTimes.Maghrib?.split(" ")[0]}

              <span className="mx-2 md:mx-3">
                |
              </span>

              এশা: {prayerTimes.Isha?.split(" ")[0]}
            </>
          ) : (
            "নামাজের সময় লোড হচ্ছে..."
          )}

        </div>
      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <div className="max-w-6xl mx-auto px-3 py-8">

        {/* =========================================
            SEARCH
        ========================================= */}
        <section className="mb-8">

          <div className="flex items-center bg-white border border-yellow-600 rounded-2xl shadow-md overflow-hidden">

            <div className="px-3 shrink-0">
              <Search className="w-5 h-5 text-yellow-600" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="প্রশ্ন খুঁজুন..."
              className="
                w-full
                py-3
                outline-none
                text-gray-800
                bg-transparent
              "
            />

            <button
              type="button"
              onClick={startListening}
              className="px-4 shrink-0"
              aria-label="ভয়েস সার্চ"
            >
              <Mic className="w-5 h-5 text-yellow-600" />
            </button>

          </div>

        </section>

        {/* =========================================
            CATEGORIES
        ========================================= */}
        <section className="mb-10">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              বিষয়সমূহ
            </h2>

            <Link
              href="/bn/categories"
              className="text-yellow-700 font-semibold hover:text-yellow-800"
            >
              সব দেখুন →
            </Link>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            {categories
              .filter((cat) =>
                getBanglaCategory(cat)
              )
              .slice(0, 8)
              .map((cat) => {

                const categoryName =
                  getBanglaCategory(cat);

                return (
                  <Link
                    key={cat._id}
                    href={`/bn/categories/${
                      cat.slug || cat.name
                    }`}
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
                      hover:shadow-lg
                      transition
                      px-3
                    "
                  >
                    {categoryName}
                  </Link>
                );
              })}

          </div>

        </section>

        {/* =========================================
            QUICK LINKS
        ========================================= */}
        <section className="mb-10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            <Link
              href="/bn/fatawa"
              className="
                rounded-xl
                bg-[#3b2f2f]
                text-yellow-200
                text-center
                py-4
                font-semibold
                hover:bg-[#4a3a3a]
                transition
              "
            >
              ফতোয়া
            </Link>

            <Link
              href="/bn/articles"
              className="
                rounded-xl
                bg-[#3b2f2f]
                text-yellow-200
                text-center
                py-4
                font-semibold
                hover:bg-[#4a3a3a]
                transition
              "
            >
              প্রবন্ধ
            </Link>

            <Link
              href="/bn/categories"
              className="
                rounded-xl
                bg-[#3b2f2f]
                text-yellow-200
                text-center
                py-4
                font-semibold
                hover:bg-[#4a3a3a]
                transition
              "
            >
              বিষয়সমূহ
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
                transition
              "
            >
              ইসলামী ক্যালকুলেটর
            </Link>

          </div>

        </section>

        {/* =========================================
            LATEST QUESTIONS
        ========================================= */}
        <section className="mb-10">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              নতুন প্রশ্নসমূহ
            </h2>

            <Link
              href="/bn/fatawa"
              className="text-yellow-700 font-semibold hover:text-yellow-800"
            >
              সব দেখুন →
            </Link>

          </div>

          <div className="space-y-3">

            {filteredQuestions.length > 0 ? (

              filteredQuestions.map((item) => {

                const question =
                  getBanglaQuestion(item);

                return (
                  <Link
                    key={item._id}
                    href={`/bn/fatawa/${
                      item.banglaSlug ||
                      item.bnSlug ||
                      item.slug
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
                    <h3 className="text-gray-800 font-semibold leading-7">
                      {question}
                    </h3>
                  </Link>
                );
              })

            ) : (

              <div className="bg-white rounded-xl p-8 text-center">

                <p className="text-gray-500">
                  এখনো কোনো বাংলা প্রশ্ন পাওয়া যায়নি।
                </p>

              </div>

            )}

          </div>

        </section>

        {/* =========================================
            LATEST ARTICLES
        ========================================= */}
        <section>

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold text-[#4b3415]">
              নির্বাচিত প্রবন্ধ
            </h2>

            <Link
              href="/bn/articles"
              className="text-yellow-700 font-semibold hover:text-yellow-800"
            >
              সব দেখুন →
            </Link>

          </div>

          <div className="space-y-3">

            {filteredArticles.length > 0 ? (

              filteredArticles.map((item) => {

                const title =
                  getBanglaArticleTitle(item);

                return (
                  <Link
                    key={item._id}
                    href={`/bn/articles/${
                      item.banglaSlug ||
                      item.bnSlug ||
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
                    <h3 className="text-gray-800 font-semibold leading-7">
                      {title}
                    </h3>
                  </Link>
                );
              })

            ) : (

              <div className="bg-white rounded-xl p-8 text-center">

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

