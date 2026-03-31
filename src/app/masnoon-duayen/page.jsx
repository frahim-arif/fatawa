"use client";
import React from "react";
import { motion } from "framer-motion";

export default function MasnoonDuayePage() {
  const duayein = [
    {
      title: "سونے سے پہلے کی دعا",
      arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
      translation: "اے اللہ! میں تیرے نام کے ساتھ مرتا اور جیتا ہوں",
    },
    {
      title: "جاگنے کے بعد",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا",
      translation: "تمام تعریف اللہ کے لیے ہے جس نے ہمیں موت کے بعد زندہ کیا",
    },
    {
      title: "کھانے سے پہلے",
      arabic: "بِسْمِ اللَّهِ",
      translation: "اللہ کے نام سے شروع کرتا ہوں",
    },
    {
      title: "کھانے کے بعد",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا",
      translation: "تمام تعریف اللہ کے لیے ہے جس نے ہمیں کھلایا",
    },
  ];

  return (
    <div
      className="min-h-screen px-4 py-6"
      style={{ backgroundColor: "#ddeee9" }}
    >
      {/* Header */}
      <h1
        className="text-3xl text-center font-bold text-green-800 mb-6"
        style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
      >
        📿 مسنون دعائیں
      </h1>

      {/* Duayein List */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {duayein.map((dua, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md p-5 border border-green-200 hover:shadow-[0_0_20px_rgba(255,223,0,0.5)] transition"
            style={{
              direction: "rtl",
              fontFamily: "'Jameel Noori Nastaleeq', serif",
              lineHeight: "2",
            }}
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-green-700 mb-2">
              {dua.title}
            </h2>

            {/* Arabic */}
            <p className="text-lg text-black mb-2">
              {dua.arabic}
            </p>

            {/* Translation */}
            <p className="text-gray-600 text-sm">
              {dua.translation}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}