"use client";

import React from "react";
import { motion } from "framer-motion";
import { MoonStar } from "lucide-react";

export default function MasnoonDuayePage() {
  const duayein = [
    {
      title: "سونے سے پہلے",
      arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
      urdu: "اے اللہ! میں تیرے نام کے ساتھ مرتا اور جیتا ہوں",
      hinglish: "Ae Allah! Main tere naam ke saath marta aur jeeta hoon",
    },
    {
      title: "جاگنے کے بعد",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا",
      urdu: "تمام تعریف اللہ کے لیے ہے جس نے ہمیں زندہ کیا",
      hinglish: "Tamam tareef Allah ke liye hai jisne hame zinda kiya",
    },
    {
      title: "کھانے سے پہلے",
      arabic: "بِسْمِ اللَّهِ",
      urdu: "اللہ کے نام سے شروع",
      hinglish: "Allah ke naam se shuru",
    },
    {
      title: "کھانے کے بعد",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا",
      urdu: "تمام تعریف اللہ کے لیے ہے جس نے ہمیں کھلایا پلایا",
      hinglish: "Allah ka shukr jisne hame khilaya pilaya",
    },
    {
      title: "گھر سے نکلتے وقت",
      arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",
      urdu: "اللہ کے نام سے، میں نے اللہ پر بھروسہ کیا",
      hinglish: "Allah ke naam se, maine Allah par bharosa kiya",
    },
    {
      title: "گھر میں داخل ہوتے وقت",
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ",
      urdu: "اے اللہ! داخل ہونے کی بھلائی عطا فرما",
      hinglish: "Ae Allah! Dakhil hone ki bhalai ata farma",
    },
    {
      title: "مسجد میں داخل ہوتے وقت",
      arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      urdu: "اے اللہ! میرے لیے رحمت کے دروازے کھول دے",
      hinglish: "Ae Allah! Mere liye rehmat ke darwaze khol de",
    },
    {
      title: "مسجد سے نکلتے وقت",
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
      urdu: "اے اللہ! میں تیرا فضل مانگتا ہوں",
      hinglish: "Ae Allah! Main tera fazl maangta hoon",
    },
    {
      title: "سفر کی دعا",
      arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا",
      urdu: "پاک ہے وہ جس نے اسے ہمارے لیے مسخر کیا",
      hinglish: "Paak hai woh jisne ise hamare liye musakhkhar kiya",
    },
    {
      title: "بیماری میں",
      arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ",
      urdu: "اے لوگوں کے رب! بیماری دور فرما",
      hinglish: "Ae logon ke Rab! Bimari door farma",
    },

    // EXTRA 20 DUAS

    {
      title: "رزق میں برکت",
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي رِزْقِنَا",
      urdu: "اے اللہ! ہمارے رزق میں برکت عطا فرما",
      hinglish: "Ae Allah! Hamare rizq me barkat ata farma",
    },
    {
      title: "علم میں اضافہ",
      arabic: "رَبِّ زِدْنِي عِلْمًا",
      urdu: "اے میرے رب! میرے علم میں اضافہ فرما",
      hinglish: "Ae mere Rab! Mere ilm me izafa farma",
    },
    {
      title: "گناہوں کی معافی",
      arabic: "رَبِّ اغْفِرْ لِي",
      urdu: "اے میرے رب! مجھے معاف فرما",
      hinglish: "Ae mere Rab! Mujhe maaf farma",
    },
    {
      title: "دل کی صفائی",
      arabic: "اللَّهُمَّ طَهِّرْ قَلْبِي",
      urdu: "اے اللہ! میرے دل کو پاک فرما",
      hinglish: "Ae Allah! Mere dil ko paak farma",
    },
    {
      title: "ہدایت کی دعا",
      arabic: "اللَّهُمَّ اهْدِنِي",
      urdu: "اے اللہ! مجھے ہدایت عطا فرما",
      hinglish: "Ae Allah! Mujhe hidayat ata farma",
    },
    {
      title: "دل کے سکون کے لیے",
      arabic: "اللَّهُمَّ أَنْزِلِ السَّكِينَةَ فِي قَلْبِي",
      urdu: "اے اللہ! میرے دل میں سکون نازل فرما",
      hinglish: "Ae Allah! Mere dil me sukoon nazil farma",
    },
    {
      title: "اولاد کے لیے دعا",
      arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
      urdu: "اے رب! مجھے نیک اولاد عطا فرما",
      hinglish: "Ae Rab! Mujhe nek aulaad ata farma",
    },
    {
      title: "صبر کی دعا",
      arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا",
      urdu: "اے رب! ہم پر صبر نازل فرما",
      hinglish: "Ae Rab! Hum par sabr nazil farma",
    },
    {
      title: "ایمان کی حفاظت",
      arabic: "اللَّهُمَّ احْفَظْ إِيمَانِي",
      urdu: "اے اللہ! میرے ایمان کی حفاظت فرما",
      hinglish: "Ae Allah! Mere iman ki hifazat farma",
    },
    {
      title: "قبولیت کی دعا",
      arabic: "اللَّهُمَّ تَقَبَّلْ مِنِّي",
      urdu: "اے اللہ! مجھ سے قبول فرما",
      hinglish: "Ae Allah! Mujh se qubool farma",
    },
    {
      title: "نیکی کی توفیق",
      arabic: "اللَّهُمَّ وَفِّقْنِي لِلْخَيْرِ",
      urdu: "اے اللہ! مجھے نیکی کی توفیق دے",
      hinglish: "Ae Allah! Mujhe neki ki taufiq de",
    },
    {
      title: "مشکل آسانی",
      arabic: "اللَّهُمَّ يَسِّرْ وَلَا تُعَسِّرْ",
      urdu: "اے اللہ! آسانی فرما",
      hinglish: "Ae Allah! Aasani farma",
    },
    {
      title: "نیند کی دعا",
      arabic: "اللَّهُمَّ أَنْعِمْ عَلَيَّ بِالنَّوْمِ",
      urdu: "اے اللہ! مجھے اچھی نیند عطا فرما",
      hinglish: "Ae Allah! Mujhe achi neend ata farma",
    },
    {
      title: "برے خواب سے بچاؤ",
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْحُلْمِ السَّيِّئِ",
      urdu: "اے اللہ! برے خواب سے بچا",
      hinglish: "Ae Allah! Bure khwab se bacha",
    },
    {
      title: "ہر خیر کی دعا",
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْخَيْرَ كُلَّهُ",
      urdu: "اے اللہ! ہر بھلائی عطا فرما",
      hinglish: "Ae Allah! Har bhalai ata farma",
    },
    {
      title: "دل کی روشنی",
      arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا",
      urdu: "اے اللہ! میرے دل میں نور پیدا فرما",
      hinglish: "Ae Allah! Mere dil me noor paida farma",
    },
    {
      title: "برکت والی زندگی",
      arabic: "اللَّهُمَّ بَارِكْ لِي فِي عُمْرِي",
      urdu: "اے اللہ! میری عمر میں برکت دے",
      hinglish: "Ae Allah! Meri umr me barkat de",
    },
    {
      title: "بچوں کی حفاظت",
      arabic: "اللَّهُمَّ احْفَظْ أَوْلَادِي",
      urdu: "اے اللہ! میری اولاد کی حفاظت فرما",
      hinglish: "Ae Allah! Meri aulaad ki hifazat farma",
    },
    {
      title: "آخرت کی کامیابی",
      arabic: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْجَنَّةِ",
      urdu: "اے اللہ! مجھے جنت والوں میں شامل فرما",
      hinglish: "Ae Allah! Mujhe jannat walon me shamil farma",
    },
    {
      title: "بارش کے وقت",
      arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
      urdu: "اے اللہ! نفع والی بارش عطا فرما",
      hinglish: "Ae Allah! Nafay wali barish ata farma",
    },
  ];

  return (
    <div className="min-h-screen bg-[#eef5f1] px-4 py-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-2 rounded-full shadow-md">
          <MoonStar size={18} />
          <span className="text-sm tracking-wide">
            Masnoon Islamic Duayein
          </span>
        </div>

        <h1 className="mt-4 text-4xl font-bold text-green-900 urdu">
          📿 مسنون دعائیں
        </h1>

        <p className="text-gray-600 mt-2 text-sm">
          Daily Islamic Duas with Arabic, Urdu & Hinglish Translation
        </p>
      </div>

      {/* Dua Cards */}
      <div className="max-w-4xl mx-auto grid gap-5">
        {duayein.map((dua, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            {/* Top */}
            <div className="bg-green-700 px-5 py-3">
              <h2 className="urdu text-white text-xl font-bold">
                {dua.title}
              </h2>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Arabic */}
              <p className="font-amiri text-[1.35rem] leading-loose text-right text-black mb-4">
                {dua.arabic}
              </p>

              {/* Urdu */}
              <div className="bg-green-50 border-r-4 border-green-700 rounded-md p-3 mb-3">
                <p className="urdu text-gray-700 text-[15px] leading-8">
                  {dua.urdu}
                </p>
              </div>

              {/* Hinglish */}
              <div className="bg-gray-50 rounded-md p-3">
                <p className="text-gray-700 text-sm leading-7 ltr">
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