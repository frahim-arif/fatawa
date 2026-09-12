"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  Mic,
  ArrowUpLeft,
  BookOpen,
  ScrollText,
  Calculator,
  Heart,
  Sparkles,
  ChevronLeft,
  Clock3,
  Library,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

import LatestBooksSlider from "./components/LatestBooksSlider";
import IslamicTools from "./components/IslamicTools";
import IslamicSlider from "./components/IslamicSlider";

const backend = "https://f-backend-vdi1.onrender.com/api";

const urduFont = {
  fontFamily: "'Jameel Noori Nastaleeq', serif",
};

export default function HomePage() {
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
  const [activeTab, setActiveTab] = useState("questions");
  const [majameen, setMajameen] = useState([]);

  const questionsRef = useRef(null);

  /* =====================================================
     FETCH CATEGORIES
  ===================================================== */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backend}/categories`);

        if (!res.ok) {
          throw new Error("Categories request failed");
        }

        const data = await res.json();

        if (data.success) {
          setCategories(data.data || []);
        }
      } catch (error) {
        console.error("Categories error:", error);
      }
    };

    fetchCategories();
  }, []);

  /* =====================================================
     FETCH PRAYER TIMES
  ===================================================== */
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Guwahati&country=India&method=1"
        );

        if (!res.ok) {
          throw new Error("Prayer API failed");
        }

        const data = await res.json();

        if (data.code === 200) {
          setPrayerTimes(data.data.timings);
        }
      } catch (error) {
        console.error("Namaz timing error:", error);
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
        { name: "فجر", time: prayerTimes.Fajr },
        { name: "ظہر", time: prayerTimes.Dhuhr },
        { name: "عصر", time: prayerTimes.Asr },
        { name: "مغرب", time: prayerTimes.Maghrib },
        { name: "عشاء", time: prayerTimes.Isha },
      ];

      let next = null;

      for (const prayer of prayers) {
        if (!prayer.time) continue;

        const [hours, minutes] = prayer.time
          .split(" ")[0]
          .split(":")
          .map(Number);

        const prayerDate = new Date();

        prayerDate.setHours(hours, minutes, 0, 0);

        if (prayerDate > now) {
          next = {
            name: prayer.name,
            time: prayerDate,
          };
          break;
        }
      }

      if (!next && prayerTimes.Fajr) {
        const [hours, minutes] = prayerTimes.Fajr
          .split(" ")[0]
          .split(":")
          .map(Number);

        const fajrTomorrow = new Date();

        fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
        fajrTomorrow.setHours(hours, minutes, 0, 0);

        next = {
          name: "فجر",
          time: fajrTomorrow,
        };
      }

      if (!next) return;

      const diff = Math.max(0, next.time - now);

      const hrs = Math.floor(diff / 1000 / 60 / 60);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setNextPrayer(next.name);

      setCountdown(
        `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
          2,
          "0"
        )}:${String(secs).padStart(2, "0")}`
      );
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  /* =====================================================
     FETCH MAJAMEEN
  ===================================================== */
  useEffect(() => {
    const fetchMajameen = async () => {
      try {
        const res = await fetch(`${backend}/majameen`);

        if (!res.ok) {
          throw new Error("Majameen request failed");
        }

        const data = await res.json();

        if (data.success) {
          setMajameen((data.data || []).slice(0, 4));
        }
      } catch (error) {
        console.error("Majameen error:", error);
      }
    };

    fetchMajameen();
  }, []);

  /* =====================================================
     FETCH LATEST QUESTIONS
  ===================================================== */
  useEffect(() => {
    const fetchLatestQuestions = async () => {
      try {
        const res = await fetch(
          `${backend}/admin/questions?limit=10`
        );

        if (!res.ok) {
          throw new Error("Latest questions request failed");
        }

        const data = await res.json();

        if (data.success) {
          setLatestQuestions(data.data || []);
        }
      } catch (error) {
        console.error("Latest question error:", error);
      }
    };

    fetchLatestQuestions();
  }, []);

  /* =====================================================
     FETCH QUESTIONS BY CATEGORY
  ===================================================== */
  const fetchQuestions = async ({
    reset = false,
    customSkip = 0,
  } = {}) => {
    try {
      let url;

      if (selectedCategory === "") {
        url = `${backend}/admin/questions?skip=${customSkip}&limit=5`;
      } else {
        url = `${backend}/admin/questions/category/${encodeURIComponent(
          selectedCategory
        )}?skip=${customSkip}&limit=5`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Questions request failed");
      }

      const data = await res.json();

      if (data.success) {
        const newQuestions = data.data || [];

        if (reset) {
          setAllQuestions(newQuestions);
        } else {
          setAllQuestions((prev) => [
            ...prev,
            ...newQuestions,
          ]);
        }

        setSkip(customSkip + 5);
        setHasMore(newQuestions.length === 5);
      }
    } catch (error) {
      console.error("Questions error:", error);
    }
  };

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
  }, [selectedCategory]);

  /* =====================================================
     SEARCH
  ===================================================== */
  const filteredQuestions =
    query.trim() === ""
      ? allQuestions
      : allQuestions.filter((q) =>
          q.question
            ?.toLowerCase()
            .includes(query.toLowerCase())
        );

  /* =====================================================
     VOICE SEARCH
  ===================================================== */
  const startListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("🎤 Voice search not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "ur-PK";

    recognition.onresult = (event) => {
      const text =
        event.results?.[0]?.[0]?.transcript || "";

      setQuery(text);
    };

    recognition.onerror = (event) => {
      console.error("Voice search error:", event);
    };

    recognition.start();
  };

  /* =====================================================
     CATEGORY CLICK
  ===================================================== */
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);

    setTimeout(() => {
      questionsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#061f1b] text-white"
      style={{
        ...urduFont,
      }}
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url('/images/ramadan_15_03_2022_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundAttachment: "fixed",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,32,28,0.78),rgba(3,24,21,0.94))]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
        }}
      />

      {/* Golden glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-40 h-96 w-96 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,174,106,0.16), transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10">

        {/* =================================================
            TOP STATUS BAR
        ================================================= */}

        <div className="border-b border-[#8c7547]/40 bg-black/40 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{
                  opacity: [1, 0.35, 1],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                }}
                className="h-2 w-2 rounded-full bg-red-500"
              />

              <span className="font-mono text-[9px] tracking-[3px] text-red-300">
                LIVE
              </span>

              <span className="hidden text-[9px] tracking-[2px] text-gray-500 sm:block">
                ISLAMIC DIGITAL LIBRARY
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[2px] text-[#c8ae6a]">
                1448 AH
              </span>

              <span className="hidden text-[9px] tracking-[2px] text-gray-500 sm:block">
                MASLAK E DEOBAND
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="mx-auto max-w-7xl px-4 pb-12 pt-12 md:pb-16 md:pt-20">

          <div className="mx-auto max-w-4xl text-center">

            {/* Small label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 flex items-center justify-center gap-3"
            >
              <span className="h-px w-10 bg-[#c8ae6a]" />

              <span
                className="text-sm tracking-[3px] text-[#c8ae6a]"
                style={urduFont}
              >
                علمی و تحقیقی مرکز
              </span>

              <span className="h-px w-10 bg-[#c8ae6a]" />
            </motion.div>

            {/* Logo */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="text-5xl font-bold leading-tight sm:text-6xl md:text-7xl"
              style={{
                ...urduFont,
                textShadow:
                  "0 0 35px rgba(200,174,106,0.15)",
              }}
            >
              <span className="text-white">
                مسلکِ
              </span>{" "}
              <span className="text-[#c8ae6a]">
                دیوبند
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.45,
                duration: 0.8,
              }}
              className="mt-3 text-xs tracking-[4px] text-emerald-300 sm:text-sm"
            >
              MASLAK E DEOBAND
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.65,
                duration: 0.8,
              }}
              className="mx-auto mt-5 max-w-2xl text-lg leading-9 text-gray-300 sm:text-xl"
              style={urduFont}
            >
              قرآن و سنت کی روشنی میں مستند فتاویٰ،
              مسائل، مضامین اور اسلامی معلومات
            </motion.p>

            {/* =================================================
                SEARCH
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.7,
              }}
              className="mx-auto mt-9 max-w-3xl"
            >
              <div
                className="
                  relative flex items-center
                  border border-[#9b824c]/70
                  bg-black/45
                  shadow-[0_0_35px_rgba(0,0,0,0.35)]
                  backdrop-blur-xl
                  transition-all
                  focus-within:border-[#c8ae6a]
                  focus-within:shadow-[0_0_30px_rgba(200,174,106,0.15)]
                "
              >
                <div className="px-4">
                  <Search className="h-5 w-5 text-[#c8ae6a]" />
                </div>

                <input
                  type="text"
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  placeholder="اپنا سوال، مسئلہ یا موضوع تلاش کریں..."
                  className="
                    w-full
                    bg-transparent
                    py-4
                    pr-2
                    text-right
                    text-lg
                    text-white
                    outline-none
                    placeholder:text-gray-500
                  "
                  style={{
                    ...urduFont,
                    direction: "rtl",
                  }}
                />

                <button
                  type="button"
                  onClick={startListening}
                  className="
                    mr-2
                    border-l
                    border-[#806b3f]/50
                    px-4
                    py-3
                    transition
                    hover:bg-[#c8ae6a]/10
                  "
                  aria-label="Voice Search"
                >
                  <Mic className="h-5 w-5 text-[#c8ae6a]" />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="text-[9px] tracking-[2px] text-gray-500">
                  SEARCH FATWA DATABASE
                </span>

                <span className="h-1 w-1 rounded-full bg-[#c8ae6a]" />

                <span
                  className="text-sm text-gray-400"
                  style={urduFont}
                >
                  فتاویٰ تلاش کریں
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =================================================
            NAMAZ TICKER
        ================================================= */}

        <div className="border-y border-[#806b3f]/50 bg-black/60 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center overflow-hidden">

            <div className="flex shrink-0 items-center gap-2 border-l border-[#806b3f]/40 px-4 py-3">
              <Clock3 className="h-4 w-4 text-[#c8ae6a]" />

              <span
                className="text-base text-[#c8ae6a]"
                style={urduFont}
              >
                نماز کے اوقات
              </span>
            </div>

            <div className="relative w-full overflow-hidden">
              <motion.div
                className="whitespace-nowrap py-3 text-base text-emerald-200"
                style={{
                  direction: "rtl",
                  ...urduFont,
                }}
                animate={{
                  x: ["100%", "-100%"],
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {prayerTimes ? (
                  <>
                    فجر:{" "}
                    {prayerTimes.Fajr?.split(" ")[0]}{" "}
                    &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    ظہر:{" "}
                    {prayerTimes.Dhuhr?.split(" ")[0]}{" "}
                    &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    عصر:{" "}
                    {prayerTimes.Asr?.split(" ")[0]}{" "}
                    &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    مغرب:{" "}
                    {prayerTimes.Maghrib?.split(" ")[0]}{" "}
                    &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    عشاء:{" "}
                    {prayerTimes.Isha?.split(" ")[0]}
                  </>
                ) : (
                  "نماز کے اوقات لوڈ ہو رہے ہیں..."
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* =================================================
            ISLAMIC SLIDER
        ================================================= */}

        <section className="mx-auto max-w-7xl px-3 pt-8">
          <IslamicSlider />
        </section>

        {/* =================================================
            STATS
        ================================================= */}

        <section className="mx-auto max-w-7xl px-3 pt-10">
          <div className="grid grid-cols-2 border border-[#806b3f]/50 bg-black/35 backdrop-blur-md md:grid-cols-4">

            <div className="border-b border-l border-[#806b3f]/40 p-5 text-center md:border-b-0">
              <div className="font-mono text-2xl font-bold text-[#c8ae6a]">
                1900+
              </div>
              <p
                className="mt-1 text-base text-gray-300"
                style={urduFont}
              >
                فتاویٰ
              </p>
            </div>

            <div className="border-b border-[#806b3f]/40 p-5 text-center md:border-b-0 md:border-l">
              <div className="font-mono text-2xl font-bold text-[#c8ae6a]">
                50+
              </div>
              <p
                className="mt-1 text-base text-gray-300"
                style={urduFont}
              >
                موضوعات
              </p>
            </div>

            <div className="border-l border-[#806b3f]/40 p-5 text-center">
              <div className="font-mono text-2xl font-bold text-[#c8ae6a]">
                3
              </div>
              <p
                className="mt-1 text-base text-gray-300"
                style={urduFont}
              >
                زبانیں
              </p>
            </div>

            <div className="border-l border-[#806b3f]/40 p-5 text-center">
              <div className="font-mono text-2xl font-bold text-[#c8ae6a]">
                24/7
              </div>
              <p
                className="mt-1 text-base text-gray-300"
                style={urduFont}
              >
                آن لائن مطالعہ
              </p>
            </div>

          </div>
        </section>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <section className="mx-auto max-w-7xl px-3 pt-14">

          <SectionHeading
            english="FATWA CATEGORIES"
            urdu="فتاویٰ کے موضوعات"
          />

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat, index) => (
              <motion.button
                key={cat._id}
                type="button"
                onClick={() =>
                  handleCategoryClick(cat.name)
                }
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.04,
                }}
                className={`
                  group
                  relative
                  min-h-[105px]
                  overflow-hidden
                  border
                  p-4
                  text-right
                  transition-all
                  duration-300
                  ${
                    selectedCategory === cat.name
                      ? "border-[#c8ae6a] bg-[#c8ae6a]/15 shadow-[0_0_25px_rgba(200,174,106,0.12)]"
                      : "border-[#806b3f]/50 bg-[#0b2b26]/80 hover:border-[#c8ae6a] hover:bg-[#123a33]"
                  }
                `}
                style={{
                  direction: "rtl",
                  ...urduFont,
                }}
              >
                <span className="absolute left-0 top-0 h-px w-10 bg-[#c8ae6a] transition-all duration-300 group-hover:w-full" />

                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[2px] text-[#806b3f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <ArrowUpLeft className="h-4 w-4 text-[#c8ae6a] opacity-60 transition group-hover:opacity-100" />
                </div>

                <span className="text-lg text-gray-100">
                  {cat.name}
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* =================================================
            NEXT PRAYER
        ================================================= */}

        <section className="mx-auto max-w-7xl px-3 pt-12">

          <div className="relative overflow-hidden border border-[#806b3f]/60 bg-black/45 p-5 backdrop-blur-xl md:p-7">

            <div className="absolute left-0 top-0 h-px w-32 bg-[#c8ae6a]" />

            <div className="absolute bottom-0 right-0 h-px w-32 bg-[#c8ae6a]" />

            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

              <div
                className="text-center sm:text-right"
                style={urduFont}
              >
                <p className="text-lg text-[#c8ae6a]">
                  🕌 اگلی نماز
                </p>

                <h2 className="mt-1 text-3xl text-white">
                  {nextPrayer || "—"}
                </h2>
              </div>

              <div className="text-center">
                <p className="mb-2 font-mono text-[9px] tracking-[3px] text-gray-500">
                  NEXT PRAYER IN
                </p>

                <motion.div
                  animate={{
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="border border-[#806b3f]/60 bg-[#c8ae6a]/10 px-7 py-3"
                >
                  <span className="font-mono text-3xl font-bold tracking-[3px] text-[#e5d19b]">
                    {countdown || "00:00:00"}
                  </span>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* =================================================
            QUICK LINKS
        ================================================= */}

        <section className="mx-auto max-w-7xl px-3 pt-14">

          <SectionHeading
            english="ISLAMIC RESOURCES"
            urdu="اسلامی سہولیات"
          />

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">

            <QuickLink
              href="/masnoon-duayee"
              icon={<Heart className="h-5 w-5" />}
              text="مسنون دعائیں"
            />

            <QuickLink
              href="/islami-naam"
              icon={<Sparkles className="h-5 w-5" />}
              text="اسلامی نام"
            />

            <QuickLink
              href="/books"
              icon={<BookOpen className="h-5 w-5" />}
              text="اسلامی کتب"
            />

            <QuickLink
              href="/majameen"
              icon={<ScrollText className="h-5 w-5" />}
              text="مضامین"
            />

            <QuickLink
              href="/ozan-shariah-calculator"
              icon={<Calculator className="h-5 w-5" />}
              text="شرعیہ کیلکولیٹر"
            />

            <QuickLink
              href="/40-hadith-free"
              icon={<Library className="h-5 w-5" />}
              text="40 احادیث"
            />

          </div>
        </section>

        {/* =================================================
            QUESTIONS / MAJAMEEN
        ================================================= */}

        <section
          ref={questionsRef}
          className="mx-auto max-w-7xl scroll-mt-10 px-3 pt-14"
        >

          <SectionHeading
            english="LATEST CONTENT"
            urdu="تازہ علمی مواد"
          />

          <div className="mt-6 overflow-hidden border border-[#806b3f]/60 bg-[#f4efe2] text-[#263b35] shadow-2xl">

            {/* Tabs */}
            <div className="grid grid-cols-2 border-b border-[#806b3f]/50">

              <button
                type="button"
                onClick={() =>
                  setActiveTab("questions")
                }
                className={`
                  relative px-4 py-4
                  transition
                  ${
                    activeTab === "questions"
                      ? "bg-[#0b3029] text-[#e8d49e]"
                      : "bg-[#ddd4c2] text-[#705d43]"
                  }
                `}
              >
                <span
                  className="text-xl"
                  style={{
                    ...urduFont,
                    direction: "rtl",
                  }}
                >
                  نئے سوالات
                </span>

                {activeTab === "questions" && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#c8ae6a]" />
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTab("majameen")
                }
                className={`
                  relative border-r border-[#806b3f]/30 px-4 py-4
                  transition
                  ${
                    activeTab === "majameen"
                      ? "bg-[#0b3029] text-[#e8d49e]"
                      : "bg-[#ddd4c2] text-[#705d43]"
                  }
                `}
              >
                <span
                  className="text-xl"
                  style={{
                    ...urduFont,
                    direction: "rtl",
                  }}
                >
                  منتخب مضامین
                </span>

                {activeTab === "majameen" && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#c8ae6a]" />
                )}
              </button>

            </div>

            {/* Content */}
            <div
              className="min-h-[180px] p-4 sm:p-6"
              style={{
                direction: "rtl",
                ...urduFont,
              }}
            >

              {activeTab === "questions" && (
                <div className="space-y-1">

                  {latestQuestions
                    .slice(0, 5)
                    .map((item, index) => (
                      <Link
                        key={item._id}
                        href={`/questions/${item.slug}`}
                        className="group flex items-start gap-3 border-b border-[#b8aa91]/40 px-2 py-3 text-right transition hover:bg-[#e9e0cd]"
                      >
                        <span className="pt-1 font-mono text-xs text-[#8b7355]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="flex-1 text-lg leading-8 text-[#244d3e] transition group-hover:text-[#7b5b20]">
                          {item.question}
                        </span>

                        <ChevronLeft className="mt-2 h-4 w-4 shrink-0 text-[#8b7355]" />
                      </Link>
                    ))}

                  {latestQuestions.length === 0 && (
                    <p className="py-8 text-center text-gray-500">
                      کوئی نیا سوال موجود نہیں۔
                    </p>
                  )}

                </div>
              )}

              {activeTab === "majameen" && (
                <div className="space-y-1">

                  {majameen.length > 0 ? (
                    majameen.map((item, index) => (
                      <Link
                        key={item._id}
                        href={`/majameen/${item._id}`}
                        className="group flex items-start gap-3 border-b border-[#b8aa91]/40 px-2 py-3 text-right transition hover:bg-[#e9e0cd]"
                      >
                        <span className="pt-1 font-mono text-xs text-[#8b7355]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="flex-1 text-lg leading-8 text-[#244d3e] transition group-hover:text-[#7b5b20]">
                          {item.title}
                        </span>

                        <ChevronLeft className="mt-2 h-4 w-4 shrink-0 text-[#8b7355]" />
                      </Link>
                    ))
                  ) : (
                    <p className="py-8 text-center text-gray-500">
                      کوئی مضمون موجود نہیں۔
                    </p>
                  )}

                </div>
              )}

            </div>
          </div>
        </section>

        {/* =================================================
            CATEGORY QUESTIONS
        ================================================= */}

        {selectedCategory && (
          <section className="mx-auto max-w-7xl px-3 pt-10">

            <div className="mb-5 flex items-center justify-between border-b border-[#806b3f]/50 pb-3">

              <span className="font-mono text-[9px] tracking-[3px] text-[#806b3f]">
                CATEGORY RESULTS
              </span>

              <h2
                className="text-2xl text-[#e5d19b]"
                style={{
                  ...urduFont,
                  direction: "rtl",
                }}
              >
                {selectedCategory}
              </h2>

            </div>

            <div className="space-y-3">

              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q) => (
                  <Link
                    key={q._id}
                    href={`/questions/${q.slug}`}
                    className="
                      group
                      block
                      border
                      border-[#806b3f]/50
                      bg-[#0b2d27]/90
                      p-4
                      transition-all
                      hover:border-[#c8ae6a]
                      hover:bg-[#123b34]
                    "
                    style={{
                      direction: "rtl",
                      ...urduFont,
                    }}
                  >
                    <div className="flex items-start gap-3">

                      <FileText className="mt-2 h-4 w-4 shrink-0 text-[#c8ae6a]" />

                      <h3 className="text-xl leading-9 text-gray-100 transition group-hover:text-[#e5d19b]">
                        {q.question}
                      </h3>

                    </div>
                  </Link>
                ))
              ) : (
                <p
                  className="py-8 text-center text-gray-400"
                  style={urduFont}
                >
                  اس موضوع میں کوئی سوال موجود نہیں۔
                </p>
              )}

            </div>

            {hasMore &&
              filteredQuestions.length > 0 && (
                <div className="mt-6 text-center">

                  <button
                    type="button"
                    onClick={() =>
                      fetchQuestions({
                        customSkip: skip,
                      })
                    }
                    className="
                      border
                      border-[#c8ae6a]
                      bg-[#c8ae6a]/10
                      px-8
                      py-3
                      text-[#e5d19b]
                      transition
                      hover:bg-[#c8ae6a]
                      hover:text-[#13251f]
                    "
                    style={urduFont}
                  >
                    مزید سوالات دیکھیں
                  </button>

                </div>
              )}
          </section>
        )}

        {/* =================================================
            BOOKS
        ================================================= */}

        <section className="mx-auto max-w-7xl px-3 pt-14">

          <SectionHeading
            english="ISLAMIC BOOKS"
            urdu="اسلامی کتب"
          />

          <div className="mt-6 overflow-hidden border border-[#806b3f]/50 bg-black/30 p-2">
            <LatestBooksSlider />
          </div>

        </section>

        {/* =================================================
            ISLAMIC TOOLS
        ================================================= */}

        <section className="mx-auto max-w-7xl px-3 pb-16 pt-14">

          <SectionHeading
            english="ISLAMIC TOOLS"
            urdu="اسلامی سہولیات"
          />

          <div className="mt-6 overflow-hidden border border-[#806b3f]/50 bg-black/30 p-2">
            <IslamicTools />
          </div>

        </section>

        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="border-y border-[#806b3f]/40 bg-black/35">

          <div className="mx-auto max-w-4xl px-5 py-14 text-center">

            <div className="mx-auto mb-5 h-px w-20 bg-[#c8ae6a]" />

            <h2
              className="text-3xl text-[#e5d19b] md:text-4xl"
              style={urduFont}
            >
              علم حاصل کرنا ہر مسلمان کی ضرورت ہے
            </h2>

            <p
              className="mt-3 text-lg leading-8 text-gray-400"
              style={urduFont}
            >
              مستند اسلامی معلومات اور فتاویٰ تک آسان رسائی
            </p>

            <div className="mt-6 font-mono text-[9px] tracking-[4px] text-gray-600">
              KNOWLEDGE • RESEARCH • GUIDANCE
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({ english, urdu }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-[#806b3f]/50 pb-3">

      <div>
        <span className="font-mono text-[9px] tracking-[3px] text-[#806b3f]">
          {english}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#c8ae6a]" />

        <h2
          className="text-2xl text-[#e5d19b] md:text-3xl"
          style={{
            fontFamily:
              "'Jameel Noori Nastaleeq', serif",
            direction: "rtl",
          }}
        >
          {urdu}
        </h2>
      </div>

    </div>
  );
}

/* =========================================================
   QUICK LINK
========================================================= */

function QuickLink({ href, icon, text }) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        overflow-hidden
        border
        border-[#806b3f]/50
        bg-[#0b2b26]/90
        px-3
        py-5
        text-center
        transition-all
        duration-300
        hover:border-[#c8ae6a]
        hover:bg-[#123a33]
      "
      style={{
        fontFamily:
          "'Jameel Noori Nastaleeq', serif",
        direction: "rtl",
      }}
    >
      <span className="absolute left-0 top-0 h-px w-8 bg-[#c8ae6a] transition-all duration-300 group-hover:w-full" />

      <div className="mb-2 flex justify-center text-[#c8ae6a]">
        {icon}
      </div>

      <span className="text-lg leading-8 text-gray-100 group-hover:text-[#e5d19b]">
        {text}
      </span>
    </Link>
  );
}