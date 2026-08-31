
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Mic } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";

// =========================================
// BANGLA QUESTION
// =========================================
function getBanglaQuestion(item) {
  return (
    item.banglaQuestion ||
    item.bnQuestion ||
    item.questionBn ||
    ""
  );
}

export default function BanglaFatawaPage() {
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================================
  // FETCH QUESTIONS
  // =========================================
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `${backend}/admin/questions?limit=5000`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await res.json();

        if (data.success) {
          // শুধুমাত্র বাংলা প্রশ্ন
          const banglaQuestions = (data.data || []).filter(
            (item) => getBanglaQuestion(item)
          );

          setQuestions(banglaQuestions);
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error("Bangla Fatawa fetch error:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // =========================================
  // VOICE SEARCH
  // =========================================
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("ভয়েস সার্চ এই ব্রাউজারে সমর্থিত নয়।");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "bn-BD";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setQuery(text);
    };

    recognition.onerror = (event) => {
      console.error("Voice search error:", event.error);
    };

    recognition.start();
  };

  // =========================================
  // SEARCH
  // =========================================
  const searchText = query.trim().toLowerCase();

  const filteredQuestions = questions.filter((item) => {
    const question = getBanglaQuestion(item);

    return question.toLowerCase().includes(searchText);
  });

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <section className="relative overflow-hidden bg-[#3b2f2f] py-12 px-4">

        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-3xl md:text-5xl font-bold text-yellow-300">
            ইসলামী ফতোয়া
          </h1>

          <p className="mt-3 text-yellow-100 text-base md:text-lg">
            কুরআন ও সুন্নাহর আলোকে ইসলামী প্রশ্ন ও উত্তর
          </p>

        </div>

      </section>

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <section className="max-w-6xl mx-auto px-3 py-8 md:py-10">

        {/* ================================= */}
        {/* SEARCH */}
        {/* ================================= */}

        <div className="mb-8">

          <div className="flex items-center bg-white border border-yellow-600 rounded-2xl shadow-md overflow-hidden">

            {/* Search Icon */}

            <div className="px-3 shrink-0">

              <Search className="w-5 h-5 text-yellow-600" />

            </div>

            {/* Input */}

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ফতোয়া খুঁজুন..."
              aria-label="ফতোয়া খুঁজুন"
              className="
                w-full
                py-3
                outline-none
                text-gray-800
                bg-transparent
                text-base
              "
            />

            {/* Voice Search */}

            <button
              type="button"
              onClick={startListening}
              aria-label="ভয়েস সার্চ"
              className="
                px-4
                text-yellow-600
                hover:text-yellow-800
                transition
              "
            >
              <Mic className="w-5 h-5" />
            </button>

          </div>

        </div>

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl md:text-3xl font-bold text-[#4b3415]">
            ফতোয়া সমূহ
          </h2>

          {!loading && (
            <span className="text-sm text-gray-500">
              {filteredQuestions.length} টি ফলাফল
            </span>
          )}

        </div>

        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading && (

          <div className="space-y-3">

            {[1, 2, 3, 4, 5].map((item) => (

              <div
                key={item}
                className="
                  bg-white
                  border border-yellow-100
                  rounded-xl
                  p-5
                  shadow-sm
                  animate-pulse
                "
              >

                <div className="h-5 bg-gray-200 rounded w-4/5" />

                <div className="h-4 bg-gray-100 rounded w-1/4 mt-4" />

              </div>

            ))}

          </div>

        )}

        {/* ================================= */}
        {/* QUESTIONS */}
        {/* ================================= */}

        {!loading && filteredQuestions.length > 0 && (

          <div className="space-y-3">

            {filteredQuestions.map((item) => {

              const question = getBanglaQuestion(item);

              const slug =
                item.slug ||
                item._id;

              return (

                <Link
                  key={item._id}
                  href={`/bn/fatawa/${encodeURIComponent(slug)}`}
                  className="
                    block
                    bg-white
                    border border-yellow-200
                    rounded-xl
                    p-5
                    shadow-sm
                    hover:border-yellow-500
                    hover:shadow-md
                    hover:-translate-y-[1px]
                    transition
                  "
                >

                  <h3 className="
                    text-lg
                    md:text-xl
                    font-semibold
                    text-[#3b2f2f]
                    leading-8
                  ">
                    {question}
                  </h3>

                  <span className="
                    inline-block
                    mt-3
                    text-sm
                    text-yellow-700
                    font-semibold
                  ">
                    ফতোয়া পড়ুন →
                  </span>

                </Link>

              );
            })}

          </div>

        )}

        {/* ================================= */}
        {/* NO RESULT */}
        {/* ================================= */}

        {!loading && filteredQuestions.length === 0 && (

          <div className="
            bg-white
            border border-yellow-200
            rounded-2xl
            shadow-sm
            p-10
            text-center
          ">

            <div className="text-4xl mb-4">
              🔍
            </div>

            <h3 className="text-xl font-bold text-[#3b2f2f]">
              কোনো ফতোয়া পাওয়া যায়নি
            </h3>

            <p className="mt-2 text-gray-500">
              {query
                ? "অন্য কোনো শব্দ দিয়ে আবার অনুসন্ধান করুন।"
                : "এখনো কোনো বাংলা ফতোয়া পাওয়া যায়নি।"}
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

