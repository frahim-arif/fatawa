"use client";
import { useEffect, useState } from "react";

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);

  // Fetch all questions
  const fetchQuestions = async () => {
    const res = await fetch("http://localhost:5000/api/admin/questions");
    const data = await res.json();
    setQuestions(data.data || []);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Delete Question
  const deleteQuestion = async (id) => {
    if (!confirm("کیا آپ واقعی اس سوال کو ڈیلیٹ کرنا چاہتے ہیں؟")) return;

    const res = await fetch(`http://localhost:5000/api/admin/questions/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      alert("سوال کامیابی سے ڈیلیٹ کر دیا گیا!");
      setQuestions(questions.filter((q) => q._id !== id)); // UI update
    } else {
      alert("ڈیلیٹ کرتے وقت مسئلہ ہوا!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        ⚙️ Admin: تمام سوالات
      </h1>

      <div className="space-y-4">
        {questions.map((q) => (
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
        ))}
      </div>
    </div>
  );
}
