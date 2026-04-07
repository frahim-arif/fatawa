'use client'
import { useEffect, useState } from 'react';

export default function DeleteMajameen() {
  const [majameen, setMajameen] = useState([]);

  const BASE_URL = "https://f-backend-vdi1.onrender.com/api";

  // 📥 Fetch all majameen
  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}/majameen`);
    const data = await res.json();
    setMajameen(data.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ❌ Delete function
  const deleteMajmoon = async (id) => {
    if (!confirm("کیا آپ واقعی حذف کرنا چاہتے ہیں؟")) return;

    await fetch(`${BASE_URL}/admin/majameen/${id}`, {
      method: "DELETE"
    });

    // 🔄 Refresh list
    setMajameen((prev) => prev.filter(item => item._id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        ❌ مضامین حذف کریں
      </h1>

      {majameen.length === 0 ? (
        <p className="text-center">کوئی مضمون موجود نہیں</p>
      ) : (
        majameen.map((item) => (
          <div
            key={item._id}
            className="p-4 border rounded-lg bg-white shadow"
          >
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.author}</p>

            <button
              onClick={() => deleteMajmoon(item._id)}
              className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}