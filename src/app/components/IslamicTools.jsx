"use client";

import { useState } from "react";

/* =====================================================
   MAIN PAGE
===================================================== */

export default function IslamicToolsPage() {
  const [activeTool, setActiveTool] = useState(null);

  // =====================================================
  // ZAKAT
  // =====================================================

  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [business, setBusiness] = useState("");
  const [receivable, setReceivable] = useState("");
  const [debt, setDebt] = useState("");
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

  const [mirathResult, setMirathResult] = useState("");

  const calculateMirath = () => {
    setMirathResult(
      "میراث کے حصص کا درست حساب کرنے کے لیے تمام ورثاء اور متعلقہ شرعی حالات کی مکمل تفصیل ضروری ہے۔"
    );
  };

  // =====================================================
  // HIJRI DATE
  // =====================================================

  const [gregorianDate, setGregorianDate] = useState("");
  const [hijriResult, setHijriResult] = useState("");

  const convertToHijri = () => {
    if (!gregorianDate) {
      setHijriResult("براہ کرم تاریخ منتخب کریں۔");
      return;
    }

    const date = new Date(gregorianDate);

    const formatter = new Intl.DateTimeFormat(
      "en-TN-u-ca-islamic",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    setHijriResult(formatter.format(date));
  };

  // =====================================================
  // HIJRI AGE
  // =====================================================

  const [birthDate, setBirthDate] = useState("");
  const [ageResult, setAgeResult] = useState("");

  const calculateAge = () => {
    if (!birthDate) {
      setAgeResult(
        "براہ کرم تاریخ پیدائش منتخب کریں۔"
      );
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

  const [city, setCity] = useState("");
  const [prayerResult, setPrayerResult] =
    useState(null);

  const calculatePrayerTimes = () => {
    if (!city) {
      setPrayerResult({
        error:
          "براہ کرم شہر کا نام درج کریں۔",
      });

      return;
    }

    // Demo timings
    setPrayerResult({
      city,
      fajr: "04:25 AM",
      sunrise: "05:45 AM",
      dhuhr: "12:15 PM",
      asr: "04:35 PM",
      maghrib: "06:20 PM",
      isha: "07:40 PM",
    });
  };

  // =====================================================
  // TOOLS
  // =====================================================

  const tools = [
    {
      id: "zakat",
      icon: "🧮",
      title: "زکوٰۃ کیلکولیٹر",
      subtitle: "زکوٰۃ معلوم کریں",
    },
    {
      id: "mirath",
      icon: "⚖️",
      title: "میراث کیلکولیٹر",
      subtitle: "شرعی حصص معلوم کریں",
    },
    {
      id: "hijri-date",
      icon: "📅",
      title: "ہجری تاریخ",
      subtitle: "تاریخ تبدیل کریں",
    },
    {
      id: "hijri-age",
      icon: "🎂",
      title: "ہجری عمر",
      subtitle: "عمر معلوم کریں",
    },
    {
      id: "prayer-times",
      icon: "🕌",
      title: "نماز کے اوقات",
      subtitle: "نماز کے اوقات دیکھیں",
    },
  ];

  // =====================================================
  // TOOL SELECT
  // =====================================================

  const handleToolClick = (toolId) => {
    const newTool =
      activeTool === toolId ? null : toolId;

    setActiveTool(newTool);

    if (newTool) {
      setTimeout(() => {
        document
          .getElementById(newTool)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }
  };

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#faf8ef]
        dark:bg-[#071c19]
        px-3
        sm:px-4
        py-8
        md:py-12
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="max-w-6xl mx-auto text-center mb-8">
        <div
          className="
            relative
            inline-flex
            items-center
            justify-center
            w-16
            h-16
            bg-[#174d40]
            border
            border-[#c8ae6a]
            shadow-[0_5px_20px_rgba(0,0,0,0.15)]
            mb-4
          "
        >
          <span className="text-3xl">
            🕌
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="hidden sm:block w-12 h-px bg-[#c8ae6a]" />

          <h1
            className="
              text-3xl
              md:text-4xl
              font-bold
              text-[#174d40]
              dark:text-[#f5e6bd]
            "
            style={{
              fontFamily:
                "'Jameel Noori Nastaleeq', serif",
            }}
          >
            اسلامی سہولیات
          </h1>

          <span className="hidden sm:block w-12 h-px bg-[#c8ae6a]" />
        </div>

        <p
          className="
            text-[#806b3f]
            dark:text-[#bcae8e]
            mt-2
            text-sm
            md:text-base
          "
          style={{
            fontFamily:
              "'Jameel Noori Nastaleeq', serif",
          }}
        >
          روزمرہ ضروریات کے لیے مفید اسلامی ٹولز
        </p>
      </div>

      {/* =================================================
          TOOL BUTTONS
      ================================================= */}

      <div className="max-w-5xl mx-auto">
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            gap-3
            md:gap-4
          "
        >
          {tools.map((tool) => {
            const active =
              activeTool === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() =>
                  handleToolClick(tool.id)
                }
                className={`
                  group
                  relative
                  overflow-hidden
                  p-4
                  md:p-5
                  text-right
                  border
                  transition-all
                  duration-300
                  active:scale-[0.98]

                  ${
                    active
                      ? `
                        bg-[#174d40]
                        border-[#d8c27d]
                        shadow-[0_0_22px_rgba(200,174,106,0.28)]
                      `
                      : `
                        bg-[#102f2a]
                        border-[#806b3f]
                        hover:bg-[#174d40]
                        hover:border-[#c8ae6a]
                        hover:-translate-y-1
                        shadow-[0_5px_18px_rgba(0,0,0,0.18)]
                      `
                  }
                `}
              >
                {/* GOLD TOP LINE */}

                <span
                  className={`
                    absolute
                    top-0
                    right-0
                    h-[2px]
                    bg-[#c8ae6a]
                    transition-all
                    duration-300
                    ${
                      active
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }
                  `}
                />

                <div className="relative">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-3
                    "
                  >
                    <span className="text-3xl md:text-4xl">
                      {tool.icon}
                    </span>

                    <span
                      className="
                        text-[10px]
                        tracking-[2px]
                        text-[#c8ae6a]
                        opacity-70
                      "
                    >
                      TOOL
                    </span>
                  </div>

                  <h2
                    className="
                      font-bold
                      text-base
                      md:text-lg
                      text-[#f5e6bd]
                    "
                    style={{
                      fontFamily:
                        "'Jameel Noori Nastaleeq', serif",
                    }}
                  >
                    {tool.title}
                  </h2>

                  <p
                    className="
                      text-xs
                      md:text-sm
                      text-[#bcae8e]
                      mt-1
                    "
                    style={{
                      fontFamily:
                        "'Jameel Noori Nastaleeq', serif",
                    }}
                  >
                    {tool.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================
          ACTIVE TOOL AREA
      ================================================= */}

      <div className="max-w-4xl mx-auto mt-8">

        {/* =================================================
            ZAKAT
        ================================================= */}

        {activeTool === "zakat" && (
          <section
            id="zakat"
            className="
              bg-[#fffdf7]
              dark:bg-[#17211f]
              border
              border-[#c8ae6a]
              shadow-[0_8px_30px_rgba(0,0,0,0.18)]
              p-5
              md:p-8
              scroll-mt-5
            "
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

            <ToolButton
              onClick={calculateZakat}
            >
              زکوٰۃ معلوم کریں
            </ToolButton>

            {zakatResult && (
              <div
                className="
                  mt-6
                  bg-[#f5f0e2]
                  dark:bg-[#102f2a]
                  border
                  border-[#c8ae6a]
                  p-5
                  text-center
                "
              >
                <p className="text-gray-600 dark:text-gray-300">
                  کل اثاثہ:

                  <span className="font-bold text-[#174d40] dark:text-[#d8c27d] mr-2">
                    ₹
                    {zakatResult.total.toLocaleString()}
                  </span>
                </p>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  منہا کرنے کے بعد:

                  <span className="font-bold text-[#174d40] dark:text-[#d8c27d] mr-2">
                    ₹
                    {zakatResult.net.toLocaleString()}
                  </span>
                </p>

                <div className="border-t border-[#c8ae6a]/40 mt-4 pt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    اندازاً واجب زکوٰۃ
                  </p>

                  <p className="text-3xl font-bold text-[#174d40] dark:text-[#d8c27d] mt-1">
                    ₹
                    {zakatResult.zakat.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* =================================================
            MIRATH
        ================================================= */}

        {activeTool === "mirath" && (
          <section
            id="mirath"
            className="
              bg-[#fffdf7]
              dark:bg-[#17211f]
              border
              border-[#c8ae6a]
              shadow-[0_8px_30px_rgba(0,0,0,0.18)]
              p-5
              md:p-8
              scroll-mt-5
            "
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

            <ToolButton
              onClick={calculateMirath}
            >
              میراث کا حساب کریں
            </ToolButton>

            {mirathResult && (
              <div
                className="
                  mt-6
                  bg-[#f5f0e2]
                  dark:bg-[#102f2a]
                  border
                  border-[#c8ae6a]
                  p-5
                  text-center
                  text-gray-700
                  dark:text-gray-200
                  leading-8
                "
              >
                {mirathResult}

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  حتمی شرعی حساب کے لیے مستند مفتی صاحب سے
                  رجوع کرنا ضروری ہے۔
                </p>
              </div>
            )}
          </section>
        )}

        {/* =================================================
            HIJRI DATE
        ================================================= */}

        {activeTool === "hijri-date" && (
          <section
            id="hijri-date"
            className="
              bg-[#fffdf7]
              dark:bg-[#17211f]
              border
              border-[#c8ae6a]
              shadow-[0_8px_30px_rgba(0,0,0,0.18)]
              p-5
              md:p-8
              scroll-mt-5
            "
          >
            <ToolHeading
              icon="📅"
              title="ہجری تاریخ کنورٹر"
              description="عیسوی تاریخ کو ہجری تاریخ میں تبدیل کریں"
            />

            <DateInput
              value={gregorianDate}
              onChange={setGregorianDate}
            />

            <ToolButton
              onClick={convertToHijri}
            >
              ہجری تاریخ معلوم کریں
            </ToolButton>

            {hijriResult && (
              <ResultBox>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ہجری تاریخ
                </p>

                <p
                  className="
                    text-2xl
                    font-bold
                    text-[#174d40]
                    dark:text-[#d8c27d]
                    mt-2
                  "
                >
                  {hijriResult}
                </p>
              </ResultBox>
            )}
          </section>
        )}

        {/* =================================================
            HIJRI AGE
        ================================================= */}

        {activeTool === "hijri-age" && (
          <section
            id="hijri-age"
            className="
              bg-[#fffdf7]
              dark:bg-[#17211f]
              border
              border-[#c8ae6a]
              shadow-[0_8px_30px_rgba(0,0,0,0.18)]
              p-5
              md:p-8
              scroll-mt-5
            "
          >
            <ToolHeading
              icon="🎂"
              title="ہجری عمر کیلکولیٹر"
              description="اپنی تاریخ پیدائش درج کریں"
            />

            <DateInput
              value={birthDate}
              onChange={setBirthDate}
            />

            <ToolButton
              onClick={calculateAge}
            >
              عمر معلوم کریں
            </ToolButton>

            {ageResult && (
              <ResultBox>
                <p
                  className="
                    text-xl
                    font-bold
                    text-[#174d40]
                    dark:text-[#d8c27d]
                  "
                >
                  {ageResult}
                </p>
              </ResultBox>
            )}
          </section>
        )}

        {/* =================================================
            PRAYER TIMES
        ================================================= */}

        {activeTool === "prayer-times" && (
          <section
            id="prayer-times"
            className="
              bg-[#fffdf7]
              dark:bg-[#17211f]
              border
              border-[#c8ae6a]
              shadow-[0_8px_30px_rgba(0,0,0,0.18)]
              p-5
              md:p-8
              scroll-mt-5
            "
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
              className="
                w-full
                border
                border-[#c8ae6a]
                bg-[#fffdf7]
                dark:bg-[#102f2a]
                dark:text-white
                px-4
                py-3
                outline-none
                focus:border-[#806b3f]
                focus:ring-2
                focus:ring-[#c8ae6a]/20
                transition
              "
            />

            <ToolButton
              onClick={calculatePrayerTimes}
            >
              نماز کے اوقات دیکھیں
            </ToolButton>

            {prayerResult &&
              (prayerResult.error ? (
                <div className="mt-5 text-center text-red-600">
                  {prayerResult.error}
                </div>
              ) : (
                <div className="mt-6">
                  <h3
                    className="
                      text-center
                      text-xl
                      font-bold
                      text-[#174d40]
                      dark:text-[#d8c27d]
                      mb-4
                    "
                    style={{
                      fontFamily:
                        "'Jameel Noori Nastaleeq', serif",
                    }}
                  >
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

      {/* =================================================
          NOTE
      ================================================= */}

      <div className="max-w-4xl mx-auto mt-8">
        <div
          className="
            bg-[#f5f0e2]
            dark:bg-[#102f2a]
            border
            border-[#c8ae6a]/70
            p-4
            text-center
            text-xs
            md:text-sm
            text-gray-500
            dark:text-gray-300
            leading-7
          "
          style={{
            fontFamily:
              "'Jameel Noori Nastaleeq', serif",
          }}
        >
          <span className="font-bold text-[#806b3f] dark:text-[#d8c27d]">
            اہم نوٹ:
          </span>

          <br />

          ان ٹولز کا مقصد عمومی معلومات اور سہولت فراہم کرنا ہے۔
          زکوٰۃ اور میراث کے حتمی شرعی حکم کے لیے مستند علماء کرام
          سے رجوع کریں۔
        </div>
      </div>
    </main>
  );
}

/* =====================================================
   TOOL HEADING
===================================================== */

function ToolHeading({
  icon,
  title,
  description,
}) {
  return (
    <div className="text-center mb-7">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="hidden sm:block w-10 h-px bg-[#c8ae6a]" />

        <div
          className="
            flex
            items-center
            justify-center
            w-12
            h-12
            bg-[#174d40]
            border
            border-[#c8ae6a]
            text-2xl
          "
        >
          {icon}
        </div>

        <span className="hidden sm:block w-10 h-px bg-[#c8ae6a]" />
      </div>

      <h2
        className="
          text-2xl
          font-bold
          text-[#174d40]
          dark:text-[#f5e6bd]
        "
        style={{
          fontFamily:
            "'Jameel Noori Nastaleeq', serif",
        }}
      >
        {title}
      </h2>

      <p
        className="
          text-sm
          text-gray-500
          dark:text-gray-400
          mt-1
        "
        style={{
          fontFamily:
            "'Jameel Noori Nastaleeq', serif",
        }}
      >
        {description}
      </p>
    </div>
  );
}

/* =====================================================
   INPUT FIELD
===================================================== */

function InputField({
  label,
  value,
  setValue,
  placeholder,
}) {
  return (
    <div>
      <label
        className="
          block
          text-sm
          font-medium
          text-[#806b3f]
          dark:text-[#d8c27d]
          mb-1
        "
        style={{
          fontFamily:
            "'Jameel Noori Nastaleeq', serif",
        }}
      >
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
        className="
          w-full
          border
          border-[#c8ae6a]
          bg-[#fffdf7]
          dark:bg-[#102f2a]
          dark:text-white
          px-4
          py-3
          outline-none
          focus:border-[#806b3f]
          focus:ring-2
          focus:ring-[#c8ae6a]/20
          transition
        "
      />
    </div>
  );
}

/* =====================================================
   DATE INPUT
===================================================== */

function DateInput({
  value,
  onChange,
}) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
        w-full
        border
        border-[#c8ae6a]
        bg-[#fffdf7]
        dark:bg-[#102f2a]
        dark:text-white
        px-4
        py-3
        outline-none
        focus:border-[#806b3f]
        focus:ring-2
        focus:ring-[#c8ae6a]/20
        transition
      "
    />
  );
}

/* =====================================================
   TOOL BUTTON
===================================================== */

function ToolButton({
  onClick,
  children,
}) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        mt-6
        bg-[#174d40]
        hover:bg-[#216353]
        border
        border-[#806b3f]
        hover:border-[#c8ae6a]
        text-[#f5e6bd]
        font-bold
        py-3.5
        transition-all
        duration-300
        hover:shadow-[0_0_18px_rgba(200,174,106,0.20)]
      "
      style={{
        fontFamily:
          "'Jameel Noori Nastaleeq', serif",
      }}
    >
      {children}
    </button>
  );
}

/* =====================================================
   CHECKBOX
===================================================== */

function CheckBoxField({
  label,
  checked,
  setChecked,
}) {
  return (
    <label
      className="
        flex
        items-center
        gap-3
        border
        border-[#c8ae6a]
        bg-[#fffdf7]
        dark:bg-[#102f2a]
        dark:text-gray-200
        p-4
        cursor-pointer
        hover:bg-[#f8f1df]
        dark:hover:bg-[#174d40]
        transition
      "
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          setChecked(e.target.checked)
        }
        className="
          w-5
          h-5
          accent-[#806b3f]
        "
      />

      <span
        style={{
          fontFamily:
            "'Jameel Noori Nastaleeq', serif",
        }}
      >
        {label}
      </span>
    </label>
  );
}

/* =====================================================
   RESULT BOX
===================================================== */

function ResultBox({
  children,
}) {
  return (
    <div
      className="
        mt-5
        bg-[#f5f0e2]
        dark:bg-[#102f2a]
        border
        border-[#c8ae6a]
        p-5
        text-center
      "
    >
      {children}
    </div>
  );
}

/* =====================================================
   PRAYER CARD
===================================================== */

function PrayerCard({
  name,
  time,
}) {
  return (
    <div
      className="
        bg-[#f5f0e2]
        dark:bg-[#102f2a]
        border
        border-[#c8ae6a]/70
        p-4
        text-center
        hover:border-[#806b3f]
        transition
      "
    >
      <p
        className="
          text-sm
          text-gray-500
          dark:text-gray-400
        "
        style={{
          fontFamily:
            "'Jameel Noori Nastaleeq', serif",
        }}
      >
        {name}
      </p>

      <p
        className="
          text-lg
          font-bold
          text-[#174d40]
          dark:text-[#d8c27d]
          mt-1
        "
      >
        {time}
      </p>
    </div>
  );
}