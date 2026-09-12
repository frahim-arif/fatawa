"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Mic, ArrowLeft, Sparkles } from "lucide-react";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";

import HomeLoader from "./components/HomeLoader";
import LatestBooksSlider from "./components/LatestBooksSlider";
import IslamicTools from "./components/IslamicTools";
import IslamicSlider from "./components/IslamicSlider";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [prayerTimes, setPrayerTimes] = useState(null);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState("questions");
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");
  const [majameen, setMajameen] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const questionsRef = useRef(null);

  const backend = "https://f-backend-vdi1.onrender.com/api";

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
     FETCH CATEGORIES
  ===================================================== */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backend}/categories`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Categories API error: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
          setCategories(data.data || []);
        }
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
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
          throw new Error(`Prayer API error: ${res.status}`);
        }

        const data = await res.json();

        if (data.code === 200) {
          setPrayerTimes(data.data.timings);
        }
      } catch (err) {
        console.error("❌ Namaz timing error:", err);
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
        if (!prayer.time) continue;

        const cleanTime = prayer.time.split(" ")[0];
        const [hours, minutes] = cleanTime.split(":");

        const prayerDate = new Date();

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

      if (!next && prayerTimes.Fajr) {
        const cleanFajrTime = prayerTimes.Fajr.split(" ")[0];
        const [hours, minutes] = cleanFajrTime.split(":");

        const fajrTomorrow = new Date();

        fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);

        fajrTomorrow.setHours(
          parseInt(hours, 10),
          parseInt(minutes, 10),
          0,
          0
        );

        next = {
          name: "فجر",
          time: fajrTomorrow,
        };
      }

      if (!next) return;

      const diff = next.time - now;

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
        const res = await fetch(`${backend}/majameen`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Majameen API error: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
          setMajameen((data.data || []).slice(0, 4));
        }
      } catch (err) {
        console.error("❌ Majameen error:", err);
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
          `${backend}/admin/questions?limit=5`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(`Latest questions API error: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
          setLatestQuestions(data.data || []);
        }
      } catch (err) {
        console.error("❌ Latest question error:", err);
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
        url =
          `${backend}/admin/questions/category/` +
          `${encodeURIComponent(selectedCategory)}` +
          `?skip=${customSkip}&limit=5`;
      }

      const res = await fetch(url, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Questions API error: ${res.status}`);
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
    } catch (err) {
      console.error("❌ Questions error:", err);
    }
  };

  /* =====================================================
     CATEGORY CHANGE
  ===================================================== */

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
     SEARCH FILTER
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
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      const transcript =
        e.results?.[0]?.[0]?.transcript || "";

      setQuery(transcript);
    };

    recognition.onerror = (error) => {
      console.error("Voice search error:", error);
    };

    recognition.start();
  };

  /* =====================================================
     LOADING SCREEN
  ===================================================== */

  if (isLoading) {
    return <HomeLoader />;
  }

  /* =====================================================
     HOME PAGE
  ===================================================== */

  return (
    <div
      className="
        relative
        w-full
        min-h-screen
        overflow-hidden
        -mt-8
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
      <Head>
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

          body {
            font-family: 'Jameel Noori Nastaleeq', serif;
          }
        `}</style>
      </Head>

      {/* =================================================
          PREMIUM SOFT GLOW
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
          x: ["0%", "15%", "-15%", "0%"],
          y: ["0%", "8%", "-8%", "0%"],
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

      <div className="w-full relative z-10 -mt-[0.2px]">
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
              direction: "rtl",
              fontFamily:
                "'Jameel Noori Nastaleeq', serif",
              lineHeight: "1.4",
              letterSpacing: "0.5px",
            }}
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {prayerTimes ? (
              <>
                فجر: {prayerTimes.Fajr?.split(" ")[0]}
                &nbsp;&nbsp;&nbsp;
                ظہر: {prayerTimes.Dhuhr?.split(" ")[0]}
                &nbsp;&nbsp;&nbsp;
                عصر: {prayerTimes.Asr?.split(" ")[0]}
                &nbsp;&nbsp;&nbsp;
                مغرب: {prayerTimes.Maghrib?.split(" ")[0]}
                &nbsp;&nbsp;&nbsp;
                عشاء: {prayerTimes.Isha?.split(" ")[0]}
              </>
            ) : (
              "نماز کے اوقات لوڈ ہو رہے ہیں..."
            )}
          </motion.div>
        </div>
      </div>

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
            <Search className="w-5 h-5 text-[#c8ae6a]" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="تلاش کریں....."
            className="
              w-full
              py-3
              pr-4
              bg-black/70
              text-[#f5e6bd]
              placeholder-gray-300
              outline-none
              text-lg
              border-0
              focus:ring-0
            "
            style={{
              direction: "rtl",
              fontFamily:
                "'Jameel Noori Nastaleeq', serif",
            }}
          />

          <button
            onClick={startListening}
            type="button"
            className="
              px-3
              py-2
              hover:bg-[#c8ae6a]/10
              transition
            "
            aria-label="Voice Search"
          >
            <Mic className="w-6 h-6 text-[#c8ae6a] opacity-90" />
          </button>
        </div>
      </div>

      {/* =================================================
          CATEGORIES
      ================================================= */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-3
          px-2
          mt-6
          w-full
          relative
          z-10
        "
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
              text-xl
              font-medium
              ${
                selectedCategory === cat.name
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
                "'Jameel Noori Nastaleeq', serif",
            }}
          >
            {cat.name}
          </motion.div>
        ))}
      </div>

      {/* =================================================
          CATEGORY QUESTIONS
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
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <Link
              key={q._id}
              href={`/questions/${q.slug}`}
              className="block"
            >
              <motion.div
                whileHover={{ y: -2 }}
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
                  direction: "rtl",
                  fontFamily:
                    "'Jameel Noori Nastaleeq', serif",
                  lineHeight: "2.2",
                  textAlign: "right",
                }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#806b3f]" />

                <h3 className="font-bold text-xl text-[#174d40] pr-2">
                  {q.question}
                </h3>
              </motion.div>
            </Link>
          ))
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
                "'Jameel Noori Nastaleeq', serif",
              direction: "rtl",
            }}
          >
            اوپر دیے گئے بٹن پر کلک کر کے سوال و جواب دیکھیں
          </div>
        )}

        {hasMore && filteredQuestions.length > 0 && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() =>
                fetchQuestions({
                  customSkip: skip,
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
              "
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
              }}
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

          <div className="flex items-center justify-between relative z-10">
            <div className="text-right">
              <p
                className="text-[#d8c27d]"
                style={{
                  fontFamily:
                    "'Jameel Noori Nastaleeq', serif",
                  fontSize: "20px",
                  lineHeight: "30px",
                }}
              >
                🕌 اگلی نماز
              </p>

              <h2
                className="text-white"
                style={{
                  fontFamily:
                    "'Jameel Noori Nastaleeq', serif",
                  fontSize: "30px",
                  lineHeight: "40px",
                }}
              >
                {nextPrayer}
              </h2>
            </div>

            <motion.div
              animate={{
                opacity: [1, 0.7, 1],
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
                "
                style={{
                  fontSize: "24px",
                  letterSpacing: "2px",
                }}
              >
                {countdown}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* =================================================
          ISLAMIC QUICK LINKS
      ================================================= */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
          px-3
          mt-5
          relative
          z-10
        "
      >
        {[
          {
            href: "/masnoon-duayee",
            title: "مسنون دعائیں",
          },
          {
            href: "/islami-naam",
            title: "اسلامی نام",
          },
          {
            href: "/books",
            title: "اسلامی کتب",
          },
          {
            href: "/majameen",
            title: "مضامین",
          },
          {
            href: "/ozan-shariah-calculator",
            title: "اوزان شریعہ کیلکولیٹر",
          },
          {
            href: "/40-hadith-free",
            title: "40 احادیث",
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
              dark:bg-[#18201f]
              border
              border-[#c8ae6a]
              dark:border-[#8f7840]
              p-4
              text-center
              shadow-[0_4px_16px_rgba(0,0,0,0.15)]
              dark:shadow-[0_0_14px_rgba(200,174,106,0.08)]
              hover:bg-[#fff9ec]
              dark:hover:bg-[#202b29]
              text-gray-900
              dark:text-[#f5e6bd]
              transition-all
              duration-300
              hover:-translate-y-1
            "
            style={{
              fontFamily:
                "'Jameel Noori Nastaleeq', serif",
              direction: "rtl",
              fontSize: "20px",
            }}
          >
            <span
              className="
                absolute
                top-0
                right-0
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
      </div>

      {/* =================================================
          TABS
      ================================================= */}

      <div className="mt-10 px-3 relative z-10">
        <div className="flex overflow-hidden border border-[#806b3f] shadow-lg">
          <button
            type="button"
            onClick={() => setActiveTab("questions")}
            className={`
              w-1/2
              py-3
              transition-all
              duration-300
              border-l
              border-[#806b3f]
              ${
                activeTab === "questions"
                  ? "bg-[#174d40] text-[#f5e6bd]"
                  : "bg-[#d9cfbf] text-[#624d35] hover:bg-[#e5dccd]"
              }
            `}
          >
            <span
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
                direction: "rtl",
                fontSize: "22px",
                lineHeight: "34px",
                fontWeight: "normal",
                display: "block",
              }}
            >
              نئے سوالات
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("majameen")}
            className={`
              w-1/2
              py-3
              transition-all
              duration-300
              ${
                activeTab === "majameen"
                  ? "bg-[#174d40] text-[#f5e6bd]"
                  : "bg-[#d9cfbf] text-[#624d35] hover:bg-[#e5dccd]"
              }
            `}
          >
            <span
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
                direction: "rtl",
                fontSize: "22px",
                lineHeight: "34px",
                fontWeight: "normal",
                display: "block",
              }}
            >
              منتخب مضامین
            </span>
          </button>
        </div>

        {/* =================================================
            TAB CONTENT
        ================================================= */}

        <div
          className="
            bg-white/90
            dark:bg-[#17211f]/95
            p-4
            border
            border-[#c8ae6a]
            shadow-lg
          "
          style={{
            fontFamily:
              "'Jameel Noori Nastaleeq', serif",
            direction: "rtl",
          }}
        >
          {/* NEW QUESTIONS */}

          {activeTab === "questions" && (
            <div className="space-y-3">
              {latestQuestions.length > 0 ? (
                latestQuestions
                  .slice(0, 5)
                  .map((item) => (
                    <Link
                      key={item._id}
                      href={`/questions/${item.slug}`}
                      className="
                        group
                        flex
                        items-start
                        gap-2
                        text-[#174d40]
                        dark:text-[#f5e6bd]
                        hover:text-[#806b3f]
                        transition-colors
                      "
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                      }}
                    >
                      <span className="text-[#c8ae6a] shrink-0">
                        ➜
                      </span>

                      <span className="group-hover:underline">
                        {item.question}
                      </span>
                    </Link>
                  ))
              ) : (
                <p className="text-gray-500 dark:text-gray-300 text-center">
                  کوئی نیا سوال موجود نہیں۔
                </p>
              )}
            </div>
          )}

          {/* MAJAMEEN */}

          {activeTab === "majameen" && (
            <div className="space-y-3">
              {majameen.length > 0 ? (
                majameen.map((item) => (
                  <Link
                    key={item._id}
                    href={`/majameen/${item._id}`}
                    className="
                      group
                      flex
                      items-start
                      gap-2
                      text-[#174d40]
                      dark:text-[#f5e6bd]
                      hover:text-[#806b3f]
                      transition-colors
                    "
                    style={{
                      fontSize: "20px",
                      lineHeight: "32px",
                    }}
                  >
                    <span className="text-[#c8ae6a] shrink-0">
                      ➜
                    </span>

                    <span className="group-hover:underline">
                      {item.title}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-300 text-center">
                  کوئی مضمون موجود نہیں۔
                </p>
              )}
            </div>
          )}
        </div>

        {/* =================================================
            BOOKS
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
      </div>
    </div>
  );
}