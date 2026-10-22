"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Mic } from "lucide-react";

import HomeLoader from "./components/HomeLoader";
import LatestBooksSlider from "./components/LatestBooksSlider";
import IslamicTools from "./components/IslamicTools";
import IslamicSlider from "./components/IslamicSlider";
import AskQuestionForm from "./components/AskQuestionForm";
import AskButton from "./components/AskButton";
import AskedQuestionsButton from "./components/AskedQuestionsButton";
import PrayerTicker from "./components/PrayerTicker";
import AppBanner from "./components/AppBanner";

const font = "'Jameel Noori Nastaleeq', serif";
const backend = "https://f-backend-vdi1.onrender.com/api";

const PLACEHOLDER_PHRASES = [
  "یہاں تلاش کریں...",
  "نماز کے مسائل تلاش کریں...",
  "روزے کے احکام تلاش کریں...",
  "زکوٰۃ کے مسائل تلاش کریں...",
];

const QUICK_LINKS = [
  { href: "/masnoon-duayee", title: "مسنون دعائیں" },
  { href: "/islami-naam", title: "اسلامی نام" },
  { href: "/books", title: "اسلامی کتب" },
  { href: "/majameen", title: "مضامین" },
  { href: "/ozan-shariah-calculator", title: "اوزان شریعہ کیلکولیٹر" },
  { href: "/40-hadith-free", title: "40 احادیث" },
];

const TABS = [
  { key: "questions", label: "نئے سوالات" },
  { key: "majameen", label: "منتخب مضامین" },
  { key: "popular", label: "زیادہ پڑھے گئے" },
];

/* =====================================================
   TYPEWRITER PLACEHOLDER
===================================================== */

function useTypewriterPlaceholder(
  phrases,
  { typeSpeed = 110, deleteSpeed = 60, pause = 1400, active = true } = {}
) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!active) {
      setText("");
      return;
    }

    const current = phrases[phraseIndex % phrases.length];
    let delay = isDeleting ? deleteSpeed : typeSpeed;

    // Urdu joined letters ke liye Array.from
    const chars = Array.from(current);

    if (!isDeleting && text === current) {
      delay = pause;
    } else if (isDeleting && text === "") {
      delay = 400;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && text === current) {
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      } else {
        const nextLength = text
          ? Array.from(text).length + (isDeleting ? -1 : 1)
          : 1;
        setText(chars.slice(0, Math.max(nextLength, 0)).join(""));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases, typeSpeed, deleteSpeed, pause, active]);

  return text;
}

/* =====================================================
   PAGE
===================================================== */

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [prayerTimes, setPrayerTimes] = useState(null);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [popularQuestions, setPopularQuestions] = useState([]);
  const [majameen, setMajameen] = useState([]);
  const [activeTab, setActiveTab] = useState("questions");
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [showAsk, setShowAsk] = useState(false);

  const questionsRef = useRef(null);

  const animatedPlaceholder = useTypewriterPlaceholder(PLACEHOLDER_PHRASES, {
    active: query === "" && !isFocused,
  });

  /* ---------- HOME LOADER ---------- */

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  /* ---------- FETCH CATEGORIES ---------- */

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${backend}/categories`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Categories API error: ${res.status}`);
        const data = await res.json();
        if (data.success) setCategories(data.data || []);
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
      }
    };
    run();
  }, []);

  /* ---------- FETCH PRAYER TIMES ---------- */

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Guwahati&country=India&method=1"
        );
        if (!res.ok) throw new Error(`Prayer API error: ${res.status}`);
        const data = await res.json();
        if (data.code === 200) setPrayerTimes(data.data.timings);
      } catch (err) {
        console.error("❌ Namaz timing error:", err);
      }
    };
    run();
  }, []);

  /* ---------- NEXT PRAYER COUNTDOWN ---------- */

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

        const [hours, minutes] = prayer.time.split(" ")[0].split(":");
        const prayerDate = new Date();
        prayerDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

        if (prayerDate > now) {
          next = { name: prayer.name, time: prayerDate };
          break;
        }
      }

      if (!next && prayerTimes.Fajr) {
        const [hours, minutes] = prayerTimes.Fajr.split(" ")[0].split(":");
        const fajrTomorrow = new Date();
        fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
        fajrTomorrow.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        next = { name: "فجر", time: fajrTomorrow };
      }

      if (!next) return;

      const diff = next.time - now;
      const hrs = Math.floor(diff / 1000 / 60 / 60);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setNextPrayer(next.name);
      setCountdown(
        `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  /* ---------- FETCH MAJAMEEN ---------- */

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${backend}/majameen`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Majameen API error: ${res.status}`);
        const data = await res.json();
        if (data.success) setMajameen((data.data || []).slice(0, 4));
      } catch (err) {
        console.error("❌ Majameen error:", err);
      }
    };
    run();
  }, []);

  /* ---------- FETCH LATEST QUESTIONS ---------- */

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${backend}/admin/questions?limit=5`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Latest questions API error: ${res.status}`);
        const data = await res.json();
        if (data.success) setLatestQuestions(data.data || []);
      } catch (err) {
        console.error("❌ Latest question error:", err);
      }
    };
    run();
  }, []);

  /* ---------- FETCH POPULAR QUESTIONS ---------- */

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${backend}/admin/questions/popular?limit=8`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Popular API error: ${res.status}`);
        const data = await res.json();
        if (data.success) setPopularQuestions(data.data || []);
      } catch (err) {
        console.error("❌ Popular questions error:", err);
      }
    };
    run();
  }, []);

  /* ---------- FETCH QUESTIONS BY CATEGORY ---------- */

  const fetchQuestions = async ({ reset = false, customSkip = 0 } = {}) => {
    try {
      const url =
        selectedCategory === ""
          ? `${backend}/admin/questions?skip=${customSkip}&limit=5`
          : `${backend}/admin/questions/category/${encodeURIComponent(
              selectedCategory
            )}?skip=${customSkip}&limit=5`;

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Questions API error: ${res.status}`);

      const data = await res.json();

      if (data.success) {
        const newQuestions = data.data || [];

        setAllQuestions((prev) =>
          reset ? newQuestions : [...prev, ...newQuestions]
        );
        setSkip(customSkip + 5);
        setHasMore(newQuestions.length === 5);
      }
    } catch (err) {
      console.error("❌ Questions error:", err);
    }
  };

  /* ---------- CATEGORY CHANGE ---------- */

  useEffect(() => {
    if (selectedCategory === "") {
      setAllQuestions([]);
      setSkip(0);
      setHasMore(true);
      return;
    }

    fetchQuestions({ reset: true, customSkip: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  /* ---------- SEARCH FILTER ---------- */

  const filteredQuestions =
    query.trim() === ""
      ? allQuestions
      : allQuestions.filter((q) =>
          q.question?.toLowerCase().includes(query.toLowerCase())
        );

  /* ---------- VOICE SEARCH ---------- */

  const startListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("🎤 Voice search not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ur-PK";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      setQuery(e.results?.[0]?.[0]?.transcript || "");
    };

    recognition.onerror = (error) => {
      console.error("Voice search error:", error);
    };

    recognition.start();
  };

  /* ---------- LOADING SCREEN ---------- */

  if (isLoading) {
    return <HomeLoader />;
  }

  /* ---------- tab content helper ---------- */

  const renderList = (list, getHref, getText, emptyText, size = "18px") =>
    list.length > 0 ? (
      list.map((item) => (
        <Link
          key={item._id}
          href={getHref(item)}
          className="group flex items-start gap-2 text-[#333333] hover:text-[#75C178] transition-colors"
          style={{ fontSize: size, lineHeight: "30px" }}
        >
          <span className="text-[#75C178] shrink-0">➜</span>
          <span className="group-hover:underline">{getText(item)}</span>
        </Link>
      ))
    ) : (
      <p className="text-gray-500 text-center">{emptyText}</p>
    );

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden -mt-6 space-y-10 px-0 bg-repeat bg-contain bg-top md:bg-cover md:bg-center md:bg-fixed"
      style={{
        backgroundImage: "url('/images/ramadan_15_03_2022_1.jpg')",
        fontFamily: font,
      }}
    >
      {/* next/head App Router me kaam nahi karta, isliye style seedha yahan */}
      <style>{`
        @font-face {
          font-family: 'Jameel Noori Nastaleeq';
          src: url('/fonts/JameelNooriNastaleeq.woff2') format('woff2'),
               url('/fonts/JameelNooriNastaleeq.woff') format('woff'),
               url('/fonts/JameelNooriNastaleeq.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        .urdu-font {
          font-family: 'Jameel Noori Nastaleeq', serif !important;
          font-weight: normal;
          font-style: normal;
        }
      `}</style>

      <h1 className="sr-only">مسلکِ دیوبند | اسلامی سوال و جواب اور فتاویٰ</h1>

      {/* SOFT GREEN GLOW */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(117,193,120,0.08), transparent 38%)",
        }}
      />

      <motion.div
        className="fixed top-1/4 left-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(117,193,120,0.10), transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
        animate={{ x: ["0%", "15%", "-15%", "0%"], y: ["0%", "8%", "-8%", "0%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* =================================================
          PRAYER TIMES TOP BAR
      ================================================= */}

      <PrayerTicker prayerTimes={prayerTimes} nextPrayer={nextPrayer} />

      {/* =================================================
          ISLAMIC SLIDER
      ================================================= */}

      <div className="-mt-[40px] -mb-6 relative z-10">
        <IslamicSlider />
      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div
        id="home-search"
        className="relative w-11/12 md:w-full mx-auto mt-6 z-10"
      >
        <div className="flex items-center overflow-hidden border border-[#C6E2C8] bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-all duration-300 hover:border-[#75C178] focus-within:border-[#75C178] focus-within:shadow-[0_0_22px_rgba(117,193,120,0.18)]">
          <div className="px-3 py-2">
            <Search className="w-5 h-5 text-[#75C178]" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={
              isFocused ? "تلاش کریں....." : animatedPlaceholder || "\u00A0"
            }
            className="w-full py-3 pr-4 bg-white text-[#333333] placeholder-gray-400 outline-none text-lg border-0 focus:ring-0"
            style={{ direction: "rtl", fontFamily: font }}
          />

          <button
            onClick={startListening}
            type="button"
            className="px-3 py-2 hover:bg-[#EAF5EA] transition"
            aria-label="Voice Search"
          >
            <Mic className="w-6 h-6 text-[#75C178]" />
          </button>
        </div>
      </div>

      {/* =================================================
          ASK QUESTION BUTTON
      ================================================= */}

      <AskButton onClick={() => setShowAsk(true)} />

      {/* =================================================
          CATEGORIES
      ================================================= */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2 mt-6 w-full relative z-10">
        {categories.map((cat) => (
          <motion.div
            key={cat._id}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedCategory(cat.name);

              setTimeout(() => {
                questionsRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 300);
            }}
            className={`p-4 md:p-5 cursor-pointer text-center select-none transition-all duration-300 border shadow-[0_5px_18px_rgba(0,0,0,0.08)] text-xl font-medium ${
              selectedCategory === cat.name
                ? "bg-[#EAF5EA] border-[#75C178] text-[#333333] shadow-[0_0_20px_rgba(117,193,120,0.16)]"
                : "bg-white border-[#C6E2C8] text-[#333333] hover:bg-[#F5FAF5] hover:border-[#75C178]"
            }`}
            style={{ fontFamily: font }}
          >
            {cat.name}
          </motion.div>
        ))}
      </div>

      {/* =================================================
          CATEGORY QUESTIONS
      ================================================= */}

      <section ref={questionsRef} className="space-y-4 px-2 z-10 relative">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <Link key={q._id} href={`/questions/${q.slug}`} className="block">
              <motion.div
                whileHover={{ y: -2 }}
                className="p-5 border bg-white border-[#C6E2C8] shadow-[0_5px_20px_rgba(0,0,0,0.08)] w-full cursor-pointer hover:bg-[#F5FAF5] hover:border-[#75C178] transition-all duration-300 relative overflow-hidden"
                style={{
                  direction: "rtl",
                  fontFamily: font,
                  lineHeight: "2.2",
                  textAlign: "right",
                }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#75C178]" />
                <h3 className="font-bold text-xl text-[#333333] pr-2">
                  {q.question}
                </h3>
              </motion.div>
            </Link>
          ))
        ) : (
          <div
            className="text-center bg-white border border-[#C6E2C8] px-4 py-5 text-[#333333] shadow-[0_5px_20px_rgba(0,0,0,0.06)]"
            style={{ fontFamily: font, direction: "rtl" }}
          >
            اوپر دیے گئے بٹن پر کلک کر کے سوال و جواب دیکھیں
          </div>
        )}

        {hasMore && filteredQuestions.length > 0 && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => fetchQuestions({ customSkip: skip })}
              className="px-7 py-2 bg-[#75C178] text-white border border-[#75C178] hover:bg-[#63B56A] hover:shadow-[0_0_18px_rgba(117,193,120,0.22)] transition-all duration-300"
              style={{ fontFamily: font }}
            >
              مزید سوالات دیکھیں
            </button>
          </div>
        )}
      </section>

      {/* =================================================
          NEXT PRAYER
      ================================================= */}

      <div className="w-full px-3 mt-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden border border-[#C6E2C8] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-4 py-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#75C178]/5 via-transparent to-[#75C178]/5" />

          <div className="flex items-center justify-between relative z-10">
            <div className="text-right">
              <p
                className="text-[#333333]"
                style={{ fontFamily: font, fontSize: "20px", lineHeight: "30px" }}
              >
                🕌 اگلی نماز
              </p>
              <h2
                className="text-[#333333]"
                style={{ fontFamily: font, fontSize: "30px", lineHeight: "40px" }}
              >
                {nextPrayer}
              </h2>
            </div>

            <motion.div
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="bg-[#EAF5EA] border border-[#C6E2C8] px-4 py-2"
            >
              <span
                className="text-[#333333] font-bold"
                style={{ fontSize: "24px", letterSpacing: "2px" }}
              >
                {countdown}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* =================================================
          PEOPLE'S QUESTIONS BUTTON
      ================================================= */}

      <AskedQuestionsButton />

      {/* =================================================
          ISLAMIC QUICK LINKS
      ================================================= */}

      <div className="grid grid-cols-2 gap-3 px-3 mt-5 relative z-10">
        {QUICK_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative overflow-hidden bg-white border border-[#C6E2C8] p-4 text-center shadow-[0_4px_16px_rgba(0,0,0,0.07)] hover:bg-[#F5FAF5] hover:border-[#75C178] text-[#333333] transition-all duration-300 hover:-translate-y-1"
            style={{ fontFamily: font, direction: "rtl", fontSize: "20px" }}
          >
            <span className="absolute top-0 right-0 w-0 h-[2px] bg-[#75C178] group-hover:w-full transition-all duration-300" />
            <span className="relative z-10">{item.title}</span>
          </Link>
        ))}
      </div>

      {/* =================================================
          TABS
      ================================================= */}

      <div className="mt-10 px-3 relative z-10">
        <div className="flex overflow-hidden border border-[#C6E2C8] shadow-lg">
          {TABS.map((tab, i) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`w-1/3 py-3 transition-all duration-300 ${
                i === 0 ? "border-l border-[#C6E2C8]" : ""
              } ${i === TABS.length - 1 ? "border-r border-[#C6E2C8]" : ""} ${
                activeTab === tab.key
                  ? "bg-[#75C178] text-white"
                  : "bg-[#EAF5EA] text-[#333333] hover:bg-[#F5FAF5]"
              }`}
            >
              <span
                style={{
                  fontFamily: font,
                  direction: "rtl",
                  fontSize: "18px",
                  lineHeight: "34px",
                  fontWeight: "normal",
                  display: "block",
                }}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div
          className="bg-white p-4 border border-[#C6E2C8] shadow-lg"
          style={{ fontFamily: font, direction: "rtl" }}
        >
          <div className="space-y-3">
            {activeTab === "questions" &&
              renderList(
                latestQuestions.slice(0, 8),
                (item) => `/questions/${item.slug}`,
                (item) => item.question,
                "کوئی نیا سوال موجود نہیں۔"
              )}

            {activeTab === "majameen" &&
              renderList(
                majameen,
                (item) => `/majameen/${item._id}`,
                (item) => item.title,
                "کوئی مضمون موجود نہیں۔",
                "20px"
              )}

            {activeTab === "popular" &&
              renderList(
                popularQuestions,
                (item) => `/questions/${item.slug}`,
                (item) => item.question,
                "ابھی کوئی سوال موجود نہیں۔"
              )}
          </div>
        </div>

        {/* BOOKS */}
        <div className="mt-8">
          <LatestBooksSlider />
        </div>

        {/* ISLAMIC TOOLS */}
        <div
          id="islamic-tools"
          className="mt-8"
          style={{ scrollMarginTop: "80px" }}
        >
          <IslamicTools />
        </div>
      </div>

      {/* APP BANNER */}
      <AppBanner />

      {/* =================================================
          ASK QUESTION POPUP
      ================================================= */}

      <AskQuestionForm
        open={showAsk}
        onClose={() => setShowAsk(false)}
        backend={backend}
      />
    </div>
  );
}