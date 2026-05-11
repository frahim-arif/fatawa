"use client";

import React from "react";
import { motion } from "framer-motion";
import { MoonStar } from "lucide-react";

export default function MasnoonDuayePage() {
  const duayein = [
    {
      title: "سونے سے پہلے",
      titleHinglish: "Sone Se Pehle",
      arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
      urdu: "اے اللہ! میں تیرے نام کے ساتھ مرتا اور جیتا ہوں",
      hinglish: "Ae Allah! Main tere naam ke saath marta aur jeeta hoon",
    },

    {
      title: "جاگنے کے بعد",
      titleHinglish: "Jaagne Ke Baad",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا",
      urdu: "تمام تعریف اللہ کے لیے ہے جس نے ہمیں زندہ کیا",
      hinglish: "Tamam tareef Allah ke liye hai jisne hame zinda kiya",
    },

    {
      title: "کھانے سے پہلے",
      titleHinglish: "Khana Khane Se Pehle",
      arabic: "بِسْمِ اللَّهِ",
      urdu: "اللہ کے نام سے شروع",
      hinglish: "Allah ke naam se shuru",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ef] px-3 py-4">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-5">
        <div className="inline-flex items-center gap-2 bg-[#d4b24c] text-black px-4 py-1.5 rounded-full shadow-sm">
          <MoonStar size={15} />
          <span className="text-xs tracking-wide font-medium">
            Masnoon Islamic Duayein
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-bold text-[#8a6a00] urdu">
          📿 مسنون دعائیں
        </h1>

        <p className="text-gray-600 mt-1 text-xs">
          Daily Duas with Arabic, Urdu & Hinglish
        </p>
      </div>

      {/* Dua Cards */}
      <div className="max-w-3xl mx-auto grid gap-3">
        {duayein.map((dua, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white border border-[#eadca6] rounded-xl shadow-sm overflow-hidden"
          >
            {/* Top */}
            <div className="bg-[#efe2a8] px-4 py-2 border-b border-[#e1cf88]">
              
              <h2 className="urdu text-[#6d5200] text-lg font-bold leading-tight">
                {dua.title}
              </h2>

              <p className="text-[11px] text-[#7a6730] ltr mt-0.5">
                {dua.titleHinglish}
              </p>
            </div>

            {/* Content */}
            <div className="p-4">
              
              {/* Arabic */}
              <p className="font-amiri text-[1.15rem] leading-loose text-right text-black mb-3">
                {dua.arabic}
              </p>

              {/* Urdu */}
              <div className="bg-[#fff9e8] border-r-4 border-[#d4b24c] rounded-md px-3 py-2 mb-2">
                <p className="urdu text-gray-700 text-[13px] leading-7">
                  {dua.urdu}
                </p>
              </div>

              {/* Hinglish */}
              <div className="bg-gray-50 rounded-md px-3 py-2">
                <p className="text-gray-700 text-xs leading-6 ltr">
                  {dua.hinglish}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}