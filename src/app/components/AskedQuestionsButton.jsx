"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";

export default function AskedQuestionsButton() {
  return (
    <div
      className="w-11/12 md:w-full mx-auto relative z-10"
      style={{ marginTop: "36px", marginBottom: "24px" }}
    >
      <style>{`
        .asked-btn,
        .asked-btn * { font-family: ${font} !important; }

        .asked-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          direction: rtl;
          text-align: right;
          padding: 12px 16px;
          background: #ffffff;
          color: #333333;
          border: 1px solid #C6E2C8;
          border-top: 3px solid #D4AF37;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transition: background .25s ease, border-color .25s ease, transform .25s ease;
        }
        .asked-btn:hover {
          background: #F5FAF5;
          border-color: #75C178;
          transform: translateY(-2px);
        }
        .asked-btn:active { transform: scale(0.98); }
      `}</style>

      <Link href="/asked-questions" className="asked-btn">
        <span
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: "9999px",
            background: "#EAF5EA",
            border: "2px solid #75C178",
            color: "#63B56A",
          }}
        >
          <Users size={24} />
        </span>

        <div style={{ flex: 1 }}>
          
          <div style={{ fontSize: "16px", lineHeight: "28px", color: "#6b7280" }}>
            دوسروں کے سوالات دیکھیں اور جوابات پڑھیں
          </div>
        </div>

        <span
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "9999px",
            background: "#EAF5EA",
            color: "#63B56A",
          }}
        >
          <ArrowLeft size={20} />
        </span>
      </Link>
    </div>
  );
}