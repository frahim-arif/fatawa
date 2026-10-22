"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, Mic } from "lucide-react";
import { motion } from "framer-motion";

import HomeLoader from "../components/HomeLoader";
import LatestBooksSlider from "../components/LatestBooksSlider";
import IslamicTools from "../components/IslamicTools";
import IslamicSlider from "../components/IslamicSlider";
import AskQuestionFormBn from "../components/AskQuestionFormBn";
import AskButtonBn from "../components/AskButtonBn";
import AskedQuestionsButtonBn from "../components/AskedQuestionsButtonBn";
import PrayerTickerBn from "../components/PrayerTickerBn";

const backend = "https://f-backend-vdi1.onrender.com/api";
const QUESTION_LIMIT = 10;
const font = "var(--font-bengali), 'Noto Sans Bengali', sans-serif";

/* =====================================================
   HELPERS
===================================================== */

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const bnDigits = (s) => String(s).replace(/\d/g, (d) => BN_DIGITS[d]);

const pick = (item, keys) => {
  for (const key of keys) {
    if (item?.[key]) return item[key];
  }
  return "";
};

const norm = (v) => String(v).trim().toLowerCase();

const getCategoryTitle = (c) => pick(c, ["banglaName", "bnName", "name"]);

const getCategoryAllValues = (c) =>
  [
    c?.name,
    c?.banglaName,
    c?.bnName,
    c?.slug,
    c?._id,
  ]
    .filter(Boolean)
    .map(norm);

const getQuestion = (q) =>
  pick(q, ["banglaQuestion", "bnQuestion", "questionBn", "question"]);

const getAnswer = (q) =>
  pick(q, ["banglaAnswer", "bnAnswer", "answerBn", "answer"]);

const getQuestionSlug = (q) =>
  pick(q, ["banglaSlug", "bnSlug", "slugBn", "slug", "_id"]);

const getArticleTitle = (a) => pick(a, ["banglaTitle", "bnTitle", "titleBn"]);

const getArticleSlug = (a) =>
  pick(a, ["banglaSlug", "bnSlug", "slugBn", "slug", "_id"]);

const getQuestionCategoryValues = (item) => {
  const values = [];
  const category = item?.category;

  if (typeof category === "string") values.push(category);

  if (category && typeof category === "object") {
    ["_id", "slug", "name", "banglaName", "bnName"].forEach((key) => {
      if (category[key]) values.push(category[key]);
    });
  }

  ["categoryId", "categoryName", "categorySlug"].forEach((key) => {
    if (item?.[key]) values.push(item[key]);
  });

  return values.map(norm);
};

const QUICK_LINKS = [
  { href: "/bn/masnoon-duayee", title: "মাসনূন দোয়া" },
  { href: "/bn/islami-naam", title: "ইসলামী নাম" },
  { href: "/books", title: "ইসলামী কিতাব" },
  { href: "/bn/articles", title: "ইসলামী প্রবন্ধ" },
  { href: "/ozan-shariah-calculator", title: "ইসলামী ক্যালকুলেটর" },
  { href: "/40-hadith-free", title: "৪০ হাদিস" },
];

/* =====================================================
   PAGE
===================================================== */

export default function BanglaHomePage() {
  /* ---------- STATES ---------- */

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [popularQuestions, setPopularQuestions] = useState([]);
  const [articles, setArticles] = useState([]);

  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");

  const [activeTab, setActiveTab] = useState("questions");
  const [isLoading, setIsLoading] = useState(true);
  const [showAsk, setShowAsk] = useState(false);

  const questionsRef = useRef(null);

  /* ---------- HOME LOADER ---------- */

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  /* ---------- CATEGORIES ---------- */

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${backend}/bn/categories`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Categories API error: ${res.status}`);

        const data = await res.json();

        setCategories(data?.success && Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("❌ Bangla categories error:", error);
        setCategories([]);
      }
    };

    run();
  }, []);

  const banglaCategories = useMemo(
    () => categories.filter((c) => Boolean(getCategoryTitle(c))),
    [categories]
  );

  /* ---------- QUESTIONS (list + load more) ---------- */

  const fetchQuestions = async ({ customSkip = 0, reset = false } = {}) => {
    if (loadingQuestions) return;

    try {
      setLoadingQuestions(true);

      const res = await fetch(
        `${backend}/bn/questions?skip=${customSkip}&limit=${QUESTION_LIMIT}`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error(`Bangla questions API error: ${res.status}`);

      const data = await res.json();

      if (!data?.success) return;

      const newQuestions = Array.isArray(data.data) ? data.data : [];

      if (reset) {
        setAllQuestions(newQuestions);
      } else {
        setAllQuestions((prev) => {
          const existing = new Set(prev.map((item) => item?._id));
          const unique = newQuestions.filter(
            (item) => item?._id && !existing.has(item._id)
          );
          return [...prev, ...unique];
        });
      }

      setSkip(customSkip + newQuestions.length);
      setHasMore(newQuestions.length === QUESTION_LIMIT);
    } catch (error) {
      console.error("❌ Bangla questions error:", error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    fetchQuestions({ customSkip: 0, reset: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- LATEST QUESTIONS ---------- */

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${backend}/bn/questions?skip=0&limit=5`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Latest questions API error: ${res.status}`);

        const data = await res.json();

        setLatestQuestions(data?.success && Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("❌ Latest Bangla questions error:", error);
        setLatestQuestions([]);
      }
    };

    run();
  }, []);

  /* ---------- POPULAR QUESTIONS ---------- */

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${backend}/bn/questions/popular?limit=8`, {
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();

        if (data?.success && Array.isArray(data.data)) {
          setPopularQuestions(data.data);
        }
      } catch {
        /* "বেশি পঠিত" tab tab tak chhupa rahega jab tak backend route na bane */
      }
    };

    run();
  }, []);

  /* ---------- ARTICLES ---------- */

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${backend}/majameen`, { cache: "no-store" });

        if (!res.ok) throw new Error(`Articles API error: ${res.status}`);

        const data = await res.json();

        if (data?.success && Array.isArray(data.data)) {
          setArticles(
            data.data.filter((item) => getArticleTitle(item)).slice(0, 5)
          );
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error("❌ Bangla articles error:", error);
        setArticles([]);
      }
    };

    run();
  }, []);

  /* ---------- PRAYER TIMES ---------- */

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Guwahati&country=India&method=1"
        );

        if (!res.ok) throw new Error(`Prayer API error: ${res.status}`);

        const data = await res.json();

        if (data?.code === 200) setPrayerTimes(data.data.timings);
      } catch (error) {
        console.error("❌ Namaz timing error:", error);
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
        { name: "ফজর", time: prayerTimes.Fajr },
        { name: "যোহর", time: prayerTimes.Dhuhr },
        { name: "আসর", time: prayerTimes.Asr },
        { name: "মাগরিব", time: prayerTimes.Maghrib },
        { name: "এশা", time: prayerTimes.Isha },
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

        next = { name: "ফজর", time: fajrTomorrow };
      }

      if (!next) return;

      const totalSeconds = Math.max(
        0,
        Math.floor((next.time.getTime() - now.getTime()) / 1000)
      );

      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

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

  /* ---------- FILTER QUESTIONS ---------- */

  const filteredQuestions = useMemo(() => {
    let result = [...allQuestions];

    if (selectedCategory) {
      const selected = norm(selectedCategory);

      const possible = new Set([selected]);

      const matchedCategory = banglaCategories.find((c) =>
        getCategoryAllValues(c).includes(selected)
      );

      if (matchedCategory) {
        getCategoryAllValues(matchedCategory).forEach((v) => possible.add(v));
      }

      result = result.filter((item) =>
        getQuestionCategoryValues(item).some((value) => possible.has(value))
      );
    }

    const searchText = norm(query);

    if (searchText) {
      result = result.filter(
        (item) =>
          getQuestion(item).toLowerCase().includes(searchText) ||
          getAnswer(item).toLowerCase().includes(searchText)
      );
    }

    return result;
  }, [allQuestions, selectedCategory, query, banglaCategories]);

  /* ---------- CATEGORY ACTIONS ---------- */

  const scrollToQuestions = (delay) => {
    setTimeout(() => {
      questionsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, delay);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(getCategoryTitle(category));
    scrollToQuestions(200);
  };

  const clearCategory = () => {
    setSelectedCategory("");
    scrollToQuestions(100);
  };

  /* ---------- VOICE SEARCH ---------- */

  const startListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("🎤 ভয়েস সার্চ এই ব্রাউজারে সমর্থিত নয়।");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "bn-BD";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      setQuery(event.results?.[0]?.[0]?.transcript || "");
    };

    recognition.onerror = (error) => {
      console.error("Voice search error:", error);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Voice recognition start error:", error);
    }
  };

  /* ---------- LOADING ---------- */

  if (isLoading) {
    return <HomeLoader />;
  }

  /* ---------- TABS ---------- */

  const tabs = [
    { key: "questions", label: "নতুন প্রশ্ন" },
    { key: "articles", label: "নির্বাচিত প্রবন্ধ" },
    ...(popularQuestions.length > 0
      ? [{ key: "popular", label: "বেশি পঠিত" }]
      : []),
  ];

  const listLinkClass =
    "group flex items-start gap-2 text-[#174d40] hover:text-[#806b3f] transition-colors";

  const listStyle = { fontSize: "17px", lineHeight: "30px" };

  const categoryBase =
    "p-4 md:p-5 cursor-pointer text-center select-none transition-all duration-300 border shadow-[0_5px_18px_rgba(0,0,0,0.18)] text-lg md:text-xl font-medium";

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      dir="ltr"
      className="relative min-h-screen w-full overflow-hidden -mt-6 space-y-10 px-0 bg-repeat bg-contain bg-top md:bg-cover md:bg-center md:bg-fixed"
      style={{
        backgroundImage: "url('/images/ramadan_15_03_2022_1.jpg')",
        fontFamily: font,
      }}
    >
      {/* BACKGROUND GLOW */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(200,174,106,0.10), transparent 38%)",
        }}
      />

      <motion.div
        className="fixed top-1/4 left-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,223,0,0.12), transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
        animate={{ x: ["0%", "15%", "-15%", "0%"], y: ["0%", "8%", "-8%", "0%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* =================================================
          PRAYER TIMES TOP BAR
      ================================================= */}

      <PrayerTickerBn prayerTimes={prayerTimes} nextPrayer={nextPrayer} />

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
        id="home-search"
        className="relative w-11/12 md:w-full mx-auto mt-6 z-10"
      >
        <div className="flex items-center overflow-hidden border border-[#8f7840] bg-black/55 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.30)] transition-all duration-300 hover:border-[#c8ae6a] focus-within:border-[#c8ae6a] focus-within:shadow-[0_0_22px_rgba(200,174,106,0.22)]">
          <div className="px-3 py-2">
            <Search className="h-5 w-5 text-[#c8ae6a]" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="প্রশ্ন খুঁজুন..."
            aria-label="প্রশ্ন খুঁজুন"
            className="w-full py-3 px-4 bg-black/70 text-[#f5e6bd] placeholder-gray-300 outline-none text-lg border-0 focus:ring-0"
            style={{ fontFamily: font }}
          />

          <button
            onClick={startListening}
            type="button"
            className="px-3 py-2 hover:bg-[#c8ae6a]/10 transition"
            aria-label="ভয়েস সার্চ"
          >
            <Mic className="h-6 w-6 text-[#c8ae6a] opacity-90" />
          </button>
        </div>
      </div>

      {/* =================================================
          ASK + READER QUESTIONS
      ================================================= */}

      <section
        className="relative z-10 grid gap-3 px-3 md:grid-cols-2"
        style={{ marginTop: "-16px" }}
      >
        <AskButtonBn onClick={() => setShowAsk(true)} />
        <AskedQuestionsButtonBn />
      </section>

      {/* =================================================
          CATEGORY HEADING
      ================================================= */}

      <div className="relative z-10 px-3 mt-8 text-center">
        <h2
          className="text-2xl md:text-3xl font-bold text-[#174d40] bg-[#fffaf0]/90 inline-block px-6 py-2 border border-[#c8ae6a] shadow-sm"
          style={{ fontFamily: font, lineHeight: "2.4rem" }}
        >
          বিষয়সমূহ
        </h2>
      </div>

      {/* =================================================
          CATEGORIES
      ================================================= */}

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2 mt-4 w-full relative z-10">
        <motion.div
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={clearCategory}
          className={`${categoryBase} ${
            selectedCategory === ""
              ? "bg-[#174d40] border-[#c8ae6a] text-[#f5e6bd] shadow-[0_0_20px_rgba(200,174,106,0.35)]"
              : "bg-white/95 border-[#c8ae6a] text-[#1d332f] hover:bg-[#f8f1df]"
          }`}
          style={{ fontFamily: font }}
        >
          সব প্রশ্ন
        </motion.div>

        {banglaCategories.map((cat) => {
          const title = getCategoryTitle(cat);
          const active = norm(selectedCategory) === norm(title);

          return (
            <motion.div
              key={cat?._id || cat?.slug || title}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(cat)}
              className={`${categoryBase} ${
                active
                  ? "bg-[#f8f1df] border-[#c8ae6a] text-[#183d35] shadow-[0_0_20px_rgba(200,174,106,0.35)]"
                  : "bg-white/95 border-[#c8ae6a] text-[#1d332f] hover:bg-[#f8f1df] hover:border-[#806b3f]"
              }`}
              style={{ fontFamily: font }}
            >
              {title}
            </motion.div>
          );
        })}
      </section>

      {/* =================================================
          QUESTIONS
      ================================================= */}

      <section ref={questionsRef} className="space-y-4 px-2 z-10 relative">
        <div className="flex items-center justify-between gap-3 px-2">
          <h2
            className="text-xl md:text-2xl font-bold text-[#174d40] bg-[#fffaf0]/90 px-4 py-2 border border-[#c8ae6a]"
            style={{ fontFamily: font, lineHeight: "2.2rem" }}
          >
            {selectedCategory ? selectedCategory : "নতুন প্রশ্নসমূহ"}
          </h2>

          {selectedCategory && (
            <button
              type="button"
              onClick={clearCategory}
              className="px-4 py-2 border border-[#c8ae6a] bg-[#174d40] text-[#f5e6bd] hover:bg-[#216353]"
              style={{ fontFamily: font }}
            >
              সব দেখুন
            </button>
          )}
        </div>

        {loadingQuestions && allQuestions.length === 0 ? (
          <div
            className="text-center bg-black/50 border border-[#806b3f] px-4 py-6 text-[#f5e6bd]"
            style={{ fontFamily: font }}
          >
            প্রশ্ন লোড হচ্ছে...
          </div>
        ) : filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <Link
              key={q._id}
              href={`/bn/fatawa/${encodeURIComponent(getQuestionSlug(q))}`}
              className="block"
            >
              <motion.div
                whileHover={{ y: -2 }}
                className="p-5 border bg-[#fffaf0]/95 border-[#c8ae6a] shadow-[0_5px_20px_rgba(0,0,0,0.15)] w-full cursor-pointer hover:bg-[#fffdf7] transition-all duration-300 relative overflow-hidden"
                style={{ fontFamily: font, lineHeight: "2", textAlign: "left" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#806b3f]" />

                <h3 className="font-bold text-lg md:text-xl text-[#174d40] pl-2">
                  {getQuestion(q)}
                </h3>
              </motion.div>
            </Link>
          ))
        ) : (
          <div
            className="text-center bg-black/50 border border-[#806b3f] px-4 py-5 text-[#f5e6bd] backdrop-blur-sm"
            style={{ fontFamily: font }}
          >
            {query
              ? "আপনার অনুসন্ধানের সাথে কোনো প্রশ্ন পাওয়া যায়নি।"
              : selectedCategory
              ? "এই বিষয়ে কোনো প্রশ্ন পাওয়া যায়নি।"
              : "কোনো প্রশ্ন পাওয়া যায়নি।"}
          </div>
        )}

        {hasMore &&
          !selectedCategory &&
          !query &&
          filteredQuestions.length > 0 && (
            <div className="text-center mt-6">
              <button
                type="button"
                disabled={loadingQuestions}
                onClick={() => fetchQuestions({ customSkip: skip, reset: false })}
                className="px-7 py-2 bg-[#174d40] text-[#f5e6bd] border border-[#c8ae6a] hover:bg-[#216353] hover:shadow-[0_0_18px_rgba(200,174,106,0.25)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: font }}
              >
                {loadingQuestions ? "লোড হচ্ছে..." : "আরও প্রশ্ন দেখুন"}
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
          className="relative overflow-hidden border border-[#c8ae6a]/50 bg-[#071c19]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.30)] px-4 py-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#c8ae6a]/5 via-transparent to-[#c8ae6a]/5" />

          <div className="flex items-center justify-between relative z-10">
            <div>
              <p
                className="text-[#d8c27d] text-base md:text-lg"
                style={{ fontFamily: font }}
              >
                🕌 পরবর্তী নামাজ
              </p>

              <h2
                className="text-white text-2xl md:text-3xl font-bold"
                style={{ fontFamily: font }}
              >
                {nextPrayer || "--"}
              </h2>
            </div>

            <motion.div
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="bg-[#c8ae6a]/10 border border-[#c8ae6a]/30 px-4 py-2"
            >
              <span className="text-[#f5e6bd] font-bold text-xl md:text-2xl">
                {bnDigits(countdown || "00:00:00")}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* =================================================
          ISLAMIC QUICK LINKS
      ================================================= */}

      <section className="grid grid-cols-2 md:grid-cols-3 gap-3 px-3 mt-5 relative z-10">
        {QUICK_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative overflow-hidden bg-white border border-[#c8ae6a] p-4 text-center shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:bg-[#fff9ec] text-gray-900 transition-all duration-300 hover:-translate-y-1"
            style={{ fontFamily: font, fontSize: "18px" }}
          >
            <span className="absolute top-0 left-0 w-0 h-[2px] bg-[#c8ae6a] group-hover:w-full transition-all duration-300" />
            <span className="relative z-10">{item.title}</span>
          </Link>
        ))}
      </section>

      {/* =================================================
          TABS
      ================================================= */}

      <section className="mt-10 px-3 relative z-10">
        <div className="flex overflow-hidden border border-[#806b3f] shadow-lg">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-1 py-3 transition-all duration-300 ${
                i < tabs.length - 1 ? "border-r border-[#806b3f]" : ""
              } ${
                activeTab === tab.key
                  ? "bg-[#174d40] text-[#f5e6bd]"
                  : "bg-[#d9cfbf] text-[#624d35] hover:bg-[#e5dccd]"
              }`}
            >
              <span
                style={{
                  fontFamily: font,
                  fontSize: "17px",
                  fontWeight: "600",
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
          className="bg-white/90 p-4 border border-[#c8ae6a] shadow-lg"
          style={{ fontFamily: font }}
        >
          {activeTab === "questions" && (
            <div className="space-y-3">
              {latestQuestions.length > 0 ? (
                latestQuestions.slice(0, 5).map((item) => (
                  <Link
                    key={item._id}
                    href={`/bn/fatawa/${encodeURIComponent(getQuestionSlug(item))}`}
                    className={listLinkClass}
                    style={listStyle}
                  >
                    <span className="text-[#c8ae6a] shrink-0">➜</span>
                    <span className="group-hover:underline">{getQuestion(item)}</span>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  এখনো কোনো নতুন প্রশ্ন নেই।
                </p>
              )}
            </div>
          )}

          {activeTab === "articles" && (
            <div className="space-y-3">
              {articles.length > 0 ? (
                articles.slice(0, 5).map((item) => (
                  <Link
                    key={item._id}
                    href={`/bn/articles/${encodeURIComponent(getArticleSlug(item))}`}
                    className={listLinkClass}
                    style={listStyle}
                  >
                    <span className="text-[#c8ae6a] shrink-0">➜</span>
                    <span className="group-hover:underline">
                      {getArticleTitle(item)}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  এখনো কোনো বাংলা প্রবন্ধ নেই।
                </p>
              )}
            </div>
          )}

          {activeTab === "popular" && (
            <div className="space-y-3">
              {popularQuestions.map((item) => (
                <Link
                  key={item._id}
                  href={`/bn/fatawa/${encodeURIComponent(getQuestionSlug(item))}`}
                  className={listLinkClass}
                  style={listStyle}
                >
                  <span className="text-[#c8ae6a] shrink-0">➜</span>
                  <span className="group-hover:underline">{getQuestion(item)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* LATEST BOOKS */}
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
      </section>

      {/* BOTTOM SPACE */}
      <div className="h-6" />

      {/* =================================================
          ASK QUESTION POPUP
      ================================================= */}

      <AskQuestionFormBn
        open={showAsk}
        onClose={() => setShowAsk(false)}
        backend={backend}
      />
    </div>
  );
}