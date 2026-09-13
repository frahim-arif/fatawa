
"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  Search,
  Mic,
  ArrowRight,
  BookOpen,
  FileText,
  Layers3,
  Calculator,
  ScrollText,
  Sparkles,
  Clock3,
} from "lucide-react";

import { motion } from "framer-motion";

import HomeLoader from "../components/HomeLoader";
import LatestBooksSlider from "../components/LatestBooksSlider";
import IslamicTools from "../components/IslamicTools";

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
    }, 1000);

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
                !existingIds.has(item?._id)
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

      /* Next day Fajr */

      if (!next && prayerTimes?.Fajr) {
        const cleanFajr =
          String(
            prayerTimes.Fajr
          ).split(" ")[0];

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

  const getQuestionCategoryValues = (
    item
  ) => {
    const values = [];

    const category = item?.category;

    if (
      typeof category ===
      "string"
    ) {
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
          String(
            category.englishSlug
          )
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
          String(
            category.englishName
          )
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
        String(
          item.englishCategoryName
        )
      );
    }

    if (item?.englishCategorySlug) {
      values.push(
        String(
          item.englishCategorySlug
        )
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

  const filteredQuestions =
    useMemo(() => {
      let result = [
        ...allQuestions,
      ];

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
          new Set([
            selected,
          ]);

        if (
          selectedCategoryObject
        ) {
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

        result =
          result.filter((item) => {
            const values =
              getQuestionCategoryValues(
                item
              );

            return values.some(
              (value) =>
                possibleValues.has(
                  value
                )
            );
          });
      }

      /* SEARCH */

      const search =
        query
          .trim()
          .toLowerCase();

      if (search) {
        result =
          result.filter((item) => {
            const question =
              getQuestion(
                item
              ).toLowerCase();

            const answer =
              getAnswer(
                item
              ).toLowerCase();

            return (
              question.includes(
                search
              ) ||
              answer.includes(
                search
              )
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

  const filteredArticles =
    useMemo(() => {
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
    }, [
      articles,
      query,
    ]);

  /* =====================================================
     CATEGORY CLICK
  ===================================================== */

  const handleCategoryClick =
    (category) => {
      const name =
        getCategoryName(category);

      const slug =
        getCategorySlug(category);

      setSelectedCategory(
        name || slug
      );

      setTimeout(() => {
        questionsRef.current?.scrollIntoView(
          {
            behavior: "smooth",
            block: "start",
          }
        );
      }, 100);
    };

  /* =====================================================
     CLEAR CATEGORY
  ===================================================== */

  const clearCategory = () => {
    setSelectedCategory("");

    setTimeout(() => {
      questionsRef.current?.scrollIntoView(
        {
          behavior: "smooth",
          block: "start",
        }
      );
    }, 100);
  };

  /* =====================================================
     VOICE SEARCH
  ===================================================== */

  const startListening = () => {
    if (
      typeof window ===
      "undefined"
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
    recognition.interimResults =
      false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (
      event
    ) => {
      const transcript =
        event.results?.[0]?.[0]
          ?.transcript || "";

      setQuery(transcript);
    };

    recognition.onerror = (
      error
    ) => {
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
  ===================================================== */

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f7fa]">

      {/* =================================================
          PRAYER BAR
      ================================================= */}

      <div className="w-full border-b border-[#294c67] bg-[#071725]">

        {prayerTimes ? (
          <div className="overflow-hidden py-2">

            <motion.div
              className="flex w-max items-center whitespace-nowrap text-xs font-medium text-amber-300 sm:text-sm"
              animate={{
                x: [
                  "100%",
                  "-100%",
                ],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[1, 2].map((set) => (
                <div
                  key={set}
                  className="flex items-center"
                  aria-hidden={
                    set === 2
                  }
                >
                  <span className="px-4">
                    Fajr:{" "}
                    {prayerTimes?.Fajr?.split(
                      " "
                    )[0] || "--"}
                  </span>

                  <span className="text-[#6689a5]">
                    |
                  </span>

                  <span className="px-4">
                    Dhuhr:{" "}
                    {prayerTimes?.Dhuhr?.split(
                      " "
                    )[0] || "--"}
                  </span>

                  <span className="text-[#6689a5]">
                    |
                  </span>

                  <span className="px-4">
                    Asr:{" "}
                    {prayerTimes?.Asr?.split(
                      " "
                    )[0] || "--"}
                  </span>

                  <span className="text-[#6689a5]">
                    |
                  </span>

                  <span className="px-4">
                    Maghrib:{" "}
                    {prayerTimes?.Maghrib?.split(
                      " "
                    )[0] || "--"}
                  </span>

                  <span className="text-[#6689a5]">
                    |
                  </span>

                  <span className="px-4">
                    Isha:{" "}
                    {prayerTimes?.Isha?.split(
                      " "
                    )[0] || "--"}
                  </span>

                  <span className="px-6 text-amber-500">
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
          MAIN CONTENT
      ================================================= */}

      <div className="mx-auto max-w-7xl px-3 py-8 sm:px-5 md:py-10">

        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="mb-12">

          <div className="mx-auto max-w-5xl">

            <div className="mb-3 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b17e19]">
                Search Knowledge
              </p>

              <h1 className="mt-2 text-2xl font-bold text-[#102d45] sm:text-3xl">
                Search Islamic Questions
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Find answers to your Islamic questions
              </p>
            </div>

            <div className="relative mt-6 flex items-center overflow-hidden border border-[#9fb3c3] bg-white shadow-[0_12px_35px_rgba(16,45,69,0.10)] transition-all duration-300 focus-within:border-[#b68a35] focus-within:shadow-[0_12px_35px_rgba(182,138,53,0.12)]">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#102d45] sm:h-16 sm:w-16">
                <Search className="h-5 w-5 text-amber-300 sm:h-6 sm:w-6" />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Search Islamic questions..."
                aria-label="Search Islamic questions"
                className="h-14 w-full bg-transparent px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:h-16 sm:text-base"
              />

              <button
                type="button"
                onClick={
                  startListening
                }
                className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center border border-gray-200 bg-gray-50 text-[#315b7a] transition hover:border-[#b68a35] hover:bg-[#fffaf0] hover:text-[#b17e19] sm:mr-3"
                aria-label="Voice Search"
              >
                <Mic className="h-5 w-5" />
              </button>

            </div>

          </div>

        </section>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <section className="mb-14">

          <div className="mb-6 flex items-end justify-between gap-4">

            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1 w-8 bg-amber-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b17e19]">
                  Browse Topics
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#102d45] sm:text-3xl">
                Islamic Categories
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Explore questions by Islamic topic
              </p>
            </div>

            <Link
              href="/en/categories"
              className="hidden items-center gap-1 border-b border-[#b68a35] pb-1 text-sm font-bold text-[#315b7a] transition hover:text-[#b17e19] sm:flex"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

          {englishCategories.length > 0 ? (

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

              {englishCategories
                .slice(0, 10)
                .map((category, index) => {

                  const name =
                    getCategoryName(
                      category
                    );

                  const slug =
                    getCategorySlug(
                      category
                    );

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
                      className={`group relative min-h-[125px] overflow-hidden border p-4 text-left transition-all duration-300 ${
                        active
                          ? "border-[#b68a35] bg-[#102d45] text-white shadow-[0_12px_30px_rgba(16,45,69,0.20)]"
                          : "border-[#d3dde5] bg-white text-[#173b57] hover:-translate-y-1 hover:border-[#b68a35] hover:shadow-[0_12px_30px_rgba(16,45,69,0.10)]"
                      }`}
                    >

                      {/* top accent */}
                      <span
                        className={`absolute left-0 top-0 h-1 w-full transition-all ${
                          active
                            ? "bg-amber-400"
                            : "bg-[#dfe7ed] group-hover:bg-amber-400"
                        }`}
                      />

                      {/* number */}
                      <span
                        className={`absolute right-3 top-3 text-xs font-bold ${
                          active
                            ? "text-amber-300"
                            : "text-[#b8c6d1]"
                        }`}
                      >
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      {/* icon */}
                      <div
                        className={`mb-5 flex h-10 w-10 items-center justify-center border ${
                          active
                            ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                            : "border-[#d7e1e8] bg-[#f5f8fa] text-[#315b7a] group-hover:border-amber-300 group-hover:bg-[#fffaf0] group-hover:text-[#b17e19]"
                        }`}
                      >
                        <Layers3 className="h-5 w-5" />
                      </div>

                      <span className="block pr-5 text-sm font-bold leading-5 sm:text-base">
                        {name}
                      </span>

                      <span
                        className={`mt-2 flex items-center gap-1 text-xs font-semibold ${
                          active
                            ? "text-amber-300"
                            : "text-gray-400 group-hover:text-[#b17e19]"
                        }`}
                      >
                        Explore
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>

                    </button>
                  );
                })}

            </div>

          ) : (

            <div className="border border-[#d7e1e8] bg-white p-10 text-center text-gray-500 shadow-sm">
              No English categories available.
            </div>

          )}

          {/* Mobile View All */}

          <div className="mt-5 sm:hidden">
            <Link
              href="/en/categories"
              className="flex items-center justify-center gap-2 border border-[#b68a35] bg-white px-4 py-3 text-sm font-bold text-[#315b7a] transition hover:bg-[#fffaf0]"
            >
              View All Categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </section>

        {/* =================================================
            QUESTIONS
        ================================================= */}

        <section
          ref={questionsRef}
          className="mb-14"
        >

          <div className="mb-6 flex items-end justify-between gap-4">

            <div>

              <div className="mb-3 flex items-center gap-2">
                <span className="h-1 w-8 bg-amber-500" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b17e19]">
                  Fatwa Library
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#102d45] sm:text-3xl">
                {selectedCategory ||
                  "Latest Questions"}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {selectedCategory
                  ? "Questions from the selected category"
                  : "Recently added Islamic questions"}
              </p>

            </div>

            <div className="flex items-center gap-2">

              {selectedCategory && (
                <button
                  type="button"
                  onClick={
                    clearCategory
                  }
                  className="flex items-center gap-1 border border-[#d0dce5] bg-white px-3 py-2 text-xs font-bold text-[#315b7a] transition hover:border-[#b68a35] hover:text-[#b17e19]"
                >
                  Clear
                </button>
              )}

              <Link
                href="/en/fatawa"
                className="hidden items-center gap-1 border-b border-[#b68a35] pb-1 text-sm font-bold text-[#315b7a] transition hover:text-[#b17e19] sm:flex"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

          </div>

          {loadingQuestions &&
          allQuestions.length === 0 ? (

            <div className="border border-[#d7e1e8] bg-white p-10 text-center text-gray-500">
              Loading questions...
            </div>

          ) : filteredQuestions.length > 0 ? (

            <div className="space-y-3">

              {filteredQuestions.map(
                (item, index) => {

                  const question =
                    getQuestion(
                      item
                    );

                  const slug =
                    getQuestionSlug(
                      item
                    );

                  return (
                    <Link
                      key={
                        item?._id
                      }
                      href={`/en/fatawa/${encodeURIComponent(
                        slug
                      )}`}
                      className="group relative block overflow-hidden border border-[#d6e0e7] bg-white p-5 shadow-[0_5px_20px_rgba(16,45,69,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b68a35] hover:shadow-[0_12px_30px_rgba(16,45,69,0.09)] sm:p-6"
                    >

                      <div className="flex gap-4">

                        <div className="hidden shrink-0 sm:block">
                          <div className="flex h-10 w-10 items-center justify-center border border-[#d7e1e8] bg-[#f5f8fa] text-xs font-bold text-[#315b7a] group-hover:border-amber-300 group-hover:bg-[#fffaf0] group-hover:text-[#b17e19]">
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="mb-2 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-amber-500" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                              Islamic Question
                            </span>
                          </div>

                          <h3 className="text-base font-semibold leading-7 text-[#1d3447] transition group-hover:text-[#315b7a] sm:text-lg">
                            {question}
                          </h3>

                          <div className="mt-3 flex items-center gap-2 text-sm font-bold text-[#b17e19]">
                            Read Fatwa
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>

                        </div>

                      </div>

                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-500 transition-all duration-300 group-hover:w-full" />

                    </Link>
                  );
                }
              )}

            </div>

          ) : (

            <div className="border border-[#d7e1e8] bg-white p-10 text-center text-gray-500">
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

              <div className="mt-7 text-center">

                <button
                  type="button"
                  disabled={
                    loadingQuestions
                  }
                  onClick={() =>
                    fetchQuestions({
                      customSkip:
                        skip,
                      reset: false,
                    })
                  }
                  className="inline-flex items-center gap-2 border border-[#b68a35] bg-[#102d45] px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#173f5d] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingQuestions
                    ? "Loading..."
                    : "Load More Questions"}

                  {!loadingQuestions && (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>

              </div>
            )}

        </section>

        {/* =================================================
            NEXT PRAYER
        ================================================= */}

        <section className="mb-14">

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="relative overflow-hidden border border-[#294c67] bg-[#071725] shadow-[0_15px_40px_rgba(7,23,37,0.18)]"
          >

            <div className="absolute right-0 top-0 h-40 w-40 translate-x-16 -translate-y-16 border border-amber-400/10 rounded-full" />

            <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-16 translate-y-16 border border-blue-300/10 rounded-full" />

            <div className="relative z-10 flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">

              <div>

                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                  <Clock3 className="h-4 w-4" />
                  Next Prayer
                </div>

                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  {nextPrayer || "--"}
                </h2>

                <p className="mt-1 text-sm text-[#9db2c4]">
                  Stay connected with your daily prayers
                </p>

              </div>

              <motion.div
                animate={{
                  opacity: [
                    1,
                    0.65,
                    1,
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="inline-flex items-center border border-amber-400/30 bg-amber-400/10 px-5 py-3"
              >
                <span className="font-mono text-2xl font-bold tracking-wider text-amber-200 sm:text-3xl">
                  {countdown ||
                    "00:00:00"}
                </span>
              </motion.div>

            </div>

          </motion.div>

        </section>

        {/* =================================================
            ISLAMIC RESOURCES
        ================================================= */}

        <section className="mb-14">

          <div className="mb-6">

            <div className="mb-3 flex items-center gap-2">
              <span className="h-1 w-8 bg-amber-500" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b17e19]">
                Explore More
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#102d45] sm:text-3xl">
              Islamic Resources
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Useful Islamic resources and learning tools
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">

            {[
              {
                href: "/en/fatawa",
                title: "Fatwas",
                icon: BookOpen,
              },
              {
                href: "/en/articles",
                title: "Articles",
                icon: FileText,
              },
              {
                href: "/en/categories",
                title: "Categories",
                icon: Layers3,
              },
              {
                href: "/books",
                title: "Islamic Books",
                icon: ScrollText,
              },
              {
                href: "/ozan-shariah-calculator",
                title: "Islamic Calculator",
                icon: Calculator,
              },
              {
                href: "/40-hadith-free",
                title: "40 Hadith",
                icon: Sparkles,
              },
            ].map((item) => {

              const Icon =
                item.icon;

              return (
                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  className="group relative overflow-hidden border border-[#d1dce4] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#b68a35] hover:shadow-[0_12px_30px_rgba(16,45,69,0.10)]"
                >

                  <span className="absolute left-0 top-0 h-1 w-0 bg-amber-500 transition-all duration-300 group-hover:w-full" />

                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-[#d8e2e9] bg-[#f5f8fa] text-[#315b7a] transition group-hover:border-amber-300 group-hover:bg-[#fffaf0] group-hover:text-[#b17e19]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-sm font-bold leading-5 text-[#173b57]">
                    {item.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-gray-400 transition group-hover:text-[#b17e19]">
                    Explore
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>

                </Link>
              );
            })}

          </div>

        </section>

        {/* =================================================
            LATEST QUESTIONS / ARTICLES
        ================================================= */}

        <section className="mb-14">

          <div className="mb-5 flex items-center gap-2">
            <span className="h-1 w-8 bg-amber-500" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b17e19]">
              Latest Updates
            </span>
          </div>

          <div className="overflow-hidden border border-[#d2dde5] bg-white shadow-[0_8px_25px_rgba(16,45,69,0.05)]">

            {/* tabs */}

            <div className="grid grid-cols-2 border-b border-[#d2dde5]">

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "questions"
                  )
                }
                className={`relative px-4 py-4 text-sm font-bold transition ${
                  activeTab ===
                  "questions"
                    ? "bg-[#102d45] text-white"
                    : "bg-[#f8fafb] text-[#315b7a] hover:bg-[#eef4f8]"
                }`}
              >
                Latest Questions

                {activeTab ===
                  "questions" && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-10 -translate-x-1/2 bg-amber-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "articles"
                  )
                }
                className={`relative px-4 py-4 text-sm font-bold transition ${
                  activeTab ===
                  "articles"
                    ? "bg-[#102d45] text-white"
                    : "bg-[#f8fafb] text-[#315b7a] hover:bg-[#eef4f8]"
                }`}
              >
                Selected Articles

                {activeTab ===
                  "articles" && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-10 -translate-x-1/2 bg-amber-400" />
                )}
              </button>

            </div>

            {/* content */}

            <div className="p-4 sm:p-6">

              {/* QUESTIONS */}

              {activeTab ===
                "questions" && (

                <div className="space-y-1">

                  {latestQuestions.length >
                  0 ? (

                    latestQuestions
                      .slice(0, 5)
                      .map(
                        (
                          item,
                          index
                        ) => (
                          <Link
                            key={
                              item?._id
                            }
                            href={`/en/fatawa/${encodeURIComponent(
                              getQuestionSlug(
                                item
                              )
                            )}`}
                            className="group flex items-start gap-4 border-b border-gray-100 px-2 py-4 last:border-0 hover:bg-[#fafcfd]"
                          >

                            <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#d7e1e8] text-[10px] font-bold text-[#315b7a] group-hover:border-amber-300 group-hover:text-[#b17e19]">
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <span className="flex-1 leading-7 text-[#1d3447] group-hover:text-[#315b7a]">
                              {getQuestion(
                                item
                              )}
                            </span>

                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-amber-500" />

                          </Link>
                        )
                      )

                  ) : (

                    <p className="py-6 text-center text-gray-500">
                      No latest questions available.
                    </p>

                  )}

                </div>
              )}

              {/* ARTICLES */}

              {activeTab ===
                "articles" && (

                <div className="space-y-1">

                  {filteredArticles.length >
                  0 ? (

                    filteredArticles
                      .slice(0, 5)
                      .map(
                        (
                          item,
                          index
                        ) => {

                          const title =
                            getArticleTitle(
                              item
                            );

                          const slug =
                            getArticleSlug(
                              item
                            );

                          return (
                            <Link
                              key={
                                item?._id
                              }
                              href={`/en/articles/${encodeURIComponent(
                                slug
                              )}`}
                              className="group flex items-start gap-4 border-b border-gray-100 px-2 py-4 last:border-0 hover:bg-[#fafcfd]"
                            >

                              <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#d7e1e8] text-[10px] font-bold text-[#315b7a] group-hover:border-amber-300 group-hover:text-[#b17e19]">
                                {String(
                                  index + 1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </span>

                              <span className="flex-1 leading-7 text-[#1d3447] group-hover:text-[#315b7a]">
                                {title}
                              </span>

                              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-amber-500" />

                            </Link>
                          );
                        }
                      )

                  ) : (

                    <p className="py-6 text-center text-gray-500">
                      No English articles available.
                    </p>

                  )}

                </div>
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            LATEST BOOKS
        ================================================= */}

        <section className="mb-12">

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

