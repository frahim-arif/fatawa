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
      title: "صبح اٹھنے کی دعا",
      titleHinglish: "Subah Uthne Ki Dua",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي",
      urdu: "تمام تعریف اللہ کے لیے ہے جس نے میرے جسم کو عافیت دی",
      hinglish: "Tamam tareef Allah ke liye hai jisne mere jism ko afiyat di",
    },

    {
      title: "وضو سے پہلے",
      titleHinglish: "Wuzu Se Pehle",
      arabic: "بِسْمِ اللَّهِ",
      urdu: "اللہ کے نام سے شروع",
      hinglish: "Allah ke naam se shuru",
    },

    {
      title: "وضو کے بعد",
      titleHinglish: "Wuzu Ke Baad",
      arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ",
      urdu: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں",
      hinglish: "Main gawahi deta hoon ke Allah ke siwa koi mabood nahi",
    },

    {
      title: "اذان کے بعد",
      titleHinglish: "Azan Ke Baad",
      arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ",
      urdu: "اے اللہ! اس کامل دعوت کے رب",
      hinglish: "Ae Allah! Is kamil dawat ke Rab",
    },

    {
      title: "نماز کے بعد",
      titleHinglish: "Namaz Ke Baad",
      arabic: "أَسْتَغْفِرُ اللَّهَ",
      urdu: "میں اللہ سے معافی مانگتا ہوں",
      hinglish: "Main Allah se maafi mangta hoon",
    },

    {
      title: "استغفار",
      titleHinglish: "Istighfar",
      arabic: "أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ",
      urdu: "میں اپنے رب اللہ سے ہر گناہ کی معافی مانگتا ہوں",
      hinglish: "Main apne Rab Allah se har gunah ki maafi mangta hoon",
    },

    {
      title: "والدین کے لیے دعا",
      titleHinglish: "Walidain Ke Liye Dua",
      arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
      urdu: "اے رب! ان پر رحم فرما جیسے انہوں نے بچپن میں میری پرورش کی",
      hinglish: "Ae Rab! Un par reham farma jaise unhone bachpan mein meri parwarish ki",
    },

    {
      title: "جنت کی دعا",
      titleHinglish: "Jannat Ki Dua",
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ",
      urdu: "اے اللہ! میں تجھ سے جنت مانگتا ہوں",
      hinglish: "Ae Allah! Main tujhse jannat mangta hoon",
    },

    {
      title: "جہنم سے پناہ",
      titleHinglish: "Jahannam Se Panah",
      arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
      urdu: "اے اللہ! مجھے جہنم سے بچا",
      hinglish: "Ae Allah! Mujhe jahannam se bacha",
    },

    {
      title: "بارش رکنے کے بعد",
      titleHinglish: "Barish Rukne Ke Baad",
      arabic: "مُطِرْنَا بِفَضْلِ اللَّهِ",
      urdu: "ہم پر اللہ کے فضل سے بارش ہوئی",
      hinglish: "Hum par Allah ke fazal se barish hui",
    },

    {
      title: "چاند دیکھنے کی دعا",
      titleHinglish: "Chand Dekhne Ki Dua",
      arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالإِيمَانِ",
      urdu: "اے اللہ! اس چاند کو ہمارے لیے امن اور ایمان والا بنا",
      hinglish: "Ae Allah! Is chand ko hamare liye aman aur iman wala bana",
    },

    {
      title: "میت کے لیے دعا",
      titleHinglish: "Mayyat Ke Liye Dua",
      arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ",
      urdu: "اے اللہ! اسے بخش دے اور اس پر رحم فرما",
      hinglish: "Ae Allah! Use bakhsh de aur us par reham farma",
    },

    {
      title: "قبرستان میں داخل ہوتے وقت",
      titleHinglish: "Qabristan Mein Dakhil Hote Waqt",
      arabic: "السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ",
      urdu: "اے قبرو والو! تم پر سلام ہو",
      hinglish: "Ae qabro walo! Tum par salam ho",
    },

    {
      title: "دعا قنوت",
      titleHinglish: "Dua Qunoot",
      arabic: "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ",
      urdu: "اے اللہ! ہم تجھ سے مدد چاہتے ہیں",
      hinglish: "Ae Allah! Hum tujhse madad chahte hain",
    },

    {
      title: "غم سے نجات",
      titleHinglish: "Gham Se Nijat",
      arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
      urdu: "اللہ ہمارے لیے کافی ہے اور وہ بہترین کارساز ہے",
      hinglish: "Allah hamare liye kaafi hai aur woh behtareen karsaz hai",
    },

    {
      title: "شیطان سے حفاظت",
      titleHinglish: "Shaitan Se Hifazat",
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      urdu: "میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں",
      hinglish: "Main shaitan mardood se Allah ki panah mangta hoon",
    },

    {
      title: "رزق بڑھنے کی دعا",
      titleHinglish: "Rizq Barhne Ki Dua",
      arabic: "اللَّهُمَّ ارْزُقْنِي رِزْقًا حَلَالًا",
      urdu: "اے اللہ! مجھے حلال رزق عطا فرما",
      hinglish: "Ae Allah! Mujhe halal rizq ata farma",
    },

    {
      title: "نیا لباس پہننے کی دعا",
      titleHinglish: "Naya Libas Pehne Ki Dua",
      arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ",
      urdu: "اے اللہ! تیرا شکر ہے تو نے مجھے یہ لباس پہنایا",
      hinglish: "Ae Allah! Tera shukar hai tune mujhe ye libas pehnaya",
    },

    {
      title: "بازار میں داخل ہوتے وقت",
      titleHinglish: "Bazaar Mein Dakhil Hote Waqt",
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
      urdu: "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے",
      hinglish: "Allah ke siwa koi mabood nahi, woh akela hai",
    },

    {
      title: "سواری پر بیٹھنے کی دعا",
      titleHinglish: "Sawari Par Baithne Ki Dua",
      arabic: "بِسْمِ اللَّهِ وَالْحَمْدُ لِلَّهِ",
      urdu: "اللہ کے نام سے اور تمام تعریف اللہ کے لیے ہے",
      hinglish: "Allah ke naam se aur tamam tareef Allah ke liye hai",
    },

    {
      title: "بجلی کڑکنے کے وقت",
      titleHinglish: "Bijli Karakne Ke Waqt",
      arabic: "اللَّهُمَّ لَا تَقْتُلْنَا بِغَضَبِكَ",
      urdu: "اے اللہ! ہمیں اپنے غضب سے ہلاک نہ کر",
      hinglish: "Ae Allah! Hame apne ghazab se halak na kar",
    },

    {
      title: "درد کی دعا",
      titleHinglish: "Dard Ki Dua",
      arabic: "بِسْمِ اللَّهِ",
      urdu: "اللہ کے نام سے",
      hinglish: "Allah ke naam se",
    },

    {
      title: "توبہ کی دعا",
      titleHinglish: "Tauba Ki Dua",
      arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ",
      urdu: "اے میرے رب! مجھے معاف فرما اور میری توبہ قبول فرما",
      hinglish: "Ae mere Rab! Mujhe maaf farma aur meri tauba qubool farma",
    },

    {
      title: "دشمن پر غلبہ",
      titleHinglish: "Dushman Par Ghalba",
      arabic: "اللَّهُمَّ انْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
      urdu: "اے اللہ! کافروں کے مقابلے میں ہماری مدد فرما",
      hinglish: "Ae Allah! Kafiron ke muqable mein hamari madad farma",
    },

    {
      title: "اچھی اولاد کی دعا",
      titleHinglish: "Achi Aulad Ki Dua",
      arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
      urdu: "اے رب! مجھے نیک اولاد عطا فرما",
      hinglish: "Ae Rab! Mujhe nek aulad ata farma",
    },

    {
      title: "سچی بات کی دعا",
      titleHinglish: "Sachchi Baat Ki Dua",
      arabic: "وَقُولُوا قَوْلًا سَدِيدًا",
      urdu: "اور سیدھی بات کہا کرو",
      hinglish: "Aur seedhi baat kaha karo",
    },

    {
      title: "حفاظت کی دعا",
      titleHinglish: "Hifazat Ki Dua",
      arabic: "اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ",
      urdu: "اے اللہ! مجھے ہر طرف سے محفوظ فرما",
      hinglish: "Ae Allah! Mujhe har taraf se mehfooz farma",
    },

    {
      title: "بے چینی دور کرنے کی دعا",
      titleHinglish: "Bechaini Door Karne Ki Dua",
      arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
      urdu: "اللہ کے بغیر نہ طاقت ہے نہ قوت",
      hinglish: "Allah ke baghair na taqat hai na quwwat",
    },

    {
      title: "دل نرم ہونے کی دعا",
      titleHinglish: "Dil Naram Hone Ki Dua",
      arabic: "اللَّهُمَّ لَيِّنْ قَلْبِي",
      urdu: "اے اللہ! میرے دل کو نرم فرما",
      hinglish: "Ae Allah! Mere dil ko naram farma",
    },

    {
      title: "کام میں آسانی",
      titleHinglish: "Kaam Mein Asani",
      arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
      urdu: "اے میرے رب! میرا سینہ کھول دے",
      hinglish: "Ae mere Rab! Mera seena khol de",
    },
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