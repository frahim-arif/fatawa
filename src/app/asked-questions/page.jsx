"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";
const font = "'Jameel Noori Nastaleeq', serif";
const LIMIT = 10;

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function AskedQuestionsPage() {
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
        setError("سوالات لوڈ نہیں ہوئے");
      }
    } catch {
      setError("سرور سے رابطہ نہیں ہو سکا");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(0);
  }, []);

  return (
    <div
      className="max-w-3xl mx-auto p-4"
      style={{ fontFamily: font, direction: "rtl" }}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-[#63B56A] hover:underline mb-3"
        style={{ fontSize: "18px" }}
      >
        <ArrowRight size={18} />
        ہوم
      </Link>

      <h1 className="text-[#333333] mb-1" style={{ fontSize: "32px", lineHeight: "50px" }}>
        لوگوں کے بھیجے ہوئے سوالات
      </h1>
      <p className="text-gray-500 mb-5" style={{ fontSize: "17px", lineHeight: "30px" }}>
        یہاں وہ سوالات ہیں جو قارئین نے بھیجے ہیں۔ جواب شائع ہونے پر نشان لگ جاتا ہے۔
      </p>

      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <div
          className="text-center bg-white border border-[#C6E2C8] py-8 text-[#333333]"
          style={{ fontSize: "20px" }}
        >
          ابھی کوئی سوال موجود نہیں۔
        </div>
      )}

      <div className="space-y-4">
        {items.map((q) => (
          <div
            key={q._id}
            className="relative bg-white border border-[#C6E2C8] shadow p-4"
          >
            <div
              className={`absolute right-0 top-0 bottom-0 w-1 ${
                q.status === "answered" ? "bg-[#75C178]" : "bg-[#D4AF37]"
              }`}
            />

            <div className="flex items-center justify-between pr-2 mb-2">
              <span className="text-[#3f8f46]" style={{ fontSize: "18px" }}>
                {q.name}
              </span>
              <span className="text-xs text-gray-400" style={{ direction: "ltr" }}>
                {formatDate(q.createdAt)}
              </span>
            </div>

            <p
              className="text-[#333333] pr-2 whitespace-pre-wrap"
              style={{ fontSize: "21px", lineHeight: "2.1" }}
            >
              {q.question}
            </p>

            <div className="pr-2 mt-2">
              {q.status === "answered" ? (
                <span
                  className="px-2 py-1 bg-[#EAF5EA] text-[#3f8f46]"
                  style={{ fontSize: "15px" }}
                >
                  ✓ جواب دیا جا چکا ہے
                </span>
              ) : (
                <span
                  className="px-2 py-1 bg-[#FFF6D6] text-[#8a6d00]"
                  style={{ fontSize: "15px" }}
                >
                  جواب کا انتظار ہے
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="text-center text-gray-500 py-4">لوڈ ہو رہا ہے...</p>}

      {hasMore && !loading && items.length > 0 && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => load(items.length)}
            className="px-7 py-2 bg-[#75C178] text-white hover:bg-[#63B56A] transition"
            style={{ fontSize: "20px" }}
          >
            مزید سوالات دیکھیں
          </button>
        </div>
      )}
    </div>
  );
}