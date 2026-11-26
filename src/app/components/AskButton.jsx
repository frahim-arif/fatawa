"use client";

import React from "react";
import { ArrowLeft, PenLine } from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";

export default function AskButton({ onClick }) {
  return (
    <div
      className="w-11/12 md:w-full mx-auto relative z-10"
      style={{ marginTop: "-28px", marginBottom: "4px" }}
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
          border-radius: 16px;
          background: linear-gradient(135deg, #287A35 0%, #3A9448 55%, #4FAE5B 100%);
          border: 1.5px solid #D4AF37;
          box-shadow:
            0 10px 28px -8px rgba(40, 122, 53, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
        }

        .ask-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.06);
          box-shadow:
            0 14px 34px -8px rgba(40, 122, 53, 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
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
          background: rgba(212, 175, 55, 0.55);
          animation: askPulse 1.8s ease-out infinite;
        }

        @keyframes askPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
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
            gap: "12px",
            padding: "8px 12px",
          }}
        >
          {/* Icon */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <span className="ask-pulse" />

            {/* باہر کا سنہری رِنگ */}
            <span
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: "9999px",
                padding: 3,
                background:
                  "linear-gradient(135deg, #FFF3B0, #D4AF37 50%, #B8901F)",
                boxShadow:
                  "0 6px 16px rgba(0,0,0,0.3), 0 0 0 3px rgba(255,255,255,0.15)",
              }}
            >
              {/* اندر کا گول ڈبہ */}
              <span
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: "9999px",
                  background:
                    "radial-gradient(circle at 30% 25%, #F5D76E 0%, #D4AF37 60%, #B8901F 100%)",
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  boxShadow:
                    "inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.15)",
                  color: "#ffffff",
                }}
              >
                {/* چمک */}
                <span
                  style={{
                    position: "absolute",
                    top: 4,
                    left: 8,
                    width: 14,
                    height: 7,
                    borderRadius: "9999px",
                    background: "rgba(255,255,255,0.55)",
                    filter: "blur(1px)",
                    transform: "rotate(-25deg)",
                  }}
                />
                <PenLine
                  size={22}
                  strokeWidth={2.2}
                  style={{
                    position: "relative",
                    filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.35))",
                  }}
                />
              </span>
            </span>
          </div>

          {/* Text */}
          <div
            style={{
              flex: 1,
              fontSize: "24px",
              lineHeight: "44px",
              color: "#ffffff",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            اپنا سوال بھیجیں
          </div>

          {/* Arrow */}
          <span
            className="ask-arrow"
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            <ArrowLeft size={18} />
          </span>
        </div>
      </button>
    </div>
  );
}