
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import {
  Search,
  Mic,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

import { motion } from "framer-motion";

import HomeLoader from "../components/HomeLoader";
import LatestBooksSlider from "../components/LatestBooksSlider";
import IslamicTools from "../components/IslamicTools";
import IslamicSlider from "../components/IslamicSlider";

const backend = "https://f-backend-vdi1.onrender.com/api";

const QUESTION_LIMIT = 10;

export default function EnglishHomePage() {
  /* =====================================================
     STATES
  ===================================================== */

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [articles, setArticles] = useState([]);

  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");

  const [activeTab, setActiveTab] = useState("questions");
  const [isLoading, setIsLoading] = useState(true);

  const questionsRef = useRef(null);

  /* =====================================================
     HOME LOADER
  ===================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  /* =====================================================
     FETCH ENGLISH CATEGORIES
  ===================================================== */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backend}/en/categories`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(
            `Categories API error: ${res.status}`
          );
        }

        const data = await res.json();

        if (
          data?.success &&
          Array.isArray(data?.data)
        ) {
          setCategories(data.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error(
          "English categories error:",
          error
        );

        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  /* =====================================================
     ENGLISH CATEGORIES
  ===================================================== */

  const englishCategories = useMemo(() => {
    return categories.filter((category) => {
      const name =
        category?.englishName ||
        category?.enName ||
        category?.nameEn ||
        category?.name ||
        "";

      const slug =
        category?.englishSlug ||
        category?.enSlug ||
        category?.slugEn ||
        category?.slug ||
        category?._id ||
        "";

      return Boolean(name && slug);
    });
  }, [categories]);

  /* =====================================================
     CATEGORY HELPERS
  ===================================================== */

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
      category?._id ||
      ""
    );
  };

  /* =====================================================
     QUESTION HELPERS
  ===================================================== */

  const getQuestion = (item) => {
    return (
      item?.englishQuestion ||
      item?.enQuestion ||
      item?.questionEn ||
      item?.question ||
      ""
    );
  };

  const getAnswer = (item) => {
    return (
      item?.englishAnswer ||
      item?.enAnswer ||
      item?.answerEn ||
      item?.answer ||
      ""
    );
  };

  const getQuestionSlug = (item) => {
    return (
      item?.englishSlug ||
      item?.enSlug ||
      item?.slugEn ||
      item?.slug ||
      item?._id ||
      ""
    );
  };

  /* =====================================================
     ARTICLE HELPERS
  ===================================================== */

  const getArticleTitle = (item) => {
    return (
      item?.englishTitle ||
      item?.enTitle ||
      item?.titleEn ||
      item?.title ||
      ""
    );
  };

  const getArticleSlug = (item) => {
    return (
      item?.englishSlug ||
      item?.enSlug ||
      item?.slugEn ||
      item?.slug ||
      item?._id ||
      ""
    );
  };

  /* =====================================================
     FETCH ENGLISH QUESTIONS
  ===================================================== */

  const fetchQuestions = async ({
    customSkip = 0,
    reset = false,
  } = {}) => {
    if (loadingQuestions) return;

    try {
      setLoadingQuestions(true);

      const url =
        `${backend}/en/questions` +
        `?skip=${customSkip}` +
        `&limit=${QUESTION_LIMIT}`;

      const res = await fetch(url, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(
          `English questions API error: ${res.status}`
        );
      }

      const data = await res.json();

      if (!data?.success) {
        setHasMore(false);
        return;
      }

      const newQuestions = Array.isArray(data?.data)
        ? data.data
        : [];

      if (reset) {
        setAllQuestions(newQuestions);
      } else {
        setAllQuestions((prev) => {
          const existingIds = new Set(
            prev.map((item) => item?._id)
          );

          const uniqueQuestions =
            newQuestions.filter(
              (item) =>
                item?._id &&
                !existingIds.has(item._id)
            );

          return [
            ...prev,
            ...uniqueQuestions,
          ];
        });
      }

      setSkip(
        customSkip + newQuestions.length
      );

      setHasMore(
        newQuestions.length === QUESTION_LIMIT
      );
    } catch (error) {
      console.error(
        "English questions error:",
        error
      );
    } finally {
      setLoadingQuestions(false);
    }
  };

  /* =====================================================
     INITIAL QUESTIONS
  ===================================================== */

  useEffect(() => {
    fetchQuestions({
      customSkip: 0,
      reset: true,
    });
  }, []);

  /* =====================================================
     LATEST QUESTIONS
  ===================================================== */

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch(
          `${backend}/en/questions?skip=0&limit=5`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch latest English questions"
          );
        }

        const data = await res.json();

        if (
          data?.success &&
          Array.isArray(data?.data)
        ) {
          setLatestQuestions(data.data);
        } else {
          setLatestQuestions([]);
        }
      } catch (error) {
        console.error(
          "Latest English questions error:",
          error
        );

        setLatestQuestions([]);
      }
    };

    fetchLatest();
  }, []);

  /* =====================================================
     FETCH ARTICLES
  ===================================================== */

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${backend}/majameen`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch articles"
          );
        }

        const data = await res.json();

        if (
          data?.success &&
          Array.isArray(data?.data)
        ) {
          const englishArticles =
            data.data.filter(
              (item) =>
                item?.englishTitle ||
                item?.enTitle ||
                item?.titleEn ||
                item?.title
            );

          setArticles(
            englishArticles.slice(0, 5)
          );
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error(
          "English articles error:",
          error
        );

        setArticles([]);
      }
    };

    fetchArticles();
  }, []);

  /* =====================================================
     PRAYER TIMES
  ===================================================== */

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Guwahati&country=India&method=1"
        );

        if (!res.ok) {
          throw new Error(
            "Prayer API error"
          );
        }

        const data = await res.json();

        if (data?.code === 200) {
          setPrayerTimes(
            data?.data?.timings || null
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

  /* =====================================================
     NEXT PRAYER COUNTDOWN
  ===================================================== */

  useEffect(() => {
    if (!prayerTimes) return;

    const updateCountdown = () => {
      const now = new Date();

      const prayers = [
        {
          name: "Fajr",
          time: prayerTimes?.Fajr,
        },
        {
          name: "Dhuhr",
          time: prayerTimes?.Dhuhr,
        },
        {
          name: "Asr",
          time: prayerTimes?.Asr,
        },
        {
          name: "Maghrib",
          time: prayerTimes?.Maghrib,
        },
        {
          name: "Isha",
          time: prayerTimes?.Isha,
        },
      ];

      let next = null;

      for (const prayer of prayers) {
        if (!prayer.time) continue;

        const cleanTime =
          String(prayer.time).split(" ")[0];

        const [hours, minutes] =
          cleanTime.split(":");

        const prayerDate = new Date();

        prayerDate.setHours(
          Number(hours),
          Number(minutes),
          0,
          0
        );

        if (prayerDate > now) {
          next = {
            name: prayer.name,
            time: prayerDate,
          };

          break;
        }
      }

      /* =================================================
         NEXT DAY FAJR
      ================================================= */

      if (!next && prayerTimes?.Fajr) {
        const cleanFajr =
          String(prayerTimes.Fajr).split(" ")[0];

        const [hours, minutes] =
          cleanFajr.split(":");

        const tomorrow = new Date();

        tomorrow.setDate(
          tomorrow.getDate() + 1
        );

        tomorrow.setHours(
          Number(hours),
          Number(minutes),
          0,
          0
        );

        next = {
          name: "Fajr",
          time: tomorrow,
        };
      }

      if (!next) return;

      const diff =
        next.time.getTime() -
        now.getTime();

      const totalSeconds = Math.max(
        0,
        Math.floor(diff / 1000)
      );

      const hrs = Math.floor(
        totalSeconds / 3600
      );

      const mins = Math.floor(
        (totalSeconds % 3600) / 60
      );

      const secs =
        totalSeconds % 60;

      setNextPrayer(next.name);

      setCountdown(
        `${String(hrs).padStart(
          2,
          "0"
        )}:${String(mins).padStart(
          2,
          "0"
        )}:${String(secs).padStart(
          2,
          "0"
        )}`
      );
    };

    updateCountdown();

    const interval = setInterval(
      updateCountdown,
      1000
    );

    return () =>
      clearInterval(interval);
  }, [prayerTimes]);

  /* =====================================================
     QUESTION CATEGORY VALUES
  ===================================================== */

  const getQuestionCategoryValues = (item) => {
    const values = [];

    const category = item?.category;

    if (typeof category === "string") {
      values.push(category);
    }

    if (
      category &&
      typeof category === "object"
    ) {
      if (category?._id) {
        values.push(
          String(category._id)
        );
      }

      if (category?.slug) {
        values.push(
          String(category.slug)
        );
      }

      if (category?.englishSlug) {
        values.push(
          String(category.englishSlug)
        );
      }

      if (category?.enSlug) {
        values.push(
          String(category.enSlug)
        );
      }

      if (category?.slugEn) {
        values.push(
          String(category.slugEn)
        );
      }

      if (category?.englishName) {
        values.push(
          String(category.englishName)
        );
      }

      if (category?.enName) {
        values.push(
          String(category.enName)
        );
      }

      if (category?.nameEn) {
        values.push(
          String(category.nameEn)
        );
      }

      if (category?.name) {
        values.push(
          String(category.name)
        );
      }
    }

    if (item?.categoryId) {
      values.push(
        String(item.categoryId)
      );
    }

    if (item?.categoryName) {
      values.push(
        String(item.categoryName)
      );
    }

    if (item?.categorySlug) {
      values.push(
        String(item.categorySlug)
      );
    }

    if (item?.englishCategory) {
      values.push(
        String(item.englishCategory)
      );
    }

    if (item?.englishCategoryName) {
      values.push(
        String(item.englishCategoryName)
      );
    }

    if (item?.englishCategorySlug) {
      values.push(
        String(item.englishCategorySlug)
      );
    }

    return values.map((value) =>
      String(value)
        .trim()
        .toLowerCase()
    );
  };

  /* =====================================================
     FILTER QUESTIONS
  ===================================================== */

  const filteredQuestions = useMemo(() => {
    let result = [...allQuestions];

    /* CATEGORY */

    if (selectedCategory) {
      const selected =
        selectedCategory
          .trim()
          .toLowerCase();

      const selectedCategoryObject =
        englishCategories.find(
          (category) => {
            const name =
              getCategoryName(
                category
              ).toLowerCase();

            const slug =
              getCategorySlug(
                category
              ).toLowerCase();

            return (
              name === selected ||
              slug === selected
            );
          }
        );

      const possibleValues =
        new Set([selected]);

      if (selectedCategoryObject) {
        possibleValues.add(
          getCategoryName(
            selectedCategoryObject
          )
            .trim()
            .toLowerCase()
        );

        possibleValues.add(
          getCategorySlug(
            selectedCategoryObject
          )
            .trim()
            .toLowerCase()
        );

        if (
          selectedCategoryObject?._id
        ) {
          possibleValues.add(
            String(
              selectedCategoryObject._id
            )
              .trim()
              .toLowerCase()
          );
        }
      }

      result = result.filter((item) => {
        const values =
          getQuestionCategoryValues(
            item
          );

        return values.some(
          (value) =>
            possibleValues.has(value)
        );
      });
    }

    /* SEARCH */

    const search =
      query
        .trim()
        .toLowerCase();

    if (search) {
      result = result.filter((item) => {
        const question =
          getQuestion(
            item
          ).toLowerCase();

        const answer =
          getAnswer(
            item
          ).toLowerCase();

        return (
          question.includes(search) ||
          answer.includes(search)
        );
      });
    }

    return result;
  }, [
    allQuestions,
    selectedCategory,
    query,
    englishCategories,
  ]);

  /* =====================================================
     FILTER ARTICLES
  ===================================================== */

  const filteredArticles = useMemo(() => {
    const search =
      query
        .trim()
        .toLowerCase();

    if (!search) {
      return articles;
    }

    return articles.filter(
      (item) =>
        getArticleTitle(item)
          .toLowerCase()
          .includes(search)
    );
  }, [articles, query]);

  /* =====================================================
     CATEGORY CLICK
  ===================================================== */

  const handleCategoryClick = (category) => {
    const name =
      getCategoryName(category);

    const slug =
      getCategorySlug(category);

    setSelectedCategory(
      name || slug
    );

    setTimeout(() => {
      questionsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  /* =====================================================
     CLEAR CATEGORY
  ===================================================== */

  const clearCategory = () => {
    setSelectedCategory("");

    setTimeout(() => {
      questionsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  /* =====================================================
     VOICE SEARCH
  ===================================================== */

  const startListening = () => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

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
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results?.[0]?.[0]
          ?.transcript || "";

      setQuery(transcript);
    };

    recognition.onerror = (error) => {
      console.error(
        "Voice search error:",
        error
      );
    };

    try {
      recognition.start();
    } catch (error) {
      console.error(
        "Voice recognition error:",
        error
      );
    }
  };

  /* =====================================================
     LOADER
  ===================================================== */

  if (isLoading) {
    return <HomeLoader />;
  }

  /* =====================================================
     PAGE
     NO HERO SECTION
  ===================================================== */

  return (
    <main className="min-h-screen overflow-hidden bg-[#eef3f8]">

      {/* =================================================
          PRAYER BAR
      ================================================= */}

      <div className="w-full overflow-hidden border-b border-[#315b7a] bg-[#06131f]">

        {prayerTimes ? (
          <div className="relative overflow-hidden py-2">

            <motion.div
              className="flex w-max items-center whitespace-nowrap text-xs font-medium text-amber-300 sm:text-sm md:text-base"
              animate={{
                x: ["100%", "-100%"],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            >

              {[1, 2].map((set) => (
                <div
                  key={set}
                  className="flex items-center"
                  aria-hidden={set === 2}
                >

                  <span className="px-3">
                    Fajr:{" "}
                    {prayerTimes?.Fajr?.split(
                      " "
                    )[0] || "--"}
                  </span>

                  <span className="text-blue-400">
                    |
                  </span>

                  <span className="px-3">
                    Dhuhr:{" "}
                    {prayerTimes?.Dhuhr?.split(
                      " "
                    )[0] || "--"}
                  </span>

                  <span className="text-blue-400">
                    |
                  </span>

                  <span className="px-3">
                    Asr:{" "}
                    {prayerTimes?.Asr?.split(
                      " "
                    )[0] || "--"}
                  </span>

                  <span className="text-blue-400">
                    |
                  </span>

                  <span className="px-3">
                    Maghrib:{" "}
                    {prayerTimes?.Maghrib?.split(
                      " "
                    )[0] || "--"}
                  </span>

                  <span className="text-blue-400">
                    |
                  </span>

                  <span className="px-3">
                    Isha:{" "}
                    {prayerTimes?.Isha?.split(
                      " "
                    )[0] || "--"}
                  </span>

                  <span className="px-5 text-amber-500">
                    ☪
                  </span>

                </div>
              ))}

            </motion.div>

          </div>
        ) : (
          <div className="py-2 text-center text-xs text-amber-300 sm:text-sm">
            Loading prayer times...
          </div>
        )}

      </div>

      {/* =================================================
          ISLAMIC SLIDER
      ================================================= */}

      <div className="relative z-10 bg-[#eef3f8] py-3">
        <IslamicSlider />
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="mx-auto max-w-7xl px-3 py-8 md:px-5">

        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="mb-10">

          <div className="mx-auto flex max-w-5xl items-center overflow-hidden border border-[#54728d] bg-white shadow-[0_8px_30px_rgba(20,50,80,0.10)] transition focus-within:border-[#b68a35]">

            <div className="px-4">
              <Search className="h-5 w-5 text-[#315b7a]" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search Islamic questions..."
              aria-label="Search Islamic questions"
              className="w-full bg-transparent py-4 text-gray-800 outline-none placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={startListening}
              className="border-l border-gray-200 px-4 py-3 transition hover:bg-blue-50"
              aria-label="Voice Search"
            >
              <Mic className="h-5 w-5 text-[#315b7a]" />
            </button>

          </div>

        </section>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <section className="mb-14">

          <div className="mb-7 flex items-end justify-between gap-4">

            <div>

              <div className="mb-3 flex items-center gap-2">
                <span className="h-[3px] w-10 bg-[#b68a35]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b68a35]">
                  Explore Topics
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-[#102d45] md:text-3xl">
                Islamic Categories
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
                Explore Islamic questions and fatwas by category
              </p>

            </div>

            <Link
              href="/en/categories"
              className="group hidden items-center gap-2 border-b border-[#b68a35] pb-1 text-sm font-bold text-[#315b7a] transition hover:text-[#b68a35] sm:flex"
            >
              View All

              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

          </div>

          {englishCategories.length > 0 ? (

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">

              {englishCategories
                .slice(0, 12)
                .map((category, index) => {

                  const name =
                    getCategoryName(category);

                  const slug =
                    getCategorySlug(category);

                  const active =
                    selectedCategory
                      .trim()
                      .toLowerCase() ===
                    name
                      .trim()
                      .toLowerCase();

                  return (
                    <button
                      type="button"
                      key={
                        category?._id ||
                        slug ||
                        name
                      }
                      onClick={() =>
                        handleCategoryClick(
                          category
                        )
                      }
                      className={`group relative min-h-[120px] overflow-hidden border text-left transition-all duration-300 ${
                        active
                          ? "border-[#b68a35] bg-[#102d45] shadow-[0_12px_30px_rgba(16,45,69,0.20)]"
                          : "border-[#d5dfe7] bg-white hover:-translate-y-1 hover:border-[#b68a35] hover:shadow-[0_12px_28px_rgba(16,45,69,0.12)]"
                      }`}
                    >

                      {/* Gold top line */}

                      <span
                        className={`absolute left-0 top-0 h-[3px] transition-all duration-300 ${
                          active
                            ? "w-full bg-[#d7aa4b]"
                            : "w-0 bg-[#b68a35] group-hover:w-full"
                        }`}
                      />

                      {/* Background decoration */}

                      <span
                        className={`absolute -right-8 -top-8 h-24 w-24 rounded-full transition-all duration-500 ${
                          active
                            ? "bg-[#b68a35]/10"
                            : "bg-[#315b7a]/5 group-hover:bg-[#b68a35]/10"
                        }`}
                      />

                      <span
                        className={`absolute -bottom-10 -left-10 h-24 w-24 rounded-full transition-all duration-500 ${
                          active
                            ? "bg-white/5"
                            : "bg-[#b68a35]/5 group-hover:bg-[#315b7a]/5"
                        }`}
                      />

                      <div className="relative z-10 flex h-full min-h-[120px] flex-col justify-between p-4">

                        <div className="flex items-center justify-between">

                          <span
                            className={`text-xs font-bold tracking-[0.15em] ${
                              active
                                ? "text-[#d7aa4b]"
                                : "text-[#b68a35]"
                            }`}
                          >
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <span
                            className={`flex h-9 w-9 items-center justify-center border transition-all duration-300 ${
                              active
                                ? "border-[#d7aa4b]/40 bg-white/10 text-[#d7aa4b]"
                                : "border-[#d9e2e9] bg-[#f6f9fb] text-[#315b7a] group-hover:border-[#b68a35]/40 group-hover:bg-[#fffaf0] group-hover:text-[#b68a35]"
                            }`}
                          >
                            <BookOpen className="h-4 w-4" />
                          </span>

                        </div>

                        <div className="mt-5 flex items-end justify-between gap-2">

                          <span
                            className={`pr-1 text-sm font-bold leading-6 transition-colors duration-200 md:text-base ${
                              active
                                ? "text-white"
                                : "text-[#173b57] group-hover:text-[#102d45]"
                            }`}
                          >
                            {name}
                          </span>

                          <ArrowUpRight
                            className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                              active
                                ? "text-[#d7aa4b]"
                                : "text-gray-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#b68a35]"
                            }`}
                          />

                        </div>

                      </div>

                    </button>
                  );
                })}

            </div>

          ) : (

            <div className="border border-[#d5dfe7] bg-white p-10 text-center shadow-sm">

              <BookOpen className="mx-auto mb-3 h-8 w-8 text-[#b68a35]" />

              <p className="font-semibold text-[#173b57]">
                No English categories available.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Categories will appear here once available.
              </p>

            </div>

          )}

          {/* Mobile View All */}

          <div className="mt-5 flex justify-center sm:hidden">

            <Link
              href="/en/categories"
              className="group inline-flex items-center gap-2 border border-[#b68a35] bg-white px-5 py-2.5 text-sm font-bold text-[#315b7a] shadow-sm transition hover:bg-[#102d45] hover:text-white"
            >
              View All Categories

              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

          </div>

        </section>

        {/* =================================================
            QUESTIONS
        ================================================= */}

        <section
          ref={questionsRef}
          className="mb-12"
        >

          <div className="mb-5 flex items-center justify-between gap-3">

            <div>

              <div className="mb-2 h-1 w-12 bg-amber-500" />

              <h2 className="text-2xl font-bold text-[#102d45] md:text-3xl">
                {selectedCategory ||
                  "Latest Questions"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {selectedCategory
                  ? "Questions from the selected category"
                  : "Recently added Islamic questions"}
              </p>

            </div>

            <div className="flex gap-2">

              {selectedCategory && (
                <button
                  type="button"
                  onClick={clearCategory}
                  className="border border-[#54728d] bg-white px-3 py-2 text-sm font-semibold text-[#315b7a] hover:bg-blue-50"
                >
                  All
                </button>
              )}

              <Link
                href="/en/fatawa"
                className="hidden font-semibold text-[#315b7a] hover:text-[#b17e19] sm:block"
              >
                View All →
              </Link>

            </div>

          </div>

          {loadingQuestions &&
          allQuestions.length === 0 ? (

            <div className="border border-blue-100 bg-white p-8 text-center text-gray-500">
              Loading questions...
            </div>

          ) : filteredQuestions.length > 0 ? (

            <div className="space-y-3">

              {filteredQuestions.map((item) => {

                const question =
                  getQuestion(item);

                const slug =
                  getQuestionSlug(item);

                return (
                  <Link
                    key={item?._id}
                    href={`/en/fatawa/${encodeURIComponent(
                      slug
                    )}`}
                    className="group block border border-blue-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b68a35] hover:shadow-md"
                  >

                    <div className="flex gap-3">

                      <span className="mt-1 h-8 w-1 shrink-0 bg-[#315b7a] transition group-hover:bg-amber-500" />

                      <div>

                        <h3 className="font-semibold leading-7 text-[#1d3447] group-hover:text-[#315b7a]">
                          {question}
                        </h3>

                        <span className="mt-2 inline-block text-sm font-semibold text-[#b17e19]">
                          Read Fatwa →
                        </span>

                      </div>

                    </div>

                  </Link>
                );
              })}

            </div>

          ) : (

            <div className="border border-blue-100 bg-white p-8 text-center text-gray-500">

              {query
                ? "No questions found for your search."
                : selectedCategory
                ? "No questions found in this category."
                : "No English questions available."}

            </div>

          )}

          {/* LOAD MORE */}

          {hasMore &&
            !selectedCategory &&
            !query &&
            allQuestions.length > 0 && (

              <div className="mt-6 text-center">

                <button
                  type="button"
                  disabled={loadingQuestions}
                  onClick={() =>
                    fetchQuestions({
                      customSkip: skip,
                      reset: false,
                    })
                  }
                  className="border border-[#b68a35] bg-[#102d45] px-7 py-3 font-semibold text-white transition hover:bg-[#174261] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingQuestions
                    ? "Loading..."
                    : "Load More Questions"}
                </button>

              </div>
            )}

        </section>

        {/* =================================================
            NEXT PRAYER
        ================================================= */}

        <section className="mb-12">

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="relative overflow-hidden border border-[#54728d] bg-[#071827] px-5 py-4 shadow-[0_10px_30px_rgba(10,30,50,0.20)]"
          >

            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-amber-500/10" />

            <div className="relative z-10 flex items-center justify-between gap-4">

              <div>

                <p className="text-sm text-amber-300 md:text-base">
                  🕌 Next Prayer
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl">
                  {nextPrayer || "--"}
                </h2>

              </div>

              <motion.div
                animate={{
                  opacity: [1, 0.65, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="border border-amber-400/30 bg-amber-400/10 px-4 py-2"
              >

                <span className="font-mono text-xl font-bold text-amber-200 md:text-2xl">
                  {countdown || "00:00:00"}
                </span>

              </motion.div>

            </div>

          </motion.div>

        </section>

        {/* =================================================
            ISLAMIC RESOURCES
        ================================================= */}

        <section className="mb-12">

          <div className="mb-5">

            <div className="mb-2 h-1 w-12 bg-amber-500" />

            <h2 className="text-2xl font-bold text-[#102d45] md:text-3xl">
              Islamic Resources
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">

            {[
              {
                href: "/en/fatawa",
                title: "Fatwas",
              },
              {
                href: "/en/articles",
                title: "Articles",
              },
              {
                href: "/en/categories",
                title: "Categories",
              },
              {
                href: "/books",
                title: "Islamic Books",
              },
              {
                href: "/ozan-shariah-calculator",
                title: "Islamic Calculator",
              },
              {
                href: "/40-hadith-free",
                title: "40 Hadith",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden border border-[#54728d] bg-[#102d45] p-4 text-center font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-500 hover:bg-[#173f5d] hover:shadow-md"
              >

                <span className="absolute left-0 top-0 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full" />

                {item.title}

              </Link>
            ))}

          </div>

        </section>

        {/* =================================================
            TABS
        ================================================= */}

        <section className="mb-12">

          <div className="flex overflow-hidden border border-[#54728d]">

            <button
              type="button"
              onClick={() =>
                setActiveTab("questions")
              }
              className={`w-1/2 py-3 font-semibold transition ${
                activeTab === "questions"
                  ? "bg-[#102d45] text-white"
                  : "bg-white text-[#315b7a] hover:bg-blue-50"
              }`}
            >
              Latest Questions
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("articles")
              }
              className={`w-1/2 py-3 font-semibold transition ${
                activeTab === "articles"
                  ? "bg-[#102d45] text-white"
                  : "bg-white text-[#315b7a] hover:bg-blue-50"
              }`}
            >
              Selected Articles
            </button>

          </div>

          <div className="border-x border-b border-blue-100 bg-white p-4 shadow-sm">

            {/* QUESTIONS */}

            {activeTab === "questions" && (

              <div className="space-y-3">

                {latestQuestions.length > 0 ? (

                  latestQuestions
                    .slice(0, 5)
                    .map((item) => (
                      <Link
                        key={item?._id}
                        href={`/en/fatawa/${encodeURIComponent(
                          getQuestionSlug(item)
                        )}`}
                        className="group flex items-start gap-3 border-b border-gray-100 pb-3 text-[#1d3447] transition last:border-0"
                      >

                        <span className="shrink-0 text-amber-500">
                          →
                        </span>

                        <span className="leading-7 group-hover:text-[#315b7a] group-hover:underline">
                          {getQuestion(item)}
                        </span>

                      </Link>
                    ))

                ) : (

                  <p className="py-4 text-center text-gray-500">
                    No latest questions available.
                  </p>

                )}

              </div>
            )}

            {/* ARTICLES */}

            {activeTab === "articles" && (

              <div className="space-y-3">

                {filteredArticles.length > 0 ? (

                  filteredArticles
                    .slice(0, 5)
                    .map((item) => {

                      const title =
                        getArticleTitle(item);

                      const slug =
                        getArticleSlug(item);

                      return (
                        <Link
                          key={item?._id}
                          href={`/en/articles/${encodeURIComponent(
                            slug
                          )}`}
                          className="group flex items-start gap-3 border-b border-gray-100 pb-3 text-[#1d3447] last:border-0"
                        >

                          <span className="shrink-0 text-amber-500">
                            →
                          </span>

                          <span className="leading-7 group-hover:text-[#315b7a] group-hover:underline">
                            {title}
                          </span>

                        </Link>
                      );
                    })

                ) : (

                  <p className="py-4 text-center text-gray-500">
                    No English articles available.
                  </p>

                )}

              </div>
            )}

          </div>

        </section>

        {/* =================================================
            LATEST BOOKS
        ================================================= */}

        <section className="mb-10">
          <LatestBooksSlider />
        </section>

        {/* =================================================
            ISLAMIC TOOLS
        ================================================= */}

        <section className="pb-6">
          <IslamicTools />
        </section>

      </div>
    </main>
  );
}

