"use client";

import React from "react";
import { motion } from "framer-motion";
import { MoonStar } from "lucide-react";

export default function MasnoonDuayePage() {
  const duayein = [
     {
    title: "نئی چاند دیکھنے کی دعا",
    titleHinglish: "Naya Chand Dekhne Ki Dua",
    arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالإِيمَانِ",
    urdu: "اے اللہ! اس چاند کو ہمارے لیے امن اور ایمان والا بنا",
    hinglish: "Ae Allah! Is chand ko hamare liye aman aur iman wala bana",
  },

  {
    title: "غصہ آنے پر",
    titleHinglish: "Gussa Aane Par",
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    urdu: "میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں",
    hinglish: "Main shaitan mardood se Allah ki panah mangta hoon",
  },

  {
    title: "مصیبت میں",
    titleHinglish: "Musibat Mein",
    arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
    urdu: "ہم اللہ کے ہیں اور اسی کی طرف لوٹنے والے ہیں",
    hinglish: "Hum Allah ke hain aur usi ki taraf lautne wale hain",
  },

  {
    title: "قرض سے بچنے کی دعا",
    titleHinglish: "Qarz Se Bachne Ki Dua",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ",
    urdu: "اے اللہ! مجھے حلال کے ذریعے حرام سے بچا",
    hinglish: "Ae Allah! Mujhe halal ke zariye haram se bacha",
  },

  {
    title: "علم میں اضافہ",
    titleHinglish: "Ilm Mein Izafa",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    urdu: "اے میرے رب! میرے علم میں اضافہ فرما",
    hinglish: "Ae mere Rab! Mere ilm mein izafa farma",
  },

  {
    title: "دل کی صفائی",
    titleHinglish: "Dil Ki Safai",
    arabic: "اللَّهُمَّ طَهِّرْ قَلْبِي",
    urdu: "اے اللہ! میرے دل کو پاک کر دے",
    hinglish: "Ae Allah! Mere dil ko paak kar de",
  },

  {
    title: "ہدایت کی دعا",
    titleHinglish: "Hidayat Ki Dua",
    arabic: "اللَّهُمَّ اهْدِنِي",
    urdu: "اے اللہ! مجھے ہدایت دے",
    hinglish: "Ae Allah! Mujhe hidayat de",
  },

  {
    title: "رزق میں برکت",
    titleHinglish: "Rizq Mein Barkat",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي رِزْقِنَا",
    urdu: "اے اللہ! ہمارے رزق میں برکت دے",
    hinglish: "Ae Allah! Hamare rizq mein barkat de",
  },

  {
    title: "گناہوں کی معافی",
    titleHinglish: "Gunahon Ki Maafi",
    arabic: "رَبِّ اغْفِرْ لِي",
    urdu: "اے میرے رب! مجھے معاف کر دے",
    hinglish: "Ae mere Rab! Mujhe maaf kar de",
  },

  {
    title: "دل کے سکون کے لیے",
    titleHinglish: "Dil Ke Sukoon Ke Liye",
    arabic: "اللَّهُمَّ أَنْزِلِ السَّكِينَةَ فِي قَلْبِي",
    urdu: "اے اللہ! میرے دل میں سکون نازل فرما",
    hinglish: "Ae Allah! Mere dil mein sukoon nazil farma",
  },

  {
    title: "اولاد کے لیے دعا",
    titleHinglish: "Aulad Ke Liye Dua",
    arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
    urdu: "اے رب! مجھے نیک اولاد عطا فرما",
    hinglish: "Ae Rab! Mujhe nek aulaad ata farma",
  },

  {
    title: "بیماری سے شفا",
    titleHinglish: "Bimari Se Shifa",
    arabic: "اللَّهُمَّ اشْفِنِي",
    urdu: "اے اللہ! مجھے شفا دے",
    hinglish: "Ae Allah! Mujhe shifa de",
  },

  {
    title: "مشکل آسانی کے لیے",
    titleHinglish: "Mushkil Asani Ke Liye",
    arabic: "اللَّهُمَّ يَسِّرْ وَلَا تُعَسِّرْ",
    urdu: "اے اللہ! آسانی فرما، مشکل نہ کر",
    hinglish: "Ae Allah! Asani farma, mushkil na kar",
  },

  {
    title: "دشمن سے حفاظت",
    titleHinglish: "Dushman Se Hifazat",
    arabic: "اللَّهُمَّ اكْفِنِيهِمْ بِمَا شِئْتَ",
    urdu: "اے اللہ! دشمنوں سے حفاظت فرما",
    hinglish: "Ae Allah! Dushmanon se hifazat farma",
  },

  {
    title: "نیک اعمال کی دعا",
    titleHinglish: "Nek Aamaal Ki Dua",
    arabic: "اللَّهُمَّ وَفِّقْنِي لِلْخَيْرِ",
    urdu: "اے اللہ! مجھے نیکی کی توفیق دے",
    hinglish: "Ae Allah! Mujhe neki ki taufiq de",
  },

  {
    title: "صبر کی دعا",
    titleHinglish: "Sabr Ki Dua",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا",
    urdu: "اے رب! ہم پر صبر نازل فرما",
    hinglish: "Ae Rab! Hum par sabr nazil farma",
  },

  {
    title: "دن کی ابتدا میں",
    titleHinglish: "Din Ki Ibtida Mein",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا",
    urdu: "اے اللہ! ہم نے تیرے نام سے صبح کی",
    hinglish: "Ae Allah! Humne tere naam se subah ki",
  },

  {
    title: "شام کے وقت",
    titleHinglish: "Shaam Ke Waqt",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا",
    urdu: "اے اللہ! ہم نے تیرے نام سے شام کی",
    hinglish: "Ae Allah! Humne tere naam se shaam ki",
  },

  {
    title: "دل کی مضبوطی",
    titleHinglish: "Dil Ki Mazbooti",
    arabic: "اللَّهُمَّ ثَبِّتْ قَلْبِي",
    urdu: "اے اللہ! میرے دل کو ثابت رکھ",
    hinglish: "Ae Allah! Mere dil ko sabit rakh",
  },

  {
    title: "نیکی کی محبت",
    titleHinglish: "Neki Ki Mohabbat",
    arabic: "اللَّهُمَّ حَبِّبْ إِلَيَّ الْإِيمَانَ",
    urdu: "اے اللہ! ایمان کو میرے لیے محبوب بنا",
    hinglish: "Ae Allah! Iman ko mere liye mehboob bana",
  },
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
              
              <h2 className="urdu text-[#6d5200] text-xl font-bold leading-tight">
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
                <p className="urdu text-gray-700 text-xl leading-7">
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