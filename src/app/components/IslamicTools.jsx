"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Scale,
  Calendar,
  Cake,
  Clock,
  Loader2,
  Sparkles,
} from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";

const HIJRI_MONTHS = [
  "محرم", "صفر", "ربیع الاول", "ربیع الثانی", "جمادی الاول", "جمادی الثانی",
  "رجب", "شعبان", "رمضان", "شوال", "ذوالقعدہ", "ذوالحجہ",
];

const TOOLS = [
  { id: "zakat", icon: Calculator, title: "زکوٰۃ کیلکولیٹر", subtitle: "زکوٰۃ معلوم کریں" },
  { id: "mirath", icon: Scale, title: "میراث کیلکولیٹر", subtitle: "شرعی حصص معلوم کریں" },
  { id: "hijri-date", icon: Calendar, title: "ہجری تاریخ", subtitle: "تاریخ تبدیل کریں" },
  { id: "hijri-age", icon: Cake, title: "ہجری عمر", subtitle: "عمر معلوم کریں" },
  { id: "prayer-times", icon: Clock, title: "نماز کے اوقات", subtitle: "اوقات دیکھیں" },
];

/* ---------- helpers ---------- */

function getHijri(date) {
  const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);

  const get = (t) => parseInt(parts.find((p) => p.type === t)?.value, 10);
  return { y: get("year"), m: get("month"), d: get("day") };
}

const to12 = (t) => {
  const [h, m] = String(t).split(" ")[0].split(":");
  const hr = parseInt(h, 10);
  return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`;
};

/* =====================================================
   MAIN
===================================================== */

export default function IslamicTools() {
  const [activeTool, setActiveTool] = useState(null);

  // zakat
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [business, setBusiness] = useState("");
  const [receivable, setReceivable] = useState("");
  const [debt, setDebt] = useState("");
  const [nisab, setNisab] = useState("");
  const [zakatResult, setZakatResult] = useState(null);

  // mirath
  const [husband, setHusband] = useState(false);
  const [wife, setWife] = useState(0);
  const [sons, setSons] = useState(0);
  const [daughters, setDaughters] = useState(0);
  const [mother, setMother] = useState(false);
  const [father, setFather] = useState(false);
  const [mirathResult, setMirathResult] = useState("");

  // hijri date
  const [gregorianDate, setGregorianDate] = useState("");
  const [hijriResult, setHijriResult] = useState("");

  // hijri age
  const [birthDate, setBirthDate] = useState("");
  const [ageResult, setAgeResult] = useState("");

  // prayer
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [prayer, setPrayer] = useState(null);
  const [prayerLoading, setPrayerLoading] = useState(false);

  /* ---------- actions ---------- */

  const calculateZakat = () => {
    const total =
      Number(cash || 0) + Number(gold || 0) + Number(silver || 0) +
      Number(business || 0) + Number(receivable || 0);
    const net = total - Number(debt || 0);
    const nisabValue = Number(nisab || 0);

    const belowNisab = nisabValue > 0 && net < nisabValue;
    const zakat = net > 0 && !belowNisab ? net * 0.025 : 0;

    setZakatResult({ total, net, zakat, belowNisab });
  };

  const calculateMirath = () => {
    setMirathResult(
      "میراث کے حصص کا درست حساب کرنے کے لیے تمام ورثاء اور متعلقہ شرعی حالات کی مکمل تفصیل ضروری ہے۔"
    );
  };

  const convertToHijri = () => {
    if (!gregorianDate) {
      setHijriResult("براہ کرم تاریخ منتخب کریں۔");
      return;
    }
    const h = getHijri(new Date(gregorianDate));
    setHijriResult(`${h.d} ${HIJRI_MONTHS[h.m - 1]} ${h.y} ھ`);
  };

  const calculateAge = () => {
    if (!birthDate) {
      setAgeResult("براہ کرم تاریخ پیدائش منتخب کریں۔");
      return;
    }
    const b = getHijri(new Date(birthDate));
    const t = getHijri(new Date());

    let years = t.y - b.y;
    let months = t.m - b.m;
    let days = t.d - b.d;

    if (days < 0) { months -= 1; days += 30; }
    if (months < 0) { years -= 1; months += 12; }

    if (years < 0) {
      setAgeResult("تاریخ پیدائش آج سے پہلے کی ہونی چاہیے۔");
      return;
    }
    setAgeResult(`آپ کی ہجری عمر ${years} سال، ${months} ماہ اور ${days} دن ہے۔`);
  };

  const fetchPrayer = async () => {
    if (!city.trim()) {
      setPrayer({ error: "براہ کرم شہر کا نام درج کریں۔" });
      return;
    }
    setPrayerLoading(true);
    setPrayer(null);

    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
          city.trim()
        )}&country=${encodeURIComponent(country.trim() || "India")}&method=1`
      );
      const data = await res.json();

      if (data.code === 200) {
        setPrayer({ city: city.trim(), t: data.data.timings });
      } else {
        setPrayer({ error: "یہ شہر نہیں ملا۔ انگریزی میں نام لکھیں، مثلاً Guwahati" });
      }
    } catch {
      setPrayer({ error: "انٹرنیٹ یا سرور کا مسئلہ ہے، دوبارہ کوشش کریں۔" });
    } finally {
      setPrayerLoading(false);
    }
  };

  const handleToolClick = (id) => {
    const next = activeTool === id ? null : id;
    setActiveTool(next);

    if (next) {
      setTimeout(() => {
        document.getElementById("tool-panel")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  };

  /* ---------- panels ---------- */

  const renderPanel = () => {
    switch (activeTool) {
      case "zakat":
        return (
          <>
            <PanelHead icon={Calculator} title="زکوٰۃ کیلکولیٹر" desc="اپنے قابلِ زکوٰۃ مال کی مقدار درج کریں" />
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="نقد رقم" value={cash} onChange={setCash} ph="مثلاً 100000" />
              <Field label="سونے کی موجودہ مالیت" value={gold} onChange={setGold} ph="مثلاً 200000" />
              <Field label="چاندی کی موجودہ مالیت" value={silver} onChange={setSilver} ph="مثلاً 50000" />
              <Field label="کاروباری مال" value={business} onChange={setBusiness} ph="مثلاً 300000" />
              <Field label="قابلِ وصول رقم" value={receivable} onChange={setReceivable} ph="مثلاً 50000" />
              <Field label="قابلِ منہا قرض" value={debt} onChange={setDebt} ph="مثلاً 50000" />
              <div className="md:col-span-2">
                <Field
                  label="نصاب کی مالیت (اختیاری)"
                  value={nisab}
                  onChange={setNisab}
                  ph="چاندی کے نصاب (52.5 تولہ) کی آج کی قیمت"
                />
              </div>
            </div>

            <GoButton onClick={calculateZakat}>زکوٰۃ معلوم کریں</GoButton>

            {zakatResult && (
              <Result>
                <Row label="کل اثاثہ" value={`₹${zakatResult.total.toLocaleString()}`} />
                <Row label="قرض منہا کرنے کے بعد" value={`₹${zakatResult.net.toLocaleString()}`} />
                <div className="border-t border-[#D4AF37]/40 mt-4 pt-4">
                  {zakatResult.belowNisab ? (
                    <p className="text-[#8a6d00]" style={{ fontSize: "19px", lineHeight: "34px" }}>
                      آپ کا مال نصاب سے کم ہے، اس لیے زکوٰۃ واجب نہیں۔
                    </p>
                  ) : (
                    <>
                      <p className="text-[#777]" style={{ fontSize: "16px" }}>اندازاً واجب زکوٰۃ</p>
                      <p className="text-4xl font-bold text-[#333] mt-1">
                        ₹{zakatResult.zakat.toLocaleString()}
                      </p>
                    </>
                  )}
                </div>
              </Result>
            )}
          </>
        );

      case "mirath":
        return (
          <>
            <PanelHead icon={Scale} title="میراث کیلکولیٹر" desc="ورثاء کی تفصیل درج کریں" />
            <div className="grid md:grid-cols-2 gap-4">
              <Check label="شوہر موجود ہے" checked={husband} onChange={setHusband} />
              <Field label="بیویوں کی تعداد" value={wife} onChange={setWife} ph="0" />
              <Field label="بیٹوں کی تعداد" value={sons} onChange={setSons} ph="0" />
              <Field label="بیٹیوں کی تعداد" value={daughters} onChange={setDaughters} ph="0" />
              <Check label="والدہ موجود ہے" checked={mother} onChange={setMother} />
              <Check label="والد موجود ہے" checked={father} onChange={setFather} />
            </div>

            <GoButton onClick={calculateMirath}>میراث کا حساب کریں</GoButton>

            {mirathResult && (
              <Result>
                <p className="text-[#555]" style={{ fontSize: "19px", lineHeight: "36px" }}>
                  {mirathResult}
                </p>
                <p className="text-[#888] mt-3" style={{ fontSize: "15px", lineHeight: "28px" }}>
                  حتمی شرعی حساب کے لیے مستند مفتی صاحب سے رجوع کرنا ضروری ہے۔
                </p>
              </Result>
            )}
          </>
        );

      case "hijri-date":
        return (
          <>
            <PanelHead icon={Calendar} title="ہجری تاریخ کنورٹر" desc="عیسوی تاریخ کو ہجری تاریخ میں تبدیل کریں" />
            <DateField value={gregorianDate} onChange={setGregorianDate} />
            <GoButton onClick={convertToHijri}>ہجری تاریخ معلوم کریں</GoButton>

            {hijriResult && (
              <Result>
                <p className="text-[#777]" style={{ fontSize: "16px" }}>ہجری تاریخ</p>
                <p className="text-3xl font-bold text-[#63B56A] mt-2" style={{ lineHeight: "52px" }}>
                  {hijriResult}
                </p>
              </Result>
            )}
          </>
        );

      case "hijri-age":
        return (
          <>
            <PanelHead icon={Cake} title="ہجری عمر کیلکولیٹر" desc="اپنی تاریخ پیدائش درج کریں" />
            <DateField value={birthDate} onChange={setBirthDate} />
            <GoButton onClick={calculateAge}>عمر معلوم کریں</GoButton>

            {ageResult && (
              <Result>
                <p className="font-bold text-[#63B56A]" style={{ fontSize: "22px", lineHeight: "40px" }}>
                  {ageResult}
                </p>
              </Result>
            )}
          </>
        );

      case "prayer-times":
        return (
          <>
            <PanelHead icon={Clock} title="نماز کے اوقات" desc="اپنے شہر کے اصل اوقات معلوم کریں" />

            <div className="grid grid-cols-2 gap-3">
              <TextField label="شہر (انگریزی)" value={city} onChange={setCity} ph="Guwahati" />
              <TextField label="ملک (انگریزی)" value={country} onChange={setCountry} ph="India" />
            </div>

            <GoButton onClick={fetchPrayer} disabled={prayerLoading}>
              {prayerLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> لوڈ ہو رہا ہے...
                </span>
              ) : (
                "نماز کے اوقات دیکھیں"
              )}
            </GoButton>

            {prayer?.error && (
              <p className="mt-5 text-center text-red-600" style={{ fontSize: "18px" }}>
                {prayer.error}
              </p>
            )}

            {prayer?.t && (
              <div className="mt-6">
                <p className="text-center text-[#333] mb-4" style={{ fontSize: "26px", lineHeight: "44px" }}>
                  {prayer.city}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <PrayerCard name="فجر" time={to12(prayer.t.Fajr)} />
                  <PrayerCard name="طلوعِ آفتاب" time={to12(prayer.t.Sunrise)} />
                  <PrayerCard name="ظہر" time={to12(prayer.t.Dhuhr)} />
                  <PrayerCard name="عصر" time={to12(prayer.t.Asr)} />
                  <PrayerCard name="مغرب" time={to12(prayer.t.Maghrib)} />
                  <PrayerCard name="عشاء" time={to12(prayer.t.Isha)} />
                </div>
                <p className="text-center text-gray-400 mt-3" style={{ fontSize: "14px" }}>
                  طریقہ: کراچی (حنفی)
                </p>
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  /* ---------- render ---------- */

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden border border-[#C6E2C8] bg-[#F5FAF5] px-3 sm:px-5 py-8 md:py-10"
      style={{ fontFamily: font }}
    >
      {/* star pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cpath d='M22 2 L27 15 L40 10 L33 22 L40 34 L27 29 L22 42 L17 29 L4 34 L11 22 L4 10 L17 15 Z' fill='none' stroke='%2375C178' stroke-width='1'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
      />

      {/* HEADER */}
      <div className="relative text-center mb-8">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="relative mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-white border-2 border-[#D4AF37] rounded-full shadow-[0_8px_24px_rgba(117,193,120,0.25)]"
        >
          <Sparkles className="w-8 h-8 text-[#63B56A]" />
        </motion.div>

        <div className="flex items-center justify-center gap-3">
          <span className="hidden sm:block w-14 h-px bg-[#D4AF37]" />
          <h2 className="text-[#333]" style={{ fontSize: "34px", lineHeight: "56px" }}>
            اسلامی سہولیات
          </h2>
          <span className="hidden sm:block w-14 h-px bg-[#D4AF37]" />
        </div>
        <p className="text-[#63B56A]" style={{ fontSize: "18px", lineHeight: "32px" }}>
          روزمرہ ضروریات کے لیے مفید اسلامی ٹولز
        </p>
      </div>

      {/* TOOL CARDS */}
      <div className="relative grid grid-cols-2 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
        {TOOLS.map((tool, i) => {
          const Icon = tool.icon;
          const active = activeTool === tool.id;
          const lastOdd = i === TOOLS.length - 1;

          return (
            <motion.button
              key={tool.id}
              type="button"
              onClick={() => handleToolClick(tool.id)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`relative overflow-hidden text-right p-4 border transition-colors duration-300 ${
                lastOdd ? "col-span-2 lg:col-span-1" : ""
              } ${
                active
                  ? "bg-[#75C178] border-[#D4AF37] shadow-[0_10px_28px_rgba(99,181,106,0.4)]"
                  : "bg-white border-[#C6E2C8] hover:border-[#75C178] shadow-[0_5px_18px_rgba(0,0,0,0.07)]"
              }`}
            >
              <span
                className={`absolute top-0 right-0 h-[3px] bg-[#D4AF37] transition-all duration-300 ${
                  active ? "w-full" : "w-10"
                }`}
              />

              <div className="flex items-center justify-between mb-3">
                <span
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                    active
                      ? "bg-white border-[#D4AF37] text-[#63B56A]"
                      : "bg-[#EAF5EA] border-[#C6E2C8] text-[#63B56A]"
                  }`}
                >
                  <Icon size={24} />
                </span>
                <span
                  className={`text-[10px] tracking-[2px] ${
                    active ? "text-white/80" : "text-[#D4AF37]"
                  }`}
                  style={{ fontFamily: "sans-serif" }}
                >
                  TOOL
                </span>
              </div>

              <p
                className={active ? "text-white" : "text-[#333]"}
                style={{ fontSize: "21px", lineHeight: "36px" }}
              >
                {tool.title}
              </p>
              <p
                className={active ? "text-white/90" : "text-[#777]"}
                style={{ fontSize: "15px", lineHeight: "26px" }}
              >
                {tool.subtitle}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* ACTIVE PANEL */}
      <div id="tool-panel" className="relative max-w-3xl mx-auto mt-6" style={{ scrollMarginTop: "80px" }}>
        <AnimatePresence mode="wait">
          {activeTool && (
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white border border-[#C6E2C8] shadow-[0_12px_36px_rgba(0,0,0,0.1)] p-5 md:p-8"
              style={{ borderTop: "4px solid #D4AF37" }}
            >
              {renderPanel()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* NOTE */}
      <div className="relative max-w-3xl mx-auto mt-6">
        <div
          className="bg-[#EAF5EA] border border-[#C6E2C8] p-4 text-center text-[#666]"
          style={{ fontSize: "16px", lineHeight: "30px" }}
        >
          <span className="text-[#B08D2C]">اہم نوٹ: </span>
          ان ٹولز کا مقصد عمومی معلومات اور سہولت فراہم کرنا ہے۔ زکوٰۃ اور میراث کے حتمی شرعی حکم کے لیے مستند علماء کرام سے رجوع کریں۔
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   SMALL PARTS
===================================================== */

function PanelHead({ icon: Icon, title, desc }) {
  return (
    <div className="text-center mb-7">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="hidden sm:block w-10 h-px bg-[#D4AF37]" />
        <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#EAF5EA] border-2 border-[#D4AF37] text-[#63B56A]">
          <Icon size={28} />
        </span>
        <span className="hidden sm:block w-10 h-px bg-[#D4AF37]" />
      </div>
      <p className="text-[#333]" style={{ fontSize: "28px", lineHeight: "48px" }}>{title}</p>
      <p className="text-[#777]" style={{ fontSize: "17px", lineHeight: "30px" }}>{desc}</p>
    </div>
  );
}

const inputCls =
  "w-full border border-[#C6E2C8] bg-[#F5FAF5] text-[#333] px-4 py-3 outline-none focus:border-[#75C178] focus:ring-4 focus:ring-[#75C178]/15 focus:bg-white transition";

function Label({ children }) {
  return (
    <label className="block text-[#3f8f46] mb-1" style={{ fontSize: "18px", lineHeight: "32px" }}>
      {children}
    </label>
  );
}

function Field({ label, value, onChange, ph }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={ph}
        className={inputCls}
      />
    </div>
  );
}

function TextField({ label, value, onChange, ph }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="text"
        dir="ltr"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={ph}
        className={inputCls}
      />
    </div>
  );
}

function DateField({ value, onChange }) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
    />
  );
}

function Check({ label, checked, onChange }) {
  return (
    <label
      className={`flex items-center gap-3 border p-4 cursor-pointer transition ${
        checked
          ? "bg-[#EAF5EA] border-[#75C178]"
          : "bg-[#F5FAF5] border-[#C6E2C8] hover:border-[#75C178]"
      }`}
      style={{ fontSize: "19px" }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 accent-[#75C178]"
      />
      {label}
    </label>
  );
}

function GoButton({ onClick, children, disabled }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      className="w-full mt-6 py-3 text-white bg-[#75C178] hover:bg-[#63B56A] disabled:opacity-70 transition-colors"
      style={{
        fontSize: "22px",
        lineHeight: "38px",
        borderBottom: "3px solid #D4AF37",
        boxShadow: "0 8px 22px rgba(117,193,120,0.3)",
      }}
    >
      {children}
    </motion.button>
  );
}

function Result({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 bg-[#EAF5EA] border border-[#C6E2C8] p-5 text-center"
    >
      {children}
    </motion.div>
  );
}

function Row({ label, value }) {
  return (
    <p className="text-[#666] mt-2" style={{ fontSize: "19px", lineHeight: "34px" }}>
      {label}: <span className="font-bold text-[#63B56A] mr-2">{value}</span>
    </p>
  );
}

function PrayerCard({ name, time }) {
  return (
    <div className="bg-[#F5FAF5] border border-[#C6E2C8] p-4 text-center hover:border-[#D4AF37] hover:bg-[#EAF5EA] transition">
      <p className="text-[#777]" style={{ fontSize: "18px", lineHeight: "30px" }}>{name}</p>
      <p className="text-xl font-bold text-[#63B56A] mt-1" style={{ fontFamily: "sans-serif" }}>
        {time}
      </p>
    </div>
  );
}