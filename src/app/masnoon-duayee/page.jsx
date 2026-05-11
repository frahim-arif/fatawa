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
  translation: "Tamam tareef Allah ke liye hai jisne hume zinda kiya",
},
{
  title: "نئی چاند دیکھنے کی دعا",
  hinglish: "Naya chand dekhne ki dua",
  arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالإِيمَانِ",
  urdu: "اے اللہ! اس چاند کو ہمارے لیے امن اور ایمان والا بنا",
  translation: "Ae Allah! Is chand ko hamare liye aman aur iman wala bana",
},
{
  title: "غصہ آنے پر",
  hinglish: "Gussa aane par",
  arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
  urdu: "میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں",
  translation: "Main shaitaan mardood se Allah ki panaah maangta hoon",
},
{
  title: "مصیبت میں",
  hinglish: "Museebat me",
  arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
  urdu: "ہم اللہ کے ہیں اور اسی کی طرف لوٹنے والے ہیں",
  translation: "Hum Allah ke hain aur usi ki taraf laut kar jaane wale hain",
},
{
  title: "قرض سے بچنے کی دعا",
  hinglish: "Qarz se bachne ki dua",
  arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ",
  urdu: "اے اللہ! مجھے حلال کے ذریعے حرام سے بچا",
  translation: "Ae Allah! Mujhe halal ke zariye haram se bacha",
},
{
  title: "علم میں اضافہ",
  hinglish: "Ilm me izafa",
  arabic: "رَبِّ زِدْنِي عِلْمًا",
  urdu: "اے میرے رب! میرے علم میں اضافہ فرما",
  translation: "Ae mere Rab! Mere ilm me izafa farma",
},
{
  title: "دل کی صفائی",
  hinglish: "Dil ki safai",
  arabic: "اللَّهُمَّ طَهِّرْ قَلْبِي",
  urdu: "اے اللہ! میرے دل کو پاک کر دے",
  translation: "Ae Allah! Mere dil ko paak kar de",
},
{
  title: "ہدایت کی دعا",
  hinglish: "Hidayat ki dua",
  arabic: "اللَّهُمَّ اهْدِنِي",
  urdu: "اے اللہ! مجھے ہدایت دے",
  translation: "Ae Allah! Mujhe hidayat de",
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
  title: "دل کے سکون کے لیے",
  hinglish: "Dil ke sukoon ke liye",
  arabic: "اللَّهُمَّ أَنْزِلِ السَّكِينَةَ فِي قَلْبِي",
  urdu: "اے اللہ! میرے دل میں سکون نازل فرما",
  translation: "Ae Allah! Mere dil me sukoon nazil farma",
},
{
  title: "اولاد کے لیے دعا",
  hinglish: "Aulad ke liye dua",
  arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
  urdu: "اے رب! مجھے نیک اولاد عطا فرما",
  translation: "Ae Rab! Mujhe nek aulad ata farma",
},
{
  title: "بیماری سے شفا",
  hinglish: "Bimari se shifa",
  arabic: "اللَّهُمَّ اشْفِنِي",
  urdu: "اے اللہ! مجھے شفا دے",
  translation: "Ae Allah! Mujhe shifa ata farma",
},
{
  title: "مشکل آسانی کے لیے",
  hinglish: "Mushkil aasani ke liye",
  arabic: "اللَّهُمَّ يَسِّرْ وَلَا تُعَسِّرْ",
  urdu: "اے اللہ! آسانی فرما، مشکل نہ کر",
  translation: "Ae Allah! Aasani farma aur mushkil na kar",
},
{
  title: "دشمن سے حفاظت",
  hinglish: "Dushman se hifazat",
  arabic: "اللَّهُمَّ اكْفِنِيهِمْ بِمَا شِئْتَ",
  urdu: "اے اللہ! دشمنوں سے حفاظت فرما",
  translation: "Ae Allah! Dushmano se hifazat farma",
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

              <span className="text-sm text-gray-700 ltr">
                ({dua.hinglish})
              </span>
            </h2>

            {/* Arabic Dua */}
            <p className="font-amiri text-xl leading-loose text-right text-black mt-3">
              {dua.arabic}
            </p>

            {/* Urdu Translation */}
            <p className="urdu text-gray-700 text-sm mt-3">
              {dua.urdu}
            </p>

            {/* Hinglish Translation */}
            <p className="text-gray-700 text-sm mt-2 ltr leading-relaxed">
              {dua.translation}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}