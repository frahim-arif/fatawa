
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Mic } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function EnglishHomePage() {
  const [query, setQuery] = useState("");

  const [categories, setCategories] = useState([]);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [majameen, setMajameen] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState(null);

  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(true);

  // =========================================
  // FETCH ENGLISH CATEGORIES
  // =========================================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);

        const res = await fetch(`${backend}/en/categories`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch English categories");
        }

        const data = await res.json();

        console.log("English Categories:", data);

        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("English categories fetch error:", error);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
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
        setQuestionsLoading(true);

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

        console.log("English Questions:", data);

        if (data.success && Array.isArray(data.data)) {
          setLatestQuestions(data.data);
        } else {
          setLatestQuestions([]);
        }
      } catch (error) {
        console.error("English questions fetch error:", error);
        setLatestQuestions([]);
      } finally {
        setQuestionsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // =========================================
  // FETCH ENGLISH ARTICLES
  // =========================================
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setArticlesLoading(true);

        const res = await fetch(`${backend}/majameen`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await res.json();

        console.log("Articles:", data);

        if (data.success && Array.isArray(data.data)) {
          setMajameen(data.data);
        } else {
          setMajameen([]);
        }
      } catch (error) {
        console.error("Articles fetch error:", error);
        setMajameen([]);
      } finally {
        setArticlesLoading(false);
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
      alert(
        "Voice search is not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const text =
        event.results[0][0].transcript;

      setQuery(text);
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
  // ENGLISH QUESTION
  // =========================================
  const getEnglishQuestion = (item) => {
    return (
      item?.question ||
      item?.englishQuestion ||
      item?.enQuestion ||
      item?.questionEn ||
      ""
    );
  };

  // =========================================
  // ENGLISH CATEGORY NAME
  // =========================================
  const getEnglishCategory = (item) => {
    return (
      item?.englishName ||
      item?.enName ||
      item?.nameEn ||
      item?.name ||
      ""
    );
  };

  // =========================================
  // ENGLISH CATEGORY SLUG
  // =========================================
  const getEnglishCategorySlug = (item) => {
    return (
      item?.englishSlug ||
      item?.enSlug ||
      item?.slugEn ||
      item?.slug ||
      ""
    );
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
  // CLEAN ENGLISH CATEGORIES
  // =========================================
  const englishCategories = useMemo(() => {
    return categories.filter((cat) => {
      const name = getEnglishCategory(cat);
      const slug = getEnglishCategorySlug(cat);

      return Boolean(name && slug);
    });
  }, [categories]);

  // =========================================
  // SEARCH QUESTIONS
  // =========================================
  const filteredQuestions = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return latestQuestions;
    }

    return latestQuestions.filter((item) => {
      const question =
        getEnglishQuestion(item).toLowerCase();

      return question.includes(search);
    });
  }, [latestQuestions, query]);

  // =========================================
  // SEARCH ARTICLES
  // =========================================
  const filteredArticles = useMemo(() => {
    const search = query.trim().toLowerCase();

    const englishArticles = majameen.filter((item) => {
      return Boolean(getEnglishArticleTitle(item));
    });

    if (!search) {
      return englishArticles.slice(0, 5);
    }

    return englishArticles
      .filter((item) => {
        const title =
          getEnglishArticleTitle(item).toLowerCase();

        return title.includes(search);
      })
      .slice(0, 5);
  }, [majameen, query]);

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* =========================================
          HERO
      ========================================= */}
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

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-300">
            Maslak-e-Deoband
          </p>

          <h1 className="text-3xl font-bold text-yellow-300 md:text-5xl">
            Islamic Questions & Answers
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-yellow-100 md:text-lg">
            Find authentic Islamic answers based on the Quran,
            Sunnah and authentic Islamic scholarship.
          </p>

        </div>
      </section>

      {/* =========================================
          PRAYER TIMES
      ========================================= */}
      <div className="border-b-2 border-[#75593f] bg-black">

        <div className="mx-auto max-w-6xl overflow-x-auto px-3 py-3 text-center text-sm text-yellow-400 md:text-base">

          <div className="min-w-max">

            {prayerTimes ? (
              <>

                <span>
                  Fajr:{" "}
                  {prayerTimes.Fajr?.split(" ")[0]}
                </span>

                <span className="mx-3 text-gray-500">
                  |
                </span>

                <span>
                  Dhuhr:{" "}
                  {prayerTimes.Dhuhr?.split(" ")[0]}
                </span>

                <span className="mx-3 text-gray-500">
                  |
                </span>

                <span>
                  Asr:{" "}
                  {prayerTimes.Asr?.split(" ")[0]}
                </span>

                <span className="mx-3 text-gray-500">
                  |
                </span>

                <span>
                  Maghrib:{" "}
                  {prayerTimes.Maghrib?.split(" ")[0]}
                </span>

                <span className="mx-3 text-gray-500">
                  |
                </span>

                <span>
                  Isha:{" "}
                  {prayerTimes.Isha?.split(" ")[0]}
                </span>

              </>
            ) : (
              "Loading prayer times..."
            )}

          </div>

        </div>

      </div>

      <div className="mx-auto max-w-6xl px-3 py-8 md:px-4">

        {/* =========================================
            SEARCH
        ========================================= */}
        <section className="mb-10">

          <div className="mx-auto max-w-3xl">

            <div className="flex items-center overflow-hidden rounded-2xl border border-yellow-600 bg-white shadow-md">

              <div className="px-4">
                <Search className="h-5 w-5 text-yellow-600" />
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
                  bg-transparent
                  py-4
                  text-gray-800
                  outline-none
                  placeholder:text-gray-400
                "
              />

              <button
                type="button"
                onClick={startListening}
                className="
                  px-4
                  py-4
                  transition
                  hover:bg-yellow-50
                "
                aria-label="Voice Search"
              >
                <Mic className="h-5 w-5 text-yellow-600" />
              </button>

            </div>

          </div>

        </section>

        {/* =========================================
            CATEGORIES
        ========================================= */}
        <section className="mb-12">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-yellow-700">
                Explore
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#4b3415] md:text-3xl">
                Categories
              </h2>

            </div>

            <Link
              href="/en/categories"
              className="
                text-sm
                font-semibold
                text-yellow-700
                transition
                hover:text-yellow-900
              "
            >
              View All →
            </Link>

          </div>

          {/* LOADING */}
          {categoriesLoading && (

            <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center text-gray-500">
              Loading categories...
            </div>

          )}

          {/* CATEGORIES */}
          {!categoriesLoading &&
            englishCategories.length > 0 && (

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">

                {englishCategories.map((cat) => {

                  const categoryName =
                    getEnglishCategory(cat);

                  const categorySlug =
                    getEnglishCategorySlug(cat);

                  /*
                    IMPORTANT:
                    Har category apne hi slug par jayegi.
                    
                    Example:
                    Modern Issues
                    → /en/categories/modern-issues

                    Namaz
                    → /en/categories/namaz
                  */

                  const categoryHref =
                    `/en/categories/${encodeURIComponent(
                      categorySlug
                    )}`;

                  return (
                    <Link
                      key={
                        cat?._id ||
                        categorySlug
                      }
                      href={categoryHref}
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
                        from-[#f6f0dd]
                        via-[#e6d4a3]
                        to-[#c9ab63]
                        px-3
                        text-center
                        font-semibold
                        text-[#4b3415]
                        shadow-md
                        transition-all
                        duration-200
                        hover:-translate-y-1
                        hover:border-yellow-600
                        hover:shadow-lg
                      "
                    >

                      <span className="
                        text-base
                        leading-6
                        md:text-lg
                      ">
                        {categoryName}
                      </span>

                    </Link>
                  );
                })}

              </div>

            )}

          {/* EMPTY */}
          {!categoriesLoading &&
            englishCategories.length === 0 && (

              <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center text-gray-500">
                No English categories available.
              </div>

            )}

        </section>

        {/* =========================================
            QUICK LINKS
        ========================================= */}
        <section className="mb-12">

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

            <Link
              href="/en/fatawa"
              className="
                rounded-xl
                bg-[#3b2f2f]
                px-3
                py-4
                text-center
                font-semibold
                text-yellow-200
                shadow-sm
                transition
                hover:bg-[#4a3a3a]
                hover:shadow-md
              "
            >
              Fatwas
            </Link>

            <Link
              href="/en/articles"
              className="
                rounded-xl
                bg-[#3b2f2f]
                px-3
                py-4
                text-center
                font-semibold
                text-yellow-200
                shadow-sm
                transition
                hover:bg-[#4a3a3a]
                hover:shadow-md
              "
            >
              Articles
            </Link>

            <Link
              href="/en/categories"
              className="
                rounded-xl
                bg-[#3b2f2f]
                px-3
                py-4
                text-center
                font-semibold
                text-yellow-200
                shadow-sm
                transition
                hover:bg-[#4a3a3a]
                hover:shadow-md
              "
            >
              Categories
            </Link>

            <Link
              href="/ozan-shariah-calculator"
              className="
                rounded-xl
                bg-[#3b2f2f]
                px-3
                py-4
                text-center
                font-semibold
                text-yellow-200
                shadow-sm
                transition
                hover:bg-[#4a3a3a]
                hover:shadow-md
              "
            >
              Islamic Calculator
            </Link>

          </div>

        </section>

        {/* =========================================
            LATEST QUESTIONS
        ========================================= */}
        <section className="mb-12">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-yellow-700">
                Recent
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#4b3415] md:text-3xl">
                Latest Questions
              </h2>

            </div>

            <Link
              href="/en/fatawa"
              className="
                text-sm
                font-semibold
                text-yellow-700
                transition
                hover:text-yellow-900
              "
            >
              View All →
            </Link>

          </div>

          {questionsLoading ? (

            <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center text-gray-500">
              Loading latest questions...
            </div>

          ) : filteredQuestions.length > 0 ? (

            <div className="space-y-3">

              {filteredQuestions.map((item) => {

                const question =
                  getEnglishQuestion(item);

                const questionSlug =
                  item?.slug || item?._id;

                return (
                  <Link
                    key={item?._id || questionSlug}
                    href={`/en/fatawa/${encodeURIComponent(
                      questionSlug
                    )}`}
                    className="
                      group
                      block
                      rounded-xl
                      border
                      border-yellow-200
                      bg-white
                      p-5
                      shadow-sm
                      transition
                      hover:-translate-y-0.5
                      hover:border-yellow-500
                      hover:shadow-md
                    "
                  >

                    <h3 className="
                      text-base
                      font-semibold
                      leading-7
                      text-gray-800
                      transition
                      group-hover:text-[#5a421c]
                      md:text-lg
                    ">
                      {question}
                    </h3>

                    <span className="
                      mt-2
                      inline-block
                      text-sm
                      font-semibold
                      text-yellow-700
                    ">
                      Read Fatwa →
                    </span>

                  </Link>
                );
              })}

            </div>

          ) : (

            <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center">

              <p className="text-gray-500">
                {query
                  ? `No English questions found for "${query}".`
                  : "No English questions available."}
              </p>

            </div>

          )}

        </section>

        {/* =========================================
            ARTICLES
        ========================================= */}
        <section>

          <div className="mb-5 flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-yellow-700">
                Knowledge
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#4b3415] md:text-3xl">
                Selected Articles
              </h2>

            </div>

            <Link
              href="/en/articles"
              className="
                text-sm
                font-semibold
                text-yellow-700
                transition
                hover:text-yellow-900
              "
            >
              View All →
            </Link>

          </div>

          {articlesLoading ? (

            <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center text-gray-500">
              Loading articles...
            </div>

          ) : filteredArticles.length > 0 ? (

            <div className="space-y-3">

              {filteredArticles.map((item) => {

                const articleTitle =
                  getEnglishArticleTitle(item);

                const articleSlug =
                  item?.englishSlug ||
                  item?.enSlug ||
                  item?.slugEn ||
                  item?.slug ||
                  item?._id;

                return (
                  <Link
                    key={item?._id || articleSlug}
                    href={`/en/articles/${encodeURIComponent(
                      articleSlug
                    )}`}
                    className="
                      group
                      block
                      rounded-xl
                      border
                      border-yellow-200
                      bg-white
                      p-5
                      shadow-sm
                      transition
                      hover:-translate-y-0.5
                      hover:border-yellow-500
                      hover:shadow-md
                    "
                  >

                    <h3 className="
                      font-semibold
                      leading-7
                      text-gray-800
                      group-hover:text-[#5a421c]
                    ">
                      {articleTitle}
                    </h3>

                    <span className="
                      mt-2
                      inline-block
                      text-sm
                      font-semibold
                      text-yellow-700
                    ">
                      Read Article →
                    </span>

                  </Link>
                );
              })}

            </div>

          ) : (

            <div className="rounded-xl border border-yellow-200 bg-white p-8 text-center">

              <p className="text-gray-500">
                {query
                  ? `No English articles found for "${query}".`
                  : "No English articles available."}
              </p>

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

