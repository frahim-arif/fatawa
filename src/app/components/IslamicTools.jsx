
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

    const netAmount = totalAssets - Number(debt || 0);

    const zakat = netAmount > 0 ? netAmount * 0.025 : 0;

    setZakatResult({
      total: totalAssets,
      net: netAmount,
      zakat,
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

    const date = new Date(`${gregorianDate}T00:00:00`);

    const formatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

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

    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (
      months < 0 ||
      (months === 0 && today.getDate() < birth.getDate())
    ) {
      years--;
      months += 12;
    }

    if (today.getDate() < birth.getDate()) {
      months--;
    }

    if (months < 0) {
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
    if (!city.trim()) {
      setPrayerResult({
        error: 'براہ کرم شہر کا نام درج کریں۔',
      });

      return;
    }

    // Demo timings
    setPrayerResult({
      city: city.trim(),
      fajr: '04:25 AM',
      sunrise: '05:45 AM',
      dhuhr: '12:15 PM',
      asr: '04:35 PM',
      maghrib: '06:20 PM',
      isha: '07:40 PM',
    });
  };

  // =====================================================
  // TOOLS
  // =====================================================

  const tools = [
    {
      id: 'zakat',
      title: 'زکوٰۃ کیلکولیٹر',
      subtitle: 'زکوٰۃ معلوم کریں',
    },
    {
      id: 'mirath',
      title: 'میراث کیلکولیٹر',
      subtitle: 'شرعی حصص معلوم کریں',
    },
    {
      id: 'hijri-date',
      title: 'ہجری تاریخ',
      subtitle: 'تاریخ تبدیل کریں',
    },
    {
      id: 'hijri-age',
      title: 'ہجری عمر',
      subtitle: 'عمر معلوم کریں',
    },
    {
      id: 'prayer-times',
      title: 'نماز کے اوقات',
      subtitle: 'نماز کے اوقات دیکھیں',
    },
  ];

  // =====================================================
  // OPEN TOOL
  // =====================================================

  const handleToolClick = (toolId) => {
    const isClosing = activeTool === toolId;

    setActiveTool(isClosing ? null : toolId);

    if (!isClosing) {
      setTimeout(() => {
        document.getElementById(toolId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 120);
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8f8f5] px-3 md:px-5 py-7 md:py-10"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="max-w-6xl mx-auto text-center mb-7">
        <h1 className="text-2xl md:text-3xl font-bold text-[#166534]">
          اسلامی سہولیات
        </h1>

        <div className="w-12 h-[2px] bg-[#c9a227] mx-auto mt-3 mb-3" />

        <p className="text-sm text-gray-500">
          روزمرہ ضروریات کے لیے مفید اسلامی ٹولز
        </p>
      </div>

      {/* =====================================================
          TOOL BUTTONS
      ===================================================== */}

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {tools.map((tool) => {
            const isActive = activeTool === tool.id;

            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => handleToolClick(tool.id)}
                className={`
                  relative
                  w-full
                  min-h-[82px]
                  px-3
                  py-3
                  rounded-xl
                  border
                  text-right
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? 'bg-[#166534] border-[#166534] text-white shadow-md'
                      : 'bg-white border-[#e6dfc7] text-[#333] hover:border-[#c9a227] hover:bg-[#fffdf6] hover:shadow-sm'
                  }
                `}
              >
                {/* Gold side line */}
                <span
                  className={`
                    absolute
                    right-0
                    top-3
                    bottom-3
                    w-[3px]
                    rounded-full
                    ${
                      isActive
                        ? 'bg-[#e5c35b]'
                        : 'bg-[#c9a227]'
                    }
                  `}
                />

                <div className="pr-3">
                  <h2
                    className={`
                      text-sm
                      md:text-base
                      font-bold
                      leading-6
                      ${
                        isActive
                          ? 'text-white'
                          : 'text-[#166534]'
                      }
                    `}
                  >
                    {tool.title}
                  </h2>

                  <p
                    className={`
                      text-[11px]
                      md:text-xs
                      mt-0.5
                      ${
                        isActive
                          ? 'text-white/75'
                          : 'text-gray-500'
                      }
                    `}
                  >
                    {tool.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          ACTIVE TOOL AREA
      ===================================================== */}

      <div className="max-w-4xl mx-auto mt-6 md:mt-7">
        {/* =====================================================
            ZAKAT
        ===================================================== */}

        {activeTool === 'zakat' && (
          <section
            id="zakat"
            className="bg-white border border-[#e5dfca] rounded-2xl shadow-sm p-5 md:p-7 scroll-mt-5"
          >
            <ToolHeading
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
              type="button"
              onClick={calculateZakat}
              className="w-full mt-5 bg-[#166534] hover:bg-[#14532d] text-white font-semibold py-3 rounded-xl transition"
            >
              زکوٰۃ معلوم کریں
            </button>

            {zakatResult && (
              <div className="mt-5 bg-[#f7fbf9] border border-[#d7e8dc] rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">
                  کل اثاثہ:
                  <span className="font-bold text-[#166534] mr-2">
                    ₹{zakatResult.total.toLocaleString('en-IN')}
                  </span>
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  منہا کرنے کے بعد:
                  <span className="font-bold text-[#166534] mr-2">
                    ₹{zakatResult.net.toLocaleString('en-IN')}
                  </span>
                </p>

                <div className="border-t border-[#d7e8dc] mt-4 pt-4">
                  <p className="text-xs text-gray-500">
                    اندازاً واجب زکوٰۃ
                  </p>

                  <p className="text-2xl font-bold text-[#166534] mt-1">
                    ₹{zakatResult.zakat.toLocaleString('en-IN')}
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
            className="bg-white border border-[#e5dfca] rounded-2xl shadow-sm p-5 md:p-7 scroll-mt-5"
          >
            <ToolHeading
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
              type="button"
              onClick={calculateMirath}
              className="w-full mt-5 bg-[#166534] hover:bg-[#14532d] text-white font-semibold py-3 rounded-xl transition"
            >
              میراث کا حساب کریں
            </button>

            {mirathResult && (
              <div className="mt-5 bg-[#fffdf7] border border-[#e6dfc7] rounded-xl p-4 text-center text-gray-700 leading-7">
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
            className="bg-white border border-[#e5dfca] rounded-2xl shadow-sm p-5 md:p-7 scroll-mt-5"
          >
            <ToolHeading
              title="ہجری تاریخ کنورٹر"
              description="عیسوی تاریخ کو ہجری تاریخ میں تبدیل کریں"
            />

            <input
              type="date"
              value={gregorianDate}
              onChange={(e) => setGregorianDate(e.target.value)}
              className="w-full border border-[#e1dccb] bg-[#fffdf7] px-4 py-3 rounded-xl outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]"
            />

            <button
              type="button"
              onClick={convertToHijri}
              className="w-full mt-4 bg-[#166534] hover:bg-[#14532d] text-white font-semibold py-3 rounded-xl transition"
            >
              ہجری تاریخ معلوم کریں
            </button>

            {hijriResult && (
              <div className="mt-5 bg-[#f7fbf9] border border-[#d7e8dc] rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500">
                  ہجری تاریخ
                </p>

                <p className="text-xl font-bold text-[#166534] mt-2">
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
            className="bg-white border border-[#e5dfca] rounded-2xl shadow-sm p-5 md:p-7 scroll-mt-5"
          >
            <ToolHeading
              title="ہجری عمر کیلکولیٹر"
              description="اپنی تاریخ پیدائش درج کریں"
            />

            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full border border-[#e1dccb] bg-[#fffdf7] px-4 py-3 rounded-xl outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]"
            />

            <button
              type="button"
              onClick={calculateAge}
              className="w-full mt-4 bg-[#166534] hover:bg-[#14532d] text-white font-semibold py-3 rounded-xl transition"
            >
              عمر معلوم کریں
            </button>

            {ageResult && (
              <div className="mt-5 bg-[#f7fbf9] border border-[#d7e8dc] rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-[#166534]">
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
            className="bg-white border border-[#e5dfca] rounded-2xl shadow-sm p-5 md:p-7 scroll-mt-5"
          >
            <ToolHeading
              title="نماز کے اوقات"
              description="اپنے شہر کے نماز کے اوقات معلوم کریں"
            />

            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="مثلاً Nagaon, Assam"
              className="w-full border border-[#e1dccb] bg-[#fffdf7] px-4 py-3 rounded-xl outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]"
            />

            <button
              type="button"
              onClick={calculatePrayerTimes}
              className="w-full mt-4 bg-[#166534] hover:bg-[#14532d] text-white font-semibold py-3 rounded-xl transition"
            >
              نماز کے اوقات دیکھیں
            </button>

            {prayerResult &&
              (prayerResult.error ? (
                <div className="mt-5 text-center text-sm text-red-600">
                  {prayerResult.error}
                </div>
              ) : (
                <div className="mt-5">
                  <h3 className="text-center text-lg font-bold text-[#166534] mb-4">
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
              ))}
          </section>
        )}
      </div>

      {/* =====================================================
          NOTE
      ===================================================== */}

      <div className="max-w-4xl mx-auto mt-6">
        <div className="bg-white border border-[#e6dfc7] rounded-xl p-4 text-center text-xs md:text-sm text-gray-500 leading-6">
          <span className="font-bold text-[#166534]">
            اہم نوٹ:
          </span>{' '}
          ان ٹولز کا مقصد عمومی معلومات اور سہولت فراہم کرنا ہے۔
          زکوٰۃ اور میراث کے حتمی شرعی حکم کے لیے مستند علماء کرام
          سے رجوع کریں۔
        </div>
      </div>
    </main>
  );
}

// =====================================================
// TOOL HEADING
// =====================================================

function ToolHeading({ title, description }) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-[#166534]">
        {title}
      </h2>

      <div className="w-8 h-[2px] bg-[#c9a227] mx-auto mt-2 mb-2" />

      <p className="text-xs md:text-sm text-gray-500">
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
      <label className="block text-sm font-medium text-[#166534] mb-1.5">
        {label}
      </label>

      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#e1dccb] bg-[#fffdf7] px-4 py-3 rounded-xl outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] transition"
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
    <label className="flex items-center gap-3 border border-[#e1dccb] bg-[#fffdf7] rounded-xl p-3.5 cursor-pointer hover:border-[#c9a227] transition">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="w-4 h-4 accent-[#166534]"
      />

      <span className="text-sm text-gray-700">
        {label}
      </span>
    </label>
  );
}

// =====================================================
// PRAYER CARD
// =====================================================

function PrayerCard({ name, time }) {
  return (
    <div className="bg-[#f7fbf9] border border-[#d7e8dc] rounded-xl p-3 text-center">
      <p className="text-xs text-gray-500">
        {name}
      </p>

      <p className="text-base font-bold text-[#166534] mt-1">
        {time}
      </p>
    </div>
  );
}

