"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";

const hadithList = [
  {
    number: 1,
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    translation: "Aamal ka daromadar niyyaton par hai.",
    explanation:
      "Allah amal se pehle niyyat dekhta hai. Niyyat sahi ho to amal qabool hota hai.",
  },
  {
    number: 2,
    arabic: "الدِّينُ النَّصِيْحَةُ",
    translation: "Deen naseehat ka naam hai.",
    explanation:
      "Har Muslim ko doston aur ghar walon ki bhalai chahni chahiye.",
  },
  {
    number: 3,
    arabic:
      "مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيْهِ",
    translation:
      "Achi Islam yeh hai ke insan bekaar baatein chhod de.",
    explanation:
      "Fuzool aur la-yani kaam se door rehna akhlaq ki bunyad hai.",
  },
  {
    number: 4,
    arabic:
      "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيْهِ مَا يُحِبُّ لِنَفْسِهِ",
    translation:
      "Iman mukammal nahi jab tak bhai ke liye wohi na chahe jo apne liye chahta hai.",
    explanation:
      "Husn-e-akhlaq ki bunyadi taleem.",
  },
  {
    number: 5,
    arabic: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
    translation: "Acha bolna sadaqah hai.",
    explanation:
      "Mithaas aur pyaar se baat karna bhi ibadat hai.",
  },
];

export default function FortyHadithFree() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCard = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#faf8ef] px-3 py-5">

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-6">

        <div className="inline-flex items-center gap-2 bg-[#d4b24c] text-black px-4 py-1.5 rounded-full shadow-sm">
          <BookOpen size={15} />
          <span className="text-xs font-medium tracking-wide">
            Islamic 40 Ahadith
          </span>
        </div>

        <h1
          className="mt-3 text-3xl font-bold text-[#8a6a00]"
          style={{
            fontFamily: "'Jameel Noori Nastaleeq', serif",
          }}
        >
          📖 40 احادیث
        </h1>

        <p className="text-gray-600 text-xs mt-1">
          Click any Hadith to read
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto space-y-3">

        {hadithList.map((h, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={h.number}
              className="bg-white border border-[#eadca6] rounded-xl overflow-hidden shadow-sm"
            >

              {/* Header */}
              <button
                onClick={() => toggleCard(index)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#fffdf7] hover:bg-[#fff8e1] transition"
              >

                <div className="flex items-center gap-2">

                  {/* Number */}
                  <span className="bg-[#d4b24c] text-black text-[11px] px-2 py-1 rounded-full font-semibold">
                    {h.number}
                  </span>

                  {/* Urdu Title */}
                  <h2
                    className="text-[15px] font-bold text-[#7a5a00]"
                    style={{
                      fontFamily:
                        "'Jameel Noori Nastaleeq', serif",
                    }}
                  >
                    حدیث
                  </h2>

                </div>

                {/* Dropdown Icon */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown
                    className="text-[#7a5a00]"
                    size={18}
                  />
                </motion.div>

              </button>

              {/* Dropdown Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >

                    <div className="p-4">

                      {/* Arabic */}
                      <div className="bg-[#fffdf6] border border-[#f0e2a8] rounded-lg px-4 py-3 mb-3">
                        <p className="text-right text-[22px] leading-loose text-black">
                          {h.arabic}
                        </p>
                      </div>

                      {/* Translation */}
                      <div className="bg-[#fff9e8] border-r-4 border-[#d4b24c] rounded-md px-3 py-2 mb-2">
                        <p
                          className="text-[12px] text-gray-700 leading-5"
                          style={{
                            fontFamily:
                              "'Jameel Noori Nastaleeq', serif",
                          }}
                        >
                          <span className="font-bold text-[#7a5a00]">
                            ترجمہ:
                          </span>{" "}
                          {h.translation}
                        </p>
                      </div>

                      {/* Explanation */}
                      <div className="bg-gray-50 rounded-md px-3 py-2">
                        <p className="text-[12px] text-gray-700 leading-5">
                          <span className="font-semibold text-[#7a5a00]">
                            Explanation:
                          </span>{" "}
                          {h.explanation}
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