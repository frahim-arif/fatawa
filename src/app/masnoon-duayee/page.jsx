"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoonStar } from "lucide-react";

export default function MasnoonDuayePage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCard = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const duayein = [
    {
      title: "سونے سے پہلے",
      titleHinglish: "Sone Se Pehle",
      arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
      urdu: "اے اللہ! میں تیرے نام کے ساتھ مرتا اور جیتا ہوں",
      hinglish:
        "Ae Allah! Main tere naam ke saath marta aur jeeta hoon",
    },

    {
      title: "جاگنے کے بعد",
      titleHinglish: "Jaagne Ke Baad",
      arabic:
        "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا",
      urdu:
        "تمام تعریف اللہ کے لیے ہے جس نے ہمیں زندہ کیا",
      hinglish:
        "Tamam tareef Allah ke liye hai jisne hame zinda kiya",
    },

    {
      title: "کھانے سے پہلے",
      titleHinglish: "Khana Khane Se Pehle",
      arabic: "بِسْمِ اللَّهِ",
      urdu: "اللہ کے نام سے شروع",
      hinglish: "Allah ke naam se shuru",
    },

    {
      title: "کھانے کے بعد",
      titleHinglish: "Khana Khane Ke Baad",
      arabic:
        "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا",
      urdu:
        "تمام تعریف اللہ کے لیے ہے جس نے ہمیں کھلایا پلایا",
      hinglish:
        "Tamam tareef Allah ke liye hai jisne hame khilaya pilaya",
    },

    {
      title: "گھر سے نکلتے وقت",
      titleHinglish: "Ghar Se Nikalte Waqt",
      arabic:
        "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",
      urdu:
        "اللہ کے نام سے، میں نے اللہ پر بھروسہ کیا",
      hinglish:
        "Allah ke naam se, maine Allah par bharosa kiya",
    },

    {
      title: "گھر میں داخل ہوتے وقت",
      titleHinglish: "Ghar Mein Dakhil Hote Waqt",
      arabic:
        "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ",
      urdu:
        "اے اللہ! میں داخل ہونے کی بھلائی مانگتا ہوں",
      hinglish:
        "Ae Allah! Main dakhil hone ki bhalai mangta hoon",
    },

    {
      title: "مسجد میں داخل ہوتے وقت",
      titleHinglish: "Masjid Mein Dakhil Hote Waqt",
      arabic:
        "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      urdu:
        "اے اللہ! میرے لیے رحمت کے دروازے کھول دے",
      hinglish:
        "Ae Allah! Mere liye rehmat ke darwaze khol de",
    },

    {
      title: "مسجد سے نکلتے وقت",
      titleHinglish: "Masjid Se Nikalte Waqt",
      arabic:
        "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
      urdu:
        "اے اللہ! میں تیرا فضل مانگتا ہوں",
      hinglish:
        "Ae Allah! Main tera fazal mangta hoon",
    },

    {
      title: "بیت الخلاء میں داخل ہوتے وقت",
      titleHinglish: "Bathroom Mein Jane Ki Dua",
      arabic:
        "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
      urdu:
        "اے اللہ! میں ناپاک چیزوں سے تیری پناہ مانگتا ہوں",
      hinglish:
        "Ae Allah! Main napaak cheezon se teri panah mangta hoon",
    },

    {
      title: "بیت الخلاء سے نکلتے وقت",
      titleHinglish: "Bathroom Se Nikalne Ki Dua",
      arabic: "غُفْرَانَكَ",
      urdu: "اے اللہ! مجھے معاف فرما",
      hinglish: "Ae Allah! Mujhe maaf farma",
    },

    {
      title: "سفر کی دعا",
      titleHinglish: "Safar Ki Dua",
      arabic:
        "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا",
      urdu:
        "پاک ہے وہ جس نے اسے ہمارے لیے مسخر کیا",
      hinglish:
        "Paak hai woh jisne ise hamare liye musakhkhar kiya",
    },

    {
      title: "بارش کے وقت",
      titleHinglish: "Barish Ke Waqt",
      arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
      urdu:
        "اے اللہ! اسے نفع بخش بارش بنا",
      hinglish:
        "Ae Allah! Isay nafa bakhsh barish bana",
    },

    {
      title: "غصہ آنے پر",
      titleHinglish: "Gussa Aane Par",
      arabic:
        "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      urdu:
        "میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں",
      hinglish:
        "Main shaitan mardood se Allah ki panah mangta hoon",
    },

    {
      title: "مصیبت میں",
      titleHinglish: "Museebat Mein",
      arabic:
        "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
      urdu:
        "ہم اللہ کے ہیں اور اسی کی طرف لوٹنے والے ہیں",
      hinglish:
        "Hum Allah ke hain aur usi ki taraf lautne wale hain",
    },

    {
      title: "علم میں اضافہ",
      titleHinglish: "Ilm Mein Izafa",
      arabic: "رَبِّ زِدْنِي عِلْمًا",
      urdu:
        "اے میرے رب! میرے علم میں اضافہ فرما",
      hinglish:
        "Ae mere Rab! Mere ilm mein izafa farma",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ef] px-3 py-4">

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-5">

        <div className="inline-flex items-center gap-2 bg-[#d8bb63] text-black px-4 py-1.5 rounded-full shadow-sm">
          <MoonStar size={15} />
          <span className="text-xs tracking-wide font-medium">
            Masnoon Islamic Duayein
          </span>
        </div>

        <h1
          className="mt-3 text-3xl font-bold text-[#8a6a00]"
          style={{
            fontFamily: "'Jameel Noori Nastaleeq', serif",
          }}
        >
          📿 مسنون دعائیں
        </h1>

        <p className="text-gray-600 mt-1 text-xs">
          Click any dua to read
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

              {/* Header */}
              <button
                onClick={() => toggleCard(index)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#fffdf7] hover:bg-[#fff8e1] transition"
              >

                <div className="flex items-center gap-2 flex-wrap">

                  {/* Urdu */}
                  <h2
                    className="text-[14px] font-bold text-[#7a5a00]"
                    style={{
                      fontFamily:
                        "'Jameel Noori Nastaleeq', serif",
                    }}
                  >
                    {dua.title}
                  </h2>

                  {/* Hinglish */}
                  <span className="text-[12px] text-gray-500 ltr">
                    ({dua.titleHinglish})
                  </span>
                </div>

                {/* Plus Minus */}
                <span className="text-[#7a5a00] text-lg font-bold">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {/* Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >

                    <div className="p-4">

                      {/* Arabic */}
                      <p className="font-amiri text-[1.05rem] leading-loose text-right text-black mb-3">
                        {dua.arabic}
                      </p>

                      {/* Urdu */}
                      <div className="bg-[#fff9e8] border-r-4 border-[#d4b24c] rounded-md px-3 py-2 mb-2">
                        <p
                          className="text-gray-700 text-[11px] leading-5"
                          style={{
                            fontFamily:
                              "'Jameel Noori Nastaleeq', serif",
                          }}
                        >
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