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
      <section ref={questionsRef} className="space-y-4 px-0 z-10 relative">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <Link key={q._id} href={`/questions/${q.slug}`}>
              <div
                className="p-5 rounded-xl border bg-yellow-50 border-yellow-300 shadow-md w-full cursor-pointer hover:bg-yellow-100 transition hover:shadow-[0_0_20px_rgba(255,223,0,0.6)]"
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
          <p className="text-center text-black text-lg font-medium">
            اوپر دیے گئے بٹن پر کلک کر کے سوال و جواب دیکھیں
          </p>
        )}

        {hasMore && filteredQuestions.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={() =>
                fetchQuestions({
                  customSkip: skip,
                })
              }
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              مزید سوالات دیکھیں
            </button>
          </div>
        )}
      </section>


      <div className="grid grid-cols-2 gap-2 px-2 mt-4">

        <Link href="/masnoon-duayee">
          <div
            className="
      relative overflow-hidden
      h-10 flex items-center justify-center
      w-full
      cursor-pointer
      rounded-xl
      border border-gray-300/40
      bg-gradient-to-br from-[#374151]/90 via-[#9CA3AF]/70 to-[#E5E7EB]/60
      backdrop-blur-md
      shadow-lg
      hover:shadow-[0_0_25px_rgba(156,163,175,0.8)]
      hover:scale-105
      transition-all duration-300
    "
            style={{
              fontFamily: "'Jameel Noori Nastaleeq', serif",
            }}
          >
            {/* ✨ Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 to-transparent opacity-0 hover:opacity-100 transition duration-500"></div>
            {/* 📿 Content */}
            <p className="relative text-base text-black font-bold tracking-wide">
               مسنون دعائیں
            </p>
          </div>
        </Link>

        {/* 👶 اسلامی نام */}
        <Link href="/islami-naam">
          <div
            className="
      relative overflow-hidden
      h-10 flex items-center justify-center
      w-full
      cursor-pointer
      rounded-xl
      border border-gray-300/40
      bg-gradient-to-br from-[#374151]/90 via-[#9CA3AF]/70 to-[#E5E7EB]/60
      backdrop-blur-md
      shadow-lg
      hover:shadow-[0_0_25px_rgba(156,163,175,0.8)]
      hover:scale-105
      transition-all duration-300
    "
            style={{
              fontFamily: "'Jameel Noori Nastaleeq', serif",
            }}
          >
            {/* ✨ Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 to-transparent opacity-0 hover:opacity-100 transition duration-500"></div>
            {/* 👶 Content */}
            <p className="relative text-base text-black font-bold tracking-wide">
               اسلامی نام
            </p>
          </div>
        </Link>
        <Link href="/books">
          <div
            className="
      relative overflow-hidden
      h-10 flex items-center justify-center
      w-full
      cursor-pointer
      rounded-xl
      border border-gray-300/40
      bg-gradient-to-br from-[#374151]/90 via-[#9CA3AF]/70 to-[#E5E7EB]/60
      backdrop-blur-md
      shadow-lg
      hover:shadow-[0_0_25px_rgba(156,163,175,0.8)]
      hover:scale-105
      transition-all duration-300
    "
            style={{
              fontFamily: "'Jameel Noori Nastaleeq', serif",
            }}
          >
            {/* ✨ Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 to-transparent opacity-0 hover:opacity-100 transition duration-500"></div>
            {/* 📚 Content */}
            <p className="relative text-base text-black font-bold tracking-wide">
               اسلامی کتابیں
            </p>
          </div>
        </Link>

        <Link href="/majameen">
          <div
            className="
      relative overflow-hidden
      h-10 flex items-center justify-center
      w-full
      cursor-pointer
      rounded-xl
      border border-gray-300/40
      bg-gradient-to-br from-[#374151]/90 via-[#9CA3AF]/70 to-[#E5E7EB]/60
      backdrop-blur-md
      shadow-lg
      hover:shadow-[0_0_25px_rgba(156,163,175,0.8)]
      hover:scale-105
      transition-all duration-300
    "
            style={{
              fontFamily: "'Jameel Noori Nastaleeq', serif",
            }}
          >
            {/* ✨ Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 to-transparent opacity-0 hover:opacity-100 transition duration-500"></div>
            {/* 📄 Content */}
            <p className="relative text-base text-black font-bold tracking-wide">
               مضامین
            </p>
          </div>
        </Link>
        {/* 🧮 شرعیہ کیلکولیٹر */}
        <Link href="https://www.maslakedeoband.in/ozan-shariah-calculator">
          <div
            className="
      relative overflow-hidden
      h-10 flex items-center justify-center
      w-full
      cursor-pointer
      rounded-xl
      border border-gray-300/40
      bg-gradient-to-br from-[#374151]/90 via-[#9CA3AF]/70 to-[#E5E7EB]/60
      backdrop-blur-md
      shadow-lg
      hover:shadow-[0_0_25px_rgba(156,163,175,0.8)]
      hover:scale-105
      transition-all duration-300
    "
            style={{
              fontFamily: "'Jameel Noori Nastaleeq', serif",
            }}
          >
            {/* ✨ Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 to-transparent opacity-0 hover:opacity-100 transition duration-500"></div>
            {/* 🧮 Content */}
            <p
              className="relative text-sm md:text-base text-black font-bold"
              style={{ letterSpacing: "0.5px" }}
            >
               شرعیہ کیلکولیٹر
            </p>
          </div>
        </Link>
        {/* 📖 40 Hadith Free */}
        <Link href="https://www.maslakedeoband.in/40-hadith-free">
          <div
            className="
      relative overflow-hidden
      h-10 flex items-center justify-center
      w-full
      cursor-pointer
      rounded-xl
      border border-gray-300/40
      bg-gradient-to-br from-[#374151]/90 via-[#9CA3AF]/70 to-[#E5E7EB]/60
      backdrop-blur-md
      shadow-lg
      hover:shadow-[0_0_25px_rgba(156,163,175,0.8)]
      hover:scale-105
      transition-all duration-300
    "
            style={{
              fontFamily: "'Jameel Noori Nastaleeq', serif",
            }}
          >
            {/* ✨ Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 to-transparent opacity-0 hover:opacity-100 transition duration-500"></div>

            {/* 📖 Content */}
            <p className="relative text-base text-black font-bold tracking-wide">
              احادیث
            </p>
          </div>
        </Link>
      </div>



     

      {/* 🔥 Latest Questions Links */}
      {/* Tabs Section */}
<div className="mt-8 px-2">

  {/* Tabs Header */}
  <div className="flex w-full rounded-t-xl overflow-hidden shadow-lg">

    {/* New Questions */}
    <button
      onClick={() => setActiveTab("questions")}
      className={`w-1/2 py-4 text-2xl transition-all duration-300 ${
        activeTab === "questions"
          ? "bg-[#8b7355] text-white"
          : "bg-[#d9cfbf] text-[#7a5f3e]"
      }`}
      style={{
        fontFamily:
          "'Jameel Noori Nastaleeq', serif",
      }}
    >
      نئے سوالات
    </button>

    {/* Selected Articles */}
    <button
      onClick={() => setActiveTab("majameen")}
      className={`w-1/2 py-4 text-2xl transition-all duration-300 ${
        activeTab === "majameen"
          ? "bg-[#8b7355] text-white"
          : "bg-[#d9cfbf] text-[#7a5f3e]"
      }`}
      style={{
        fontFamily:
          "'Jameel Noori Nastaleeq', serif",
      }}
    >
      منتخب مضامین
    </button>

  </div>

  {/* Content Box */}
  <div className="bg-white/90 p-4 rounded-b-xl shadow-lg">

    {/* Questions */}
    {activeTab === "questions" && (
      <div className="space-y-3">

        {latestQuestions
          .slice(0, 5)
          .map((item) => (

            <Link
              key={item._id}
              href={`/questions/${item.slug}`}
              className="block text-lg text-green-800 hover:text-yellow-700 transition"
              style={{
                direction: "rtl",
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
              }}
            >
              ➜ {item.question}
            </Link>
          ))}

      </div>
    )}

    {/* Majameen */}
    {activeTab === "majameen" && (
      <div
        className="text-right text-xl text-green-800 space-y-3"
        style={{
          direction: "rtl",
          fontFamily:
            "'Jameel Noori Nastaleeq', serif",
        }}
      >

        <Link
          href="/majameen"
          className="block hover:text-yellow-700"
        >
          ➜ اسلامی معاشرہ
        </Link>

        <Link
          href="/majameen"
          className="block hover:text-yellow-700"
        >
          ➜ سیرت النبی ﷺ
        </Link>

        <Link
          href="/majameen"
          className="block hover:text-yellow-700"
        >
          ➜ اصلاحِ معاشرہ
        </Link>

        <Link
          href="/majameen"
          className="block hover:text-yellow-700"
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