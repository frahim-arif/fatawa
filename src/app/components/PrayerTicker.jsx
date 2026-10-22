"use client";

import React from "react";

const font = "'Jameel Noori Nastaleeq', serif";

const PRAYERS = [
  { key: "Fajr", name: "فجر" },
  { key: "Dhuhr", name: "ظہر" },
  { key: "Asr", name: "عصر" },
  { key: "Maghrib", name: "مغرب" },
  { key: "Isha", name: "عشاء" },
];

const to12 = (t) => {
  if (!t) return "--:--";
  const [h, m] = String(t).split(" ")[0].split(":");
  const hr = parseInt(h, 10);
  if (Number.isNaN(hr)) return "--:--";
  return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`;
};

function PrayerGroup({ times, nextPrayer, hidden }) {
  return (
    <div className="pt-group" aria-hidden={hidden ? "true" : undefined}>
      {PRAYERS.map((p) => {
        const isNext = nextPrayer === p.name;

        return (
          <React.Fragment key={p.key}>
            <span className={`pt-chip ${isNext ? "pt-next" : ""}`}>
              <span className="pt-name">{p.name}</span>
              <span className="pt-time">{to12(times[p.key])}</span>
            </span>
            <span className="pt-star">✦</span>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function PrayerTicker({ prayerTimes, nextPrayer }) {
  return (
    <div className="pt-root">
      <style>{`
        .pt-root {
          position: relative;
          z-index: 10;
          width: 100%;
        }

        .pt-bar {
          position: relative;
          display: flex;
          direction: ltr;
          align-items: stretch;
          width: 100%;
          min-height: 54px;
          overflow: hidden;
          background: #ffffff;
          border-top: 1px solid #C6E2C8;
          border-bottom: 1px solid #C6E2C8;
          box-shadow: 0 2px 10px rgba(117, 193, 120, 0.08);
        }

        .pt-gold-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          z-index: 3;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
        }

        .pt-gold-bottom {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 2px;
          z-index: 3;
          background: #D4AF37;
        }

        .pt-viewport {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 36px, #000 calc(100% - 24px), transparent);
          mask-image: linear-gradient(to right, transparent, #000 36px, #000 calc(100% - 24px), transparent);
        }

        .pt-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: ptScroll 34s linear infinite;
        }

        .pt-bar:hover .pt-track {
          animation-play-state: paused;
        }

        @keyframes ptScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .pt-group {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-shrink: 0;
          min-width: 100vw;
        }

        .pt-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          direction: rtl;
          white-space: nowrap;
          margin: 6px 0;
          padding: 0 16px;
          background: #F5FAF5;
          border: 1px solid #C6E2C8;
          transition: background .25s ease, border-color .25s ease;
        }

        .pt-name {
          font-family: ${font};
          color: #3f8f46;
          font-size: 20px;
          line-height: 40px;
        }

        .pt-time {
          direction: ltr;
          font-family: Arial, Helvetica, sans-serif;
          color: #333333;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .pt-next {
          background: #75C178;
          border-color: #D4AF37;
          box-shadow: 0 4px 12px rgba(117, 193, 120, 0.35);
        }

        .pt-next .pt-name,
        .pt-next .pt-time {
          color: #ffffff;
        }

        .pt-star {
          flex-shrink: 0;
          margin: 0 14px;
          color: #D4AF37;
          font-size: 14px;
        }

        .pt-label {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          direction: rtl;
          padding: 0 12px;
          background: #ffffff;
          border-left: 1px solid #C6E2C8;
        }

        .pt-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 9999px;
          font-size: 15px;
          background: #EAF5EA;
          border: 1px solid #C6E2C8;
        }

        .pt-label-text {
          display: none;
          font-family: ${font};
          color: #63B56A;
          font-size: 18px;
          line-height: 32px;
        }

        @media (min-width: 640px) {
          .pt-label { padding: 0 18px; }
          .pt-label-text { display: block; }
        }

        .pt-loading {
          width: 100%;
          margin: 0;
          padding: 0 16px;
          text-align: center;
          direction: rtl;
          font-family: ${font};
          color: #63B56A;
          font-size: 18px;
          line-height: 40px;
        }

        @media (prefers-reduced-motion: reduce) {
          .pt-track { animation: none; }
          .pt-viewport {
            overflow-x: auto;
            -webkit-mask-image: none;
            mask-image: none;
          }
        }
      `}</style>

      <div className="pt-bar">
        <span className="pt-gold-top" />

        <div className="pt-viewport">
          {prayerTimes ? (
            <div className="pt-track">
              <PrayerGroup times={prayerTimes} nextPrayer={nextPrayer} />
              <PrayerGroup times={prayerTimes} nextPrayer={nextPrayer} hidden />
            </div>
          ) : (
            <p className="pt-loading">نماز کے اوقات لوڈ ہو رہے ہیں...</p>
          )}
        </div>

        <div className="pt-label">
          <span className="pt-icon">🕌</span>
          <span className="pt-label-text">اوقاتِ نماز</span>
        </div>

        <span className="pt-gold-bottom" />
      </div>
    </div>
  );
}