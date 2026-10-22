"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

const font = "var(--font-bengali), 'Noto Sans Bengali', sans-serif";

export default function AskedQuestionsButtonBn() {
  return (
    <>
      <style>{`
        .askedb-btn, .askedb-btn * { font-family: ${font}; }
        .askedb-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          height: 100%;
          padding: 12px 16px;
          background: #fffaf0;
          color: #174d40;
          border: 1px solid #c8ae6a;
          border-top: 3px solid #806b3f;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          transition: background .25s ease, transform .25s ease;
        }
        .askedb-btn:hover {
          background: #fffdf7;
          transform: translateY(-2px);
        }
        .askedb-btn:active { transform: scale(0.98); }
      `}</style>

      <Link href="/bn/asked-questions" className="askedb-btn">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f8f1df] text-[#174d40]"
          style={{ border: "2px solid #c8ae6a" }}
        >
          <Users size={22} />
        </span>

        <div className="flex-1">
          <div className="text-lg font-bold leading-8 md:text-xl">
            পাঠকদের প্রশ্ন
          </div>
          <div className="text-sm leading-6 text-[#6b5a35]">
            অন্যরা কী জানতে চেয়েছেন দেখুন
          </div>
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f8f1df] text-[#174d40]">
          <ArrowRight size={18} />
        </span>
      </Link>
    </>
  );
}