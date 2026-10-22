"use client";

import React from "react";
import { ArrowRight, PenLine } from "lucide-react";

const font = "var(--font-bengali), 'Noto Sans Bengali', sans-serif";

export default function AskButtonBn({ onClick }) {
  return (
    <>
      <style>{`
        .askb-btn, .askb-btn * { font-family: ${font}; }
        .askb-btn {
          position: relative;
          display: block;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          text-align: left;
          color: #f5e6bd;
          background: #174d40;
          border: 1px solid #174d40;
          border-top: 3px solid #c8ae6a;
          box-shadow: 0 8px 24px rgba(7, 28, 25, 0.35);
          transition: background .25s ease, transform .25s ease, box-shadow .25s ease;
        }
        .askb-btn:hover {
          background: #216353;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(7, 28, 25, 0.5);
        }
        .askb-btn:active { transform: scale(0.98); }

        .askb-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cpath d='M22 2 L27 15 L40 10 L33 22 L40 34 L27 29 L22 42 L17 29 L4 34 L11 22 L4 10 L17 15 Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E");
        }
        .askb-shine {
          position: absolute;
          top: 0;
          left: -40%;
          width: 28%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          transform: skewX(-20deg);
          pointer-events: none;
          animation: askbShine 3.5s ease-in-out infinite;
        }
        @keyframes askbShine {
          0%   { left: -40%; }
          60%  { left: 140%; }
          100% { left: 140%; }
        }
        .askb-pulse {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgba(200, 174, 106, 0.55);
          animation: askbPulse 1.8s ease-out infinite;
        }
        @keyframes askbPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .askb-arrow { animation: askbArrow 1.4s ease-in-out infinite; }
        @keyframes askbArrow {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(6px); }
        }
      `}</style>

      <button type="button" onClick={onClick} className="askb-btn">
        <span className="askb-pattern" />
        <span className="askb-shine" />

        <div className="relative z-[1] flex items-center gap-3.5 px-4 py-3">
          <div className="relative shrink-0">
            <span className="askb-pulse" />
            <span
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#174d40]"
              style={{ border: "2px solid #c8ae6a" }}
            >
              <PenLine size={22} />
            </span>
          </div>

          <div className="flex-1">
            <div className="text-lg font-bold leading-8 md:text-xl">
              আপনার প্রশ্ন পাঠান
            </div>
            <div className="text-sm leading-6 text-[#d8c27d]">
              আলেমদের কাছে জিজ্ঞাসা করুন
            </div>
          </div>

          <span className="askb-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
            <ArrowRight size={18} />
          </span>
        </div>
      </button>
    </>
  );
}