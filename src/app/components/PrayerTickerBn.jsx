"use client";

import React from "react";

const font = "var(--font-bengali), 'Noto Sans Bengali', sans-serif";

const PRAYERS = [
  { key: "Fajr", name: "ফজর" },
  { key: "Dhuhr", name: "যোহর" },
  { key: "Asr", name: "আসর" },
  { key: "Maghrib", name: "মাগরিব" },
  { key: "Isha", name: "এশা" },
];

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const bnDigits = (s) => String(s).replace(/\d/g, (d) => BN_DIGITS[d]);

const to12 = (t) => {
  if (!t) return "--:--";
  const [h, m] = String(t).split(" ")[0].split(":");
  const hr = parseInt(h, 10);
  if (Number.isNaN(hr)) return "--:--";
  return `${bnDigits(hr % 12 || 12)}:${bnDigits(m)} ${hr >= 12 ? "PM" : "AM"}`;
};

function Group({ times, nextPrayer, hidden }) {
  return (
    <div className="ptb-group" aria-hidden={hidden ? "true" : undefined}>
      {PRAYERS.map((p) => (
        <React.Fragment key={p.key}>
          <span className={`ptb-chip ${nextPrayer === p.name ? "ptb-next" : ""}`}>
            <span className="ptb-name">{p.name}</span>
            <span className="ptb-time">{to12(times[p.key])}</span>
          </span>
          <span className="ptb-star">✦</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function PrayerTickerBn({ prayerTimes, nextPrayer }) {
  return (
    <div className="ptb-root">
      <style>{`
        .ptb-root {
          --h: 42px; --name: 15px; --time: 13px; --pad: 10px; --gap: 7px;
          --star-gap: 9px; --speed: 14s;
          position: relative;
          z-index: 10;
          width: 100%;
          font-family: ${font};
        }
        @media (min-width: 640px) {
          .ptb-root { --h: 46px; --name: 16px; --time: 14px; --pad: 14px; --gap: 8px; --star-gap: 12px; --speed: 20s; }
        }
        @media (min-width: 1024px) {
          .ptb-root { --h: 48px; --name: 17px; --time: 15px; --pad: 16px; --gap: 10px; --star-gap: 16px; --speed: 26s; }
        }

        .ptb-bar {
          position: relative;
          display: flex;
          align-items: stretch;
          width: 100%;
          height: var(--h);
          overflow: hidden;
          background: linear-gradient(90deg, #071c19, #0b302a, #071c19);
          border-bottom: 1px solid #806b3f;
        }
        .ptb-gold {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          z-index: 3;
          background: linear-gradient(90deg, transparent, #c8ae6a, transparent);
        }

        .ptb-label {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 10px;
          background: #071c19;
          border-right: 1px solid #806b3f;
          color: #d8c27d;
          font-size: 14px;
          font-weight: 700;
        }
        .ptb-label-text { display: none; }
        @media (min-width: 640px) {
          .ptb-label { padding: 0 16px; }
          .ptb-label-text { display: inline; }
        }

        .ptb-viewport {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent);
          mask-image: linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent);
        }
        .ptb-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: ptbScroll var(--speed) linear infinite;
        }
        .ptb-bar:hover .ptb-track,
        .ptb-bar:active .ptb-track { animation-play-state: paused; }
        @keyframes ptbScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .ptb-group {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-shrink: 0;
          min-width: 100vw;
        }
        .ptb-chip {
          display: inline-flex;
          align-items: center;
          gap: var(--gap);
          white-space: nowrap;
          margin: 3px 0;
          padding: 0 var(--pad);
          line-height: calc(var(--h) - 12px);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(200, 174, 106, 0.25);
        }
        .ptb-name { color: #d8c27d; font-size: var(--name); font-weight: 600; }
        .ptb-time { color: #f5e6bd; font-size: var(--time); font-weight: 700; }

        .ptb-next {
          background: #c8ae6a;
          border-color: #f5e6bd;
          box-shadow: 0 3px 10px rgba(200, 174, 106, 0.4);
        }
        .ptb-next .ptb-name,
        .ptb-next .ptb-time { color: #071c19; }

        .ptb-star { flex-shrink: 0; margin: 0 var(--star-gap); color: #806b3f; font-size: 11px; }

        .ptb-loading {
          width: 100%;
          margin: 0;
          text-align: center;
          color: #d8c27d;
          font-size: 14px;
          line-height: var(--h);
        }

        @media (prefers-reduced-motion: reduce) {
          .ptb-track { animation: none; }
          .ptb-viewport { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
        }
      `}</style>

      <div className="ptb-bar">
        <span className="ptb-gold" />

        <div className="ptb-label">
          <span>🕌</span>
          <span className="ptb-label-text">নামাজের সময়</span>
        </div>

        <div className="ptb-viewport">
          {prayerTimes ? (
            <div className="ptb-track">
              <Group times={prayerTimes} nextPrayer={nextPrayer} />
              <Group times={prayerTimes} nextPrayer={nextPrayer} hidden />
            </div>
          ) : (
            <p className="ptb-loading">নামাজের সময় লোড হচ্ছে...</p>
          )}
        </div>
      </div>
    </div>
  );
}