
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  Mic,
  Clock3,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import LatestBooksSlider from "./components/LatestBooksSlider";
import IslamicTools from "./components/IslamicTools";
import IslamicSlider from "./components/IslamicSlider";
import HomeLoader from "./components/HomeLoader";

export default function HomePage() {
  const backend = "https://f-backend-vdi1.onrender.com/api";

  // =========================
  // STATES
  // =========================

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [allQuestions, setAllQuestions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");

  const [latestQuestions, setLatestQuestions] = useState([]);
  const [majameen, setMajameen] = useState([]);

  const [activeTab, setActiveTab] = useState("questions");
  const [isLoading, setIsLoading] = useState(true);

  const questionsRef = useRef(null);

  // =========================
  // INITIAL DATA LOAD
  // =========================

  useEffect(() => {
    let mounted = true;
    let loaderTimer;

    const loadInitialData = async () => {
      try {
        const [
          categoriesResponse,
          prayerResponse,
          majameenResponse,
          questionsResponse,
        ] = await Promise.allSettled([
          fetch(`${backend}/categories`),

          fetch(
            "https://api.aladhan.com/v1/timingsByCity?city=Guwahati&country=India&method=1"
          ),

          fetch(`${backend}/majameen`),

          fetch(`${backend}/admin/questions?limit=10`),
        ]);

        // =========================
        // CATEGORIES
        // =========================

        if (
          categoriesResponse.status === "fulfilled" &&
          categoriesResponse.value.ok
        ) {
          const data = await categoriesResponse.value.json();

          if (data.success && mounted) {
            setCategories(data.data || []);
          }
        }

        // =========================
        // PRAYER TIMES
        // =========================

        if (
          prayerResponse.status === "fulfilled" &&
          prayerResponse.value.ok
        ) {
          const data = await prayerResponse.value.json();

          if (data.code === 200 && mounted) {
            setPrayerTimes(data.data?.timings || null);
          }
        }

        // =========================
        // MAJAMEEN
        // =========================

        if (
          majameenResponse.status === "fulfilled" &&
          majameenResponse.value.ok
        ) {
          const data = await majameenResponse.value.json();

          if (data.success && mounted) {
            setMajameen((data.data || []).slice(0, 4));
          }
        }

        // =========================
        // LATEST QUESTIONS
        // =========================

        if (
          questionsResponse.status === "fulfilled" &&
          questionsResponse.value.ok
        ) {
          const data = await questionsResponse.value.json();

          if (data.success && mounted) {
            setLatestQuestions(data.data || []);
          }
        }
      } catch (error) {
        console.error("Initial homepage data error:", error);
      } finally {
        if (mounted) {
          loaderTimer = setTimeout(() => {
            if (mounted) {
              setIsLoading(false);
            }
          }, 600);
        }
      }
    };

    loadInitialData();

    return () => {
      mounted = false;

      if (loaderTimer) {
        clearTimeout(loaderTimer);
      }
    };
  }, []);

  // =========================
  // PRAYER COUNTDOWN
  // =========================

  useEffect(() => {
    if (!prayerTimes) {
      return;
    }

    const updateCountdown = () => {
      const now = new Date();

      const prayers = [
        {
          name: "فجر",
          time: prayerTimes.Fajr,
        },
        {
          name: "ظہر",
          time: prayerTimes.Dhuhr,
        },
        {
          name: "عصر",
          time: prayerTimes.Asr,
        },
        {
          name: "مغرب",
          time: prayerTimes.Maghrib,
        },
        {
          name: "عشاء",
          time: prayerTimes.Isha,
        },
      ];

      let next = null;

      for (const prayer of prayers) {
        if (!prayer.time) {
          continue;
        }

        const cleanTime = prayer.time.split(" ")[0];
        const [hours, minutes] = cleanTime.split(":");

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

      // =========================
      // TOMORROW FAJR
      // =========================

      if (!next && prayerTimes.Fajr) {
        const cleanFajr = prayerTimes.Fajr.split(" ")[0];
        const [hours, minutes] = cleanFajr.split(":");

        const fajrTomorrow = new Date();

        fajrTomorrow.setDate(
          fajrTomorrow.getDate() + 1
        );

        fajrTomorrow.setHours(
          Number(hours),
          Number(minutes),
          0,
          0
        );

        next = {
          name: "فجر",
          time: fajrTomorrow,
        };
      }

      if (!next) {
        return;
      }

      const diff = Math.max(
        0,
        next.time.getTime() - now.getTime()
      );

      const hrs = Math.floor(
        diff / 1000 / 60 / 60
      );

      const mins = Math.floor(
        (diff / 1000 / 60) % 60
      );

      const secs = Math.floor(
        (diff / 1000) % 60
      );

      setNextPrayer(next.name);

      setCountdown(
        `${String(hrs).padStart(2, "0")}:${String(
          mins
        ).padStart(2, "0")}:${String(secs).padStart(
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

    return () => {
      clearInterval(interval);
    };
  }, [prayerTimes]);

  // =========================
  // FETCH QUESTIONS
  // =========================

  const fetchQuestions = async ({
    reset = false,
    customSkip = 0,
  } = {}) => {
    try {
      let url;

      if (selectedCategory === "") {
        url =
          `${backend}/admin/questions` +
          `?skip=${customSkip}&limit=5`;
      } else {
        url =
          `${backend}/admin/questions/category/` +
          `${encodeURIComponent(selectedCategory)}` +
          `?skip=${customSkip}&limit=5`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(
          `Questions API failed: ${res.status}`
        );
      }

      const data = await res.json();

      if (!data.success) {
        return;
      }

      const questions = data.data || [];

      if (reset) {
        setAllQuestions(questions);
      } else {
        setAllQuestions((prev) => [
          ...prev,
          ...questions,
        ]);
      }

      setSkip(customSkip + questions.length);

      setHasMore(questions.length === 5);
    } catch (error) {
      console.error(
        "Question fetching error:",
        error
      );
    }
  };

  // =========================
  // CATEGORY CHANGE
  // =========================

  useEffect(() => {
    if (selectedCategory === "") {
      setAllQuestions([]);
      setSkip(0);
      setHasMore(true);
      return;
    }

    fetchQuestions({
      reset: true,
      customSkip: 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // =========================
  // SEARCH
  // =========================

  const filteredQuestions =
    query.trim() === ""
      ? allQuestions
      : allQuestions.filter((question) =>
          question.question
            ?.toLowerCase()
            .includes(query.toLowerCase())
        );

  // =========================
  // VOICE SEARCH
  // =========================

  const startListening = () => {
    if (typeof window === "undefined") {
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "🎤 آپ کے براؤزر میں Voice Search موجود نہیں ہے۔"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "ur-PK";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const text =
        event.results?.[0]?.[0]?.transcript || "";

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

  // =========================
  // LOADER
  // =========================

  if (isLoading) {
    return <HomeLoader />;
  }

  // =========================
  // HOME PAGE
  // =========================

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: "Jameel Noori Nastaleeq";
          src:
            url("/fonts/JameelNooriNastaleeq.woff2")
              format("woff2"),
            url("/fonts/JameelNooriNastaleeq.woff")
              format("woff"),
            url("/fonts/JameelNooriNastaleeq.ttf")
              format("truetype");

          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family:
            "Jameel Noori Nastaleeq",
            serif;
          background: #f6f3ed;
        }

        ::selection {
          background: #8b7355;
          color: white;
        }
      `}</style>

      <main
        className="relative min-h-screen overflow-hidden bg-[#f7f4ee]"
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundAttachment: "fixed",
        }}
      >
        {/* =========================
            OVERLAY
        ========================= */}

        <div className="pointer-events-none fixed inset-0 z-0 bg-white/55" />

        {/* =========================
            GOLDEN LIGHT
        ========================= */}

        <motion.div
          className="pointer-events-none fixed z-0"
          style={{
            width: "350px",
            height: "350px",
            left: "50%",
            top: "25%",
            transform:
              "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: ["-20%", "20%", "-20%"],
            y: ["0%", "10%", "0%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =========================
            PRAYER BAR
        ========================= */}

        <section className="relative z-10 w-full overflow-hidden border-b border-[#75593f] bg-[#17120e]">
          <motion.div
            className="whitespace-nowrap py-2 text-center text-yellow-400"
            style={{
              direction: "rtl",
              fontFamily:
                "'Jameel Noori Nastaleeq', serif",
              fontSize: "17px",
            }}
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {prayerTimes ? (
              <>
                فجر:{" "}
                {prayerTimes.Fajr?.split(" ")[0]}
                &nbsp;&nbsp;&nbsp;&nbsp;
                ظہر:{" "}
                {prayerTimes.Dhuhr?.split(" ")[0]}
                &nbsp;&nbsp;&nbsp;&nbsp;
                عصر:{" "}
                {prayerTimes.Asr?.split(" ")[0]}
                &nbsp;&nbsp;&nbsp;&nbsp;
                مغرب:{" "}
                {prayerTimes.Maghrib?.split(" ")[0]}
                &nbsp;&nbsp;&nbsp;&nbsp;
                عشاء:{" "}
                {prayerTimes.Isha?.split(" ")[0]}
              </>
            ) : (
              "نماز کے اوقات لوڈ ہو رہے ہیں..."
            )}
          </motion.div>
        </section>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="relative z-10 mx-auto w-full max-w-6xl px-3 pb-14">

          {/* SLIDER */}

          <div className="-mx-3 -mt-1">
            <IslamicSlider />
          </div>

          {/* =========================
              SEARCH
          ========================= */}

          <section className="mt-5">
            <div className="mx-auto max-w-4xl">
              <div
                className="
                  flex items-center
                  overflow-hidden
                  rounded-2xl
                  border border-[#a88a4a]
                  bg-[#17130f]/90
                  shadow-[0_10px_35px_rgba(0,0,0,0.22)]
                  backdrop-blur-xl
                "
              >
                <div className="flex shrink-0 items-center justify-center px-3 sm:px-5">
                  <Search className="h-5 w-5 text-yellow-400" />
                </div>

                <input
                  type="text"
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  placeholder="سوال تلاش کریں....."
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    py-3
                    text-right
                    text-lg
                    text-yellow-100
                    outline-none
                    placeholder:text-gray-400
                    sm:py-4
                    sm:text-xl
                  "
                  style={{
                    direction: "rtl",
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                  }}
                />

                <button
                  type="button"
                  onClick={startListening}
                  aria-label="Voice Search"
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    text-yellow-400
                    transition
                    hover:bg-yellow-500/10
                    hover:text-yellow-300
                  "
                >
                  <Mic className="h-5 w-5" />
                </button>
              </div>

              <p
                className="mt-2 text-center text-sm text-gray-700"
                style={{
                  fontFamily:
                    "'Jameel Noori Nastaleeq', serif",
                }}
              >
                سوال تلاش کرنے کے لیے اوپر سرچ کریں
              </p>
            </div>
          </section>

          {/* =========================
              CATEGORIES
          ========================= */}

          <section className="mt-7">
            <div className="mb-4 flex items-center justify-between">
              <div
                className="text-right"
                style={{
                  fontFamily:
                    "'Jameel Noori Nastaleeq', serif",
                }}
              >
                <h2 className="text-2xl font-bold text-[#4b3415] sm:text-3xl">
                  فتاویٰ کے موضوعات
                </h2>

                <p className="text-sm text-gray-600">
                  اپنی ضرورت کے مطابق موضوع منتخب کریں
                </p>
              </div>

              <div className="hidden rounded-full bg-[#eadfca] px-3 py-1 text-sm text-[#705735] sm:block">
                {categories.length} موضوعات
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((cat, index) => (
                <motion.button
                  key={cat._id || cat.name}
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  onClick={() => {
                    setSelectedCategory(cat.name);

                    setTimeout(() => {
                      questionsRef.current?.scrollIntoView(
                        {
                          behavior: "smooth",
                          block: "start",
                        }
                      );
                    }, 200);
                  }}
                  className={`
                    relative
                    min-h-[76px]
                    overflow-hidden
                    border
                    px-3
                    py-4
                    text-center
                    transition-all
                    duration-300
                    active:scale-[0.98]
                    sm:min-h-[90px]
                    sm:px-5
                    ${
                      selectedCategory === cat.name
                        ? "border-[#9b7b38] bg-[#8b7355] text-white shadow-[0_8px_25px_rgba(139,115,85,0.35)]"
                        : "border-[#d5c5a5] bg-[#fffdf8]/95 text-[#4b3415] shadow-sm hover:-translate-y-1 hover:border-[#b79a5c] hover:shadow-lg"
                    }
                  `}
                  style={{
                    borderRadius: "14px",
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                    fontSize: "20px",
                  }}
                >
                  <span className="relative z-10">
                    {cat.name}
                  </span>

                  <span
                    className={`
                      absolute bottom-0 left-0 h-1 w-full
                      ${
                        selectedCategory === cat.name
                          ? "bg-yellow-400"
                          : "bg-[#d4af37]/30"
                      }
                    `}
                  />
                </motion.button>
              ))}
            </div>
          </section>

          {/* =========================
              QUESTIONS
          ========================= */}

          <section
            ref={questionsRef}
            className="mt-8 scroll-mt-5"
          >
            {selectedCategory && (
              <div className="mb-4 flex items-center justify-between rounded-xl border border-[#d6c7a8] bg-[#fffdf8]/90 px-4 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("");
                    setAllQuestions([]);
                    setSkip(0);
                    setHasMore(true);
                  }}
                  className="text-sm text-red-700 hover:underline"
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                  }}
                >
                  موضوع ختم کریں
                </button>

                <h2
                  className="text-right text-xl text-[#4b3415]"
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                  }}
                >
                  {selectedCategory}
                </h2>
              </div>
            )}

            {selectedCategory && (
              <div className="space-y-3">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map(
                    (question, index) => (
                      <motion.div
                        key={
                          question._id ||
                          question.slug ||
                          index
                        }
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: index * 0.04,
                        }}
                      >
                        <Link
                          href={`/questions/${question.slug}`}
                          className="
                            group
                            block
                            border
                            border-[#e0cfaa]
                            bg-[#fffdf8]
                            p-4
                            shadow-sm
                            transition-all
                            hover:-translate-y-[2px]
                            hover:border-[#b79a5c]
                            hover:shadow-md
                          "
                          style={{
                            borderRadius: "12px",
                            direction: "rtl",
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-2 shrink-0 text-[#a48342]">
                              ❯
                            </span>

                            <h3
                              className="text-right text-xl leading-[2] text-[#245c48] transition group-hover:text-[#8b5e2b]"
                              style={{
                                fontFamily:
                                  "'Jameel Noori Nastaleeq', serif",
                              }}
                            >
                              {question.question}
                            </h3>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  )
                ) : (
                  <div className="rounded-xl border border-[#d8c8aa] bg-white/90 px-4 py-8 text-center">
                    <p
                      className="text-xl text-gray-600"
                      style={{
                        fontFamily:
                          "'Jameel Noori Nastaleeq', serif",
                      }}
                    >
                      اس موضوع میں فی الحال کوئی سوال موجود نہیں۔
                    </p>
                  </div>
                )}

                {hasMore &&
                  filteredQuestions.length > 0 && (
                    <div className="pt-3 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          fetchQuestions({
                            customSkip: skip,
                          })
                        }
                        className="
                          rounded-xl
                          bg-[#8b7355]
                          px-7
                          py-2
                          text-white
                          shadow-md
                          transition
                          hover:bg-[#705b42]
                          active:scale-95
                        "
                        style={{
                          fontFamily:
                            "'Jameel Noori Nastaleeq', serif",
                          fontSize: "18px",
                        }}
                      >
                        مزید سوالات دیکھیں
                      </button>
                    </div>
                  )}
              </div>
            )}
          </section>

          {/* =========================
              NEXT PRAYER
          ========================= */}

          <section className="mt-9">
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[#bda86e]
                bg-[#211a13]/95
                p-4
                shadow-[0_12px_35px_rgba(0,0,0,0.25)]
              "
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-emerald-500/10" />

              <div className="relative flex items-center justify-between gap-4">
                <div
                  className="text-right"
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                  }}
                >
                  <div className="mb-1 flex items-center gap-2 text-yellow-300">
                    <Clock3 className="h-4 w-4" />

                    <span className="text-lg">
                      اگلی نماز
                    </span>
                  </div>

                  <h2 className="text-3xl leading-10 text-white">
                    {nextPrayer || "—"}
                  </h2>
                </div>

                <div className="shrink-0">
                  <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 sm:px-5">
                    <motion.span
                      animate={{
                        opacity: [1, 0.6, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className="font-mono text-lg font-bold tracking-[2px] text-yellow-200 sm:text-2xl"
                    >
                      {countdown || "--:--:--"}
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* =========================
              QUICK LINKS
          ========================= */}

          <section className="mt-9">
            <div className="mb-4 flex items-center justify-between">
              <div
                className="text-right"
                style={{
                  fontFamily:
                    "'Jameel Noori Nastaleeq', serif",
                }}
              >
                <h2 className="text-2xl font-bold text-[#4b3415] sm:text-3xl">
                  اسلامی سہولیات
                </h2>

                <p className="text-sm text-gray-600">
                  اہم اسلامی مواد اور خدمات
                </p>
              </div>

              <Sparkles className="h-5 w-5 text-[#a48342]" />
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {/* DUAS */}

              <Link
                href="/masnoon-duayee"
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#c8b27a]
                  bg-gradient-to-b
                  from-[#fffaf0]
                  via-[#eadfca]
                  to-[#d2b976]
                  px-3
                  py-4
                  text-center
                  shadow-[0_5px_0_#9b7b38]
                  transition-all
                  hover:-translate-y-1
                  hover:shadow-[0_8px_20px_rgba(155,123,56,0.25)]
                  active:translate-y-[2px]
                "
              >
                <p
                  className="text-xl text-[#4b3415] sm:text-2xl"
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                  }}
                >
                  مسنون دعائیں
                </p>
              </Link>

              {/* NAMES */}

              <Link
                href="/islami-naam"
                className="
                  group
                  rounded-xl
                  border
                  border-[#c8b27a]
                  bg-gradient-to-b
                  from-[#fffaf0]
                  via-[#eadfca]
                  to-[#d2b976]
                  px-3
                  py-4
                  text-center
                  shadow-[0_5px_0_#9b7b38]
                  transition-all
                  hover:-translate-y-1
                  active:translate-y-[2px]
                "
              >
                <p
                  className="text-xl text-[#4b3415] sm:text-2xl"
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                  }}
                >
                  اسلامی نام
                </p>
              </Link>

              {/* BOOKS */}

              <Link
                href="/books"
                className="
                  group
                  rounded-xl
                  border
                  border-[#c8b27a]
                  bg-gradient-to-b
                  from-[#fffaf0]
                  via-[#eadfca]
                  to-[#d2b976]
                  px-3
                  py-4
                  text-center
                  shadow-[0_5px_0_#9b7b38]
                  transition-all
                  hover:-translate-y-1
                  active:translate-y-[2px]
                "
              >
                <p
                  className="text-xl text-[#4b3415] sm:text-2xl"
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                  }}
                >
                  اسلامی کتابیں
                </p>
              </Link>

              {/* ARTICLES */}

              <Link
                href="/majameen"
                className="
                  group
                  rounded-xl
                  border
                  border-[#c8b27a]
                  bg-gradient-to-b
                  from-[#fffaf0]
                  via-[#eadfca]
                  to-[#d2b976]
                  px-3
                  py-4
                  text-center
                  shadow-[0_5px_0_#9b7b38]
                  transition-all
                  hover:-translate-y-1
                  active:translate-y-[2px]
                "
              >
                <p
                  className="text-xl text-[#4b3415] sm:text-2xl"
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                  }}
                >
                  مضامین
                </p>
              </Link>

              {/* SHARIA CALCULATOR */}

              <a
                href="https://www.maslakedeoband.in/ozan-shariah-calculator"
                className="
                  group
                  rounded-xl
                  border
                  border-[#c8b27a]
                  bg-gradient-to-b
                  from-[#fffaf0]
                  via-[#eadfca]
                  to-[#d2b976]
                  px-3
                  py-4
                  text-center
                  shadow-[0_5px_0_#9b7b38]
                  transition-all
                  hover:-translate-y-1
                  active:translate-y-[2px]
                "
              >
                <p
                  className="text-xl text-[#4b3415] sm:text-2xl"
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                  }}
                >
                  شرعیہ کیلکولیٹر
                </p>
              </a>

              {/* HADITH */}

              <a
                href="https://www.maslakedeoband.in/40-hadith-free"
                className="
                  group
                  rounded-xl
                  border
                  border-[#c8b27a]
                  bg-gradient-to-b
                  from-[#fffaf0]
                  via-[#eadfca]
                  to-[#d2b976]
                  px-3
                  py-4
                  text-center
                  shadow-[0_5px_0_#9b7b38]
                  transition-all
                  hover:-translate-y-1
                  active:translate-y-[2px]
                "
              >
                <p
                  className="text-xl text-[#4b3415] sm:text-2xl"
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                  }}
                >
                  احادیث
                </p>
              </a>
            </div>
          </section>

          {/* =========================
              QUESTIONS / ARTICLES
          ========================= */}

          <section className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-[#d6c7a8] bg-[#fffdf8]/95 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">

              {/* TABS */}

              <div className="grid grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveTab("questions")
                  }
                  className={`
                    py-3
                    transition-all
                    ${
                      activeTab === "questions"
                        ? "bg-[#8b7355] text-white"
                        : "bg-[#e5dccd] text-[#705735]"
                    }
                  `}
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                    fontSize: "22px",
                  }}
                >
                  نئے سوالات
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab("majameen")
                  }
                  className={`
                    py-3
                    transition-all
                    ${
                      activeTab === "majameen"
                        ? "bg-[#8b7355] text-white"
                        : "bg-[#e5dccd] text-[#705735]"
                    }
                  `}
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                    fontSize: "22px",
                  }}
                >
                  منتخب مضامین
                </button>
              </div>

              {/* CONTENT */}

              <div
                className="p-4 sm:p-5"
                style={{
                  direction: "rtl",
                  fontFamily:
                    "'Jameel Noori Nastaleeq', serif",
                }}
              >
                {/* QUESTIONS */}

                {activeTab === "questions" && (
                  <div className="space-y-1">
                    {latestQuestions.length > 0 ? (
                      latestQuestions
                        .slice(0, 5)
                        .map((item, index) => (
                          <Link
                            key={
                              item._id ||
                              item.slug ||
                              index
                            }
                            href={`/questions/${item.slug}`}
                            className="
                              group
                              block
                              border-b
                              border-[#eee5d5]
                              py-3
                              text-lg
                              leading-8
                              text-[#315f8a]
                              transition
                              hover:text-[#24734d]
                            "
                          >
                            <span className="ml-2 text-[#a48342]">
                              ◀
                            </span>

                            {item.question}
                          </Link>
                        ))
                    ) : (
                      <p className="py-6 text-center text-gray-500">
                        کوئی نیا سوال موجود نہیں۔
                      </p>
                    )}
                  </div>
                )}

                {/* MAJAMEEN */}

                {activeTab === "majameen" && (
                  <div className="space-y-1">
                    {majameen.length > 0 ? (
                      majameen.map(
                        (item, index) => (
                          <Link
                            key={
                              item._id ||
                              item.slug ||
                              index
                            }
                            href={`/majameen/${item._id}`}
                            className="
                              block
                              border-b
                              border-[#eee5d5]
                              py-3
                              text-xl
                              leading-8
                              text-[#315f8a]
                              transition
                              hover:text-[#24734d]
                            "
                          >
                            <span className="ml-2 text-[#a48342]">
                              ◀
                            </span>

                            {item.title}
                          </Link>
                        )
                      )
                    ) : (
                      <p className="py-6 text-center text-gray-500">
                        کوئی مضمون موجود نہیں۔
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* =========================
              BOOKS
          ========================= */}

          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <div
                className="text-right"
                style={{
                  fontFamily:
                    "'Jameel Noori Nastaleeq', serif",
                }}
              >
                <h2 className="text-2xl font-bold text-[#4b3415] sm:text-3xl">
                  اسلامی کتابیں
                </h2>

                <p className="text-sm text-gray-600">
                  منتخب دینی کتب
                </p>
              </div>

              <BookOpen className="h-6 w-6 text-[#9b7b38]" />
            </div>

            <LatestBooksSlider />
          </section>

          {/* =========================
              ISLAMIC TOOLS
          ========================= */}

          <section className="mt-10">
            <IslamicTools />
          </section>

        </div>
      </main>
    </>
  );
}

