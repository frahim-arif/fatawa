"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PrayerTimesMarquee({ lat, lng }) {
  const [times, setTimes] = useState(null);

  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`
        );
        const data = await res.json();
        setTimes(data.data.timings);
      } catch (err) {
        console.error("Error fetching prayer times:", err);
      }
    }
    fetchPrayerTimes();
  }, [lat, lng]);

  if (!times) return <p className="text-center text-lg text-yellow-200">Loading...</p>;

  const prayerTimesArr = [
    { name: "فجر", time: times.Fajr },
    { name: "ظہر", time: times.Dhuhr },
    { name: "عصر", time: times.Asr },
    { name: "مغرب", time: times.Maghrib },
    { name: "عشاء", time: times.Isha },
  ];

  return (
    <div className="w-full overflow-hidden py-2 border-t-2 border-b-2 border-yellow-300">
      <motion.div
        className="whitespace-nowrap text-lg font-semibold text-yellow-200"
        style={{ direction: "rtl", fontFamily: "'Jameel Noori Nastaleeq', serif" }}
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {prayerTimesArr.map((t, idx) => (
          <span key={idx} className="mx-6">{t.name}: {t.time}</span>
        ))}
      </motion.div>
    </div>
  );
}
