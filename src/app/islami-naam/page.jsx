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
    { name: "احمد", meaning: "تعریف کیا گیا", category: "boys" },
    { name: "محمد", meaning: "بہت زیادہ تعریف کیا گیا", category: "boys" },
    { name: "عائشہ", meaning: "زندہ رہنے والی", category: "girls" },
  ];

  const filtered = useMemo(() => {
    return names.filter((n) => {
      const matchCategory = selectedCategory === "all" || n.category === selectedCategory;
      const matchSearch = n.name.includes(search) || n.meaning.includes(search);
      return matchCategory && matchSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f7f3ee] p-4 md:p-8" style={{ fontFamily: "'Jameel Noori Nastaleeq', serif" }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3b2a1a]">
          اسلامی ناموں کا ذخیرہ
        </h1>
        <p className="text-gray-600 mt-2">
          اوپر موجود بٹن یا سرچ استعمال کر کے نام اور ان کے معانی دیکھیں
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="اسلامی نام تلاش کریں..."
          className="w-full md:w-1/2 p-3 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-3 justify-center mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-full border transition font-semibold text-lg
              ${selectedCategory === cat.id
                ? "bg-[#3b2a1a] text-white"
                : "bg-white text-black hover:bg-gray-100"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-right">
          <thead className="bg-[#3b2a1a] text-white">
            <tr>
              <th className="p-4">نام</th>
              <th className="p-4">معنی</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-lg text-[#3b2a1a]">
                  {n.name}
                </td>
                <td className="p-4 text-gray-700">
                  {n.meaning}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
