
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Mic } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";

export default function BanglaFatawaPage() {
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================================
  // FETCH BANGLA QUESTIONS
  // =========================================
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${backend}/bn/questions?limit=5000`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch Bangla questions");
        }

        const data = await res.json();

        console.log("Bangla questions response:", data);

        if (data.success) {
          setQuestions(data.data || []);
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error(
          "Bangla Fatawa fetch error:",
          error
        );

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
      alert(
        "ভয়েস সার্চ এই ব্রাউজারে সমর্থিত নয়।"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "bn-BD";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text =
        event.results[0][0].transcript;

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

  // =========================================
  // SEARCH
  // =========================================
  const searchText =
    query.trim().toLowerCase();

  const filteredQuestions =
    questions.filter((item) => {
      const question =
        item.question || "";

      return question
        .toLowerCase()
        .includes(searchText);
    });

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <section className="relative overflow-hidden bg-[#3b2f2f] px-4 py-12">

        <div className="mx-auto max-w-6xl text-center">

          <h1 className="text-3xl font-bold text-yellow-300 md:text-5xl">
            ইসলামী ফতোয়া
          </h1>

          <p className="mt-3 text-base text-yellow-100 md:text-lg">
            কুরআন ও সুন্নাহর আলোকে ইসলামী প্রশ্ন ও উত্তর
          </p>

        </div>

      </section>

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <section className="mx-auto max-w-6xl px-3 py-8 md:py-10">

        {/* ================================= */}
        {/* SEARCH */}
        {/* ================================= */}

        <div className="mb-8">

          <div className="flex items-center overflow-hidden rounded-2xl border border-yellow-600 bg-white shadow-md">

            {/* Search Icon */}

            <div className="shrink-0 px-3">

              <Search className="h-5 w-5 text-yellow-600" />

            </div>

            {/* Input */}

            <input
              type="text"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="ফতোয়া খুঁজুন..."
              aria-label="ফতোয়া খুঁজুন"
              className="
                w-full
                bg-transparent
                py-3
                text-base
                text-gray-800
                outline-none
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
                transition
                hover:text-yellow-800
              "
            >
              <Mic className="h-5 w-5" />
            </button>

          </div>

        </div>

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-[#4b3415] md:text-3xl">
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

            {[1, 2, 3, 4, 5].map(
              (item) => (
                <div
                  key={item}
                  className="
                    animate-pulse
                    rounded-xl
                    border
                    border-yellow-100
                    bg-white
                    p-5
                    shadow-sm
                  "
                >

                  <div className="h-5 w-4/5 rounded bg-gray-200" />

                  <div className="mt-4 h-4 w-1/4 rounded bg-gray-100" />

                </div>
              )
            )}

          </div>
        )}

        {/* ================================= */}
        {/* QUESTIONS */}
        {/* ================================= */}

        {!loading &&
          filteredQuestions.length > 0 && (

            <div className="space-y-3">

              {filteredQuestions.map(
                (item) => {

                  const question =
                    item.question || "";

                  const slug =
                    item.slug || item._id;

                  return (
                    <Link
                      key={item._id}
                      href={`/bn/fatawa/${encodeURIComponent(
                        slug
                      )}`}
                      className="
                        block
                        rounded-xl
                        border
                        border-yellow-200
                        bg-white
                        p-5
                        shadow-sm
                        transition
                        hover:-translate-y-[1px]
                        hover:border-yellow-500
                        hover:shadow-md
                      "
                    >

                      <h3
                        className="
                          text-lg
                          font-semibold
                          leading-8
                          text-[#3b2f2f]
                          md:text-xl
                        "
                      >
                        {question}
                      </h3>

                      <span
                        className="
                          mt-3
                          inline-block
                          text-sm
                          font-semibold
                          text-yellow-700
                        "
                      >
                        ফতোয়া পড়ুন →
                      </span>

                    </Link>
                  );
                }
              )}

            </div>
          )}

        {/* ================================= */}
        {/* NO RESULT */}
        {/* ================================= */}

        {!loading &&
          filteredQuestions.length === 0 && (

            <div
              className="
                rounded-2xl
                border
                border-yellow-200
                bg-white
                p-10
                text-center
                shadow-sm
              "
            >

              <div className="mb-4 text-4xl">
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

