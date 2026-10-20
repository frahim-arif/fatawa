
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, RefreshCw } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";
const font = "'Jameel Noori Nastaleeq', serif";
const LIMIT = 10;

const formatDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function AskedQuestionsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (skip = 0) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${backend}/ask-question/public?skip=${skip}&limit=${LIMIT}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error("سوالات لوڈ نہیں ہو سکے");
      }

      const result = await res.json();

      if (!result.success || !Array.isArray(result.data)) {
        throw new Error("سوالات لوڈ نہیں ہو سکے");
      }

      const rows = result.data;

      setItems((prev) => (skip === 0 ? rows : [...prev, ...rows]));
      setHasMore(rows.length === LIMIT);
    } catch (err) {
      setError(err.message || "سرور سے رابطہ نہیں ہو سکا");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(0);
  }, [load]);

  return (
    <main
      className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-8"
      style={{ fontFamily: font, direction: "rtl" }}
    >
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-2 text-[#3f8f46] hover:underline"
        style={{ fontSize: "18px" }}
      >
        <ArrowRight size={18} />
        ہوم
      </Link>

      <header className="mb-6 border-b border-[#C6E2C8] pb-4">
        <div className="mb-2 flex items-center gap-2 text-[#3f8f46]">
          <MessageCircle size={23} />
          <span style={{ fontSize: "17px" }}>قارئین کے سوالات</span>
        </div>

        <h1
          className="mb-2 text-[#333333]"
          style={{ fontSize: "32px", lineHeight: "1.8" }}
        >
          لوگوں کے بھیجے ہوئے سوالات
        </h1>

        <p
          className="text-gray-500"
          style={{ fontSize: "17px", lineHeight: "2" }}
        >
          یہاں وہ سوالات ہیں جنہیں قارئین کی اجازت اور انتظامی منظوری کے بعد
          شائع کیا گیا ہے۔ جواب دیے جانے کی کیفیت بھی یہاں دیکھی جا سکتی ہے۔
        </p>
      </header>

      {error && (
        <div
          className="mb-5 border border-red-200 bg-red-50 p-4 text-center text-red-700"
          style={{ fontSize: "18px" }}
          role="alert"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => load(0)}
            className="mt-3 inline-flex items-center gap-2 border border-red-300 px-4 py-2 hover:bg-red-100"
          >
            <RefreshCw size={16} />
            دوبارہ کوشش کریں
          </button>
        </div>
      )}

      {loading && items.length === 0 && (
        <div
          className="border border-[#C6E2C8] bg-white py-10 text-center text-gray-500"
          style={{ fontSize: "19px" }}
          aria-live="polite"
        >
          سوالات لوڈ ہو رہے ہیں...
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div
          className="border border-[#C6E2C8] bg-white px-4 py-10 text-center text-[#333333]"
        >
          <MessageCircle
            size={34}
            className="mx-auto mb-3 text-[#75C178]"
          />
          <h2 style={{ fontSize: "23px", lineHeight: "1.8" }}>
            ابھی کوئی سوال موجود نہیں۔
          </h2>
          <p
            className="mt-1 text-gray-500"
            style={{ fontSize: "17px", lineHeight: "1.9" }}
          >
            نئے شائع شدہ سوالات یہاں دکھائی دیں گے۔
          </p>
          <button
            type="button"
            onClick={() => load(0)}
            className="mt-4 inline-flex items-center gap-2 bg-[#75C178] px-5 py-2 text-white transition hover:bg-[#3f8f46]"
            style={{ fontSize: "18px" }}
          >
            <RefreshCw size={16} />
            دوبارہ دیکھیں
          </button>
        </div>
      )}

      <div className="space-y-4">
        {items.map((q) => (
          <article
            key={q._id}
            className="relative overflow-hidden border border-[#C6E2C8] bg-white p-4 shadow-sm sm:p-5"
          >
            <div
              className={`absolute right-0 top-0 bottom-0 w-1 ${
                q.status === "answered"
                  ? "bg-[#75C178]"
                  : "bg-[#D4AF37]"
              }`}
            />

            <div className="mb-3 flex items-center justify-between gap-3 pr-2">
              <span
                className="text-[#3f8f46]"
                style={{ fontSize: "18px" }}
              >
                {q.name || "قارئ"}
              </span>

              <time
                dateTime={q.createdAt || undefined}
                className="shrink-0 text-xs text-gray-400"
                style={{ direction: "ltr" }}
              >
                {formatDate(q.createdAt)}
              </time>
            </div>

            <p
              className="whitespace-pre-wrap break-words pr-2 text-[#333333]"
              style={{ fontSize: "21px", lineHeight: "2.1" }}
            >
              {q.question}
            </p>

            <div className="mt-4 pr-2">
              {q.status === "answered" ? (
                <span
                  className="inline-block bg-[#EAF5EA] px-3 py-1 text-[#3f8f46]"
                  style={{ fontSize: "15px" }}
                >
                  ✓ جواب دیا جا چکا ہے
                </span>
              ) : (
                <span
                  className="inline-block bg-[#FFF6D6] px-3 py-1 text-[#8a6d00]"
                  style={{ fontSize: "15px" }}
                >
                  جواب کا انتظار ہے
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      {loading && items.length > 0 && (
        <p
          className="py-4 text-center text-gray-500"
          style={{ fontSize: "17px" }}
          aria-live="polite"
        >
          مزید سوالات لوڈ ہو رہے ہیں...
        </p>
      )}

      {hasMore && !loading && !error && items.length > 0 && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => load(items.length)}
            className="bg-[#75C178] px-7 py-2 text-white transition hover:bg-[#3f8f46]"
            style={{ fontSize: "20px" }}
          >
            مزید سوالات دیکھیں
          </button>
        </div>
      )}
    </main>
  );
}
