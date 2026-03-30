"use client";
import { useEffect, useState } from "react";

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // ✅ NEW

  const backend = "https://f-backend-vdi1.onrender.com/api/admin/questions";

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      const res = await fetch(backend);
      const data = await res.json();
      if (data.success) setQuestions(data.data || []);
      else alert("سوالات لوڈ کرنے میں مسئلہ ہوا!");
    } catch (err) {
      console.error("Error fetching questions:", err);
      alert("سوالات لوڈ کرنے میں نیٹ ورک مسئلہ!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchQuestions();
      setLoading(false);
    };
    fetchData();
  }, []);

  // ✅ FILTERED QUESTIONS
  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase())
  );

  // Delete Question
  const deleteQuestion = async (id) => {
    if (!confirm("کیا آپ واقعی اس سوال کو ڈیلیٹ کرنا چاہتے ہیں؟")) return;

    try {
      const res = await fetch(`${backend}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        alert("سوال کامیابی سے ڈیلیٹ کر دیا گیا!");
        setQuestions(questions.filter((q) => q._id !== id));
      } else {
        alert("ڈیلیٹ کرتے وقت مسئلہ ہوا!");
      }
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("ڈیلیٹ کرتے وقت نیٹ ورک مسئلہ!");
    }
  };

  if (loading)
    return <h2 className="text-center mt-10">⏳ سوالات لوڈ ہو رہے ہیں...</h2>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        ⚙️ Admin: تمام سوالات
      </h1>

      {/* 🔍 SEARCH BOX */}
      <input
        type="text"
        placeholder="🔍 سوال تلاش کریں..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
      />

      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div
              key={q._id}
              className="p-4 bg-white border rounded-lg shadow flex justify-between items-center"
            >
              <div className="text-right">
                <p className="font-semibold text-lg">{q.question}</p>
                <p className="text-gray-500">{q.category}</p>
              </div>
              <button
                onClick={() => deleteQuestion(q._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                ❌ Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            کوئی سوال نہیں ملا
          </p>
        )}
      </div>
    </div>
  );
}