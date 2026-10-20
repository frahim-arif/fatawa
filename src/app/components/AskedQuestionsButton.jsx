
"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";

export default function AskedQuestionsButton() {
  return (
    <div
      className="w-11/12 md:w-full mx-auto relative z-10"
      style={{ marginTop: "36px", marginBottom: "-20px" }}
    >
      <style>{`
        .asked-btn,
        .asked-btn * {
          font-family: ${font} !important;
          box-sizing: border-box;
        }

        .asked-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          direction: rtl;
          text-align: right;
          padding: 15px 16px;
          overflow: hidden;
          background: linear-gradient(
            115deg,
            #4B1522 0%,
            #651E2D 52%,
            #842D40 100%
          );
          color: #FAF6ED;
          border: 1px solid #D5B779;
          border-top: 3px solid #D5B779;
          box-shadow: 0 7px 22px rgba(75, 21, 34, 0.15);
          text-decoration: none;
          transition:
            transform .28s ease,
            box-shadow .28s ease,
            border-color .28s ease;
          isolation: isolate;
        }

        .asked-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255,255,255,.10) 48%,
            transparent 75%
          );
          transform: translateX(100%);
          transition: transform .65s ease;
          pointer-events: none;
        }

        .asked-btn:hover {
          border-color: #F0D9A0;
          box-shadow: 0 11px 28px rgba(75, 21, 34, 0.24);
          transform: translateY(-2px);
        }

        .asked-btn:hover::before {
          transform: translateX(-100%);
        }

        .asked-btn:active {
          transform: scale(.99);
        }

        .asked-btn:focus-visible {
          outline: 3px solid #D5B779;
          outline-offset: 4px;
        }

        .asked-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          color: #F0D9A0;
          background: rgba(213,183,121,.12);
          border: 1px solid rgba(213,183,121,.75);
          transition: background .3s ease, transform .3s ease;
        }

        .asked-btn:hover .asked-icon {
          background: rgba(213,183,121,.22);
          transform: scale(1.04);
        }

        .asked-title {
          font-size: 23px;
          line-height: 1.8;
          color: #FFF9EB;
        }

        .asked-description {
          margin-top: 1px;
          font-size: 15px;
          line-height: 1.9;
          color: #E8D9D2;
        }

        .asked-arrow {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          color: #F0D9A0;
          border: 1px solid rgba(213,183,121,.55);
          background: rgba(255,255,255,.04);
          transition: transform .3s ease, background .3s ease;
        }

        .asked-btn:hover .asked-arrow {
          transform: translateX(-3px);
          background: rgba(213,183,121,.12);
        }

        @media (max-width: 480px) {
          .asked-btn {
            gap: 10px;
            padding: 12px 10px;
          }

          .asked-icon {
            width: 42px;
            height: 42px;
          }

          .asked-title {
            font-size: 19px;
            line-height: 1.9;
          }

          .asked-description {
            font-size: 13px;
            line-height: 1.9;
          }

          .asked-arrow {
            width: 30px;
            height: 30px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .asked-btn,
          .asked-btn *,
          .asked-btn::before {
            transition: none !important;
          }
        }
      `}</style>

      <Link
        href="/asked-questions"
        className="asked-btn"
        aria-label="لوگوں کے بھیجے ہوئے سوالات دیکھیں"
      >
        {/* Icon */}
        <span className="asked-icon" aria-hidden="true">
          <Users size={25} strokeWidth={1.7} />
        </span>

        {/* Urdu text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="asked-title">
            لوگوں کے بھیجے ہوئے سوالات
          </div>

          <div className="asked-description">
            دوسروں کے سوالات دیکھیں اور جوابات پڑھیں
          </div>
        </div>

        {/* Arrow */}
        <span className="asked-arrow" aria-hidden="true">
          <ArrowLeft size={19} strokeWidth={1.8} />
        </span>
      </Link>
    </div>
  );
}
