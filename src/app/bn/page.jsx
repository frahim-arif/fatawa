"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Mic } from "lucide-react";
import axios from "axios";

const backend = "https://f-backend-vdi1.onrender.com/api";

const getApiData = (response) => {
  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return [];
};

// =====================================================
// BANGLA CATEGORY SLUG
// =====================================================

const getCategorySlug = (item) => {
  return (
    item?.banglaSlug ||
    item?.bnSlug ||
    item?.slugBn ||
    item?.slug ||
    item?._id ||
    ""
  );
};

// =====================================================
// BANGLA QUESTION
// =====================================================

const getQuestion = (item) => {
  return (
    item?.question ||
    item?.banglaQuestion ||
    item?.bnQuestion ||
    item?.questionBn ||
    ""
  );
};

// =====================================================
// BANGLA QUESTION SLUG
// =====================================================

const getQuestionSlug = (item) => {
  return (
    item?.banglaSlug ||
    item?.bnSlug ||
    item?.slugBn ||
    item?.slug ||
    item?._id ||
    ""
  );
};

// =====================================================
// BANGLA ARTICLE TITLE
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
// BANGLA ARTICLE CONTENT
// =====================================================

const getArticleContent = (item) => {
  return (
    item?.banglaContent ||
    item?.bnContent ||
    item?.contentBn ||
    ""
  );
};

// =====================================================
// BANGLA ARTICLE SLUG
// =====================================================

const getArticleSlug = (item) => {
  return (
    item?.banglaSlug ||
    item?.bnSlug ||
    item?.slugBn ||
    item?.slug ||
    item?._id ||
    ""
  );
};

export default function BanglaHomePage() {
  const [query, setQuery] = useState("");

  const [categories, setCategories] = useState([]);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [articles, setArticles] = useState([]);

  const [prayerTimes, setPrayerTimes] = useState(null);

  const [categoryLoading, setCategoryLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [articleLoading, setArticleLoading] = useState(true);

  // =====================================================
  // FETCH BANGLA CATEGORIES
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const fetchBanglaCategories = async () => {
      try {
        const res = await axios.get(
          `${backend}/bn/categories`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = getApiData(res);

        if (!mounted) return;

        const validCategories = data.filter(
          (item) =>
            item?.name &&
            getCategorySlug(item)
        );

        setCategories(validCategories);
      } catch (error) {
        if (!mounted) return;

        console.error(
          "Bangla category fetch error:",
          error?.response?.data || error?.message
        );

        setCategories([]);
      } finally {
        if (mounted) {
          setCategoryLoading(false);
        }
      }
    };

    fetchBanglaCategories();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // FETCH BANGLA QUESTIONS
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const fetchBanglaQuestions = async () => {
      try {
        const res = await axios.get(
          `${backend}/bn/questions?limit=10&skip=0`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = getApiData(res);

        if (!mounted) return;

        const validQuestions = data
          .filter((item) => {
            return (
              getQuestion(item) &&
              getQuestionSlug(item)
            );
          })
          .slice(0, 5);

        setLatestQuestions(validQuestions);
      } catch (error) {
        if (!mounted) return;

        console.error(
          "Bangla questions fetch error:",
          error?.response?.data || error?.message
        );

        setLatestQuestions([]);
      } finally {
        if (mounted) {
          setQuestionLoading(false);
        }
      }
    };

    fetchBanglaQuestions();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // FETCH BANGLA ARTICLES
  // =====================================================

  useEffect(() => {
    let mounted = true;

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

        const data = getApiData(res);

        if (!mounted) return;

        const banglaArticles = data
          .filter((item) => {
            const title = getArticleTitle(item);
            const content = getArticleContent(item);
            const slug = getArticleSlug(item);

            return (
              title &&
              content &&
              slug
            );
          })
          .slice(0, 5);

        setArticles(banglaArticles);
      } catch (error) {
        if (!mounted) return;

        console.error(
          "Bangla article fetch error:",
          error?.response?.data || error?.message
        );

        setArticles([]);
      } finally {
        if (mounted) {
          setArticleLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // PRAYER TIMES
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Guwahati&country=India&method=1",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch prayer times"
          );
        }

        const data = await res.json();

        if (
          mounted &&
          data?.code === 200 &&
          data?.data?.timings
        ) {
          setPrayerTimes(
            data.data.timings
          );
        }
      } catch (error) {
        console.error(
          "Prayer time error:",
          error
        );

        if (mounted) {
          setPrayerTimes(null);
        }
      }
    };

    fetchPrayerTimes();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // VOICE SEARCH
  // =====================================================

  const startListening = () => {
    if (typeof window === "undefined") {
      return;
    }

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
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript =
        event?.results?.[0]?.[0]?.transcript || "";

      setQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error(
        "Voice search error:",
        event?.error
      );
    };

    try {
      recognition.start();
    } catch (error) {
      console.error(
        "Voice recognition start error:",
        error
      );
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const normalizedQuery = query
    .trim()
    .toLowerCase();

  const filteredQuestions = useMemo(() => {
    if (!normalizedQuery) {
      return latestQuestions;
    }

    return latestQuestions.filter((item) => {
      const question =
        getQuestion(item).toLowerCase();

      return question.includes(
        normalizedQuery
      );
    });
  }, [
    latestQuestions,
    normalizedQuery,
  ]);

  const filteredArticles = useMemo(() => {
    if (!normalizedQuery) {
      return articles;
    }

    return articles.filter((item) => {
      const title =
        getArticleTitle(item).toLowerCase();

      return title.includes(
        normalizedQuery
      );
    });
  }, [
    articles,
    normalizedQuery,
  ]);

  // =====================================================
  // PRAYER TIME HELPER
  // =====================================================

  const prayerTime = (name) => {
    return (
      prayerTimes?.[name]
        ?.split(" ")[0] || "--"
    );
  };

  // =====================================================
  // PRAYER MARQUEE CONTENT
  // =====================================================

  const PrayerContent = ({
    duplicate = false,
  }) => (
    <div
      className="flex shrink-0 items-center gap-3 px-4 text-xs text-yellow-400 sm:gap-4 sm:text-sm md:gap-5 md:text-base lg:text-lg"
      aria-hidden={duplicate}
    >
      <span>
        ফজর: {prayerTime("Fajr")}
      </span>

      <span className="text-[#75593f]">
        |
      </span>

      <span>
        যোহর: {prayerTime("Dhuhr")}
      </span>

      <span className="text-[#75593f]">
        |
      </span>

      <span>
        আসর: {prayerTime("Asr")}
      </span>

      <span className="text-[#75593f]">
        |
      </span>

      <span>
        মাগরিব: {prayerTime("Maghrib")}
      </span>

      <span className="text-[#75593f]">
        |
      </span>

      <span>
        এশা: {prayerTime("Isha")}
      </span>

      <span className="ml-2 text-yellow-600 sm:ml-4">
        ☪
      </span>
    </div>
  );

  // =====================================================
  // UI
  // =====================================================

  return (
    <main
      lang="bn"
      dir="ltr"
      className="min-h-screen bg-[#f7f3e8]"
    >
      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="relative overflow-hidden border-b border-[#75593f] px-4 py-12 md:py-16"
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold leading-tight text-yellow-300 md:text-5xl">
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

      <div className="overflow-hidden border-b-2 border-[#75593f] bg-black">
        {prayerTimes ? (
          <div className="w-full overflow-hidden py-2.5">
            <div className="animate-prayer-marquee flex w-max items-center whitespace-nowrap">
              <PrayerContent />

              <PrayerContent duplicate />
            </div>
          </div>
        ) : (
          <div className="px-3 py-2.5 text-center text-xs text-yellow-400 sm:text-sm md:text-base">
            নামাজের সময় লোড হচ্ছে...
          </div>
        )}
      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="mx-auto max-w-6xl px-3 py-8 md:px-4 md:py-10">

        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="mb-10">
          <div className="mx-auto flex max-w-4xl items-center overflow-hidden border border-yellow-600 bg-white shadow-md">
            <div className="shrink-0 px-3">
              <Search
                className="h-5 w-5 text-yellow-600"
                aria-hidden="true"
              />
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

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="px-3 text-sm font-semibold text-gray-500 hover:text-gray-800"
                aria-label="অনুসন্ধান মুছে ফেলুন"
              >
                ×
              </button>
            )}

            <button
              type="button"
              onClick={startListening}
              className="shrink-0 border-l border-gray-200 px-4 py-3 transition hover:bg-yellow-50"
              aria-label="ভয়েস সার্চ"
              title="ভয়েস সার্চ"
            >
              <Mic
                className="h-5 w-5 text-yellow-600"
                aria-hidden="true"
              />
            </button>
          </div>
        </section>

        {/* =================================================
            BANGLA CATEGORIES
        ================================================= */}

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between border-b border-[#c8b27a] pb-2">
            <h2 className="text-2xl font-bold text-[#4b3415]">
              বিষয়সমূহ
            </h2>

            <Link
              href="/bn/categories"
              className="font-semibold text-yellow-700 transition hover:text-yellow-900"
            >
              সব দেখুন →
            </Link>
          </div>

          {categoryLoading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="h-[90px] animate-pulse border border-yellow-100 bg-white"
                  />
                )
              )}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {categories
                .slice(0, 8)
                .map((cat) => {
                  const categorySlug =
                    getCategorySlug(cat);

                  return (
                    <Link
                      key={
                        cat?._id ||
                        categorySlug
                      }
                      href={`/bn/categories/${encodeURIComponent(
                        categorySlug
                      )}`}
                      className="flex min-h-[90px] items-center justify-center border border-[#c8b27a] bg-gradient-to-b from-[#f6f0dd] via-[#e6d4a3] to-[#c9ab63] px-3 text-center font-semibold text-[#4b3415] shadow-sm transition hover:shadow-md"
                    >
                      <span className="text-base leading-6 md:text-lg">
                        {cat.name}
                      </span>
                    </Link>
                  );
                })}
            </div>
          ) : (
            <div className="border border-yellow-200 bg-white p-8 text-center">
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
              className="border border-[#3b2f2f] bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              ফতোয়া
            </Link>

            <Link
              href="/bn/articles"
              className="border border-[#3b2f2f] bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              প্রবন্ধ
            </Link>

            <Link
              href="/bn/categories"
              className="border border-[#3b2f2f] bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              বিষয়সমূহ
            </Link>

            <Link
              href="/ozan-shariah-calculator"
              className="border border-[#3b2f2f] bg-[#3b2f2f] py-4 text-center font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              ইসলামী ক্যালকুলেটর
            </Link>
          </div>
        </section>

        {/* =================================================
            LATEST QUESTIONS
        ================================================= */}

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between border-b border-[#c8b27a] pb-2">
            <h2 className="text-2xl font-bold text-[#4b3415]">
              নতুন প্রশ্নসমূহ
            </h2>

            <Link
              href="/bn/fatawa"
              className="font-semibold text-yellow-700 transition hover:text-yellow-900"
            >
              সব দেখুন →
            </Link>
          </div>

          {questionLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(
                (item) => (
                  <div
                    key={item}
                    className="h-[88px] animate-pulse border border-yellow-100 bg-white"
                  />
                )
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map(
                  (item) => {
                    const question =
                      getQuestion(item);

                    const questionSlug =
                      getQuestionSlug(item);

                    return (
                      <Link
                        key={
                          item?._id ||
                          questionSlug
                        }
                        href={`/bn/fatawa/${encodeURIComponent(
                          questionSlug
                        )}`}
                        className="block border border-yellow-200 bg-white p-4 shadow-sm transition hover:border-yellow-500 hover:shadow-md"
                      >
                        <h3 className="font-semibold leading-7 text-gray-800">
                          {question}
                        </h3>

                        <span className="mt-2 inline-block text-sm font-semibold text-yellow-700">
                          ফতোয়া পড়ুন →
                        </span>
                      </Link>
                    );
                  }
                )
              ) : (
                <div className="border border-yellow-200 bg-white p-8 text-center">
                  <p className="text-gray-500">
                    {query
                      ? "কোনো প্রশ্ন পাওয়া যায়নি।"
                      : "এখনো কোনো বাংলা প্রশ্ন পাওয়া যায়নি।"}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* =================================================
            ARTICLES
        ================================================= */}

        <section>
          <div className="mb-4 flex items-center justify-between border-b border-[#c8b27a] pb-2">
            <h2 className="text-2xl font-bold text-[#4b3415]">
              নির্বাচিত প্রবন্ধ
            </h2>

            <Link
              href="/bn/articles"
              className="font-semibold text-yellow-700 transition hover:text-yellow-900"
            >
              সব দেখুন →
            </Link>
          </div>

          {articleLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(
                (item) => (
                  <div
                    key={item}
                    className="h-[76px] animate-pulse border border-yellow-100 bg-white"
                  />
                )
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredArticles.length > 0 ? (
                filteredArticles.map(
                  (item) => {
                    const title =
                      getArticleTitle(item);

                    const articleSlug =
                      getArticleSlug(item);

                    return (
                      <Link
                        key={
                          item?._id ||
                          articleSlug
                        }
                        href={`/bn/articles/${encodeURIComponent(
                          articleSlug
                        )}`}
                        className="block border border-yellow-200 bg-white p-4 shadow-sm transition hover:border-yellow-500 hover:shadow-md"
                      >
                        <h3 className="font-semibold leading-7 text-gray-800">
                          {title}
                        </h3>

                        <span className="mt-2 inline-block text-sm font-semibold text-yellow-700">
                          প্রবন্ধ পড়ুন →
                        </span>
                      </Link>
                    );
                  }
                )
              ) : (
                <div className="border border-yellow-200 bg-white p-8 text-center">
                  <p className="text-gray-500">
                    এখনো কোনো বাংলা প্রবন্ধ পাওয়া যায়নি।
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}