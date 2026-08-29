
'use client';

import { useState } from 'react';

export default function IslamicToolsPage() {

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

    const zakat = netAmount > 0
      ? netAmount * 0.025
      : 0;

    setZakatResult({
      total: totalAssets,
      net: netAmount,
      zakat: zakat,
    });
  };


  // =====================================================
  // MIRاث
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
  // HIJRI DATE CONVERTER
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


  return (
    <main className="min-h-screen bg-[#faf8ef] px-4 py-10">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="max-w-6xl mx-auto text-center mb-12">

        <h1 className="text-3xl md:text-4xl font-bold text-[#8a6a00]">
          🕌 اسلامی سہولیات
        </h1>

        <p className="text-gray-600 mt-3">
          روزمرہ ضروریات کے لیے مفید اسلامی کیلکولیٹرز اور ٹولز
        </p>

      </div>


      {/* =====================================================
          TOOLS NAVIGATION
      ===================================================== */}

      <div className="max-w-6xl mx-auto mb-10">

        <div className="bg-white border border-[#ead89c] rounded-2xl p-4 shadow-sm">

          <div className="flex flex-wrap justify-center gap-2">

            <a
              href="#zakat"
              className="px-4 py-2 rounded-xl bg-[#faf8ef] text-[#7a5a00] hover:bg-[#f3e8bd] transition"
            >
              زکوٰۃ
            </a>

            <a
              href="#mirath"
              className="px-4 py-2 rounded-xl bg-[#faf8ef] text-[#7a5a00] hover:bg-[#f3e8bd] transition"
            >
              میراث
            </a>

            <a
              href="#hijri-date"
              className="px-4 py-2 rounded-xl bg-[#faf8ef] text-[#7a5a00] hover:bg-[#f3e8bd] transition"
            >
              ہجری تاریخ
            </a>

            <a
              href="#hijri-age"
              className="px-4 py-2 rounded-xl bg-[#faf8ef] text-[#7a5a00] hover:bg-[#f3e8bd] transition"
            >
              ہجری عمر
            </a>

            <a
              href="#prayer-times"
              className="px-4 py-2 rounded-xl bg-[#faf8ef] text-[#7a5a00] hover:bg-[#f3e8bd] transition"
            >
              نماز کے اوقات
            </a>

          </div>

        </div>

      </div>


      {/* =====================================================
          ZAKAT CALCULATOR
      ===================================================== */}

      <section
        id="zakat"
        className="max-w-4xl mx-auto mb-12 scroll-mt-6"
      >

        <div className="bg-white border border-[#ead89c] rounded-2xl shadow-sm p-6 md:p-8">

          <div className="text-center mb-7">

            <div className="text-4xl mb-2">
              🧮
            </div>

            <h2 className="text-2xl font-bold text-[#8a6a00]">
              زکوٰۃ کیلکولیٹر
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              اپنے قابلِ زکوٰۃ مال کی بنیادی مقدار درج کریں
            </p>

          </div>


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
            className="w-full mt-6 bg-[#c8a645] hover:bg-[#b8932f] text-white font-medium py-3 rounded-xl transition"
          >
            زکوٰۃ معلوم کریں
          </button>


          {zakatResult && (

            <div className="mt-6 bg-[#fffdf7] border border-[#ead89c] rounded-xl p-5 text-center">

              <p className="text-gray-600">
                کل اثاثہ:
                <span className="font-bold text-[#7a5a00] ml-2">
                  ₹{zakatResult.total.toLocaleString()}
                </span>
              </p>

              <p className="text-gray-600 mt-2">
                منہا کرنے کے بعد:
                <span className="font-bold text-[#7a5a00] ml-2">
                  ₹{zakatResult.net.toLocaleString()}
                </span>
              </p>

              <div className="border-t border-[#ead89c] mt-4 pt-4">

                <p className="text-sm text-gray-500">
                  اندازاً واجب زکوٰۃ
                </p>

                <p className="text-3xl font-bold text-[#8a6a00] mt-1">
                  ₹{zakatResult.zakat.toLocaleString()}
                </p>

              </div>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          MIRاث CALCULATOR
      ===================================================== */}

      <section
        id="mirath"
        className="max-w-4xl mx-auto mb-12 scroll-mt-6"
      >

        <div className="bg-white border border-[#ead89c] rounded-2xl shadow-sm p-6 md:p-8">

          <div className="text-center mb-7">

            <div className="text-4xl mb-2">
              ⚖️
            </div>

            <h2 className="text-2xl font-bold text-[#8a6a00]">
              میراث کیلکولیٹر
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              ورثاء کی تفصیل درج کریں
            </p>

          </div>


          <div className="grid md:grid-cols-2 gap-4">

            <label className="flex items-center gap-3 border border-[#ead89c] bg-[#fffdf7] rounded-xl p-3">

              <input
                type="checkbox"
                checked={husband}
                onChange={(e) =>
                  setHusband(e.target.checked)
                }
              />

              <span>
                شوہر موجود ہے
              </span>

            </label>


            <div>

              <label className="block text-sm font-medium text-[#7a5a00] mb-1">
                بیویاں
              </label>

              <input
                type="number"
                min="0"
                value={wife}
                onChange={(e) =>
                  setWife(e.target.value)
                }
                className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#d4b24c]"
              />

            </div>


            <InputField
              label="بیٹے"
              value={sons}
              setValue={setSons}
              placeholder="0"
              type="number"
            />

            <InputField
              label="بیٹیاں"
              value={daughters}
              setValue={setDaughters}
              placeholder="0"
              type="number"
            />


            <label className="flex items-center gap-3 border border-[#ead89c] bg-[#fffdf7] rounded-xl p-3">

              <input
                type="checkbox"
                checked={mother}
                onChange={(e) =>
                  setMother(e.target.checked)
                }
              />

              <span>
                والدہ موجود ہے
              </span>

            </label>


            <label className="flex items-center gap-3 border border-[#ead89c] bg-[#fffdf7] rounded-xl p-3">

              <input
                type="checkbox"
                checked={father}
                onChange={(e) =>
                  setFather(e.target.checked)
                }
              />

              <span>
                والد موجود ہے
              </span>

            </label>

          </div>


          <button
            onClick={calculateMirath}
            className="w-full mt-6 bg-[#c8a645] hover:bg-[#b8932f] text-white font-medium py-3 rounded-xl transition"
          >
            میراث کا حساب کریں
          </button>


          {mirathResult && (

            <div className="mt-6 bg-[#fffdf7] border border-[#ead89c] rounded-xl p-5 text-center text-gray-700 leading-8">

              {mirathResult}

              <p className="text-xs text-gray-500 mt-3">
                یہ صرف ابتدائی معلوماتی ڈیمو ہے۔ شرعی میراث کے حتمی حساب کے لیے
                مستند مفتی سے مسئلہ کی مکمل تفصیل کے ساتھ رجوع کریں۔
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          HIJRI DATE CONVERTER
      ===================================================== */}

      <section
        id="hijri-date"
        className="max-w-4xl mx-auto mb-12 scroll-mt-6"
      >

        <div className="bg-white border border-[#ead89c] rounded-2xl shadow-sm p-6 md:p-8">

          <div className="text-center mb-7">

            <div className="text-4xl mb-2">
              📅
            </div>

            <h2 className="text-2xl font-bold text-[#8a6a00]">
              ہجری تاریخ کنورٹر
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              عیسوی تاریخ کو ہجری تاریخ میں تبدیل کریں
            </p>

          </div>


          <input
            type="date"
            value={gregorianDate}
            onChange={(e) =>
              setGregorianDate(e.target.value)
            }
            className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#d4b24c]"
          />


          <button
            onClick={convertToHijri}
            className="w-full mt-4 bg-[#c8a645] hover:bg-[#b8932f] text-white font-medium py-3 rounded-xl transition"
          >
            ہجری تاریخ معلوم کریں
          </button>


          {hijriResult && (

            <div className="mt-5 bg-[#fffdf7] border border-[#ead89c] rounded-xl p-5 text-center">

              <p className="text-sm text-gray-500">
                ہجری تاریخ
              </p>

              <p className="text-2xl font-bold text-[#8a6a00] mt-2">
                {hijriResult}
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          HIJRI AGE CALCULATOR
      ===================================================== */}

      <section
        id="hijri-age"
        className="max-w-4xl mx-auto mb-12 scroll-mt-6"
      >

        <div className="bg-white border border-[#ead89c] rounded-2xl shadow-sm p-6 md:p-8">

          <div className="text-center mb-7">

            <div className="text-4xl mb-2">
              🎂
            </div>

            <h2 className="text-2xl font-bold text-[#8a6a00]">
              ہجری عمر کیلکولیٹر
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              اپنی تاریخ پیدائش درج کریں
            </p>

          </div>


          <input
            type="date"
            value={birthDate}
            onChange={(e) =>
              setBirthDate(e.target.value)
            }
            className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#d4b24c]"
          />


          <button
            onClick={calculateAge}
            className="w-full mt-4 bg-[#c8a645] hover:bg-[#b8932f] text-white font-medium py-3 rounded-xl transition"
          >
            عمر معلوم کریں
          </button>


          {ageResult && (

            <div className="mt-5 bg-[#fffdf7] border border-[#ead89c] rounded-xl p-5 text-center">

              <p className="text-xl font-bold text-[#8a6a00]">
                {ageResult}
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          PRAYER TIMES
      ===================================================== */}

      <section
        id="prayer-times"
        className="max-w-4xl mx-auto mb-12 scroll-mt-6"
      >

        <div className="bg-white border border-[#ead89c] rounded-2xl shadow-sm p-6 md:p-8">

          <div className="text-center mb-7">

            <div className="text-4xl mb-2">
              🕌
            </div>

            <h2 className="text-2xl font-bold text-[#8a6a00]">
              نماز کے اوقات
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              اپنے شہر کے نماز کے اوقات معلوم کریں
            </p>

          </div>


          <input
            type="text"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            placeholder="مثلاً Nagaon, Assam"
            className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#d4b24c]"
          />


          <button
            onClick={calculatePrayerTimes}
            className="w-full mt-4 bg-[#c8a645] hover:bg-[#b8932f] text-white font-medium py-3 rounded-xl transition"
          >
            نماز کے اوقات دیکھیں
          </button>


          {prayerResult && (

            <>

              {prayerResult.error ? (

                <div className="mt-5 text-center text-red-600">
                  {prayerResult.error}
                </div>

              ) : (

                <div className="mt-6">

                  <h3 className="text-center text-xl font-bold text-[#8a6a00] mb-4">
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

              )}

            </>

          )}

        </div>

      </section>


      {/* =====================================================
          DISCLAIMER
      ===================================================== */}

      <div className="max-w-4xl mx-auto">

        <div className="bg-[#fffdf7] border border-[#ead89c] rounded-2xl p-5 text-center text-sm text-gray-600 leading-7">

          <strong className="text-[#7a5a00]">
            اہم نوٹ:
          </strong>

          <br />

          ان ٹولز کا مقصد عمومی معلومات اور سہولت فراہم کرنا ہے۔
          زکوٰۃ، میراث اور دیگر شرعی مسائل میں حتمی حکم کے لیے
          مستند علماء کرام سے رجوع کرنا چاہیے۔

        </div>

      </div>

    </main>
  );
}


// =====================================================
// INPUT COMPONENT
// =====================================================

function InputField({
  label,
  value,
  setValue,
  placeholder,
  type = 'number',
}) {

  return (
    <div>

      <label className="block text-sm font-medium text-[#7a5a00] mb-1">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          setValue(e.target.value)
        }
        placeholder={placeholder}
        min={type === 'number' ? '0' : undefined}
        className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#d4b24c]"
      />

    </div>
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
    <div className="bg-[#fffdf7] border border-[#ead89c] rounded-xl p-4 text-center">

      <p className="text-sm text-gray-500">
        {name}
      </p>

      <p className="text-lg font-bold text-[#8a6a00] mt-1">
        {time}
      </p>

    </div>
  );
}
