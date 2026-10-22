"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

export default function AskedQuestionsButtonEn() {
  return (
    <>
      <style>{`
        .askedn-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          height: 100%;
          padding: 12px 16px;
          background: #ffffff;
          color: #173b57;
          border: 1px solid #d5dfe7;
          border-top: 3px solid #b68a35;
          box-shadow: 0 8px 24px rgba(16, 45, 69, 0.08);
          transition: background .25s ease, border-color .25s ease, transform .25s ease;
        }
        .askedn-btn:hover {
          background: #f6f9fb;
          border-color: #b68a35;
          transform: translateY(-2px);
        }
        .askedn-btn:active { transform: scale(0.98); }
      `}</style>

      <Link href="/en/asked-questions" className="askedn-btn">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef3f8] text-[#315b7a]"
          style={{ border: "2px solid #b68a35" }}
        >
          <Users size={22} />
        </span>

        <div className="flex-1">
          <div className="text-lg font-bold leading-7 md:text-xl">
            Questions from Readers
          </div>
          <div className="text-sm leading-5 text-gray-500">
            See what others have asked
          </div>
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef3f8] text-[#315b7a]">
          <ArrowRight size={18} />
        </span>
      </Link>
    </>
  );
}