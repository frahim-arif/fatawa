"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Link from "next/link";
import { Search, Mic } from "lucide-react";
import { motion } from "framer-motion";

import HomeLoader from "../components/HomeLoader";
import LatestBooksSlider from "../components/LatestBooksSlider";
import IslamicTools from "../components/IslamicTools";
import IslamicSlider from "../components/IslamicSlider";

const backend =
  "https://f-backend-vdi1.onrender.com/api";

const QUESTION_LIMIT = 10;

export default function BanglaHomePage() {
  /* =====================================================
     STATES
  ===================================================== */

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [categories, setCategories] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [latestQuestions, setLatestQuestions] =
    useState([]);

  const [articles, setArticles] = useState([]);

  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingQuestions, setLoadingQuestions] =
    useState(false);

  const [prayerTimes, setPrayerTimes] =
    useState(null);

  const [nextPrayer, setNextPrayer] =
    useState("");

  const [countdown, setCountdown] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("questions");

  const [isLoading, setIsLoading] =
    useState(true);

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
     FETCH BANGLA CATEGORIES
  ===================================================== */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${backend}/bn/categories`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            `Categories API error: ${res.status}`
          );
        }

        const data = await res.json();

        if (data?.success) {
          setCategories(
            Array.isArray(data.data)
              ? data.data
              : []
          );
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error(
          "❌ Bangla categories error:",
          error
        );

        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  /* =====================================================
     FETCH ALL INITIAL BANGLA QUESTIONS
  ===================================================== */

  const fetchQuestions = async ({
    customSkip = 0,
    reset = false,
  } = {}) => {
    if (loadingQuestions) return;

    try {
      setLoadingQuestions(true);

      const res = await fetch(
        `${backend}/bn/questions?skip=${customSkip}&limit=${QUESTION_LIMIT}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          `Bangla questions API error: ${res.status}`
        );
      }

      const data = await res.json();

      if (!data?.success) {
        return;
      }

      const newQuestions = Array.isArray(
        data.data
      )
        ? data.data
        : [];

      if (reset) {
        setAllQuestions(newQuestions);
      } else {
        setAllQuestions((prev) => {
          const existingIds = new Set(
            prev.map((item) => item?._id)
          );

          const uniqueNewQuestions =
            newQuestions.filter(
              (item) =>
                item?._id &&
                !existingIds.has(item._id)
            );

          return [
            ...prev,
            ...uniqueNewQuestions,
          ];
        });
      }

      setSkip(
        customSkip + newQuestions.length
      );

      setHasMore(
        newQuestions.length ===
          QUESTION_LIMIT
      );
    } catch (error) {
      console.error(
        "❌ Bangla questions error:",
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
     FETCH LATEST QUESTIONS
  ===================================================== */

  useEffect(() => {
    const fetchLatestQuestions =
      async () => {
        try {
          const res = await fetch(
            `${backend}/bn/questions?skip=0&limit=5`,
            {
              cache: "no-store",
            }
          );

          if (!res.ok) {
            throw new Error(
              `Latest questions API error: ${res.status}`
            );
          }

          const data = await res.json();

          if (data?.success) {
            setLatestQuestions(
              Array.isArray(data.data)
                ? data.data
                : []
            );
          } else {
            setLatestQuestions([]);
          }
        } catch (error) {
          console.error(
            "❌ Latest Bangla questions error:",
            error
          );

          setLatestQuestions([]);
        }
      };

    fetchLatestQuestions();
  }, []);

  /* =====================================================
     FETCH PRAYER TIMES
  ===================================================== */

  useEffect(() => {
    const fetchPrayerTimes =
      async () => {
        try {
          const res = await fetch(
            "https://api.aladhan.com/v1/timingsByCity?city=Guwahati&country=India&method=1"
          );

          if (!res.ok) {
            throw new Error(
              `Prayer API error: ${res.status}`
            );
          }

          const data =
            await res.json();

          if (data?.code === 200) {
            setPrayerTimes(
              data.data.timings
            );
          }
        } catch (error) {
          console.error(
            "❌ Namaz timing error:",
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
          name: "ফজর",
          time: prayerTimes.Fajr,
        },
        {
          name: "যোহর",
          time: prayerTimes.Dhuhr,
        },
        {
          name: "আসর",
          time: prayerTimes.Asr,
        },
        {
          name: "মাগরিব",
          time: prayerTimes.Maghrib,
        },
        {
          name: "এশা",
          time: prayerTimes.Isha,
        },
      ];

      let next = null;

      for (const prayer of prayers) {
        if (!prayer.time) continue;

        const cleanTime =
          prayer.time.split(" ")[0];

        const [hours, minutes] =
          cleanTime.split(":");

        const prayerDate =
          new Date();

        prayerDate.setHours(
          parseInt(hours, 10),
          parseInt(minutes, 10),
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

      if (
        !next &&
        prayerTimes.Fajr
      ) {
        const cleanFajrTime =
          prayerTimes.Fajr.split(" ")[0];

        const [hours, minutes] =
          cleanFajrTime.split(":");

        const fajrTomorrow =
          new Date();

        fajrTomorrow.setDate(
          fajrTomorrow.getDate() + 1
        );

        fajrTomorrow.setHours(
          parseInt(hours, 10),
          parseInt(minutes, 10),
          0,
          0
        );

        next = {
          name: "ফজর",
          time: fajrTomorrow,
        };
      }

      if (!next) return;

      const diff =
        next.time.getTime() -
        now.getTime();

      const hrs = Math.max(
        0,
        Math.floor(
          diff / 1000 / 60 / 60
        )
      );

      const mins = Math.max(
        0,
        Math.floor(
          (diff / 1000 / 60) % 60
        )
      );

      const secs = Math.max(
        0,
        Math.floor(
          (diff / 1000) % 60
        )
      );

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

    const interval =
      setInterval(
        updateCountdown,
        1000
      );

    return () =>
      clearInterval(interval);
  }, [prayerTimes]);

  /* =====================================================
     FETCH BANGLA ARTICLES
  ===================================================== */

  useEffect(() => {
    const fetchArticles =
      async () => {
        try {
          const res = await fetch(
            `${backend}/majameen`,
            {
              cache: "no-store",
            }
          );

          if (!res.ok) {
            throw new Error(
              `Articles API error: ${res.status}`
            );
          }

          const data =
            await res.json();

          if (data?.success) {
            const banglaArticles =
              (
                Array.isArray(
                  data.data
                )
                  ? data.data
                  : []
              ).filter((item) => {
                return Boolean(
                  item?.banglaTitle ||
                    item?.bnTitle ||
                    item?.titleBn
                );
              });

            setArticles(
              banglaArticles.slice(
                0,
                5
              )
            );
          } else {
            setArticles([]);
          }
        } catch (error) {
          console.error(
            "❌ Bangla articles error:",
            error
          );

          setArticles([]);
        }
      };

    fetchArticles();
  }, []);

  /* =====================================================
     ARTICLE TITLE
  ===================================================== */

  const getArticleTitle = (
    item
  ) => {
    return (
      item?.banglaTitle ||
      item?.bnTitle ||
      item?.titleBn ||
      ""
    );
  };

  /* =====================================================
     ARTICLE SLUG
  ===================================================== */

  const getArticleSlug = (
    item
  ) => {
    return (
      item?.banglaSlug ||
      item?.bnSlug ||
      item?.slugBn ||
      item?.slug ||
      item?._id
    );
  };

  /* =====================================================
     QUESTION SLUG
  ===================================================== */

  const getQuestionSlug = (
    item
  ) => {
    return (
      item?.banglaSlug ||
      item?.bnSlug ||
      item?.slugBn ||
      item?.slug ||
      item?._id
    );
  };

  /* =====================================================
     CATEGORY HELPER
  ===================================================== */

  const getQuestionCategoryValues =
    (item) => {
      const category =
        item?.category;

      const values = [];

      if (
        typeof category ===
        "string"
      ) {
        values.push(category);
      }

      if (
        category &&
        typeof category ===
          "object"
      ) {
        if (category._id) {
          values.push(
            String(category._id)
          );
        }

        if (category.slug) {
          values.push(
            String(category.slug)
          );
        }

        if (category.name) {
          values.push(
            String(category.name)
          );
        }

        if (category.banglaName) {
          values.push(
            String(
              category.banglaName
            )
          );
        }

        if (category.bnName) {
          values.push(
            String(category.bnName)
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

      return values.map((value) =>
        value
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

      /* Category */

      if (
        selectedCategory
      ) {
        const selected =
          String(
            selectedCategory
          )
            .trim()
            .toLowerCase();

        result = result.filter(
          (item) =>
            getQuestionCategoryValues(
              item
            ).includes(selected)
        );
      }

      /* Search */

      const searchText =
        query.trim().toLowerCase();

      if (searchText) {
        result = result.filter(
          (item) => {
            const question =
              String(
                item?.question ||
                  ""
              ).toLowerCase();

            const answer =
              String(
                item?.answer ||
                  item?.banglaAnswer ||
                  item?.bnAnswer ||
                  ""
              ).toLowerCase();

            return (
              question.includes(
                searchText
              ) ||
              answer.includes(
                searchText
              )
            );
          }
        );
      }

      return result;
    }, [
      allQuestions,
      selectedCategory,
      query,
    ]);

  /* =====================================================
     CATEGORY SELECT
  ===================================================== */

  const handleCategoryClick = (
    category
  ) => {
    const value =
      category?.name ||
      category?.banglaName ||
      category?.bnName ||
      category?.slug ||
      category?._id ||
      "";

    setSelectedCategory(
      String(value)
    );

    setTimeout(() => {
      questionsRef.current?.scrollIntoView(
        {
          behavior: "smooth",
          block: "start",
        }
      );
    }, 200);
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
        "🎤 ভয়েস সার্চ এই ব্রাউজারে সমর্থিত নয়।"
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "bn-BD";
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
        "Voice recognition start error:",
        error
      );
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return <HomeLoader />;
  }

  /* =====================================================
     HOME PAGE
  ===================================================== */

  return (
    <div
      dir="ltr"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        -mt-6
        space-y-10
        px-0
        bg-repeat
        bg-contain
        bg-top
        md:bg-cover
        md:bg-center
        md:bg-fixed
      "
      style={{
        backgroundImage:
          "url('/images/ramadan_15_03_2022_1.jpg')",
      }}
    >
      {/* =================================================
          PREMIUM BACKGROUND GLOW
      ================================================= */}

      <div
        className="
          fixed
          inset-0
          pointer-events-none
          z-0
        "
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(200,174,106,0.10), transparent 38%)",
        }}
      />

      <motion.div
        className="
          fixed
          top-1/4
          left-1/2
          w-72
          h-72
          rounded-full
          pointer-events-none
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,223,0,0.12), transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
        animate={{
          x: [
            "0%",
            "15%",
            "-15%",
            "0%",
          ],
          y: [
            "0%",
            "8%",
            "-8%",
            "0%",
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          PRAYER TIMES TOP BAR
      ================================================= */}

      <div className="relative z-10 w-full">
        <div
          className="
            w-full
            overflow-hidden
            border-b
          "
          style={{
            background:
              "linear-gradient(90deg, #071c19, #0b302a, #071c19)",
            borderColor: "#806b3f",
          }}
        >
          <motion.div
            className="
              whitespace-nowrap
              w-full
              text-[#d8c27d]
              text-sm
              font-medium
            "
            style={{
              fontFamily:
                "'Noto Sans Bengali', sans-serif",
              lineHeight: "1.8",
              letterSpacing: "0.3px",
            }}
            animate={{
              x: [
                "100%",
                "-100%",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {prayerTimes ? (
              <>
                ফজর:{" "}
                {prayerTimes.Fajr?.split(
                  " "
                )[0] || "--"}

                &nbsp;&nbsp;&nbsp;

                যোহর:{" "}
                {prayerTimes.Dhuhr?.split(
                  " "
                )[0] || "--"}

                &nbsp;&nbsp;&nbsp;

                আসর:{" "}
                {prayerTimes.Asr?.split(
                  " "
                )[0] || "--"}

                &nbsp;&nbsp;&nbsp;

                মাগরিব:{" "}
                {prayerTimes.Maghrib?.split(
                  " "
                )[0] || "--"}

                &nbsp;&nbsp;&nbsp;

                এশা:{" "}
                {prayerTimes.Isha?.split(
                  " "
                )[0] || "--"}
              </>
            ) : (
              "নামাজের সময় লোড হচ্ছে..."
            )}
          </motion.div>
        </div>
      </div>

      {/* =================================================
          ISLAMIC HERO SLIDER
      ================================================= */}

      <div className="relative z-10 -mt-10 -mb-6">
        <IslamicSlider />
      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div
        className="
          relative
          w-11/12
          md:w-full
          mx-auto
          mt-6
          z-10
        "
      >
        <div
          className="
            flex
            items-center
            overflow-hidden
            border
            border-[#8f7840]
            bg-black/55
            backdrop-blur-md
            shadow-[0_8px_30px_rgba(0,0,0,0.30)]
            transition-all
            duration-300
            hover:border-[#c8ae6a]
            focus-within:border-[#c8ae6a]
            focus-within:shadow-[0_0_22px_rgba(200,174,106,0.22)]
          "
        >
          <div className="px-3 py-2">
            <Search className="h-5 w-5 text-[#c8ae6a]" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="প্রশ্ন খুঁজুন..."
            aria-label="প্রশ্ন খুঁজুন"
            className="
              w-full
              py-3
              px-4
              bg-black/70
              text-[#f5e6bd]
              placeholder-gray-300
              outline-none
              text-lg
              border-0
              focus:ring-0
            "
            style={{
              fontFamily:
                "'Noto Sans Bengali', sans-serif",
            }}
          />

          <button
            onClick={
              startListening
            }
            type="button"
            className="
              px-3
              py-2
              hover:bg-[#c8ae6a]/10
              transition
            "
            aria-label="ভয়েস সার্চ"
          >
            <Mic className="h-6 w-6 text-[#c8ae6a] opacity-90" />
          </button>
        </div>
      </div>

      {/* =================================================
          CATEGORY HEADING
      ================================================= */}

      <div
        className="
          relative
          z-10
          px-3
          mt-8
          text-center
        "
      >
        <h2
          className="
            text-2xl
            md:text-3xl
            font-bold
            text-[#174d40]
            bg-[#fffaf0]/90
            inline-block
            px-6
            py-2
            border
            border-[#c8ae6a]
            shadow-sm
          "
          style={{
            fontFamily:
              "'Noto Sans Bengali', sans-serif",
          }}
        >
          বিষয়সমূহ
        </h2>
      </div>

      {/* =================================================
          BANGLA CATEGORIES
      ================================================= */}

      <section
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-3
          px-2
          mt-4
          w-full
          relative
          z-10
        "
      >
        {/* ALL */}

        <motion.div
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={
            clearCategory
          }
          className={`
            p-4
            md:p-5
            cursor-pointer
            text-center
            select-none
            transition-all
            duration-300
            border
            shadow-[0_5px_18px_rgba(0,0,0,0.18)]
            text-lg
            md:text-xl
            font-medium

            ${
              selectedCategory ===
              ""
                ? `
                  bg-[#174d40]
                  border-[#c8ae6a]
                  text-[#f5e6bd]
                  shadow-[0_0_20px_rgba(200,174,106,0.35)]
                `
                : `
                  bg-white/95
                  border-[#c8ae6a]
                  text-[#1d332f]
                  hover:bg-[#f8f1df]
                `
            }
          `}
          style={{
            fontFamily:
              "'Noto Sans Bengali', sans-serif",
          }}
        >
          সব প্রশ্ন
        </motion.div>

        {categories
          .filter(
            (cat) =>
              cat?.name ||
              cat?.banglaName ||
              cat?.bnName
          )
          .map((cat) => {
            const title =
              cat?.banglaName ||
              cat?.bnName ||
              cat?.name;

            return (
              <motion.div
                key={
                  cat?._id ||
                  cat?.slug ||
                  title
                }
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  handleCategoryClick(
                    cat
                  )
                }
                className={`
                  p-4
                  md:p-5
                  cursor-pointer
                  text-center
                  select-none
                  transition-all
                  duration-300
                  border
                  shadow-[0_5px_18px_rgba(0,0,0,0.18)]
                  text-lg
                  md:text-xl
                  font-medium

                  ${
                    selectedCategory
                      .toLowerCase() ===
                    String(title)
                      .toLowerCase()
                      ? `
                        bg-[#f8f1df]
                        border-[#c8ae6a]
                        text-[#183d35]
                        shadow-[0_0_20px_rgba(200,174,106,0.35)]
                      `
                      : `
                        bg-white/95
                        border-[#c8ae6a]
                        text-[#1d332f]
                        hover:bg-[#f8f1df]
                        hover:border-[#806b3f]
                      `
                  }
                `}
                style={{
                  fontFamily:
                    "'Noto Sans Bengali', sans-serif",
                }}
              >
                {title}
              </motion.div>
            );
          })}
      </section>

      {/* =================================================
          QUESTIONS
      ================================================= */}

      <section
        ref={questionsRef}
        className="
          space-y-4
          px-2
          z-10
          relative
        "
      >
        {/* Heading */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            px-2
          "
        >
          <h2
            className="
              text-xl
              md:text-2xl
              font-bold
              text-[#174d40]
              bg-[#fffaf0]/90
              px-4
              py-2
              border
              border-[#c8ae6a]
            "
            style={{
              fontFamily:
                "'Noto Sans Bengali', sans-serif",
            }}
          >
            {selectedCategory
              ? selectedCategory
              : "নতুন প্রশ্নসমূহ"}
          </h2>

          {selectedCategory && (
            <button
              type="button"
              onClick={
                clearCategory
              }
              className="
                px-4
                py-2
                border
                border-[#c8ae6a]
                bg-[#174d40]
                text-[#f5e6bd]
                hover:bg-[#216353]
              "
              style={{
                fontFamily:
                  "'Noto Sans Bengali', sans-serif",
              }}
            >
              সব দেখুন
            </button>
          )}
        </div>

        {loadingQuestions &&
        allQuestions.length ===
          0 ? (
          <div
            className="
              text-center
              bg-black/50
              border
              border-[#806b3f]
              px-4
              py-6
              text-[#f5e6bd]
            "
            style={{
              fontFamily:
                "'Noto Sans Bengali', sans-serif",
            }}
          >
            প্রশ্ন লোড হচ্ছে...
          </div>
        ) : filteredQuestions.length >
          0 ? (
          filteredQuestions.map(
            (q) => (
              <Link
                key={q._id}
                href={`/bn/fatawa/${encodeURIComponent(
                  getQuestionSlug(q)
                )}`}
                className="block"
              >
                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    p-5
                    border
                    bg-[#fffaf0]/95
                    border-[#c8ae6a]
                    shadow-[0_5px_20px_rgba(0,0,0,0.15)]
                    w-full
                    cursor-pointer
                    hover:bg-[#fffdf7]
                    transition-all
                    duration-300
                    relative
                    overflow-hidden
                  "
                  style={{
                    fontFamily:
                      "'Noto Sans Bengali', sans-serif",
                    lineHeight: "2",
                    textAlign: "left",
                  }}
                >
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      bottom-0
                      w-1
                      bg-[#806b3f]
                    "
                  />

                  <h3
                    className="
                      font-bold
                      text-lg
                      md:text-xl
                      text-[#174d40]
                      pl-2
                    "
                  >
                    {q.question}
                  </h3>
                </motion.div>
              </Link>
            )
          )
        ) : (
          <div
            className="
              text-center
              bg-black/50
              border
              border-[#806b3f]
              px-4
              py-5
              text-[#f5e6bd]
              backdrop-blur-sm
            "
            style={{
              fontFamily:
                "'Noto Sans Bengali', sans-serif",
            }}
          >
            {query
              ? "আপনার অনুসন্ধানের সাথে কোনো প্রশ্ন পাওয়া যায়নি।"
              : selectedCategory
              ? "এই বিষয়ে কোনো প্রশ্ন পাওয়া যায়নি।"
              : "কোনো প্রশ্ন পাওয়া যায়নি।"}
          </div>
        )}

        {/* =================================================
            LOAD MORE
        ================================================= */}

        {hasMore &&
          !selectedCategory &&
          filteredQuestions.length >
            0 && (
            <div className="text-center mt-6">
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
                className="
                  px-7
                  py-2
                  bg-[#174d40]
                  text-[#f5e6bd]
                  border
                  border-[#c8ae6a]
                  hover:bg-[#216353]
                  hover:shadow-[0_0_18px_rgba(200,174,106,0.25)]
                  transition-all
                  duration-300
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
                style={{
                  fontFamily:
                    "'Noto Sans Bengali', sans-serif",
                }}
              >
                {loadingQuestions
                  ? "লোড হচ্ছে..."
                  : "আরও প্রশ্ন দেখুন"}
              </button>
            </div>
          )}
      </section>

      {/* =================================================
          NEXT PRAYER
      ================================================= */}

      <div className="w-full px-3 mt-4 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            relative
            overflow-hidden
            border
            border-[#c8ae6a]/50
            bg-[#071c19]/90
            backdrop-blur-xl
            shadow-[0_8px_30px_rgba(0,0,0,0.30)]
            px-4
            py-3
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#c8ae6a]/5
              via-transparent
              to-[#c8ae6a]/5
            "
          />

          <div
            className="
              flex
              items-center
              justify-between
              relative
              z-10
            "
          >
            <div>
              <p
                className="
                  text-[#d8c27d]
                  text-base
                  md:text-lg
                "
                style={{
                  fontFamily:
                    "'Noto Sans Bengali', sans-serif",
                }}
              >
                🕌 পরবর্তী নামাজ
              </p>

              <h2
                className="
                  text-white
                  text-2xl
                  md:text-3xl
                  font-bold
                "
                style={{
                  fontFamily:
                    "'Noto Sans Bengali', sans-serif",
                }}
              >
                {nextPrayer || "--"}
              </h2>
            </div>

            <motion.div
              animate={{
                opacity: [
                  1,
                  0.7,
                  1,
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="
                bg-[#c8ae6a]/10
                border
                border-[#c8ae6a]/30
                px-4
                py-2
              "
            >
              <span
                className="
                  text-[#f5e6bd]
                  font-bold
                  text-xl
                  md:text-2xl
                "
              >
                {countdown ||
                  "00:00:00"}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* =================================================
          ISLAMIC QUICK LINKS
      ================================================= */}

      <section
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          gap-3
          px-3
          mt-5
          relative
          z-10
        "
      >
        {[
          {
            href:
              "/bn/masnoon-duayee",
            title:
              "মাসনূন দোয়া",
          },
          {
            href:
              "/bn/islami-naam",
            title:
              "ইসলামী নাম",
          },
          {
            href: "/books",
            title:
              "ইসলামী কিতাব",
          },
          {
            href:
              "/bn/articles",
            title:
              "ইসলামী প্রবন্ধ",
          },
          {
            href:
              "/ozan-shariah-calculator",
            title:
              "ইসলামী ক্যালকুলেটর",
          },
          {
            href:
              "/40-hadith-free",
            title:
              "৪০ হাদিস",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="
              group
              relative
              overflow-hidden
              bg-white
              border
              border-[#c8ae6a]
              p-4
              text-center
              shadow-[0_4px_16px_rgba(0,0,0,0.15)]
              hover:bg-[#fff9ec]
              text-gray-900
              transition-all
              duration-300
              hover:-translate-y-1
            "
            style={{
              fontFamily:
                "'Noto Sans Bengali', sans-serif",
              fontSize: "18px",
            }}
          >
            <span
              className="
                absolute
                top-0
                left-0
                w-0
                h-[2px]
                bg-[#c8ae6a]
                group-hover:w-full
                transition-all
                duration-300
              "
            />

            <span className="relative z-10">
              {item.title}
            </span>
          </Link>
        ))}
      </section>

      {/* =================================================
          TABS
      ================================================= */}

      <section className="mt-10 px-3 relative z-10">
        <div
          className="
            flex
            overflow-hidden
            border
            border-[#806b3f]
            shadow-lg
          "
        >
          <button
            type="button"
            onClick={() =>
              setActiveTab(
                "questions"
              )
            }
            className={`
              w-1/2
              py-3
              transition-all
              duration-300
              border-r
              border-[#806b3f]

              ${
                activeTab ===
                "questions"
                  ? "bg-[#174d40] text-[#f5e6bd]"
                  : "bg-[#d9cfbf] text-[#624d35] hover:bg-[#e5dccd]"
              }
            `}
          >
            <span
              style={{
                fontFamily:
                  "'Noto Sans Bengali', sans-serif",
                fontSize: "19px",
                fontWeight: "600",
                display: "block",
              }}
            >
              নতুন প্রশ্ন
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab(
                "articles"
              )
            }
            className={`
              w-1/2
              py-3
              transition-all
              duration-300

              ${
                activeTab ===
                "articles"
                  ? "bg-[#174d40] text-[#f5e6bd]"
                  : "bg-[#d9cfbf] text-[#624d35] hover:bg-[#e5dccd]"
              }
            `}
          >
            <span
              style={{
                fontFamily:
                  "'Noto Sans Bengali', sans-serif",
                fontSize: "19px",
                fontWeight: "600",
                display: "block",
              }}
            >
              নির্বাচিত প্রবন্ধ
            </span>
          </button>
        </div>

        {/* =================================================
            TAB CONTENT
        ================================================= */}

        <div
          className="
            bg-white/90
            p-4
            border
            border-[#c8ae6a]
            shadow-lg
          "
          style={{
            fontFamily:
              "'Noto Sans Bengali', sans-serif",
          }}
        >
          {/* =================================================
              NEW QUESTIONS
          ================================================= */}

          {activeTab ===
            "questions" && (
            <div className="space-y-3">
              {latestQuestions.length >
              0 ? (
                latestQuestions
                  .slice(0, 5)
                  .map((item) => (
                    <Link
                      key={
                        item._id
                      }
                      href={`/bn/fatawa/${encodeURIComponent(
                        getQuestionSlug(
                          item
                        )
                      )}`}
                      className="
                        group
                        flex
                        items-start
                        gap-2
                        text-[#174d40]
                        hover:text-[#806b3f]
                        transition-colors
                      "
                      style={{
                        fontSize:
                          "17px",
                        lineHeight:
                          "30px",
                      }}
                    >
                      <span className="text-[#c8ae6a] shrink-0">
                        ➜
                      </span>

                      <span className="group-hover:underline">
                        {
                          item.question
                        }
                      </span>
                    </Link>
                  ))
              ) : (
                <p className="text-gray-500 text-center">
                  এখনো কোনো নতুন প্রশ্ন নেই।
                </p>
              )}
            </div>
          )}

          {/* =================================================
              BANGLA ARTICLES
          ================================================= */}

          {activeTab ===
            "articles" && (
            <div className="space-y-3">
              {articles.length >
              0 ? (
                articles
                  .slice(0, 5)
                  .map((item) => {
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
                          item._id
                        }
                        href={`/bn/articles/${encodeURIComponent(
                          slug
                        )}`}
                        className="
                          group
                          flex
                          items-start
                          gap-2
                          text-[#174d40]
                          hover:text-[#806b3f]
                          transition-colors
                        "
                        style={{
                          fontSize:
                            "17px",
                          lineHeight:
                            "30px",
                        }}
                      >
                        <span className="text-[#c8ae6a] shrink-0">
                          ➜
                        </span>

                        <span className="group-hover:underline">
                          {title}
                        </span>
                      </Link>
                    );
                  })
              ) : (
                <p className="text-gray-500 text-center">
                  এখনো কোনো বাংলা প্রবন্ধ নেই।
                </p>
              )}
            </div>
          )}
        </div>

        {/* =================================================
            LATEST BOOKS
        ================================================= */}

        <div className="mt-8">
          <LatestBooksSlider />
        </div>

        {/* =================================================
            ISLAMIC TOOLS
        ================================================= */}

        <div className="mt-8">
          <IslamicTools />
        </div>
      </section>

      {/* =================================================
          BOTTOM SPACE
      ================================================= */}

      <div className="h-6" />
    </div>
  );
}