"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";
const font = "var(--font-bengali), 'Noto Sans Bengali', sans-serif";
const LIMIT = 10;

const formatDate = (d) =>
  new Date(d).toLocaleDateString("bn-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function BanglaAskedQuestionsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const load = async (skip = 0) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${backend}/ask-question/public?skip=${skip}&limit=${LIMIT}`,
        { cache: "no-store" }
      );
      const data = await res.json();

      if (data.success) {
        const rows = data.data || [];
        setItems((prev) => (skip === 0 ? rows : [...prev, ...rows]));
        setHasMore(rows.length === LIMIT);
      } else {
        setError("প্রশ্ন লোড করা যায়নি।");
      }
    } catch {
      setError("সার্ভারের সাথে সংযোগ করা যায়নি, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(0);
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-4" style={{ fontFamily: font }}>
      <Link
        href="/bn"
        className="mb-3 inline-flex items-center gap-1 font-semibold text-[#174d40] hover:text-[#806b3f]"
      >
        <ArrowLeft size={18} />
        হোম
      </Link>

      <div className="mb-2 h-1 w-12 bg-[#c8ae6a]" />
      <h1 className="text-3xl font-bold leading-[3rem] text-[#174d40]">পাঠকদের প্রশ্ন</h1>
      <p className="mb-6 mt-1 leading-8 text-gray-500">
        পাঠকদের পাঠানো প্রশ্ন। উত্তর দেওয়া হলে ব্যাজ দেখানো হয়।
      </p>

      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <div className="border border-[#c8ae6a] bg-[#fffaf0] py-10 text-center text-[#174d40]">
          এখনো কোনো প্রশ্ন নেই।
        </div>
      )}

      <div className="space-y-4">
        {items.map((q) => (
          <div
            key={q._id}
            className="relative border border-[#c8ae6a] bg-[#fffaf0] p-4 shadow-sm"
          >
            <div
              className={`absolute bottom-0 left-0 top-0 w-1 ${
                q.status === "answered" ? "bg-[#174d40]" : "bg-[#c8ae6a]"
              }`}
            />

            <div className="mb-2 flex items-center justify-between pl-2">
              <span className="font-semibold text-[#174d40]">{q.name}</span>
              <span className="text-xs text-gray-400">{formatDate(q.createdAt)}</span>
            </div>

            <p className="whitespace-pre-wrap pl-2 text-lg leading-9 text-[#1d332f]">
              {q.question}
            </p>

            <div className="mt-2 pl-2">
              {q.status === "answered" ? (
                <span className="bg-[#e6efe9] px-2 py-1 text-sm font-semibold text-[#174d40]">
                  ✓ উত্তর দেওয়া হয়েছে
                </span>
              ) : (
                <span className="bg-[#fff6d6] px-2 py-1 text-sm font-semibold text-[#8a6d00]">
                  উত্তরের অপেক্ষায়
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="py-4 text-center text-gray-500">লোড হচ্ছে...</p>}

      {hasMore && !loading && items.length > 0 && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => load(items.length)}
            className="bg-[#174d40] px-7 py-3 font-semibold text-[#f5e6bd] transition hover:bg-[#216353]"
            style={{ borderBottom: "3px solid #c8ae6a" }}
          >
            আরও প্রশ্ন দেখুন
          </button>
        </div>
      )}
    </div>
  );
}