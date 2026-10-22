"use client";

import React from "react";
import { ArrowRight, PenLine } from "lucide-react";

export default function AskButtonEn({ onClick }) {
  return (
    <>
      <style>{`
        .askn-btn {
          position: relative;
          display: block;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          text-align: left;
          color: #fff;
          background: #102d45;
          border: 1px solid #102d45;
          border-top: 3px solid #b68a35;
          box-shadow: 0 8px 24px rgba(16, 45, 69, 0.25);
          transition: background .25s ease, transform .25s ease, box-shadow .25s ease;
        }
        .askn-btn:hover {
          background: #174261;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(16, 45, 69, 0.38);
        }
        .askn-btn:active { transform: scale(0.98); }

        .askn-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cpath d='M22 2 L27 15 L40 10 L33 22 L40 34 L27 29 L22 42 L17 29 L4 34 L11 22 L4 10 L17 15 Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E");
        }
        .askn-shine {
          position: absolute;
          top: 0;
          left: -40%;
          width: 28%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          transform: skewX(-20deg);
          pointer-events: none;
          animation: asknShine 3.5s ease-in-out infinite;
        }
        @keyframes asknShine {
          0%   { left: -40%; }
          60%  { left: 140%; }
          100% { left: 140%; }
        }
        .askn-pulse {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgba(215, 170, 75, 0.55);
          animation: asknPulse 1.8s ease-out infinite;
        }
        @keyframes asknPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .askn-arrow { animation: asknArrow 1.4s ease-in-out infinite; }
        @keyframes asknArrow {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(6px); }
        }
      `}</style>

      <button type="button" onClick={onClick} className="askn-btn">
        <span className="askn-pattern" />
        <span className="askn-shine" />

        <div className="relative z-[1] flex items-center gap-3.5 px-4 py-3">
          <div className="relative shrink-0">
            <span className="askn-pulse" />
            <span
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#102d45]"
              style={{ border: "2px solid #b68a35" }}
            >
              <PenLine size={22} />
            </span>
          </div>

          <div className="flex-1">
            <div className="text-lg font-bold leading-7 md:text-xl">
              Ask Your Question
            </div>
            <div className="text-sm leading-5 text-[#c9d8e5]">
              Send it to our scholars
            </div>
          </div>

          <span className="askn-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
            <ArrowRight size={18} />
          </span>
        </div>
      </button>
    </>
  );
}