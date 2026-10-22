"use client";

import { useEffect, useState } from "react";
import { buildEvents, hijriDate, hm, URDU_D, URDU_G } from "../lib/prayerTimes";

const GREEN = "#75C178";
const TEXT = "#333333";
const urdu = "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif";

/**
 * Gol ghadi: Hijri + English tareekh, waqt, jagah, agli namaz aur progress ring.
 * Props:
 *   name        jagah ka naam (default Guwahati)
 *   lat, lng    jagah ke coordinates
 *   asr         2 = Hanafi, 1 = Shafi
 *   hijriAdjust chaand ke hisaab se din ka farq (-2 .. +2)
 */
export default function PrayerClock({
  name = "Guwahati",
  lat = 26.1445,
  lng = 91.7362,
  asr = 2,
  hijriAdjust = 0,
}) {
  const [now, setNow] = useState(null);

  // Server par waqt nahi dikhate, warna hydration mismatch hota hai
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  let view = null;
  if (now) {
    const ev = buildEvents(now, { lat, lng, asr });
    let prev = null;
    let next = null;
    for (const e of ev) {
      if (e.at <= now) prev = e;
      else {
        next = e;
        break;
      }
    }
    if (prev && next) {
      const progress = Math.max(0.005, Math.min(1, (now - prev.at) / (next.at - prev.at)));
      const mins = Math.max(0, Math.ceil((next.at - now) / 60000));
      view = {
        hijri: hijriDate(new Date(now.getTime() + hijriAdjust * 864e5)),
        greg: `${URDU_D[now.getDay()]} ${now.getDate()} ${URDU_G[now.getMonth()]}`,
        time: hm(now),
        ampm: now.getHours() < 12 ? "AM" : "PM",
        next,
        progress,
        remain: `${next.name} میں ${mins >= 60 ? Math.floor(mins / 60) + " گھنٹہ " : ""}${mins % 60} منٹ باقی`,
        today: ev.filter((e) => e.off === 0),
      };
    }
  }

  return (
    <section dir="rtl" style={{ width: "100%", maxWidth: 360, margin: "0 auto", fontFamily: urdu }} aria-label="وقت اور نماز">
      <div style={{ position: "relative", width: "100%", aspectRatio: "1", containerType: "inline-size" }}>
        <svg viewBox="0 0 100 100" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <circle cx="50" cy="50" r="46.5" fill="none" stroke="#C6E2C8" strokeWidth="2.6" />
          <circle cx="50" cy="50" r="43.6" fill="#fff" />
          <circle
            cx="50" cy="50" r="46.5" fill="none" stroke={GREEN} strokeWidth="2.6" strokeLinecap="round"
            pathLength="100" strokeDasharray={`${view ? view.progress * 100 : 0} 100`} transform="rotate(-90 50 50)"
          />
        </svg>

        <div
          style={{
            position: "absolute", inset: "12%", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", textAlign: "center", color: TEXT,
          }}
        >
          <div style={{ fontSize: "6.4cqw", lineHeight: 1.75, minHeight: "1.75em" }}>{view?.hijri}</div>
          <div style={{ fontSize: "6.4cqw", lineHeight: 1.75, minHeight: "1.75em" }}>{view?.greg}</div>
          <div
            dir="ltr"
            style={{
              fontFamily: "system-ui, sans-serif", fontSize: "21cqw", fontWeight: 300, lineHeight: 1.05,
              letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", display: "flex", alignItems: "baseline", gap: "1.2cqw",
            }}
          >
            <span>{view?.time ?? "--:--"}</span>
            <span style={{ fontSize: "4.2cqw", color: "#777", letterSpacing: "0.08em" }}>{view?.ampm}</span>
          </div>
          <div dir="ltr" style={{ fontFamily: "system-ui, sans-serif", fontSize: "5cqw", lineHeight: 1.25, maxWidth: "72%", marginTop: "1.5cqw" }}>
            {name}
          </div>
          <div style={{ fontSize: "6.8cqw", lineHeight: 1.7, display: "flex", gap: "1.6cqw", alignItems: "baseline" }}>
            <span>{view?.next.name}</span>
            <span dir="ltr" style={{ fontFamily: "system-ui, sans-serif", fontVariantNumeric: "tabular-nums" }}>
              {view ? hm(view.next.at) : ""}
            </span>
          </div>
        </div>
      </div>

      <p style={{ textAlign: "center", color: "#666", fontSize: 18, lineHeight: "32px", margin: "4px 0 10px", minHeight: 32 }}>
        {view?.remain}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", background: "#fff", border: "1px solid #C6E2C8", padding: 6 }}>
        {(view?.today ?? []).map((e) => {
          const on = view.next.off === 0 && view.next.key === e.key;
          return (
            <div key={e.key} style={{ textAlign: "center", padding: "6px 2px", background: on ? "#EAF5EA" : "transparent" }}>
              <div style={{ fontSize: 18, lineHeight: "30px", color: on ? "#3f9a45" : "#666" }}>{e.name}</div>
              <div dir="ltr" style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
                {hm(e.at)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}