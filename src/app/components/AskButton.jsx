"use client";

import React from "react";
import { ArrowLeft, PenLine } from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";

export default function AskButton({ onClick }) {
  return (
    <div
      className="w-11/12 md:w-full mx-auto relative z-10"
      style={{ marginTop: "-24px", marginBottom: "4px" }}
    >
      <style>{`
        .ask-btn,
        .ask-btn * {
          font-family: ${font} !important;
        }

        .ask-btn {
          position: relative;
          display: block;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          color: #ffffff;
          text-align: right;
          direction: rtl;
          background: #75C178;
          border: 1px solid #75C178;
          border-top: 3px solid #D4AF37;
          box-shadow: 0 8px 24px rgba(117, 193, 120, 0.28);
          transition: background .25s ease, transform .25s ease, box-shadow .25s ease;
        }

        .ask-btn:hover {
          background: #63B56A;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(99, 181, 106, 0.4);
        }

        .ask-btn:active {
          transform: scale(0.98);
        }

        .ask-btn .ask-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cpath d='M22 2 L27 15 L40 10 L33 22 L40 34 L27 29 L22 42 L17 29 L4 34 L11 22 L4 10 L17 15 Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E");
        }

        .ask-btn .ask-shine {
          position: absolute;
          top: 0;
          left: -40%;
          width: 28%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          pointer-events: none;
          animation: askShine 3.5s ease-in-out infinite;
        }

        @keyframes askShine {
          0%   { left: -40%; }
          60%  { left: 140%; }
          100% { left: 140%; }
        }

        .ask-btn .ask-pulse {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgba(255,255,255,0.6);
          animation: askPulse 1.8s ease-out infinite;
        }

        @keyframes askPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .ask-btn .ask-arrow {
          animation: askArrow 1.4s ease-in-out infinite;
        }

        @keyframes askArrow {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(-6px); }
        }
      `}</style>

      <button type="button" onClick={onClick} className="ask-btn">
        <span className="ask-pattern" />
        <span className="ask-shine" />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "12px 16px",
          }}
        >
          <div style={{ position: "relative", flexShrink: 0 }}>
            <span className="ask-pulse" />
            <span
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: "9999px",
                background: "#ffffff",
                border: "2px solid #D4AF37",
                color: "#63B56A",
              }}
            >
              <PenLine size={24} />
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "24px", lineHeight: "40px", color: "#ffffff" }}>
              اپنا سوال بھیجیں
            </div>
            <div style={{ fontSize: "16px", lineHeight: "28px", color: "#EAF5EA" }}>
              علمائے کرام سے اپنے مسئلے کا حل پوچھیں
            </div>
          </div>

          <span
            className="ask-arrow"
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.22)",
            }}
          >
            <ArrowLeft size={20} />
          </span>
        </div>
      </button>
    </div>
  );
}