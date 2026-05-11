"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MoonStar } from "lucide-react";

export default function MasnoonDuayePage() {
  const [openIndex, setOpenIndex] = useState(null);

  const duayein = [
    {
    title: "مسجد میں داخل ہوتے وقت",
    hinglish: "Masjid Mein Dakhil Hote Waqt",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    urdu: "اے اللہ! میرے لیے رحمت کے دروازے کھول دے",
  },
  {
    title: "مسجد سے نکلتے وقت",
    hinglish: "Masjid Se Nikalte Waqt",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    urdu: "اے اللہ! میں تیرا فضل مانگتا ہوں",
  },
  {
    title: "بیت الخلاء میں داخل ہوتے وقت",
    hinglish: "Bathroom Mein Jane Ki Dua",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    urdu: "اے اللہ! میں ناپاک چیزوں سے تیری پناہ مانگتا ہوں",
  },
  {
    title: "بیت الخلاء سے نکلتے وقت",
    hinglish: "Bathroom Se Nikalne Ki Dua",
    arabic: "غُفْرَانَكَ",
    urdu: "اے اللہ! مجھے معاف فرما",
  },
  {
    title: "لباس پہنتے وقت",
    hinglish: "Kapde Pehente Waqt",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا",
    urdu: "تمام تعریف اللہ کے لیے ہے جس نے مجھے یہ پہنایا",
  },
  {
    title: "آئینہ دیکھتے وقت",
    hinglish: "Aaina Dekhte Waqt",
    arabic: "اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
    urdu: "اے اللہ! جیسے تو نے میری صورت اچھی بنائی ویسے اخلاق بھی اچھے بنا",
  },
  {
    title: "سفر کی دعا",
    hinglish: "Safar Ki Dua",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا",
    urdu: "پاک ہے وہ جس نے اسے ہمارے لیے مسخر کیا",
  },
  {
    title: "بارش کے وقت",
    hinglish: "Barish Ke Waqt",
    arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
    urdu: "اے اللہ! اسے نفع بخش بارش بنا",
  },
  {
    title: "غصہ آنے پر",
    hinglish: "Gussa Aane Par",
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    urdu: "میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں",
  },
  {
    title: "مصیبت میں",
    hinglish: "Museebat Mein",
    arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
    urdu: "ہم اللہ کے ہیں اور اسی کی طرف لوٹنے والے ہیں",
  },
  {
    title: "علم میں اضافہ",
    hinglish: "Ilm Mein Izafa",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    urdu: "اے میرے رب! میرے علم میں اضافہ فرما",
  },
  {
    title: "رزق میں برکت",
    hinglish: "Rizq Mein Barkat",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي رِزْقِنَا",
    urdu: "اے اللہ! ہمارے رزق میں برکت عطا فرما",
  },
  {
    title: "دل کی صفائی",
    hinglish: "Dil Ki Safai",
    arabic: "اللَّهُمَّ طَهِّرْ قَلْبِي",
    urdu: "اے اللہ! میرے دل کو پاک فرما",
  },
  {
    title: "ہدایت کی دعا",
    hinglish: "Hidayat Ki Dua",
    arabic: "اللَّهُمَّ اهْدِنِي",
    urdu: "اے اللہ! مجھے ہدایت عطا فرما",
  },
  {
    title: "گناہوں کی معافی",
    hinglish: "Gunahon Ki Maafi",
    arabic: "رَبِّ اغْفِرْ لِي",
    urdu: "اے میرے رب! مجھے بخش دے",
  },
  {
    title: "اولاد کے لیے دعا",
    hinglish: "Aulad Ke Liye Dua",
    arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
    urdu: "اے رب! مجھے نیک اولاد عطا فرما",
  },
  {
    title: "بیماری سے شفا",
    hinglish: "Bimari Se Shifa",
    arabic: "اللَّهُمَّ اشْفِنِي",
    urdu: "اے اللہ! مجھے شفا عطا فرما",
  },
  {
    title: "مشکل آسانی کے لیے",
    hinglish: "Mushkil Asani Ke Liye",
    arabic: "اللَّهُمَّ يَسِّرْ وَلَا تُعَسِّرْ",
    urdu: "اے اللہ! آسانی فرما، مشکل نہ کر",
  },
  {
    title: "صبر کی دعا",
    hinglish: "Sabr Ki Dua",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا",
    urdu: "اے رب! ہم پر صبر نازل فرما",
  },
  {
    title: "دل کے سکون کے لیے",
    hinglish: "Dil Ke Sukoon Ke Liye",
    arabic: "اللَّهُمَّ أَنْزِلِ السَّكِينَةَ فِي قَلْبِي",
    urdu: "اے اللہ! میرے دل میں سکون نازل فرما",
  },
  {
    title: "نیکی کی محبت",
    hinglish: "Neki Ki Mohabbat",
    arabic: "اللَّهُمَّ حَبِّبْ إِلَيَّ الْإِيمَانَ",
    urdu: "اے اللہ! ایمان کو میرے لیے محبوب بنا",
  },
  {
    title: "دل کی مضبوطی",
    hinglish: "Dil Ki Mazbooti",
    arabic: "اللَّهُمَّ ثَبِّتْ قَلْبِي",
    urdu: "اے اللہ! میرے دل کو ثابت قدم رکھ",
  },
  {
    title: "برے خواب سے بچاؤ",
    hinglish: "Bure Khwab Se Bachao",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْحُلْمِ السَّيِّئِ",
    urdu: "اے اللہ! برے خواب سے بچا",
  },
  {
    title: "نیند کے لیے",
    hinglish: "Neend Ke Liye",
    arabic: "اللَّهُمَّ أَنْعِمْ عَلَيَّ بِالنَّوْمِ",
    urdu: "اے اللہ! مجھے اچھی نیند عطا فرما",
  },
  {
    title: "گھر کی برکت",
    hinglish: "Ghar Ki Barkat",
    arabic: "اللَّهُمَّ بَارِكْ فِي بَيْتِنَا",
    urdu: "اے اللہ! ہمارے گھر میں برکت عطا فرما",
  },
  {
    title: "دوستی میں خیر",
    hinglish: "Dosti Mein Khair",
    arabic: "اللَّهُمَّ اجْعَلْ صُحْبَتِي صَالِحَةً",
    urdu: "اے اللہ! مجھے نیک صحبت عطا فرما",
  },
  {
    title: "قبولیت کی دعا",
    hinglish: "Qabooliyat Ki Dua",
    arabic: "اللَّهُمَّ تَقَبَّلْ مِنِّي",
    urdu: "اے اللہ! مجھ سے قبول فرما",
  },
  {
    title: "عبادت کی توفیق",
    hinglish: "Ibadat Ki Taufiq",
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ",
    urdu: "اے اللہ! مجھے اپنی عبادت کی توفیق دے",
  },
  {
    title: "ایمان کی حفاظت",
    hinglish: "Iman Ki Hifazat",
    arabic: "اللَّهُمَّ احْفَظْ إِيمَانِي",
    urdu: "اے اللہ! میرے ایمان کی حفاظت فرما",
  },
  {
    title: "حق پر قائم رہنے کی دعا",
    hinglish: "Haq Par Qaim Rehne Ki Dua",
    arabic: "اللَّهُمَّ ثَبِّتْنِي عَلَى الْحَقِّ",
    urdu: "اے اللہ! مجھے حق پر قائم رکھ",
  },
  {
    title: "بچوں کی حفاظت",
    hinglish: "Bachon Ki Hifazat",
    arabic: "اللَّهُمَّ احْفَظْ أَوْلَادِي",
    urdu: "اے اللہ! میری اولاد کی حفاظت فرما",
  },
  {
    title: "ہر برائی سے بچاؤ",
    hinglish: "Har Burai Se Bachao",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ كُلِّ شَرٍّ",
    urdu: "اے اللہ! ہر برائی سے بچا",
  },
  {
    title: "آخرت کی کامیابی",
    hinglish: "Aakhirat Ki Kamyabi",
    arabic: "اللَّهُمَّ اجْعَلْنِي مِنْ أَهْلِ الْجَنَّةِ",
    urdu: "اے اللہ! مجھے جنت والوں میں شامل فرما",
  },
  {
    title: "چھینک آنے پر",
    hinglish: "Cheenk Aane Par",
    arabic: "الْحَمْدُ لِلَّهِ",
    urdu: "تمام تعریف اللہ کے لیے ہے",
  },
  {
    title: "چھینک کا جواب",
    hinglish: "Cheenk Ka Jawab",
    arabic: "يَرْحَمُكَ اللَّهُ",
    urdu: "اللہ تم پر رحم کرے",
  },
  {
    title: "بارش رکنے کی دعا",
    hinglish: "Barish Rukne Ki Dua",
    arabic: "اللَّهُمَّ حَوَالَيْنَا وَلَا عَلَيْنَا",
    urdu: "اے اللہ! بارش ہمارے آس پاس ہو ہم پر نہ ہو",
  },
  {
    title: "قرض سے نجات",
    hinglish: "Qarz Se Nijat",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ",
    urdu: "اے اللہ! مجھے حلال کے ذریعے حرام سے بچا",
  },
  {
    title: "غم دور کرنے کی دعا",
    hinglish: "Gham Door Karne Ki Dua",
    arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ",
    urdu: "اے اللہ! میں تیرا بندہ ہوں",
  },
  {
    title: "صبح کی دعا",
    hinglish: "Subah Ki Dua",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا",
    urdu: "اے اللہ! ہم نے تیرے نام سے صبح کی",
  },
  {
    title: "شام کی دعا",
    hinglish: "Shaam Ki Dua",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا",
    urdu: "اے اللہ! ہم نے تیرے نام سے شام کی",
  },
  {
    title: "رزق کی آسانی",
    hinglish: "Rizq Ki Asani",
    arabic: "اللَّهُمَّ سَهِّلْ لِي رِزْقِي",
    urdu: "اے اللہ! میرا رزق آسان فرما",
  },
  {
    title: "برکت والی زندگی",
    hinglish: "Barkat Wali Zindagi",
    arabic: "اللَّهُمَّ بَارِكْ لِي فِي عُمْرِي",
    urdu: "اے اللہ! میری عمر میں برکت دے",
  },
  {
    title: "ہر خیر کی دعا",
    hinglish: "Har Khair Ki Dua",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْخَيْرَ كُلَّهُ",
    urdu: "اے اللہ! میں تجھ سے ہر بھلائی مانگتا ہوں",
  },
  {
    title: "دل کی روشنی",
    hinglish: "Dil Ki Roshni",
    arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا",
    urdu: "اے اللہ! میرے دل میں نور پیدا فرما",
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

    {
      title: "گھر سے نکلتے وقت",
      titleHinglish: "Ghar Se Nikalte Waqt",
      arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",
      urdu: "اللہ کے نام سے، میں نے اللہ پر بھروسہ کیا",
      hinglish: "Allah ke naam se, maine Allah par bharosa kiya",
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
          Click on any Dua to read
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto space-y-3">

        {duayein.map((dua, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="bg-white border border-[#eadca6] rounded-xl overflow-hidden shadow-sm"
            >

              {/* Title */}
              {/* Header */}
              <button
                onClick={() => toggleCard(index)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#fffdf7] hover:bg-[#fff8e1] transition rounded-lg border border-[#ead89c]"
              >
                <div className="flex items-center gap-2 flex-wrap text-right">

                  {/* Urdu Title */}
                  <h2
                    className="text-[15px] font-bold text-[#7a5a00]"
                    style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}
                  >
                    {dua.title}
                  </h2>

                  {/* Hinglish */}
                  <span className="text-[13px] text-gray-500 ltr">
                    ({dua.hinglish})
                  </span>
                </div>

                <span className="text-[#7a5a00] text-lg">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">

                      {/* Arabic */}
                      <p className="font-amiri text-[1.15rem] leading-loose text-right text-black mb-3">
                        {dua.arabic}
                      </p>

                      {/* Urdu */}
                      <div className="bg-[#fff9e8] border-r-4 border-[#d4b24c] rounded-md px-3 py-2 mb-2">
                        <p className="urdu text-gray-700 text-[11px] leading-5">
                          {dua.urdu}
                        </p>
                      </div>

                      {/* Hinglish */}
                      <div className="bg-gray-50 rounded-md px-3 py-2">
                        <p className="text-gray-700 text-xs leading-5 ltr">
                          {dua.hinglish}
                        </p>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>
    </div>
  );
}