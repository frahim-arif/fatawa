"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MoonStar } from "lucide-react";

export default function MasnoonDuayePage() {
  const [openIndex, setOpenIndex] = useState(null);

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
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full flex items-center justify-between px-4 py-3 bg-[#efe2a8]"
              >
                <div className="text-right">
                  <h2 className="urdu text-[#6d5200] text-lg font-bold">
                    {dua.title}
                  </h2>

                  <p className="text-[11px] text-[#7a6730] ltr text-left">
                    {dua.titleHinglish}
                  </p>
                </div>

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
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