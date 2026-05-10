"use client";
import { useMemo, useState } from "react";

export default function IslamicNamesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "تمام نام" },
    { id: "boys", name: "لڑکوں کے نام" },
    { id: "girls", name: "لڑکیوں کے نام" },
  ];

  const names = [
     { name: "محمد", meaning: "قابلِ تعریف", category: "boys" },
  { name: "احمد", meaning: "سب سے زیادہ تعریف کرنے والا", category: "boys" },
  { name: "علی", meaning: "بلند مرتبہ", category: "boys" },
  { name: "حسن", meaning: "خوبصورت", category: "boys" },
  { name: "حسین", meaning: "چھوٹا خوبصورت", category: "boys" },
  { name: "عمر", meaning: "زندگی", category: "boys" },
  { name: "عثمان", meaning: "دانشمند", category: "boys" },
  { name: "ابوبکر", meaning: "نیک ساتھی", category: "boys" },
  { name: "زید", meaning: "اضافہ", category: "boys" },
  { name: "طارق", meaning: "رات کو آنے والا", category: "boys" },

  { name: "یوسف", meaning: "اللہ بڑھائے", category: "boys" },
  { name: "ابراہیم", meaning: "دوستِ خدا", category: "boys" },
  { name: "اسماعیل", meaning: "اللہ نے سنا", category: "boys" },
  { name: "اسحاق", meaning: "ہنسی", category: "boys" },
  { name: "یعقوب", meaning: "پیروی کرنے والا", category: "boys" },
  { name: "موسیٰ", meaning: "نجات یافتہ", category: "boys" },
  { name: "عیسیٰ", meaning: "اللہ کی نعمت", category: "boys" },
  { name: "داود", meaning: "محبوب", category: "boys" },
  { name: "سلیمان", meaning: "امن والا", category: "boys" },
  { name: "نوح", meaning: "غمگین", category: "boys" },

  { name: "بلال", meaning: "تازگی", category: "boys" },
  { name: "حمزہ", meaning: "بہادر", category: "boys" },
  { name: "خالد", meaning: "ہمیشہ رہنے والا", category: "boys" },
  { name: "سعد", meaning: "خوش نصیب", category: "boys" },
  { name: "معاذ", meaning: "محفوظ", category: "boys" },
  { name: "انس", meaning: "محبت", category: "boys" },
  { name: "ایوب", meaning: "صبر کرنے والا", category: "boys" },
  { name: "شعیب", meaning: "راہ دکھانے والا", category: "boys" },
  { name: "زبیر", meaning: "طاقتور", category: "boys" },
  { name: "طلحہ", meaning: "درخت", category: "boys" },

  { name: "عدنان", meaning: "رہنے والا", category: "boys" },
  { name: "ارحم", meaning: "زیادہ رحم کرنے والا", category: "boys" },
  { name: "فہد", meaning: "تیز رفتار", category: "boys" },
  { name: "ریاض", meaning: "باغات", category: "boys" },
  { name: "کامران", meaning: "کامیاب", category: "boys" },
  { name: "فیصل", meaning: "فیصلہ کرنے والا", category: "boys" },
  { name: "سلمان", meaning: "محفوظ", category: "boys" },
  { name: "عدیل", meaning: "انصاف کرنے والا", category: "boys" },
  { name: "حارث", meaning: "کمانے والا", category: "boys" },
  { name: "شاہین", meaning: "شکاری پرندہ", category: "boys" },

  { name: "اذان", meaning: "نماز کی پکار", category: "boys" },
  { name: "ارسلان", meaning: "شیر", category: "boys" },
  { name: "دانیال", meaning: "اللہ کا فیصلہ", category: "boys" },
  { name: "حماد", meaning: "تعریف کرنے والا", category: "boys" },
  { name: "یاسر", meaning: "آسانی دینے والا", category: "boys" },
  { name: "وقاص", meaning: "سپاہی", category: "boys" },
  { name: "نومان", meaning: "سرخ", category: "boys" },
  { name: "باسط", meaning: "کشادگی دینے والا", category: "boys" },
  { name: "قاسم", meaning: "تقسیم کرنے والا", category: "boys" },
  { name: "تابش", meaning: "چمک", category: "boys" },

  { name: "اویس", meaning: "چھوٹا بھیڑیا", category: "boys" },
  { name: "ہاشم", meaning: "توڑنے والا", category: "boys" },
  { name: "مازن", meaning: "بارش کے بادل", category: "boys" },
  { name: "رافع", meaning: "بلند کرنے والا", category: "boys" },
  { name: "جابر", meaning: "دل جوڑنے والا", category: "boys" },
  { name: "سہیل", meaning: "ستارہ", category: "boys" },
  { name: "اکرم", meaning: "سب سے زیادہ عزت والا", category: "boys" },
  { name: "مبین", meaning: "واضح", category: "boys" },
  { name: "شاکر", meaning: "شکر کرنے والا", category: "boys" },
  { name: "راشد", meaning: "ہدایت یافتہ", category: "boys" },

  { name: "مروان", meaning: "پتھر", category: "boys" },
  { name: "سفیان", meaning: "تیز چلنے والا", category: "boys" },
  { name: "ایمان", meaning: "ایمان والا", category: "boys" },
  { name: "حمید", meaning: "تعریف والا", category: "boys" },
  { name: "طہٰ", meaning: "قرآنی نام", category: "boys" },
  { name: "یسٰن", meaning: "قرآنی نام", category: "boys" },
  { name: "عائشہ", meaning: "زندہ دل", category: "girls" },
  { name: "فاطمہ", meaning: "پاکیزہ", category: "girls" },
  { name: "خدیجہ", meaning: "جلدی پیدا ہونے والی", category: "girls" },
  { name: "مریم", meaning: "عبادت گزار", category: "girls" },
  { name: "زینب", meaning: "خوشبودار پھول", category: "girls" },

  { name: "حفصہ", meaning: "چھوٹی شیرنی", category: "girls" },
  { name: "رقیہ", meaning: "بلند", category: "girls" },
  { name: "ام کلثوم", meaning: "خوبصورت چہرہ", category: "girls" },
  { name: "صفیہ", meaning: "پاک", category: "girls" },
  { name: "سمیہ", meaning: "بلند مرتبہ", category: "girls" },

  { name: "نور", meaning: "روشنی", category: "girls" },
  { name: "ایمان", meaning: "ایمان", category: "girls" },
  { name: "حیا", meaning: "شرم", category: "girls" },
  { name: "صبر", meaning: "برداشت", category: "girls" },
  { name: "رحمت", meaning: "مہربانی", category: "girls" },

  { name: "برکت", meaning: "خیر", category: "girls" },
  { name: "نائلہ", meaning: "کامیاب", category: "girls" },
  { name: "روبینہ", meaning: "چمکدار", category: "girls" },
  { name: "شمائلہ", meaning: "خوبصورت", category: "girls" },
  { name: "فرح", meaning: "خوشی", category: "girls" },

  { name: "سحر", meaning: "صبح", category: "girls" },
  { name: "مائرہ", meaning: "چاند جیسی", category: "girls" },
  { name: "انعم", meaning: "نعمتیں", category: "girls" },
  { name: "ایرا", meaning: "زمین", category: "girls" },
  { name: "کنزہ", meaning: "خزانہ", category: "girls" },

  { name: "جویریہ", meaning: "چھوٹی لڑکی", category: "girls" },
  { name: "عالیہ", meaning: "بلند", category: "girls" },
  { name: "ثنا", meaning: "تعریف", category: "girls" },
  { name: "دعا", meaning: "پکار", category: "girls" },
  { name: "آمنہ", meaning: "امن والی", category: "girls" },

  { name: "ہاجرہ", meaning: "ہجرت کرنے والی", category: "girls" },
  { name: "اسراء", meaning: "رات کا سفر", category: "girls" },
  { name: "الیف", meaning: "نرمی", category: "girls" },
  { name: "ریحانہ", meaning: "خوشبو", category: "girls" },
  { name: "غزالہ", meaning: "ہرن جیسی", category: "girls" },

  { name: "لبنیٰ", meaning: "درخت کا نام", category: "girls" },
  { name: "مہوش", meaning: "چاند جیسی", category: "girls" },
  { name: "کشور", meaning: "ملک", category: "girls" },
  { name: "حنا", meaning: "مہندی", category: "girls" },
  { name: "عروج", meaning: "بلندی", category: "girls" },

  { name: "ایمن", meaning: "محفوظ", category: "girls" },
  { name: "حلیمہ", meaning: "نرم دل", category: "girls" },
  { name: "ربیعہ", meaning: "بہار", category: "girls" },
  { name: "سدرہ", meaning: "درخت", category: "girls" },
  { name: "فلک", meaning: "آسمان", category: "girls" },

  { name: "آسیہ", meaning: "فرعون کی بیوی", category: "girls" },
  { name: "بلقیس", meaning: "ملکہ", category: "girls" },
  { name: "زہرہ", meaning: "چمکدار ستارہ", category: "girls" },
  { name: "نرگس", meaning: "پھول", category: "girls" },
  { name: "گلناز", meaning: "پھول جیسی", category: "girls" },

  { name: "سیمان", meaning: "قیمتی", category: "girls" },
  { name: "رملہ", meaning: "ریت", category: "girls" },
  { name: "شازیہ", meaning: "خاص", category: "girls" },
  { name: "ارم", meaning: "جنت", category: "girls" },
  { name: "پریشہ", meaning: "فرشتہ جیسی", category: "girls" }
  ];

  const filtered = useMemo(() => {
    return names.filter((n) => {
      const matchCategory =
        selectedCategory === "all" || n.category === selectedCategory;

      const matchSearch =
        n.name.includes(search) || n.meaning.includes(search);

      return matchCategory && matchSearch;
    });
  }, [search, selectedCategory, names]);

  return (
    <div className="min-h-screen bg-[#f6f1e7]" dir="rtl">

      {/* Top Header like image */}
      <div className="bg-[#4a3b2a] text-white p-4 text-center text-2xl font-bold">
        اسلامی ناموں کا ذخیرہ
      </div>

      {/* Search + Filter Bar */}
<div className="flex flex-col md:flex-row gap-3 p-4 max-w-4xl mx-auto">

  <input
    className="p-3 rounded border w-full 
               bg-white text-black border-gray-300
               dark:bg-gray-800 dark:text-white dark:border-gray-600
               focus:outline-none focus:ring-2 focus:ring-[#4a3b2a]"
    placeholder="نام تلاش کریں..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    className="p-3 rounded border w-full md:w-64
               bg-white text-black border-gray-300
               dark:bg-gray-800 dark:text-white dark:border-gray-600
               focus:outline-none focus:ring-2 focus:ring-[#4a3b2a]"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    {categories.map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ))}
  </select>

</div>

      {/* Table */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-[#4a3b2a] text-white">
            <tr>
              <th className="p-3">نام</th>
              <th className="p-3">معنی</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((n, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3 font-bold text-[#4a3b2a]">{n.name}</td>
                <td className="p-3 text-gray-700">{n.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}