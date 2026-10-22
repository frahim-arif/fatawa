// Namaz ke auqaat ka hisaab (bina kisi API ke).
// Fajr aur Isha 18 degree (Karachi method). asrFactor: 2 = Hanafi, 1 = Shafi.

export const URDU_H = ["محرم", "صفر", "ربیع الاول", "ربیع الثانی", "جمادی الاول", "جمادی الثانی", "رجب", "شعبان", "رمضان", "شوال", "ذی قعدہ", "ذی الحجہ"];
export const URDU_G = ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"];
export const URDU_D = ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"];
export const PRAYERS = [
  ["fajr", "فجر"],
  ["dhuhr", "ظہر"],
  ["asr", "عصر"],
  ["maghrib", "مغرب"],
  ["isha", "عشاء"],
];

const R = Math.PI / 180;
const sin = (d) => Math.sin(d * R);
const cos = (d) => Math.cos(d * R);
const tan = (d) => Math.tan(d * R);
const asin = (x) => Math.asin(x) / R;
const acos = (x) => Math.acos(x) / R;
const atan2 = (y, x) => Math.atan2(y, x) / R;
const fix = (a, b) => {
  a = a - b * Math.floor(a / b);
  return a < 0 ? a + b : a;
};

function sunPosition(jd) {
  const D = jd - 2451545.0;
  const g = fix(357.529 + 0.98560028 * D, 360);
  const q = fix(280.459 + 0.98564736 * D, 360);
  const L = fix(q + 1.915 * sin(g) + 0.02 * sin(2 * g), 360);
  const e = 23.439 - 0.00000036 * D;
  const RA = fix(atan2(cos(e) * sin(L), cos(L)) / 15, 24);
  const eqt = fix(q / 15 - RA + 12, 24) - 12;
  return { decl: asin(sin(e) * sin(L)), eqt };
}

// Ek din ke auqaat (ghanton mein, local time) y-m-d ke liye
function dayTimes(y, m, d, lat, lng, tz, asrFactor) {
  const jd = Date.UTC(y, m, d) / 864e5 + 2440587.5 - lng / 360;
  const sp = sunPosition(jd + 0.5);
  const mid = fix(12 + tz - lng / 15 - sp.eqt, 24);
  const T = (angle) => {
    const x = (-sin(angle) - sin(sp.decl) * sin(lat)) / (cos(sp.decl) * cos(lat));
    return acos(Math.max(-1, Math.min(1, x))) / 15;
  };
  const asrAngle = -atan2(1, asrFactor + tan(Math.abs(lat - sp.decl)));
  return {
    fajr: mid - T(18),
    dhuhr: mid + 1 / 60,
    asr: mid + T(asrAngle),
    maghrib: mid + T(0.833) + 1 / 60,
    isha: mid + T(18),
  };
}

// Kal, aaj aur parson ki 15 namazon ki list (Date objects)
export function buildEvents(now, { lat, lng, asr = 2 }) {
  const tz = -now.getTimezoneOffset() / 60;
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();
  const out = [];
  for (let off = -1; off <= 1; off++) {
    const dt = new Date(Date.UTC(y, m, d + off));
    const Y = dt.getUTCFullYear();
    const M = dt.getUTCMonth();
    const D = dt.getUTCDate();
    const t = dayTimes(Y, M, D, lat, lng, tz, asr);
    PRAYERS.forEach(([key, name]) => {
      out.push({ key, name, off, at: new Date(Date.UTC(Y, M, D) + (t[key] - tz) * 36e5) });
    });
  }
  return out;
}

const hijriFmt = new Intl.DateTimeFormat("en-u-ca-islamic-civil-nu-latn", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

export function hijriDate(date) {
  const o = {};
  hijriFmt.formatToParts(date).forEach((p) => {
    if (p.type === "day" || p.type === "month" || p.type === "year") o[p.type] = parseInt(p.value, 10);
  });
  return `${o.day} ${URDU_H[o.month - 1]} ${o.year}`;
}

const two = (n) => String(n).padStart(2, "0");
export const hm = (date) => `${two(date.getHours() % 12 || 12)}:${two(date.getMinutes())}`;