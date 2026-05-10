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
    { name: "عائشہ", meaning: "زندہ دل", category: "girls" },
    { name: "فاطمہ", meaning: "پاکیزہ", category: "girls" },
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
      <div className="flex flex-col md:flex-row gap-3 justify-center p-4">
        <input
          className="p-3 rounded border w-full md:w-1/3"
          placeholder="نام تلاش کریں..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 rounded border w-full md:w-1/4"
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