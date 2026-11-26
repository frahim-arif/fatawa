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
// import PrayerClock from "./components/PrayerClock";
import VisitorTracker from "./components/VisitorTracker";

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
 
const [searchResults, setSearchResults] = useState([]);
const [searchLoading, setSearchLoading] = useState(false);
const [hasSearched, setHasSearched] = useState(false);
const [searchError, setSearchError] = useState("");

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

  const filteredQuestions = allQuestions;

 
/* ---------- VOICE SEARCH ---------- */

const startListening = () => {
  if (typeof window === "undefined") return;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice search is not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "ur-PK";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const spokenText =
      event.results?.[0]?.[0]?.transcript || "";

    setQuery(spokenText);

    if (spokenText.trim()) {
      handleSearch(spokenText);
    }
  };

  recognition.onerror = (error) => {
    console.error("Voice search error:", error);
  };

  recognition.start();
};



/* ---------- SEARCH QUESTIONS ---------- */

const handleSearch = async (searchValue = query) => {
  const searchText = searchValue.trim();

  if (!searchText) {
    setSearchResults([]);
    setHasSearched(false);
    setSearchError("");
    return;
  }

  try {
    setSearchLoading(true);
    setHasSearched(true);
    setSearchError("");

    const response = await fetch(
      `${backend}/admin/questions/search?q=${encodeURIComponent(searchText)}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    // Response check fetch ke baad hoga
    if (!response.ok) {
      throw new Error(`Search API Error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Search failed");
    }

    setSearchResults(result.data || []);

  } catch (error) {
    console.error("Search Error:", error);
    setSearchResults([]);
    setSearchError("تلاش مکمل نہیں ہو سکی۔ دوبارہ کوشش کریں۔");
  } finally {
    setSearchLoading(false);
  }
};

/* ---------- CLEAR SEARCH ---------- */

const clearSearch = () => {
  setQuery("");
  setSearchResults([]);
  setHasSearched(false);
  setSearchError("");
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
      {/* <PrayerClock name="Panbari Satra, Hatimuria" lat={26.1445} lng={91.7362} asr={2} /> */}

      {/* =================================================
          ISLAMIC SLIDER
      ================================================= */}

      <div className="-mt-[40px] -mb-6 relative z-10">
        <IslamicSlider />
      </div>

     

{/* =================================================
    PREMIUM SEARCH SECTION
================================================= */}

<div
  id="home-search"
  className="relative w-11/12 md:w-full mx-auto mt-6 z-20"
>
{/* SEARCH BAR */}

<div className="group relative flex items-center gap-1 overflow-hidden rounded-2xl border border-[#D6EBD8] bg-white/95 p-1.5 shadow-[0_10px_40px_-10px_rgba(40,122,53,0.25)] backdrop-blur transition-all duration-300 hover:shadow-[0_14px_44px_-10px_rgba(40,122,53,0.35)] focus-within:border-[#75C178] focus-within:shadow-[0_0_0_4px_rgba(117,193,120,0.18),0_14px_44px_-10px_rgba(40,122,53,0.35)]">

  {/* Search Icon */}

  <div className="flex shrink-0 items-center justify-center rounded-xl bg-[#EEF7EE] p-2.5 transition-colors duration-300 group-focus-within:bg-[#DFF0E0]">
    <Search className="h-5 w-5 text-[#287A35]" />
  </div>

  {/* Input */}

  <input
    type="text"
    value={query}
    onChange={(e) => {
      setQuery(e.target.value);

      if (!e.target.value.trim()) {
        setSearchResults([]);
        setHasSearched(false);
        setSearchError("");
      }
    }}
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    }}
    placeholder={
      isFocused
        ? "تلاش کریں....."
        : animatedPlaceholder || "\u00A0"
    }
    className="w-full min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-lg text-[#1F2D1F] placeholder-gray-400 outline-none focus:ring-0"
    style={{
      direction: "rtl",
      fontFamily: font,
    }}
  />

  {/* Clear Button */}

  {query.length > 0 && (
    <button
      type="button"
      onClick={clearSearch}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-500 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-90"
      title="Clear Search"
    >
      ✕
    </button>
  )}

  {/* Divider */}

  <div className="mx-1 h-7 w-px shrink-0 bg-[#DCEBDD]" />

  {/* Voice Search */}

  <button
    type="button"
    onClick={startListening}
    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#287A35] transition-all duration-200 hover:bg-[#EEF7EE] hover:text-[#20652B] active:scale-90"
    title="Voice Search"
  >
    <Mic className="h-5 w-5" />
  </button>

  {/* Search Button */}

  <button
    type="button"
    onClick={() => handleSearch()}
    disabled={searchLoading || !query.trim()}
    className="shrink-0 rounded-xl bg-gradient-to-br from-[#3A9448] to-[#287A35] px-6 py-3 font-semibold text-white shadow-[0_4px_14px_rgba(40,122,53,0.35)] transition-all duration-300 hover:from-[#33853F] hover:to-[#20652B] hover:shadow-[0_6px_18px_rgba(40,122,53,0.45)] active:scale-95 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-400 disabled:shadow-none"
    style={{ fontFamily: font }}
  >
    {searchLoading ? "تلاش..." : "تلاش کریں"}
  </button>

</div>

  {/* SEARCH RESULTS */}

  {hasSearched && (
    <div
      className="mt-4 overflow-hidden rounded-xl border border-[#C6E2C8] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
      dir="rtl"
      style={{ fontFamily: font }}
    >

      {/* RESULTS HEADER */}

      <div className="flex items-center justify-between gap-3 border-b border-[#E5F0E5] bg-[#F5FAF5] px-4 py-3">

        <h3 className="text-lg font-bold text-[#287A35]">
          نتائج تلاش
        </h3>

        {!searchLoading && (
          <span className="text-sm text-gray-600">
            {searchResults.length} سوالات ملے
          </span>
        )}

      </div>

      {/* LOADING */}

      {searchLoading && (
        <div className="flex items-center justify-center gap-3 py-8 text-[#287A35]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#75C178] border-t-transparent" />
          <span>سوالات تلاش کیے جا رہے ہیں...</span>
        </div>
      )}

      {/* ERROR */}

      {!searchLoading && searchError && (
        <div className="px-4 py-6 text-center text-red-600">
          {searchError}
        </div>
      )}

      {/* EMPTY RESULTS */}

      {!searchLoading &&
        !searchError &&
        searchResults.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-500">
            معذرت! اس موضوع سے متعلق کوئی سوال نہیں ملا۔
          </div>
        )}

      {/* RESULTS LIST */}

      {!searchLoading &&
        !searchError &&
        searchResults.length > 0 && (
          <div className="divide-y divide-[#E5F0E5]">

            {searchResults.map((item, index) => (
              <Link
                key={item._id || item.slug || index}
                href={`/questions/${item.slug}`}
                className="group flex items-start gap-3 px-4 py-4 transition-all duration-200 hover:bg-[#F5FAF5]"
              >
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF5EA] text-sm text-[#287A35]">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <h4 className="text-lg leading-9 text-[#333333] transition-colors group-hover:text-[#287A35]">
                    {item.question}
                  </h4>

                  {item.category && (
                    <span className="mt-1 inline-block rounded-md bg-[#EAF5EA] px-2 py-1 text-sm text-[#287A35]">
                      {item.category}
                    </span>
                  )}
                </div>

                <span className="mt-2 shrink-0 text-[#75C178]">
                  ←
                </span>
              </Link>
            ))}

          </div>
        )}

      {/* RESULTS FOOTER */}

      {!searchLoading && searchResults.length > 0 && (
        <div className="border-t border-[#E5F0E5] bg-[#F9FCF9] px-4 py-3 text-center text-sm text-gray-500">
          مزید مسائل کے لیے اوپر تلاش کریں
        </div>
      )}

    </div>
  )}
</div>



      {/* =================================================
          ASK QUESTION BUTTON
      ================================================= */}

      <AskButton onClick={() => setShowAsk(true)} />

      {/* =================================================
          CATEGORIES
      ================================================= */}

      <div
  className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2 w-full relative z-10"
  style={{ marginTop: "16px" }}
>
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

      <VisitorTracker />

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