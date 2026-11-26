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
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          overflow: hidden;
          direction: rtl;
          text-align: right;
          padding: 10px 14px;
          border-radius: 16px;
          background: linear-gradient(135deg, #FFFFFF 0%, #F3FAF3 100%);
          color: #1F2D1F;
          border: 1px solid #D6EBD8;
          box-shadow:
            0 10px 28px -10px rgba(40, 122, 53, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease;
        }

        /* سنہری اوپری پٹی */
        .asked-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #B8901F, #F5D76E, #D4AF37, #F5D76E, #B8901F);
        }

        /* ہلکی چمک */
        .asked-btn .asked-shine {
          position: absolute;
          top: 0;
          left: -40%;
          width: 25%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(117,193,120,0.18), transparent);
          transform: skewX(-20deg);
          pointer-events: none;
          animation: askedShine 4s ease-in-out infinite;
        }

        @keyframes askedShine {
          0%   { left: -40%; }
          60%  { left: 140%; }
          100% { left: 140%; }
        }

        .asked-btn:hover {
          transform: translateY(-2px);
          border-color: #75C178;
          background: linear-gradient(135deg, #F5FAF5 0%, #E8F5E9 100%);
          box-shadow:
            0 14px 32px -10px rgba(40, 122, 53, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .asked-btn:active { transform: scale(0.98); }

        .asked-btn .asked-arrow {
          transition: transform .25s ease, background .25s ease, color .25s ease;
        }

        .asked-btn:hover .asked-arrow {
          transform: translateX(-4px);
          background: #287A35;
          color: #ffffff;
        }
      `}</style>

      <Link href="/asked-questions" className="asked-btn">
        <span className="asked-shine" />

        {/* Icon */}
        <span
          style={{
            position: "relative",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: "9999px",
            padding: 3,
            background: "linear-gradient(135deg, #FFF3B0, #D4AF37 50%, #B8901F)",
            boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #3A9448, #287A35)",
              color: "#ffffff",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,0.3)",
            }}
          >
            <Users size={22} strokeWidth={2.2} />
          </span>
        </span>

        {/* Text */}
        <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "22px",
              lineHeight: "36px",
              color: "#287A35",
            }}
          >
            لوگوں کے سوالات
          </div>
          <div
            style={{
              fontSize: "15px",
              lineHeight: "24px",
              color: "#6b7280",
            }}
          >
            دوسروں کے سوالات دیکھیں اور جوابات پڑھیں
          </div>
        </div>

        {/* Arrow */}
        <span
          className="asked-arrow"
          style={{
            position: "relative",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "9999px",
            background: "#EAF5EA",
            border: "1px solid #C6E2C8",
            color: "#287A35",
          }}
        >
          <ArrowLeft size={20} />
        </span>
      </Link>
    </div>
  );
}