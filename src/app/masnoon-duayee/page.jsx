"use client";
import React from "react";
import { motion } from "framer-motion";

export default function MasnoonDuayePage() {
  const duayein = [
    {
      title: "سونے سے پہلے",
      arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
      translation: "اے اللہ! میں تیرے نام کے ساتھ مرتا اور جیتا ہوں",
    },
    {
      title: "جاگنے کے بعد",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا",
      translation: "تمام تعریف اللہ کے لیے ہے جس نے ہمیں زندہ کیا",
    },
    {
      title: "کھانے سے پہلے",
      arabic: "بِسْمِ اللَّهِ",
      translation: "اللہ کے نام سے شروع",
    },
    {
      title: "کھانے کے بعد",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا",
      translation: "تمام تعریف اللہ کے لیے ہے جس نے ہمیں کھلایا پلایا",
    },
    {
      title: "گھر میں داخل ہوتے وقت",
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ",
      translation: "اے اللہ! میں تجھ سے داخل ہونے کی بھلائی مانگتا ہوں",
    },
    {
      title: "گھر سے نکلتے وقت",
      arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",
      translation: "اللہ کے نام سے، میں نے اللہ پر بھروسہ کیا",
    },
    {
      title: "بیت الخلاء میں داخل ہوتے وقت",
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ",
      translation: "اے اللہ! میں ناپاک چیزوں سے پناہ مانگتا ہوں",
    },
    {
      title: "بیت الخلاء سے نکلتے وقت",
      arabic: "غُفْرَانَكَ",
      translation: "اے اللہ! مجھے بخش دے",
    },
    {
      title: "لباس پہنتے وقت",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا",
      translation: "تمام تعریف اللہ کے لیے ہے جس نے مجھے یہ پہنایا",
    },
    {
      title: "آئینہ دیکھتے وقت",
      arabic: "اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
      translation: "اے اللہ! جیسے تو نے میری صورت خوبصورت بنائی ویسے اخلاق بھی اچھے بنا",
    },
    {
      title: "مسجد میں داخل ہوتے وقت",
      arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      translation: "اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے",
    },
    {
      title: "مسجد سے نکلتے وقت",
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
      translation: "اے اللہ! میں تجھ سے فضل مانگتا ہوں",
    },
    {
      title: "چھینک آنے پر",
      arabic: "الْحَمْدُ لِلَّهِ",
      translation: "تمام تعریف اللہ کے لیے ہے",
    },
    {
      title: "کسی کو چھینک آئے تو جواب",
      arabic: "يَرْحَمُكَ اللَّهُ",
      translation: "اللہ تم پر رحم کرے",
    },
    {
      title: "سفر کی دعا",
      arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا",
      translation: "پاک ہے وہ جس نے اسے ہمارے لیے مسخر کیا",
    },
    {
      title: "غم و پریشانی میں",
      arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ",
      translation: "اے اللہ! میں تیرا بندہ ہوں",
    },
    {
      title: "بارش کے وقت",
      arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
      translation: "اے اللہ! اسے نفع بخش بارش بنا",
    },
    {
      title: "بیماری میں",
      arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ",
      translation: "اے لوگوں کے رب! بیماری دور کر دے",
    },
  ];

  return (
    <div className="min-h-screen px-3 py-5 bg-[#ddeee9]">
      <h1
        className="text-2xl text-center font-bold text-green-800 mb-4"
        style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
      >
        📿 مسنون دعائیں
      </h1>

      <div className="space-y-3 max-w-3xl mx-auto">
        {duayein.map((dua, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-3 border border-green-200 shadow-sm"
            style={{
              direction: "rtl",
              fontFamily: "'Jameel Noori Nastaleeq', serif",
              lineHeight: "1.9",
            }}
          >
            <h2 className="text-lg font-bold text-green-700">
              {dua.title}
            </h2>

            <p className="text-black text-base">
              {dua.arabic}
            </p>

            <p className="text-gray-600 text-sm">
              {dua.translation}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}