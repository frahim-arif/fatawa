"use client";

import { useState } from "react";

export default function AddLessonPage({ params }) {
  const { id } = params;
  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");

  const saveLesson = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/courses/${id}/lesson`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, youtubeId }),
      });

      if(res.ok){
        alert("Lesson added successfully!");
        setTitle("");
        setYoutubeId("");
      } else {
        const data = await res.json();
        alert("Error: " + (data.message || "Something went wrong"));
      }
    } catch(err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Add Lesson</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Lesson Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="YouTube ID"
        value={youtubeId}
        onChange={(e) => setYoutubeId(e.target.value)}
      />

      <button
        onClick={saveLesson}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Add Lesson
      </button>
    </div>
  );
}
