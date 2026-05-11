"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MasnoonDuayePage() {
  const duayein = [
    {
      title: "سونے سے پہلے",
      hinglish: "Sone se pehle",
      arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
      urdu: "اے اللہ! میں تیرے نام کے ساتھ مرتا اور جیتا ہوں",
      translation: "Ae Allah! Main tere naam ke saath sota aur jaagta hoon",
    },
    {
      title: "جاگنے کے بعد",
      hinglish: "Jaagne ke baad",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا",
      urdu: "تمام تعریف اللہ کے لیے ہے جس نے ہمیں زندہ کیا",
      translation:
        "Tamam tareef Allah ke liye hai jisne hume zinda kiya",
    },
    {
      title: "غصہ آنے پر",
      hinglish: "Gussa aane par",
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      urdu: "میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں",
      translation:
        "Main shaitaan mardood se Allah ki panaah maangta hoon",
    },
    {
      title: "علم میں اضافہ",
      hinglish: "Ilm me izafa",
      arabic: "رَبِّ زِدْنِي عِلْمًا",
      urdu: "اے میرے رب! میرے علم میں اضافہ فرما",
      translation: "Ae mere Rab! Mere ilm me izafa farma",
    },
    {
      title: "رزق میں برکت",
      hinglish: "Rizq me barkat",
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي رِزْقِنَا",
      urdu: "اے اللہ! ہمارے رزق میں برکت دے",
      translation: "Ae Allah! Hamare rizq me barkat ata farma",
    },
    {
      title: "گناہوں کی معافی",
      hinglish: "Gunahon ki maafi",
      arabic: "رَبِّ اغْفِرْ لِي",
      urdu: "اے میرے رب! مجھے معاف کر دے",
      translation: "Ae mere Rab! Mujhe maaf farma",
    },
    {
      title: "کھانے سے پہلے",
      hinglish: "Khane se pehle",
      arabic: "بِسْمِ اللَّهِ",
      urdu: "اللہ کے نام سے شروع",
      translation: "Allah ke naam se shuru karta hoon",
    },
    {
      title: "کھانے کے بعد",
      hinglish: "Khane ke baad",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا",
      urdu:
        "تمام تعریف اللہ کے لیے ہے جس نے ہمیں کھلایا اور پلایا",
      translation:
        "Tamam tareef Allah ke liye hai jisne hume khilaya aur pilaya",
    },
  ];

  return (
    <div className="min-h-screen px-3 py-5 bg-[#ddeee9]">
      <h1 className="text-3xl text-center font-bold text-green-800 mb-6 urdu">
        📿 مسنون دعائیں
      </h1>

      <div className="space-y-4 max-w-3xl mx-auto">
        {duayein.map((dua, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-green-200 shadow-sm p-4"
          >
            {/* Title */}
            <h2 className="text-lg font-bold text-green-700 flex flex-wrap items-center gap-2">
              <span className="urdu">{dua.title}</span>

              <span className="text-sm text-gray-500 ltr">
                ({dua.hinglish})
              </span>
            </h2>

            {/* Arabic Dua */}
            <p className="font-amiri text-xl leading-loose text-right text-black mt-3">
              {dua.arabic}
            </p>

            {/* Urdu Translation */}
            <p className="urdu text-gray-700 text-base mt-3">
              {dua.urdu}
            </p>

            {/* Hinglish Translation */}
            <p className="text-gray-600 text-sm mt-2 ltr leading-relaxed">
              {dua.translation}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}