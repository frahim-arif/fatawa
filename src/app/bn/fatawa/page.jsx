"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function BanglaFatawaPage() {
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const backend = "https://f-backend-vdi1.onrender.com/api";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `${backend}/admin/questions?limit=5000`
        );

        const data = await res.json();

        if (data.success) {
          setQuestions(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const getQuestion = (item) => {
    return (
      item.banglaQuestion ||
      item.bnQuestion ||
      item.questionBn ||
      item.question
    );
  };

  const filteredQuestions = questions.filter((item) =>
    getQuestion(item)
      ?.toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      <section className="bg-[#3b2f2f] py-10 px-4 text-center">

        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300">
          ইসলামী ফতোয়া
        </h1>

        <p className="mt-2 text-yellow-100">
          ইসলামী প্রশ্ন ও উত্তর
        </p>

      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* SEARCH */}
        <div className="flex items-center bg-white border border-yellow-500 rounded-xl mb-6">

          <Search className="ml-3 text-yellow-600" />

          <input
            type="text"
            placeholder="ফতোয়া খুঁজুন..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 outline-none"
          />

        </div>

        {loading ? (

          <p className="text-center">
            লোড হচ্ছে...
          </p>

        ) : (

          <div className="space-y-3">

            {filteredQuestions.map((item) => (

              <Link
                key={item._id}
                href={`/bn/fatawa/${item.slug}`}
                className="
                  block
                  bg-white
                  border border-yellow-200
                  rounded-xl
                  p-5
                  shadow-sm
                  hover:border-yellow-500
                  hover:shadow-md
                  transition
                "
              >
                <h2 className="text-lg font-semibold text-[#3b2f2f]">

                  {getQuestion(item)}

                </h2>

              </Link>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}