"use client";

import React from "react";

const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const to12 = (t) => {
  if (!t) return "--:--";
  const [h, m] = String(t).split(" ")[0].split(":");
  const hr = parseInt(h, 10);
  if (Number.isNaN(hr)) return "--:--";
  return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`;
};

function Group({ times, nextPrayer, hidden }) {
  return (
    <div className="ptn-group" aria-hidden={hidden ? "true" : undefined}>
      {PRAYERS.map((name) => (
        <React.Fragment key={name}>
          <span className={`ptn-chip ${nextPrayer === name ? "ptn-next" : ""}`}>
            <span className="ptn-name">{name}</span>
            <span className="ptn-time">{to12(times[name])}</span>
          </span>
          <span className="ptn-star">✦</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function PrayerTickerEn({ prayerTimes, nextPrayer }) {
  return (
    <div className="ptn-root">
      <style>{`
        .ptn-root {
          --h: 40px; --name: 14px; --time: 12.5px; --pad: 10px; --gap: 7px;
          --star-gap: 9px; --speed: 14s;
          position: relative;
          z-index: 10;
          width: 100%;
        }
        @media (min-width: 640px) {
          .ptn-root { --h: 44px; --name: 15px; --time: 14px; --pad: 14px; --gap: 8px; --star-gap: 12px; --speed: 20s; }
        }
        @media (min-width: 1024px) {
          .ptn-root { --h: 46px; --name: 16px; --time: 15px; --pad: 16px; --gap: 10px; --star-gap: 16px; --speed: 26s; }
        }

        .ptn-bar {
          position: relative;
          display: flex;
          align-items: stretch;
          width: 100%;
          height: var(--h);
          overflow: hidden;
          background: #071827;
          border-bottom: 1px solid #315b7a;
        }
        .ptn-gold {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          z-index: 3;
          background: linear-gradient(90deg, transparent, #d7aa4b, transparent);
        }

        .ptn-label {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 10px;
          background: #071827;
          border-right: 1px solid #315b7a;
          color: #d7aa4b;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .ptn-label-text { display: none; }
        @media (min-width: 640px) {
          .ptn-label { padding: 0 16px; font-size: 14px; }
          .ptn-label-text { display: inline; }
        }

        .ptn-viewport {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent);
          mask-image: linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent);
        }
        .ptn-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: ptnScroll var(--speed) linear infinite;
        }
        .ptn-bar:hover .ptn-track,
        .ptn-bar:active .ptn-track { animation-play-state: paused; }
        @keyframes ptnScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .ptn-group {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-shrink: 0;
          min-width: 100vw;
        }
        .ptn-chip {
          display: inline-flex;
          align-items: center;
          gap: var(--gap);
          white-space: nowrap;
          margin: 3px 0;
          padding: 0 var(--pad);
          line-height: calc(var(--h) - 12px);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .ptn-name { color: #d7aa4b; font-size: var(--name); font-weight: 600; }
        .ptn-time { color: #ffffff; font-size: var(--time); font-weight: 700; letter-spacing: 0.3px; }

        .ptn-next {
          background: #b68a35;
          border-color: #d7aa4b;
          box-shadow: 0 3px 10px rgba(182, 138, 53, 0.4);
        }
        .ptn-next .ptn-name,
        .ptn-next .ptn-time { color: #ffffff; }

        .ptn-star { flex-shrink: 0; margin: 0 var(--star-gap); color: #b68a35; font-size: 11px; }

        .ptn-loading {
          width: 100%;
          margin: 0;
          text-align: center;
          color: #d7aa4b;
          font-size: 14px;
          line-height: var(--h);
        }

        @media (prefers-reduced-motion: reduce) {
          .ptn-track { animation: none; }
          .ptn-viewport { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
        }
      `}</style>

      <div className="ptn-bar">
        <span className="ptn-gold" />

        <div className="ptn-label">
          <span>🕌</span>
          <span className="ptn-label-text">Prayer Times</span>
        </div>

        <div className="ptn-viewport">
          {prayerTimes ? (
            <div className="ptn-track">
              <Group times={prayerTimes} nextPrayer={nextPrayer} />
              <Group times={prayerTimes} nextPrayer={nextPrayer} hidden />
            </div>
          ) : (
            <p className="ptn-loading">Loading prayer times...</p>
          )}
        </div>
      </div>
    </div>
  );
}