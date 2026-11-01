"use client";

import React, { useEffect, useState } from "react";
import { Users, CalendarDays } from "lucide-react";

const API = "https://f-backend-vdi1.onrender.com/api";

const LABELS = {
  ur: { total: "کل وزیٹرز", today: "آج" },
  en: { total: "Total visitors", today: "Today" },
  bn: { total: "মোট ভিজিটর", today: "আজ" },
};

const FONTS = {
  ur: "'Jameel Noori Nastaleeq', serif",
  en: "inherit",
  bn: "var(--font-bengali), 'Noto Sans Bengali', sans-serif",
};

const BN = "০১২৩৪৫৬৭৮৯";

const fmt = (n, lang) => {
  const s = Number(n || 0).toLocaleString("en-IN");
  return lang === "bn" ? s.replace(/\d/g, (d) => BN[d]) : s;
};

export default function VisitorCount({ lang = "ur", dark = false }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let alive = true;

    fetch(`${API}/visitors/stats`)
      .then((r) => r.json())
      .then((d) => {
        if (alive && d?.success) setStats(d.data);
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, []);

  if (!stats) return null;

  const l = LABELS[lang] || LABELS.ur;

  const chip = dark
    ? "border-white/20 bg-white/5 text-white"
    : "border-[#C6E2C8] bg-white text-[#333333]";

  const icon = dark ? "text-[#d7aa4b]" : "text-[#63B56A]";

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2"
      style={{ fontFamily: FONTS[lang] }}
    >
      <span className={`inline-flex items-center gap-2 border px-3 py-1 ${chip}`}>
        <Users size={15} className={icon} />
        <span style={{ fontSize: lang === "ur" ? 16 : 13 }}>{l.total}</span>
        <b style={{ fontFamily: "Arial, sans-serif", fontSize: 14 }}>
          {fmt(stats.total, lang)}
        </b>
      </span>

      <span className={`inline-flex items-center gap-2 border px-3 py-1 ${chip}`}>
        <CalendarDays size={15} className={icon} />
        <span style={{ fontSize: lang === "ur" ? 16 : 13 }}>{l.today}</span>
        <b style={{ fontFamily: "Arial, sans-serif", fontSize: 14 }}>
          {fmt(stats.today, lang)}
        </b>
      </span>
    </div>
  );
}