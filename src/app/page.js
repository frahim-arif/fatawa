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
  // Fetch questions
  const fetchQuestions = async (reset = false) => {
    try {
      let url =
        selectedCategory === ""
          ? `${backend}/admin/questions?skip=${reset ? 0 : skip}&limit=5`
          : `${backend}/admin/questions/category/${encodeURIComponent(
            selectedCategory
          )}?skip=${reset ? 0 : skip}&limit=5`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        const sorted = data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        if (reset) {
          setAllQuestions(sorted);
          setSkip(5);
        } else {
          setAllQuestions((prev) => [...prev, ...sorted]);
          setSkip((prev) => prev + 5);
        }

        setHasMore(sorted.length === 5);
      }
    } catch (err) {
      console.error("❌ Error fetching questions:", err);
    }
  };

  useEffect(() => {
    setSkip(0);
    fetchQuestions(true);
  }, [selectedCategory]);

  const filteredQuestions = allQuestions.filter((q) =>
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
    <div className="relative space-y-10 w-full px-0 overflow-hidden min-h-screen" style={{ backgroundColor: "#ddeee9" }}>
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
      <div className="w-full relative z-10">

        {/* Durūd Sharīf */}
        <div
          className="w-full overflow-hidden"
          style={{
            background: "linear-gradient(to right, #0f5132, #198754, #0f5132)",
            borderBottom: "1px solid #d4af37",
            borderTop: "1px solid #d4af37",
          }}
        >
          <motion.div
            className="whitespace-nowrap text-yellow-100 arabic fixed top-16 w-full z-50"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            اَللّٰهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ، وَعَلَىٰ آلِ سَيِّدِنَا مُحَمَّدٍ، وَبَارِكْ وَسَلِّمْ
            —
            ﴿ إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا ﴾
          </motion.div>
        </div>

        {/* Namaz Timings */}
        <div
          className="w-full overflow-hidden px-0"
          style={{ background: "#0b3d24", borderBottom: "2px solid #d4af37" }}
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

        {/* All Categories */}
        <div
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
    ${selectedCategory === ""
              ? "bg-gradient-to-br from-yellow-400 to-yellow-200 border-yellow-500 shadow-[0_0_30px_rgba(255,223,0,0.9)] text-white"
              : "bg-white/30 border-gray-300 text-black hover:bg-gradient-to-br hover:from-yellow-100 hover:to-yellow-50 hover:text-yellow-800 hover:shadow-[0_0_25px_rgba(255,223,0,0.5)]"
            }
  `}
          style={{ fontFamily: "'Jameel Noori Nastaleeq', serif", backdropFilter: "blur(12px)" }}
        >
          تمام کیٹیگریز
        </div>

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
    hover:scale-105
    ${selectedCategory === cat.name
                ? "bg-white border-yellow-500 text-black shadow-[0_0_20px_rgba(255,223,0,0.6)]"
                : "bg-white border-gray-300 text-black hover:bg-gray-100"
              }
  `}
          >
            {cat.name}
          </div>
        ))}


      </div>

    


<div className="grid grid-cols-2 gap-2 px-2 mt-4">

  {/* 📿 مسنون دعائیں */}
  <Link href="/masnoon-duayee">
    <div
      className="
        h-10 flex items-center justify-center
        cursor-pointer
        border border-yellow-400
        shadow-sm
        hover:shadow-[0_0_10px_rgba(255,223,0,0.6)]
        transition-all duration-300
      "
      style={{
        background: "linear-gradient(135deg, #0f5132, #198754)",
        fontFamily: "'Jameel Noori Nastaleeq', serif",
      }}
    >
      <p className="text-sm text-yellow-200 font-bold">
        📿 مسنون دعائیں
      </p>
    </div>
  </Link>

  {/* 👶 اسلامی نام */}
  <Link href="/islami-naam">
    <div
      className="
        h-10 flex items-center justify-center
        cursor-pointer
        border border-yellow-400
        shadow-sm
        hover:shadow-[0_0_10px_rgba(255,223,0,0.6)]
        transition-all duration-300
      "
      style={{
        background: "linear-gradient(135deg, #664d03, #ffc107)",
        fontFamily: "'Jameel Noori Nastaleeq', serif",
      }}
    >
      <p className="text-sm text-black font-bold">
        👶 اسلامی نام
      </p>
    </div>
  </Link>
  <Link href="/books">
  <div
    className="
      relative overflow-hidden
      h-12 flex items-center justify-center
      cursor-pointer
      rounded-xl
      border border-yellow-400/50
      bg-gradient-to-br from-blue-900/80 to-blue-600/70
      backdrop-blur-md
      shadow-lg
      hover:shadow-[0_0_25px_rgba(59,130,246,0.8)]
      hover:scale-105
      transition-all duration-300
    "
    style={{
      fontFamily: "'Jameel Noori Nastaleeq', serif",
    }}
  >
    {/* ✨ Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent opacity-0 hover:opacity-100 transition duration-500"></div>

    {/* 📚 Content */}
    <p className="relative text-base text-white font-bold tracking-wide">
      📚 اسلامی کتابیں
    </p>
  </div>
</Link>
<Link href="/majameen">
  <div
    className="
      relative overflow-hidden
      h-12 flex items-center justify-center
      cursor-pointer
      rounded-xl
      border border-yellow-400/50
      bg-gradient-to-br from-green-900/80 to-green-600/70
      backdrop-blur-md
      shadow-lg
      hover:shadow-[0_0_25px_rgba(34,197,94,0.8)]
      hover:scale-105
      transition-all duration-300
    "
    style={{
      fontFamily: "'Jameel Noori Nastaleeq', serif",
    }}
  >
    {/* ✨ Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent opacity-0 hover:opacity-100 transition duration-500"></div>

    {/* 📄 Content */}
    <p className="relative text-base text-white font-bold tracking-wide">
      📄 مضامین
    </p>
  </div>
</Link>

</div>
      {/* Questions List */}
      <section ref={questionsRef} className="space-y-4 px-0 z-10 relative">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div
              key={q._id}
              onClick={() => setSelectedQuestion(q)}
              className="p-5 rounded-xl border bg-yellow-50 border-yellow-300 shadow-md w-full cursor-pointer hover:bg-yellow-100 transition hover:shadow-[0_0_20px_rgba(255,223,0,0.6)]"
              style={{
                direction: "rtl",
                fontFamily: "'Jameel Noori Nastaleeq', serif",
                lineHeight: "2.2",
                textAlign: "right",
              }}
            >
              <h3 className="font-bold text-xl text-green-800">{q.question}</h3>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg font-medium">
            کوئی سوال دستیاب نہیں۔
          </p>
        )}

        {hasMore && filteredQuestions.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={() => fetchQuestions()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              مزید سوالات دیکھیں
            </button>
          </div>
        )}
      </section>

      <div className="hidden">
        {filteredQuestions.map((q) => (
          <a key={q._id} href={`/questions/${q.slug}`}>
            {q.question}
          </a>
        ))}
      </div>
      {/* Modal */}
      <AnimatePresence>
        {selectedQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50 overflow-auto"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-white rounded-xl p-6 max-w-3xl w-full shadow-lg"
              style={{ direction: "rtl" }}
            >
              <div className="flex justify-between items-start mb-4">
                <h2
                  className="text-2xl font-bold text-green-800"
                  style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
                >
                  {selectedQuestion.question}
                </h2>
                <button onClick={() => setSelectedQuestion(null)}>
                  <X className="w-6 h-6 text-red-500" />
                </button>
              </div>

              <div
                className="mb-4"
                style={{
                  fontFamily: "'Jameel Noori Nastaleeq', serif",
                  lineHeight: "2.2",
                  color: "#000000",
                }}
              >
                {selectedQuestion.answer}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                {selectedQuestion.hawala1 && (
                  <p className="answer-card arabic p-2 rounded border">
                    📖 {selectedQuestion.hawala1}
                  </p>
                )}
                {selectedQuestion.hawala2 && (
                  <p className="answer-card arabic p-2 rounded border">
                    📖 {selectedQuestion.hawala2}
                  </p>
                )}
                {selectedQuestion.hawala3 && (
                  <p className="answer-card arabic p-2 rounded border">
                    📖 {selectedQuestion.hawala3}
                  </p>
                )}
              </div>
              

  
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
  );
}