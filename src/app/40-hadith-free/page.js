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
  {
  number: 6,
  arabic: "مَنْ لَا يَرْحَمْ لَا يُرْحَمْ",
  translation: "Jo reham nahi karta us par reham nahi kiya jata.",
  explanation: "Sab makhlooq par rahm dil hona chahiye.",
},
{
  number: 7,
  arabic: "المُسْلِمُ مَنْ سَلِمَ المُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
  translation: "Muslim woh hai jiske zaban aur haath se log mehfooz rahen.",
  explanation: "Ghibat aur badzabani se bachna zaroori hai.",
},
{
  number: 8,
  arabic: "لَا تَغْضَبْ",
  translation: "Gussa mat karo.",
  explanation: "Gussa insaan ko gunaah ki taraf le jata hai.",
},
{
  number: 9,
  arabic: "بُنِيَ الإِسْلَامُ عَلَى خَمْسٍ",
  translation: "Islam 5 cheezon par qaim hai.",
  explanation: "Kalima, Namaz, Roza, Zakat aur Hajj Islam ki bunyad hain.",
},
{
  number: 10,
  arabic: "إِنَّ اللّٰهَ طَيِّبٌ لَا يَقْبَلُ إِلَّا طَيِّبًا",
  translation: "Allah paak hai aur paak cheez hi qabool karta hai.",
  explanation: "Halal rizq aur paak niyyat bohot zaroori hai.",
},
{
  number: 11,
  arabic: "الدُّعَاءُ مُخُّ الْعِبَادَةِ",
  translation: "Dua ibadat ka saar hai.",
  explanation: "Allah se dua karna momin ki taqat hai.",
},
{
  number: 12,
  arabic: "الْمَرْءُ مَعَ مَنْ أَحَبَّ",
  translation: "Insaan usi ke saath hoga jise woh mohabbat karta hai.",
  explanation: "Nek logon se mohabbat jannat ka sabab hai.",
},
{
  number: 13,
  arabic: "الطُّهُوْرُ شَطْرُ الإِيْمَانِ",
  translation: "Paki imaan ka aadha hissa hai.",
  explanation: "Safai aur taharat Islam ka aham hissa hai.",
},
{
  number: 14,
  arabic: "الصَّدَقَةُ تُطْفِئُ غَضَبَ الرَّبِّ",
  translation: "Sadaqah Allah ke gusse ko bujha deta hai.",
  explanation: "Sadaqah dene se musibat door hoti hai.",
},
{
  number: 15,
  arabic: "مَنْ غَشَّ فَلَيْسَ مِنَّا",
  translation: "Jo dhoka de woh hum mein se nahi.",
  explanation: "Dhoka dena Islam me sakht mana hai.",
},
{
  number: 16,
  arabic: "الْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ",
  translation: "Haya imaan ka hissa hai.",
  explanation: "Sharm o haya momin ki pehchan hai.",
},
{
  number: 17,
  arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
  translation: "Muskurana bhi sadaqah hai.",
  explanation: "Ache akhlaq aur muskurahat sunnat hai.",
},
{
  number: 18,
  arabic: "الصَّبْرُ ضِيَاءٌ",
  translation: "Sabr roshni hai.",
  explanation: "Sabr karne wale Allah ko pasand hain.",
},
{
  number: 19,
  arabic: "مَنْ تَوَاضَعَ لِلّٰهِ رَفَعَهُ",
  translation: "Jo Allah ke liye jhukta hai Allah usko buland karta hai.",
  explanation: "Takabbur se bachna aur ajzi ikhtiyar karna chahiye.",
},
{
  number: 20,
  arabic: "الْجَنَّةُ تَحْتَ أَقْدَامِ الْأُمَّهَاتِ",
  translation: "Jannat maa ke qadmon ke neeche hai.",
  explanation: "Maa ki khidmat bohot badi ibadat hai.",
},
{
  number: 21,
  arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
  translation: "Behtareen insan woh hai jo logon ko zyada faida de.",
  explanation: "Dusron ki madad karna afzal amal hai.",
},
{
  number: 22,
  arabic: "مَنْ كَانَ يُؤْمِنُ بِاللّٰهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
  translation: "Achi baat bolo ya chup raho.",
  explanation: "Zaban ki hifazat bohot zaroori hai.",
},
{
  number: 23,
  arabic: "طُلُوبُ الْعِلْمِ فَرِيضَةٌ",
  translation: "Ilm hasil karna farz hai.",
  explanation: "Har Muslim ko deen ka ilm seekhna chahiye.",
},
{
  number: 24,
  arabic: "الدُّنْيَا مَزْرَعَةُ الْآخِرَةِ",
  translation: "Duniya aakhirat ki kheti hai.",
  explanation: "Aaj ke amal kal ka natija hain.",
},
{
  number: 25,
  arabic: "لَا تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا",
  translation: "Kisi bhi nek kaam ko chhota na samjho.",
  explanation: "Har neki Allah ke nazdeek qeemti hai.",
},
{
  number: 26,
  arabic: "الْمَرْءُ عَلَى دِيْنِ خَلِيْلِهِ",
  translation: "Insaan apne dost ke deen par hota hai.",
  explanation: "Ache doston ka intekhab zaroori hai.",
},
{
  number: 27,
  arabic: "إِنَّ اللّٰهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
  translation: "Allah khoobsurti ko pasand karta hai.",
  explanation: "Safai aur husn-e-akhlaq pasandeeda hain.",
},
{
  number: 28,
  arabic: "الرِّزْقُ مَقْسُومٌ",
  translation: "Rizq taqseem ho chuka hai.",
  explanation: "Allah par bharosa rakhna chahiye.",
},
{
  number: 29,
  arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ",
  translation: "Duniya momin ke liye qaidkhana hai.",
  explanation: "Asal kamyabi aakhirat me hai.",
},
{
  number: 30,
  arabic: "إِنَّ اللّٰهَ فِيْ عَوْنِ الْعَبْدِ",
  translation: "Allah bande ki madad karta hai.",
  explanation: "Jo dusron ki madad karta hai Allah uski madad karta hai.",
},
{
  number: 31,
  arabic: "مَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللّٰهُ",
  translation: "Jo Muslim ki khata chhupaye Allah uski khata chhupata hai.",
  explanation: "Logo ki izzat ki hifazat karo.",
},
{
  number: 32,
  arabic: "الْمُؤْمِنُ مِرْآةُ أَخِيهِ",
  translation: "Momin apne bhai ka aaeena hota hai.",
  explanation: "Ache tareeqe se islah karni chahiye.",
},
{
  number: 33,
  arabic: "السَّفَرُ قِطْعَةٌ مِنَ الْعَذَابِ",
  translation: "Safar azaab ka tukda hai.",
  explanation: "Safar me dua aur sabr zaroori hai.",
},
{
  number: 34,
  arabic: "الْخَلْقُ كُلُّهُمْ عِيَالُ اللّٰهِ",
  translation: "Saari makhlooq Allah ka gharana hai.",
  explanation: "Sab ke saath acha sulook karo.",
},
{
  number: 35,
  arabic: "إِنَّ الْمَلَائِكَةَ لَتَضَعُ أَجْنِحَتَهَا لِطَالِبِ الْعِلْمِ",
  translation: "Farishtay talab-e-ilm ke liye apne par bichhate hain.",
  explanation: "Ilm hasil karna bohot fazilat wala amal hai.",
},
{
  number: 36,
  arabic: "الْوَاحِدُ لَا يُؤْكَلُ",
  translation: "Akele rehna munasib nahi.",
  explanation: "Jamaat ke saath rehna barkat hai.",
},
{
  number: 37,
  arabic: "لَا يَدْخُلُ الْجَنَّةَ مَنْ كَانَ فِي قَلْبِهِ كِبْرٌ",
  translation: "Takabbur wala jannat me nahi jayega.",
  explanation: "Ajzi aur narmi ikhtiyar karo.",
},
{
  number: 38,
  arabic: "الْجَارُ ثُمَّ الدَّارُ",
  translation: "Pehle padosi phir ghar.",
  explanation: "Ache padosi ki ahmiyat Islam me bohot zyada hai.",
},
{
  number: 39,
  arabic: "الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى",
  translation: "Dene wala haath lene wale haath se behtar hai.",
  explanation: "Sadaqah aur madad karna afzal amal hai.",
},
{
  number: 40,
  arabic: "الدُّنْيَا فَانِيَةٌ وَالْآخِرَةُ بَاقِيَةٌ",
  translation: "Duniya fani hai aur aakhirat hamesha rehne wali hai.",
  explanation: "Aakhirat ki tayyari karni chahiye.",
},
{
  number: 41,
  arabic: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ",
  translation: "Taakatwar woh nahi jo kushti me jeete.",
  explanation: "Asal taqat gusse ko control karna hai.",
},
{
  number: 42,
  arabic: "أَفْضَلُ الصَّدَقَةِ سَقْيُ الْمَاءِ",
  translation: "Behtareen sadaqah paani pilana hai.",
  explanation: "Pyaase ko paani pilana bohot bada sawab hai.",
},
{
  number: 43,
  arabic: "إِذَا أَحَبَّ اللّٰهُ عَبْدًا ابْتَلَاهُ",
  translation: "Allah jis se mohabbat karta hai usko aazmata hai.",
  explanation: "Musibat momin ke liye imtihan hoti hai.",
},
{
  number: 44,
  arabic: "الطَّاعِمُ الشَّاكِرُ بِمَنْزِلَةِ الصَّائِمِ الصَّابِرِ",
  translation: "Shukr karne wala khane wala bhi sawab me roza daar jaisa hai.",
  explanation: "Allah ka shukr ada karna zaroori hai.",
},
{
  number: 45,
  arabic: "إِنَّ أَحَبَّ الأَعْمَالِ إِلَى اللّٰهِ أَدْوَمُهَا",
  translation: "Allah ko woh amal pasand hai jo hamesha kiya jaye.",
  explanation: "Chhota lekin lagataar amal afzal hai.",
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
                        {/* Arabic Hadith */}
                        <p className="font-amiri text-[1.05rem] leading-loose text-right text-black mb-3">
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