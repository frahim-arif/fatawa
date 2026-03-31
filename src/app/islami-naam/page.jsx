"use client";
import React from "react";

export default function IslamiNaamPage() {

  const names = [
    { name: "محمد", meaning: "قابلِ تعریف" },
    { name: "احمد", meaning: "سب سے زیادہ تعریف کرنے والا" },
    { name: "علی", meaning: "بلند مرتبہ" },
    { name: "حسن", meaning: "خوبصورت" },
    { name: "حسین", meaning: "چھوٹا خوبصورت" },
    { name: "عمر", meaning: "زندگی" },
    { name: "عثمان", meaning: "دانشمند" },
    { name: "ابوبکر", meaning: "نیک ساتھی" },
    { name: "زید", meaning: "اضافہ" },
    { name: "طارق", meaning: "رات کو آنے والا" },

    { name: "یوسف", meaning: "اللہ بڑھائے" },
    { name: "ابراہیم", meaning: "دوستِ خدا" },
    { name: "اسماعیل", meaning: "اللہ نے سنا" },
    { name: "اسحاق", meaning: "ہنسی" },
    { name: "یعقوب", meaning: "پیروی کرنے والا" },
    { name: "موسیٰ", meaning: "نجات یافتہ" },
    { name: "عیسیٰ", meaning: "اللہ کی نعمت" },
    { name: "داود", meaning: "محبوب" },
    { name: "سلیمان", meaning: "امن والا" },
    { name: "نوح", meaning: "غمگین" },

    { name: "بلال", meaning: "تازگی" },
    { name: "حمزہ", meaning: "بہادر" },
    { name: "خالد", meaning: "ہمیشہ رہنے والا" },
    { name: "سعد", meaning: "خوش نصیب" },
    { name: "معاذ", meaning: "محفوظ" },
    { name: "انس", meaning: "محبت" },
    { name: "ایوب", meaning: "صبر کرنے والا" },
    { name: "شعیب", meaning: "راہ دکھانے والا" },
    { name: "زبیر", meaning: "طاقتور" },
    { name: "طلحہ", meaning: "درخت کا نام" },

    { name: "فاطمہ", meaning: "پاکیزہ" },
    { name: "عائشہ", meaning: "زندہ دل" },
    { name: "خدیجہ", meaning: "جلدی پیدا ہونے والی" },
    { name: "مریم", meaning: "عبادت گزار" },
    { name: "زینب", meaning: "خوشبودار پھول" },
    { name: "حفصہ", meaning: "چھوٹی شیرنی" },
    { name: "رقیہ", meaning: "بلند" },
    { name: "ام کلثوم", meaning: "خوبصورت چہرہ" },
    { name: "صفیہ", meaning: "پاک" },
    { name: "سمیہ", meaning: "بلند مرتبہ" },

    { name: "نور", meaning: "روشنی" },
    { name: "ایمان", meaning: "ایمان" },
    { name: "تقویٰ", meaning: "پرہیزگاری" },
    { name: "حیا", meaning: "شرم" },
    { name: "صبر", meaning: "برداشت" },
    { name: "شکر", meaning: "شکرگزاری" },
    { name: "رحمت", meaning: "مہربانی" },
    { name: "برکت", meaning: "خیر" },
    { name: "نبیل", meaning: "اعلیٰ نسب والا" },
    { name: "جمیل", meaning: "خوبصورت" },

    { name: "عدنان", meaning: "رہنے والا" },
    { name: "ارحم", meaning: "زیادہ رحم کرنے والا" },
    { name: "فہد", meaning: "تیز رفتار" },
    { name: "ریاض", meaning: "باغات" },
    { name: "کامران", meaning: "کامیاب" },
    { name: "فیصل", meaning: "فیصلہ کرنے والا" },
    { name: "سلمان", meaning: "محفوظ" },
    { name: "عدیل", meaning: "انصاف کرنے والا" },
    { name: "حارث", meaning: "کمانے والا" },
    { name: "شاہین", meaning: "شکاری پرندہ" },

    { name: "لبنیٰ", meaning: "درخت کا نام" },
    { name: "مہوش", meaning: "چاند جیسی" },
    { name: "عروج", meaning: "بلندی" },
    { name: "کشور", meaning: "ملک" },
    { name: "حنا", meaning: "مہندی" },
    { name: "نائلہ", meaning: "کامیاب" },
    { name: "روبینہ", meaning: "چمکدار" },
    { name: "شمائلہ", meaning: "خوبصورت عادت والی" },
    { name: "فرح", meaning: "خوشی" },
    { name: "سحر", meaning: "صبح" },

    { name: "اذان", meaning: "نماز کی پکار" },
    { name: "ارسلان", meaning: "شیر" },
    { name: "تابش", meaning: "چمک" },
    { name: "دانیال", meaning: "اللہ کا فیصلہ" },
    { name: "حماد", meaning: "تعریف کرنے والا" },
    { name: "یاسر", meaning: "آسانی دینے والا" },
    { name: "وقاص", meaning: "سپاہی" },
    { name: "نومان", meaning: "خون جیسا سرخ" },
    { name: "باسط", meaning: "کشادگی دینے والا" },
    { name: "قاسم", meaning: "تقسیم کرنے والا" },

    { name: "مائرہ", meaning: "چاند جیسی" },
    { name: "انعم", meaning: "نعمتیں" },
    { name: "ایرا", meaning: "زمین" },
    { name: "کنزہ", meaning: "خزانہ" },
    { name: "رملہ", meaning: "ریت" },
    { name: "جویریہ", meaning: "چھوٹی لڑکی" },
    { name: "عالیہ", meaning: "بلند" },
    { name: "ثنا", meaning: "تعریف" },
    { name: "دعا", meaning: "پکار" },
    { name: "آمنہ", meaning: "امن والی" },
  ];

  return (
    <div className="min-h-screen px-3 py-5 bg-yellow-50">
      <h1 className="text-2xl text-center font-bold text-yellow-700 mb-4">
        👶 اسلامی نام
      </h1>

      <div className="space-y-3 max-w-3xl mx-auto">
        {names.map((item, index) => (
          <div
            key={index}
            className="bg-white p-3 border border-yellow-300 shadow-sm"
            style={{
              direction: "rtl",
              fontFamily: "'Jameel Noori Nastaleeq', serif",
            }}
          >
            <p className="text-lg font-bold text-black">
              {item.name}
            </p>
            <p className="text-sm text-gray-600">
              {item.meaning}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}