"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const backend = "https://f-backend-vdi1.onrender.com/api";
const LIMIT = 10;

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function EnglishAskedQuestionsPage() {
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
        setError("Could not load questions.");
      }
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(0);
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-4">
      <Link
        href="/en"
        className="mb-3 inline-flex items-center gap-1 font-semibold text-[#315b7a] hover:text-[#b68a35]"
      >
        <ArrowLeft size={18} />
        Home
      </Link>

      <div className="mb-2 h-1 w-12 bg-[#b68a35]" />
      <h1 className="text-3xl font-bold text-[#102d45]">Questions from Readers</h1>
      <p className="mb-6 mt-1 text-gray-500">
        Questions sent by our readers. A badge shows once an answer has been given.
      </p>

      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <div className="border border-[#d5dfe7] bg-white py-10 text-center text-[#173b57]">
          No questions yet.
        </div>
      )}

      <div className="space-y-4">
        {items.map((q) => (
          <div
            key={q._id}
            className="relative border border-[#d5dfe7] bg-white p-4 shadow-sm"
          >
            <div
              className={`absolute bottom-0 left-0 top-0 w-1 ${
                q.status === "answered" ? "bg-[#102d45]" : "bg-[#b68a35]"
              }`}
            />

            <div className="mb-2 flex items-center justify-between pl-2">
              <span className="font-semibold text-[#315b7a]">{q.name}</span>
              <span className="text-xs text-gray-400">{formatDate(q.createdAt)}</span>
            </div>

            <p className="whitespace-pre-wrap pl-2 text-lg leading-8 text-[#1d3447]">
              {q.question}
            </p>

            <div className="mt-2 pl-2">
              {q.status === "answered" ? (
                <span className="bg-[#e3ebf2] px-2 py-1 text-sm font-semibold text-[#102d45]">
                  ✓ Answered
                </span>
              ) : (
                <span className="bg-[#fff6d6] px-2 py-1 text-sm font-semibold text-[#8a6d00]">
                  Awaiting answer
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="py-4 text-center text-gray-500">Loading...</p>}

      {hasMore && !loading && items.length > 0 && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => load(items.length)}
            className="bg-[#102d45] px-7 py-3 font-semibold text-white transition hover:bg-[#174261]"
            style={{ borderBottom: "3px solid #b68a35" }}
          >
            Load More Questions
          </button>
        </div>
      )}
    </div>
  );
}