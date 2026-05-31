"use client";
import React, { useState, useEffect } from "react";
import { Search, Mic, X } from "lucide-react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";



export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const questionsRef = useRef(null);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState("questions");
  const [nextPrayer, setNextPrayer] = useState("");
const [countdown, setCountdown] = useState("");

  const backend = "https://f-backend-vdi1.onrender.com/api";

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backend}/categories`);
        const data = await res.json();
        if (data.success) setCategories(data.data);
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

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
      const [hours, minutes] = prayer.time.split(":");

      const prayerDate = new Date();

      prayerDate.setHours(
        parseInt(hours),
        parseInt(minutes),
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

    // If all prayers passed → tomorrow fajr
    if (!next) {
      const [hours, minutes] =
        prayerTimes.Fajr.split(":");

      const fajrTomorrow = new Date();

      fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);

      fajrTomorrow.setHours(
        parseInt(hours),
        parseInt(minutes),
        0
      );

      next = {
        name: "فجر",
        time: fajrTomorrow,
      };
    }

    const diff = next.time - now;

    const hrs = Math.floor(diff / 1000 / 60 / 60);
    const mins = Math.floor(
      (diff / 1000 / 60) % 60
    );
    const secs = Math.floor((diff / 1000) % 60);

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

  const interval = setInterval(updateCountdown, 1000);

  return () => clearInterval(interval);

}, [prayerTimes]);

  
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Guwahati&country=India&method=1"
        );
        const data = await res.json();

        if (data.code === 200) {
          setPrayerTimes(data.data.timings);
        }
      } catch (err) {
        console.error("Namaz timing error:", err);
      }
    };

    fetchPrayerTimes();
  }, []);



  useEffect(() => {
    const fetchLatestQuestions = async () => {
      try {
        const res = await fetch(
          `${backend}/admin/questions?limit=10`
        );

        const data = await res.json();

        if (data.success) {
          setLatestQuestions(data.data);
        }
      } catch (err) {
        console.error("Latest question error:", err);
      }
    };

    fetchLatestQuestions();
  }, []);

  // Fetch questions
  const fetchQuestions = async ({
    reset = false,
    customSkip = 0,
  } = {}) => {
    try {
      let url =
        selectedCategory === ""
          ? `${backend}/admin/questions?skip=${customSkip}&limit=5`
          : `${backend}/admin/questions/category/${encodeURIComponent(
            selectedCategory
          )}?skip=${customSkip}&limit=5`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        if (reset) {
          setAllQuestions(data.data);
        } else {
          setAllQuestions((prev) => [...prev, ...data.data]);
        }

        setSkip(customSkip + 5);
        setHasMore(data.data.length === 5);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    // homepage pe kuch mat lao
    if (selectedCategory === "") {
      setAllQuestions([]);
      return;
    }

    fetchQuestions({
      reset: true,
      customSkip: 0,
    });
  }, [selectedCategory]);

  const filteredQuestions =
    query.trim() === ""
      ? allQuestions
      : allQuestions.filter((q) =>
        q.question.toLowerCase().includes(query.toLowerCase())
      );

  // Voice Search
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("🎤 Voice search not supported");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "ur-PK";
    recognition.onresult = (e) => setQuery(e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div
      className="relative space-y-10 w-full px-0 overflow-hidden min-h-screen bg-repeat md:bg-cover bg-contain md:bg-center bg-top md:bg-fixed"
      style={{
        backgroundImage: "url('/images/ramadan_15_03_2022_1.jpg')",

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

    /* Optional: Default body font */
    body {
      font-family: 'Jameel Noori Nastaleeq', serif;
    }
  `}</style>
      </Head>

      {/* 🔹 Floating Nurani Light Background */}


      <motion.div
        className="fixed top-1/4 left-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,223,0,0.15), transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
        animate={{
          x: ["0%", "20%", "-20%", "0%"],
          y: ["0%", "10%", "-10%", "0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed top-1/3 right-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,223,0,0.12), transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
        animate={{
          x: ["0%", "-15%", "15%", "0%"],
          y: ["0%", "5%", "-5%", "0%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* 🔹 Scrolling Banners (Durūd Sharīf + Namaz Timings) */}
      <div className="w-full relative z-0 -mt-[0.2px]">

        {/* Durūd Sharīf
        <div
          className="w-full overflow-hidden"
          style={{
            background: "#000",
            borderTop: "0.5px solid #d4af37",
            borderBottom: "0.5px solid #d4af37",
          }}
        >
          <div className="relative w-full">
            <motion.div
              className="whitespace-nowrap text-yellow-100 text-xs arabic inline-block"
              style={{
                position: "relative",
                left: "100%", // 👈 start just outside right edge
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              اَللّٰهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ، وَعَلَىٰ آلِ سَيِّدِنَا مُحَمَّدٍ، وَبَارِكْ وَسَلِّمْ —
              ﴿ إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا ﴾
            </motion.div>
          </div>
        </div> */}

        {/* Namaz Timings */}
        <div
          className="w-full overflow-hidden px-0"
          style={{ background: "#000000", borderBottom: "2px solid #d4af37" }}
        >
          <motion.div
            className="whitespace-nowrap w-full text-yellow-200 text-sm font-semibold"
            style={{
              direction: "rtl",
              fontFamily: "'Jameel Noori Nastaleeq', serif",
              lineHeight: "1.2",
              letterSpacing: "0.5px",
            }}
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            {prayerTimes ? (
              <>
                فجر: {prayerTimes.Fajr.split(" ")[0]}&nbsp;&nbsp;&nbsp;
                ظہر: {prayerTimes.Dhuhr.split(" ")[0]}&nbsp;&nbsp;&nbsp;
                عصر: {prayerTimes.Asr.split(" ")[0]}&nbsp;&nbsp;&nbsp;
                مغرب: {prayerTimes.Maghrib.split(" ")[0]}&nbsp;&nbsp;&nbsp;
                عشاء: {prayerTimes.Isha.split(" ")[0]}
              </>
            ) : (
              "نماز کے اوقات لوڈ ہو رہے ہیں..."
            )}
          </motion.div>
        </div>

      </div>


      {/* Search Box */}
      <div className="relative w-11/12 md:w-full mx-auto mt-6 z-10">
        <div
          className="
            flex items-center 
            bg-black/30 
            border border-b-cyan-400 
            rounded-2xl 
            shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] 
            backdrop-blur-md
            transition-all duration-200 
            hover:shadow-[0_0_20px_rgba(255,223,0,0.5)]
          "
        >
          {/* Search Icon */}
          <div className="px-3 py-2">
            <Search className="w-5 h-5 text-yellow-400" />
          </div>

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="تلاش کریں....."
            className="
              w-full
              py-2
              pr-4
              bg-black
              text-right
              text-yellow-400
              placeholder-white
              outline-none
              text-lg
              rounded-xl
              border border-b-blue-700
              shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]
              focus:shadow-[0_0_20px_rgba(255,223,0,0.6)]
              focus:border-yellow-400
              transition-all duration-300
            "
            style={{
              direction: "rtl",
              fontFamily: "'Jameel Noori Nastaleeq', serif",
            }}
          />

          {/* Mic Button */}
          <button
            onClick={startListening}
            className="px-3 py-2 hover:text-yellow-300 transition"
          >
            <Mic className="w-6 h-6 text-yellow-400 opacity-80" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2 mt-6 w-full">

        {/* Dynamic Categories */}
        {categories.map((cat) => (
          <div
            key={cat._id}
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
        p-5 rounded-3xl cursor-pointer text-center select-none
        transition-all duration-300 transform border shadow-md
        hover:scale-105 text-xl font-medium
        ${selectedCategory === cat.name
                ? "bg-white border-yellow-500 text-black shadow-[0_0_20px_rgba(255,223,0,0.6)]"
                : "bg-white border-gray-300 text-black hover:bg-gray-100"
              }
      `}
            style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
          >
            {cat.name}
          </div>
        ))}

        {/* تمام کیٹیگریز button at the end */}
        {/* <div
          onClick={() => {
            setSelectedCategory("");
            setTimeout(() => {
              questionsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 300);
          }}
          className={`
    p-5 rounded-3xl cursor-pointer text-center select-none
    transition-all duration-500 transform border-blue-500 shadow-xl
    hover:scale-105 hover:shadow-[0_0_30px_rgba(255,223,0,0.8)]
    col-span-2 md:col-auto
    mx-auto
    ${selectedCategory === ""
              ? "bg-gradient-to-br from-yellow-400 to-yellow-200 border-yellow-500 shadow-[0_0_30px_rgba(255,223,0,0.9)] text-white"
              : "bg-white/30 border-gray-300 text-black hover:bg-gradient-to-br hover:from-yellow-100 hover:to-yellow-50 hover:text-yellow-800 hover:shadow-[0_0_25px_rgba(255,223,0,0.5)]"
            }
  `}
          style={{ fontFamily: "'Jameel Noori Nastaleeq', serif", backdropFilter: "blur(12px)" }}
        >
          تمام سوالات
        </div> */}

      </div>


      {/* Questions List */}
<section
  ref={questionsRef}
  className="space-y-4 px-0 z-10 relative"
>

  {filteredQuestions.length > 0 ? (

    filteredQuestions.map((q) => (
      <Link key={q._id} href={`/questions/${q.slug}`}>
        <div
          className="
            p-5 rounded-xl border
            bg-yellow-50
            border-yellow-300
            shadow-md
            w-full
            cursor-pointer
            hover:bg-yellow-100
            transition
            hover:shadow-[0_0_20px_rgba(255,223,0,0.6)]
          "
          style={{
            direction: "rtl",
            fontFamily: "'Jameel Noori Nastaleeq', serif",
            lineHeight: "2.2",
            textAlign: "right",
          }}
        >
          <h3 className="font-bold text-xl text-green-800">
            {q.question}
          </h3>
        </div>
      </Link>
    ))

  ) : (

    <div className="flex flex-col justify-center items-center py-20">

      {/* Premium Islamic Loader */}
      <div className="relative flex items-center justify-center">

        {/* Outer Ring */}
        <div
          className="
            w-20 h-20
            rounded-full
            border-4
            border-yellow-500/20
          "
        ></div>

        {/* Rotating Ring */}
        <div
          className="
            absolute
            w-20 h-20
            rounded-full
            border-4
            border-yellow-400
            border-t-transparent
            animate-spin
            shadow-[0_0_25px_rgba(255,215,0,0.5)]
          "
          style={{
            animationDuration: "1.2s",
          }}
        ></div>

        {/* Glow Circle */}
        <div
          className="
            absolute
            w-10 h-10
            rounded-full
            bg-yellow-400/20
            animate-pulse
          "
        ></div>

        {/* Center Dot */}
        <div
          className="
            absolute
            w-3 h-3
            rounded-full
            bg-yellow-300
            shadow-[0_0_15px_rgba(255,215,0,0.9)]
          "
        ></div>

      </div>

      {/* Loading Text */}
      <p
        className="mt-6 text-yellow-200"
        style={{
          fontFamily: "'Jameel Noori Nastaleeq', serif",
          fontSize: "24px",
          lineHeight: "38px",
        }}
      >
        سوالات لوڈ ہو رہے ہیں...
      </p>

    </div>

  )}

  {hasMore && filteredQuestions.length > 0 && (
    <div className="text-center mt-6">
      <button
        onClick={() =>
          fetchQuestions({
            customSkip: skip,
          })
        }
        className="
          px-6 py-2
          bg-green-600
          text-white
          rounded-lg
          hover:bg-green-700
          transition
        "
      >
        مزید سوالات دیکھیں
      </button>
    </div>
  )}

</section>
       {/* 🕌 Next Prayer Live */}
<div className="w-full px-3 mt-4">

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="
      relative overflow-hidden
      rounded-3xl
      border border-yellow-500/40
      bg-black/60
      backdrop-blur-xl
      shadow-[0_0_25px_rgba(255,215,0,0.15)]
      px-4 py-3
    "
  >

    {/* Glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5" />

    <div className="flex items-center justify-between">

      {/* Prayer */}
      <div className="text-right">
        <p
          className="text-yellow-300"
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

      {/* Countdown */}
      <motion.div
        animate={{
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="
          bg-yellow-500/10
          border border-yellow-500/20
          rounded-2xl
          px-4 py-2
        "
      >
        <span
          className="text-yellow-200 font-bold"
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

      <div className="grid grid-cols-2 gap-3 px-3 mt-5">

        {/* مسنون دعائیں */}
        <Link href="/masnoon-duayee">
          <div
            className="
        relative overflow-hidden
        h-14 flex items-center justify-center
        rounded-2xl
        border border-[#c8b27a]
        bg-gradient-to-b from-[#f6f0dd] via-[#e6d4a3] to-[#c9ab63]
        shadow-[0_6px_0_#9b7b38,0_10px_20px_rgba(0,0,0,0.25)]
        active:translate-y-[2px]
        active:shadow-[0_3px_0_#9b7b38,0_6px_12px_rgba(0,0,0,0.2)]
        transition-all duration-200
      "
          >
            <p
              className="text-[#4b3415]"
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
                fontSize: "24px",
                lineHeight: "38px",
              }}
            >
              مسنون دعائیں
            </p>
          </div>
        </Link>

        {/* اسلامی نام */}
        <Link href="/islami-naam">
          <div
            className="
        relative overflow-hidden
        h-14 flex items-center justify-center
        rounded-2xl
        border border-[#c8b27a]
        bg-gradient-to-b from-[#f6f0dd] via-[#e6d4a3] to-[#c9ab63]
        shadow-[0_6px_0_#9b7b38,0_10px_20px_rgba(0,0,0,0.25)]
        active:translate-y-[2px]
        active:shadow-[0_3px_0_#9b7b38,0_6px_12px_rgba(0,0,0,0.2)]
        transition-all duration-200
      "
          >
            <p
              className="text-[#4b3415]"
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
                fontSize: "24px",
                lineHeight: "38px",
              }}
            >
              اسلامی نام
            </p>
          </div>
        </Link>

        {/* اسلامی کتابیں */}
        <Link href="/books">
          <div
            className="
        relative overflow-hidden
        h-14 flex items-center justify-center
        rounded-2xl
        border border-[#c8b27a]
        bg-gradient-to-b from-[#f6f0dd] via-[#e6d4a3] to-[#c9ab63]
        shadow-[0_6px_0_#9b7b38,0_10px_20px_rgba(0,0,0,0.25)]
        active:translate-y-[2px]
        active:shadow-[0_3px_0_#9b7b38,0_6px_12px_rgba(0,0,0,0.2)]
        transition-all duration-200
      "
          >
            <p
              className="text-[#4b3415]"
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
                fontSize: "24px",
                lineHeight: "38px",
              }}
            >
              اسلامی کتابیں
            </p>
          </div>
        </Link>

        {/* مضامین */}
        <Link href="/majameen">
          <div
            className="
        relative overflow-hidden
        h-14 flex items-center justify-center
        rounded-2xl
        border border-[#c8b27a]
        bg-gradient-to-b from-[#f6f0dd] via-[#e6d4a3] to-[#c9ab63]
        shadow-[0_6px_0_#9b7b38,0_10px_20px_rgba(0,0,0,0.25)]
        active:translate-y-[2px]
        active:shadow-[0_3px_0_#9b7b38,0_6px_12px_rgba(0,0,0,0.2)]
        transition-all duration-200
      "
          >
            <p
              className="text-[#4b3415]"
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
                fontSize: "24px",
                lineHeight: "38px",
              }}
            >
              مضامین
            </p>
          </div>
        </Link>

        {/* شرعیہ کیلکولیٹر */}
        <Link href="https://www.maslakedeoband.in/ozan-shariah-calculator">
          <div
            className="
        relative overflow-hidden
        h-14 flex items-center justify-center
        rounded-2xl
        border border-[#c8b27a]
        bg-gradient-to-b from-[#f6f0dd] via-[#e6d4a3] to-[#c9ab63]
        shadow-[0_6px_0_#9b7b38,0_10px_20px_rgba(0,0,0,0.25)]
        active:translate-y-[2px]
        active:shadow-[0_3px_0_#9b7b38,0_6px_12px_rgba(0,0,0,0.2)]
        transition-all duration-200
      "
          >
            <p
              className="text-[#4b3415]"
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
                fontSize: "22px",
                lineHeight: "36px",
              }}
            >
              شرعیہ کیلکولیٹر
            </p>
          </div>
        </Link>

        {/* احادیث */}
        <Link href="https://www.maslakedeoband.in/40-hadith-free">
          <div
            className="
        relative overflow-hidden
        h-14 flex items-center justify-center
        rounded-2xl
        border border-[#c8b27a]
        bg-gradient-to-b from-[#f6f0dd] via-[#e6d4a3] to-[#c9ab63]
        shadow-[0_6px_0_#9b7b38,0_10px_20px_rgba(0,0,0,0.25)]
        active:translate-y-[2px]
        active:shadow-[0_3px_0_#9b7b38,0_6px_12px_rgba(0,0,0,0.2)]
        transition-all duration-200
      "
          >
            <p
              className="text-[#4b3415]"
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
                fontSize: "24px",
                lineHeight: "38px",
              }}
            >
              احادیث
            </p>
          </div>
        </Link>

      </div>





      {/* Tabs Section */}
      <div className="mt-10 px-3">

        {/* Tabs Header */}
        <div className="flex overflow-hidden rounded-t-2xl shadow-lg">

          {/* New Questions */}
          {/* New Questions */}
          {/* New Questions */}
          <button
            onClick={() => setActiveTab("questions")}
            className={`w-1/2 py-3 transition-all duration-300 ${activeTab === "questions"
              ? "bg-[#8b7355] text-white"
              : "bg-[#d9cfbf] text-[#7a5f3e]"
              }`}
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

          {/* Selected Articles */}
          <button
            onClick={() => setActiveTab("majameen")}
            className={`w-1/2 py-3 transition-all duration-300 ${activeTab === "majameen"
              ? "bg-[#8b7355] text-white"
              : "bg-[#d9cfbf] text-[#7a5f3e]"
              }`}
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

        {/* Content Box */}
        <div
          className="bg-white/80 rounded-b-2xl p-4 border border-yellow-400 shadow-lg"
          style={{
            fontFamily:
              "'Jameel Noori Nastaleeq', serif",
            direction: "rtl",
          }}
        >

          {/* Questions */}
          {activeTab === "questions" && (
            <div className="space-y-3">

              {latestQuestions
                .slice(0, 5)
                .map((item) => (

                  <Link
                    key={item._id}
                    href={`/questions/${item.slug}`}
                    className="block text-blue-700 hover:text-green-700 hover:underline"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                    }}
                  >
                    ➜ {item.question}
                  </Link>
                ))}

            </div>
          )}

          {/* Majameen */}
          {activeTab === "majameen" && (
            <div className="space-y-3">

              <Link
                href="/majameen"
                className="block text-blue-700 hover:text-green-700 hover:underline"
                style={{
                  fontSize: "20px",
                  lineHeight: "32px",
                }}
              >
                ➜ اسلامی معاشرہ
              </Link>

              <Link
                href="/majameen"
                className="block text-blue-700 hover:text-green-700 hover:underline"
                style={{
                  fontSize: "20px",
                  lineHeight: "32px",
                }}
              >
                ➜ سیرت النبی ﷺ
              </Link>

              <Link
                href="/majameen"
                className="block text-blue-700 hover:text-green-700 hover:underline"
                style={{
                  fontSize: "20px",
                  lineHeight: "32px",
                }}
              >
                ➜ اصلاحِ معاشرہ
              </Link>

              <Link
                href="/majameen"
                className="block text-blue-700 hover:text-green-700 hover:underline"
                style={{
                  fontSize: "20px",
                  lineHeight: "32px",
                }}
              >
                ➜ دینی مضامین
              </Link>

            </div>
          )}
          

        </div>

      </div>

    </div>

  );
}