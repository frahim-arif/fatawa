'use client';

import { useState } from 'react';

export default function IslamicToolsPage() {

  const [activeTool, setActiveTool] = useState(null);

  // =====================================================
  // ZAKAT
  // =====================================================

  const [cash, setCash] = useState('');
  const [gold, setGold] = useState('');
  const [silver, setSilver] = useState('');
  const [business, setBusiness] = useState('');
  const [receivable, setReceivable] = useState('');
  const [debt, setDebt] = useState('');
  const [zakatResult, setZakatResult] = useState(null);

  const calculateZakat = () => {

    const totalAssets =
      Number(cash || 0) +
      Number(gold || 0) +
      Number(silver || 0) +
      Number(business || 0) +
      Number(receivable || 0);

    const netAmount =
      totalAssets - Number(debt || 0);

    const zakat =
      netAmount > 0
        ? netAmount * 0.025
        : 0;

    setZakatResult({
      total: totalAssets,
      net: netAmount,
      zakat: zakat,
    });
  };


  // =====================================================
  // MIRATH
  // =====================================================

  const [husband, setHusband] = useState(false);
  const [wife, setWife] = useState(0);
  const [sons, setSons] = useState(0);
  const [daughters, setDaughters] = useState(0);
  const [mother, setMother] = useState(false);
  const [father, setFather] = useState(false);

  const [mirathResult, setMirathResult] = useState('');

  const calculateMirath = () => {

    setMirathResult(
      'میراث کے حصص کا درست حساب کرنے کے لیے تمام ورثاء اور متعلقہ شرعی حالات کی مکمل تفصیل ضروری ہے۔'
    );
  };


  // =====================================================
  // HIJRI DATE
  // =====================================================

  const [gregorianDate, setGregorianDate] = useState('');
  const [hijriResult, setHijriResult] = useState('');

  const convertToHijri = () => {

    if (!gregorianDate) {
      setHijriResult('براہ کرم تاریخ منتخب کریں۔');
      return;
    }

    const date = new Date(gregorianDate);

    const formatter = new Intl.DateTimeFormat(
      'en-TN-u-ca-islamic',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    );

    setHijriResult(formatter.format(date));
  };


  // =====================================================
  // HIJRI AGE
  // =====================================================

  const [birthDate, setBirthDate] = useState('');
  const [ageResult, setAgeResult] = useState('');

  const calculateAge = () => {

    if (!birthDate) {
      setAgeResult('براہ کرم تاریخ پیدائش منتخب کریں۔');
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    let years =
      today.getFullYear() -
      birth.getFullYear();

    let months =
      today.getMonth() -
      birth.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    setAgeResult(
      `آپ کی تقریباً عمر ${years} سال اور ${months} ماہ ہے۔`
    );
  };


  // =====================================================
  // PRAYER TIMES
  // =====================================================

  const [city, setCity] = useState('');
  const [prayerResult, setPrayerResult] = useState(null);

  const calculatePrayerTimes = () => {

    if (!city) {
      setPrayerResult({
        error: 'براہ کرم شہر کا نام درج کریں۔',
      });

      return;
    }

    // Demo timings

    setPrayerResult({
      city: city,
      fajr: '04:25 AM',
      sunrise: '05:45 AM',
      dhuhr: '12:15 PM',
      asr: '04:35 PM',
      maghrib: '06:20 PM',
      isha: '07:40 PM',
    });
  };


  // =====================================================
  // TOOL BUTTON
  // =====================================================

  const tools = [
    {
      id: 'zakat',
      icon: '🧮',
      title: 'زکوٰۃ کیلکولیٹر',
      subtitle: 'زکوٰۃ معلوم کریں',
      color: 'from-emerald-700 to-emerald-500',
    },

    {
      id: 'mirath',
      icon: '⚖️',
      title: 'میراث کیلکولیٹر',
      subtitle: 'شرعی حصص معلوم کریں',
      color: 'from-amber-700 to-yellow-500',
    },

    {
      id: 'hijri-date',
      icon: '📅',
      title: 'ہجری تاریخ',
      subtitle: 'تاریخ تبدیل کریں',
      color: 'from-blue-700 to-blue-500',
    },

    {
      id: 'hijri-age',
      icon: '🎂',
      title: 'ہجری عمر',
      subtitle: 'عمر معلوم کریں',
      color: 'from-purple-700 to-purple-500',
    },

    {
      id: 'prayer-times',
      icon: '🕌',
      title: 'نماز کے اوقات',
      subtitle: 'نماز کے اوقات دیکھیں',
      color: 'from-teal-700 to-teal-500',
    },
  ];


  return (

    <main
      dir="rtl"
      className="min-h-screen bg-[#faf8ef] px-4 py-8 md:py-12"
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="max-w-6xl mx-auto text-center mb-8">

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fffdf7] border border-[#ead89c] shadow-sm mb-4">

          <span className="text-3xl">
            🕌
          </span>

        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#7a5a00]">

          اسلامی سہولیات

        </h1>

        <p className="text-gray-600 mt-2 text-sm md:text-base">

          روزمرہ ضروریات کے لیے مفید اسلامی ٹولز

        </p>

      </div>


      {/* =====================================================
          TOOL BUTTONS
      ===================================================== */}

      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">

          {tools.map((tool) => (

            <button
              key={tool.id}
              onClick={() => {

                setActiveTool(
                  activeTool === tool.id
                    ? null
                    : tool.id
                );

                setTimeout(() => {

                  document
                    .getElementById(tool.id)
                    ?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });

                }, 100);

              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                p-4
                md:p-5
                text-white
                bg-gradient-to-br
                ${tool.color}
                shadow-md
                hover:shadow-xl
                hover:-translate-y-1
                active:scale-95
                transition-all
                duration-300
              `}
            >

              {/* Shine */}

              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

              <div className="relative">

                <div className="text-3xl md:text-4xl mb-3">

                  {tool.icon}

                </div>

                <h2 className="font-bold text-base md:text-lg">

                  {tool.title}

                </h2>

                <p className="text-xs md:text-sm text-white/80 mt-1">

                  {tool.subtitle}

                </p>

              </div>

            </button>

          ))}

        </div>

      </div>


      {/* =====================================================
          ACTIVE TOOL AREA
      ===================================================== */}

      <div className="max-w-4xl mx-auto mt-8">


        {/* =====================================================
            ZAKAT
        ===================================================== */}

        {activeTool === 'zakat' && (

          <section
            id="zakat"
            className="bg-white border border-[#ead89c] rounded-3xl shadow-md p-5 md:p-8 scroll-mt-5"
          >

            <ToolHeading
              icon="🧮"
              title="زکوٰۃ کیلکولیٹر"
              description="اپنے قابلِ زکوٰۃ مال کی مقدار درج کریں"
            />


            <div className="grid md:grid-cols-2 gap-4">

              <InputField
                label="نقد رقم"
                value={cash}
                setValue={setCash}
                placeholder="مثلاً 100000"
              />

              <InputField
                label="سونے کی موجودہ مالیت"
                value={gold}
                setValue={setGold}
                placeholder="مثلاً 200000"
              />

              <InputField
                label="چاندی کی موجودہ مالیت"
                value={silver}
                setValue={setSilver}
                placeholder="مثلاً 50000"
              />

              <InputField
                label="کاروباری مال"
                value={business}
                setValue={setBusiness}
                placeholder="مثلاً 300000"
              />

              <InputField
                label="قابلِ وصول رقم"
                value={receivable}
                setValue={setReceivable}
                placeholder="مثلاً 50000"
              />

              <InputField
                label="قابلِ منہا قرض"
                value={debt}
                setValue={setDebt}
                placeholder="مثلاً 50000"
              />

            </div>


            <button
              onClick={calculateZakat}
              className="w-full mt-6 bg-[#087f5b] hover:bg-[#066b4c] text-white font-bold py-3.5 rounded-xl transition"
            >

              زکوٰۃ معلوم کریں

            </button>


            {zakatResult && (

              <div className="mt-6 bg-[#f7fbf9] border border-emerald-200 rounded-2xl p-5 text-center">

                <p className="text-gray-600">

                  کل اثاثہ:

                  <span className="font-bold text-[#087f5b] mr-2">

                    ₹{zakatResult.total.toLocaleString()}

                  </span>

                </p>


                <p className="text-gray-600 mt-2">

                  منہا کرنے کے بعد:

                  <span className="font-bold text-[#087f5b] mr-2">

                    ₹{zakatResult.net.toLocaleString()}

                  </span>

                </p>


                <div className="border-t border-emerald-200 mt-4 pt-4">

                  <p className="text-sm text-gray-500">

                    اندازاً واجب زکوٰۃ

                  </p>

                  <p className="text-3xl font-bold text-[#087f5b] mt-1">

                    ₹{zakatResult.zakat.toLocaleString()}

                  </p>

                </div>

              </div>

            )}

          </section>

        )}


        {/* =====================================================
            MIRATH
        ===================================================== */}

        {activeTool === 'mirath' && (

          <section
            id="mirath"
            className="bg-white border border-[#ead89c] rounded-3xl shadow-md p-5 md:p-8 scroll-mt-5"
          >

            <ToolHeading
              icon="⚖️"
              title="میراث کیلکولیٹر"
              description="ورثاء کی تفصیل درج کریں"
            />


            <div className="grid md:grid-cols-2 gap-4">

              <CheckBoxField
                label="شوہر موجود ہے"
                checked={husband}
                setChecked={setHusband}
              />

              <InputField
                label="بیویوں کی تعداد"
                value={wife}
                setValue={setWife}
                placeholder="0"
              />

              <InputField
                label="بیٹوں کی تعداد"
                value={sons}
                setValue={setSons}
                placeholder="0"
              />

              <InputField
                label="بیٹیوں کی تعداد"
                value={daughters}
                setValue={setDaughters}
                placeholder="0"
              />

              <CheckBoxField
                label="والدہ موجود ہے"
                checked={mother}
                setChecked={setMother}
              />

              <CheckBoxField
                label="والد موجود ہے"
                checked={father}
                setChecked={setFather}
              />

            </div>


            <button
              onClick={calculateMirath}
              className="w-full mt-6 bg-[#b8860b] hover:bg-[#9f7407] text-white font-bold py-3.5 rounded-xl transition"
            >

              میراث کا حساب کریں

            </button>


            {mirathResult && (

              <div className="mt-6 bg-[#fffdf7] border border-[#ead89c] rounded-2xl p-5 text-center text-gray-700 leading-8">

                {mirathResult}

                <p className="text-xs text-gray-500 mt-3">

                  حتمی شرعی حساب کے لیے مستند مفتی صاحب سے
                  رجوع کرنا ضروری ہے۔

                </p>

              </div>

            )}

          </section>

        )}


        {/* =====================================================
            HIJRI DATE
        ===================================================== */}

        {activeTool === 'hijri-date' && (

          <section
            id="hijri-date"
            className="bg-white border border-[#ead89c] rounded-3xl shadow-md p-5 md:p-8 scroll-mt-5"
          >

            <ToolHeading
              icon="📅"
              title="ہجری تاریخ کنورٹر"
              description="عیسوی تاریخ کو ہجری تاریخ میں تبدیل کریں"
            />


            <input
              type="date"
              value={gregorianDate}
              onChange={(e) =>
                setGregorianDate(e.target.value)
              }
              className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
            />


            <button
              onClick={convertToHijri}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition"
            >

              ہجری تاریخ معلوم کریں

            </button>


            {hijriResult && (

              <div className="mt-5 bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">

                <p className="text-sm text-gray-500">

                  ہجری تاریخ

                </p>

                <p className="text-2xl font-bold text-blue-700 mt-2">

                  {hijriResult}

                </p>

              </div>

            )}

          </section>

        )}


        {/* =====================================================
            HIJRI AGE
        ===================================================== */}

        {activeTool === 'hijri-age' && (

          <section
            id="hijri-age"
            className="bg-white border border-[#ead89c] rounded-3xl shadow-md p-5 md:p-8 scroll-mt-5"
          >

            <ToolHeading
              icon="🎂"
              title="ہجری عمر کیلکولیٹر"
              description="اپنی تاریخ پیدائش درج کریں"
            />


            <input
              type="date"
              value={birthDate}
              onChange={(e) =>
                setBirthDate(e.target.value)
              }
              className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
            />


            <button
              onClick={calculateAge}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl transition"
            >

              عمر معلوم کریں

            </button>


            {ageResult && (

              <div className="mt-5 bg-purple-50 border border-purple-200 rounded-2xl p-5 text-center">

                <p className="text-xl font-bold text-purple-700">

                  {ageResult}

                </p>

              </div>

            )}

          </section>

        )}


        {/* =====================================================
            PRAYER TIMES
        ===================================================== */}

        {activeTool === 'prayer-times' && (

          <section
            id="prayer-times"
            className="bg-white border border-[#ead89c] rounded-3xl shadow-md p-5 md:p-8 scroll-mt-5"
          >

            <ToolHeading
              icon="🕌"
              title="نماز کے اوقات"
              description="اپنے شہر کے نماز کے اوقات معلوم کریں"
            />


            <input
              type="text"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              placeholder="مثلاً Nagaon, Assam"
              className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-teal-300"
            />


            <button
              onClick={calculatePrayerTimes}
              className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl transition"
            >

              نماز کے اوقات دیکھیں

            </button>


            {prayerResult && (

              prayerResult.error ? (

                <div className="mt-5 text-center text-red-600">

                  {prayerResult.error}

                </div>

              ) : (

                <div className="mt-6">

                  <h3 className="text-center text-xl font-bold text-teal-700 mb-4">

                    {prayerResult.city}

                  </h3>


                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                    <PrayerCard
                      name="فجر"
                      time={prayerResult.fajr}
                    />

                    <PrayerCard
                      name="طلوع آفتاب"
                      time={prayerResult.sunrise}
                    />

                    <PrayerCard
                      name="ظہر"
                      time={prayerResult.dhuhr}
                    />

                    <PrayerCard
                      name="عصر"
                      time={prayerResult.asr}
                    />

                    <PrayerCard
                      name="مغرب"
                      time={prayerResult.maghrib}
                    />

                    <PrayerCard
                      name="عشاء"
                      time={prayerResult.isha}
                    />

                  </div>

                </div>

              )

            )}

          </section>

        )}

      </div>


      {/* =====================================================
          NOTE
      ===================================================== */}

      <div className="max-w-4xl mx-auto mt-8">

        <div className="bg-[#fffdf7] border border-[#ead89c] rounded-2xl p-4 text-center text-xs md:text-sm text-gray-500 leading-7">

          <span className="font-bold text-[#7a5a00]">
            اہم نوٹ:
          </span>

          <br />

          ان ٹولز کا مقصد عمومی معلومات اور سہولت فراہم کرنا ہے۔
          زکوٰۃ اور میراث کے حتمی شرعی حکم کے لیے مستند علماء کرام سے رجوع کریں۔

        </div>

      </div>

    </main>
  );
}


// =====================================================
// TOOL HEADING
// =====================================================

function ToolHeading({
  icon,
  title,
  description,
}) {

  return (

    <div className="text-center mb-7">

      <div className="text-4xl mb-2">

        {icon}

      </div>

      <h2 className="text-2xl font-bold text-[#7a5a00]">

        {title}

      </h2>

      <p className="text-sm text-gray-500 mt-1">

        {description}

      </p>

    </div>

  );
}


// =====================================================
// INPUT FIELD
// =====================================================

function InputField({
  label,
  value,
  setValue,
  placeholder,
}) {

  return (

    <div>

      <label className="block text-sm font-medium text-[#7a5a00] mb-1">

        {label}

      </label>

      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) =>
          setValue(e.target.value)
        }
        placeholder={placeholder}
        className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#d4b24c]"
      />

    </div>

  );
}


// =====================================================
// CHECKBOX
// =====================================================

function CheckBoxField({
  label,
  checked,
  setChecked,
}) {

  return (

    <label className="flex items-center gap-3 border border-[#ead89c] bg-[#fffdf7] rounded-xl p-4 cursor-pointer hover:bg-[#fffaf0] transition">

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          setChecked(e.target.checked)
        }
        className="w-5 h-5 accent-[#b8860b]"
      />

      <span className="text-gray-700">

        {label}

      </span>

    </label>

  );
}


// =====================================================
// PRAYER CARD
// =====================================================

function PrayerCard({
  name,
  time,
}) {

  return (

    <div className="bg-[#f4fbfa] border border-teal-200 rounded-2xl p-4 text-center">

      <p className="text-sm text-gray-500">

        {name}

      </p>

      <p className="text-lg font-bold text-teal-700 mt-1">

        {time}

      </p>

    </div>

  );
}