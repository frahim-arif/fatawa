export const metadata = {
  title: "40 Ahadith (Free) | Maslak e Deoband",
  description: "Free access: 40 Ahadith with Urdu explanations.",
};

const hadithList = [
  {
    number: 1,
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    translation: "Aamal ka daromadar niyyaton par hai.",
    explanation: "Allah amal se pehle niyyat dekhta hai. Niyyat sahi ho to amal qabool hota hai.",
  },
  {
    number: 2,
    arabic: "الدِّينُ النَّصِيْحَةُ",
    translation: "Deen naseehat ka naam hai.",
    explanation: "Har Muslim ko doston aur ghar walon ki bhalai chahni chahiye.",
  },
  {
    number: 3,
    arabic: "مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيْهِ",
    translation: "Achi Islam yeh hai ke insan bekaar baatein chhod de.",
    explanation: "Fuzool aur la-yani kaam se door rehna akhlaq ki bunyad hai.",
  },
  {
    number: 4,
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيْهِ مَا يُحِبُّ لِنَفْسِهِ",
    translation: "Iman mukammal nahi jab tak bhai ke liye wohi na chahe jo apne liye chahta hai.",
    explanation: "Husn-e-akhlāq ki bunyadi taleem.",
  },
  {
    number: 5,
    arabic: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
    translation: "Acha bolna sadaqah hai.",
    explanation: "Mithaas aur pyaar se baat karna ibadat hai.",
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
    explanation: "Ghibat, badzabani aur zulm se parhez farz hai.",
  },
  {
    number: 8,
    arabic: "لَا تَغْضَبْ",
    translation: "Gussa mat karo.",
    explanation: "Gussa akhlaq aur ibadat ko barbaad kar deta hai.",
  },
  {
    number: 9,
    arabic: "بُنِيَ الإِسْلَامُ عَلَى خَمْسٍ",
    translation: "Islam 5 cheezon par qaim hai.",
    explanation: "Kalima, Namaz, Roza, Zakat, Hajj.",
  },
  {
    number: 10,
    arabic: "إِنَّ اللّٰهَ طَيِّبٌ لَا يَقْبَلُ إِلَّا طَيِّبًا",
    translation: "Allah paak hai, paak hi cheez qabool karta hai.",
    explanation: "Halal rizq aur paak niyyat zaroori hai.",
  },

  // 🔥 Now Hadith 11 – 40  
  {
    number: 11,
    arabic: "الدُّعَاءُ مُخُّ الْعِبَادَةِ",
    translation: "Dua ibadat ka saar hai.",
    explanation: "Muslim hamesha Allah se mangta rahe.",
  },
  {
    number: 12,
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يَكُونَ هَوَاهُ تَبَعًا لِمَا جِئْتُ بِهِ",
    translation: "Iman mukammal nahi jab tak hawa-e-nafs deen ke mutabiq na ho.",
    explanation: "Deen ko apni pasand par tarjeeh dena iman ki nishani.",
  },
  {
    number: 13,
    arabic: "الْمَرْءُ مَعَ مَنْ أَحَبَّ",
    translation: "Insaan usi ke saath hoga jise woh pyar karta hai.",
    explanation: "Nek logon se muhabbat humko unke saath jannat me karegi.",
  },
  {
    number: 14,
    arabic: "إِنَّ اللّٰهَ فِيْ عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِيْ عَوْنِ أَخِيْهِ",
    translation: "Allah bande ki madad karta hai jab tak banda dusre ki madad kare.",
    explanation: "Madadgari Allah ki rehmat ke darwaze kholti hai.",
  },
  {
    number: 15,
    arabic: "مَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللّٰهُ",
    translation: "Jo Muslim ki khata chhupaye, Allah uski khata chhupata hai.",
    explanation: "Logo ki izzat aur pardah bacchana zaroori.",
  },
  {
    number: 16,
    arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ",
    translation: "Duniya momin ke liye qaidkhana hai.",
    explanation: "Momin ki asal zindagi aakhirat me hogi.",
  },
  {
    number: 17,
    arabic: "الطُّهُوْرُ شَطْرُ الإِيْمَانِ",
    translation: "Paki imaan ka aadha hissa hai.",
    explanation: "Taharat, wuzu, safai Islam me bohot aham.",
  },
  {
    number: 18,
    arabic: "الصَّدَقَةُ تُطْفِئُ غَضَبَ الرَّبِّ",
    translation: "Sadaqah Allah ke gusse ko bujha deta hai.",
    explanation: "Sadaqah musibatein door karta hai.",
  },
  {
    number: 19,
    arabic: "مَنْ غَشَّ فَلَيْسَ مِنَّا",
    translation: "Jo dhoka de woh hum me se nahi.",
    explanation: "Dhoka har surat haram hai.",
  },
  {
    number: 20,
    arabic: "الْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ",
    translation: "Haya imaan ka hissa hai.",
    explanation: "Be-hayai se imaan kamzor hota hai.",
  },
  {
    number: 21,
    arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
    translation: "Muskurana bhi sadaqah hai.",
    explanation: "Narmi se pesh aana sunnat hai.",
  },
  {
    number: 22,
    arabic: "لَا يَدْخُلُ الْجَنَّةَ مَنْ كَانَ فِي قَلْبِهِ مِثْقَالُ ذَرَّةٍ مِنْ كِبْرٍ",
    translation: "Jiske dil me zara barabar bhi takabbur ho woh jannat me nahi jayega.",
    explanation: "Takabbur sab gunaahon ki jarr.",
  },
  {
    number: 23,
    arabic: "إِنَّ اللّٰهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
    translation: "Allah khoobsurti ko pasand karta hai.",
    explanation: "Safai, tarteeb aur husn-e-akhlaq pasandeeda hain.",
  },
  {
    number: 24,
    arabic: "الصَّبْرُ ضِيَاءٌ",
    translation: "Sabr roshni hai.",
    explanation: "Mushkilat ko sabr se zahil karna momin ki shan.",
  },
  {
    number: 25,
    arabic: "مَنْ تَوَاضَعَ لِلّٰهِ رَفَعَهُ",
    translation: "Jo Allah ke liye tawazu ikhtiyar karta hai, Allah usko buland karta hai.",
    explanation: "Inkisari izzat ka sabab banti hai.",
  },
  {
    number: 26,
    arabic: "الْجَنَّةُ تَحْتَ أَقْدَامِ الْأُمَّهَاتِ",
    translation: "Jannat maaon ke qadmon ke neeche hai.",
    explanation: "Maan ka adab aur khidmat farz hai.",
  },
  {
    number: 27,
    arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
    translation: "Behtareen insan woh hai jo sab se zyada logon ko faida de.",
    explanation: "Insaniyat ki khidmat sab se afzal.",
  },
  {
    number: 28,
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللّٰهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    translation: "Jo Allah aur Aakhirat par imaan rakhta hai woh ya achi baat bole ya chup rahe.",
    explanation: "Zubaan ki hifazat imaan ki asli nishani.",
  },
  {
    number: 29,
    arabic: "إِنَّ الْمَلَائِكَةَ لَتَضَعُ أَجْنِحَتَهَا لِطَالِبِ الْعِلْمِ",
    translation: "Farishtay talab-e-ilm ke raaste me apne par bichhate hain.",
    explanation: "Ilm hasil karna izzat aur barkat ka sabab.",
  },
  {
    number: 30,
    arabic: "طُلُوبُ الْعِلْمِ فَرِيضَةٌ",
    translation: "Ilm hasil karna farz hai (har Muslim par).",
    explanation: "Ilm ke baghair deen aur duniya kamil nahi.",
  },
  {
    number: 31,
    arabic: "الْخَلْقُ كُلُّهُمْ عِيَالُ اللّٰهِ",
    translation: "Makhlooq sab Allah ka gharana hai.",
    explanation: "Logo ke saath husn-e-sulook karo.",
  },
  {
    number: 32,
    arabic: "الْمُؤْمِنُ مِرْآةُ أَخِيهِ",
    translation: "Momin apne bhai ka aaeena hota hai.",
    explanation: "Narmi se ghaltiyon ki islah karna sunnat hai.",
  },
  {
    number: 33,
    arabic: "الرِّزْقُ مَقْسُومٌ",
    translation: "Rizq taqseem ho chuka hai.",
    explanation: "Hasad se bachna aur tawakkul karna zaroori.",
  },
  {
    number: 34,
    arabic: "الدُّنْيَا مَزْرَعَةُ الْآخِرَةِ",
    translation: "Duniya aakhirat ki kheti hai.",
    explanation: "Yahan ke amal kal ka anjaam banate hain.",
  },
  {
    number: 35,
    arabic: "لَا تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا",
    translation: "Kisi bhi chhoti nek kaam ko haqar na samjho.",
    explanation: "Chhoti neikiyan bhi bohot qeemti hoti hain.",
  },
  {
    number: 36,
    arabic: "الْمَرْءُ عَلَى دِيْنِ خَلِيْلِهِ",
    translation: "Insaan apne dost ke deen par hota hai.",
    explanation: "Nek saathi chuno — buray saathi tabahi hain.",
  },
  {
    number: 37,
    arabic: "الْجِرَانُ ثَلَاثَةٌ",
    translation: "Hamsayon ke 3 huqooq hote hain.",
    explanation: "Islam me padosi ko azaab dena sakht gunaah.",
  },
  {
    number: 38,
    arabic: "الْوَاحِدُ لَا يُؤْكَلُ",
    translation: "Akele rehna munasib nahi.",
    explanation: "Muslim jamaat ke saath rahe — fawaaid zyada.",
  },
  {
    number: 39,
    arabic: "السَّفَرُ قِطْعَةٌ مِنَ الْعَذَابِ",
    translation: "Safar azaab ka tukra hai.",
    explanation: "Safar me sabr aur dua ki zaroorat.",
  },
  {
    number: 40,
    arabic: "الدُّنْيَا فَانِيَةٌ وَالْآخِرَةُ بَاقِيَةٌ",
    translation: "Duniya fani hai, aakhirat baqi hai.",
    explanation: "Apni mehnat aakhirat ke liye rakho.",
  },
];

export default function FortyHadithFree() {
  return (
    <div className="py-8 px-4 max-w-4xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-3xl font-bold text-green-700 mb-4">40 Ahadith (Free)</h1>
      <p className="mb-6 text-gray-700">
        Complete 40 Ahadith with Urdu translation and short explanation.
      </p>

      <div className="space-y-6">
        {hadithList.map((h) => (
          <article key={h.number} className="bg-white p-4 rounded-lg shadow-sm">
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-green-700">Hadith #{h.number}</h2>
            </header>

            <p className="mt-3 text-right font-serif text-2xl leading-relaxed">
              {h.arabic}
            </p>

            <p className="mt-3"><strong>Translation:</strong> {h.translation}</p>

            <p className="mt-2"><strong>Explanation:</strong> {h.explanation}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
