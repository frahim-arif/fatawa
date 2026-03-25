"use client";

import { useState } from "react";

export default function AddCoursePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [lessons, setLessons] = useState([{ title: "", youtubeId: "" }]);
  const [thumbnail, setThumbnail] = useState(""); // URL or base64
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  // Thumbnail upload
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result); // base64
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Add new empty lesson
  const addLesson = () => {
    setLessons([...lessons, { title: "", youtubeId: "" }]);
  };

  // Update lesson fields
  const handleLessonChange = (index, field, value) => {
    const updated = [...lessons];
    updated[index][field] = value;
    setLessons(updated);
  };

  // Submit course
  const handleSubmit = async () => {
    if (!title || !slug || !description) {
      alert("Please fill title, slug and description.");
      return;
    }

    const thumb =
      thumbnail ||
      (lessons[0]?.youtubeId
        ? `https://img.youtube.com/vi/${lessons[0].youtubeId}/hqdefault.jpg`
        : "");

    const courseData = {
      title,
      slug,
      description,
      thumbnail: thumb,
      lessons,
    };

    try {
      const res = await fetch("http://localhost:5000/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });

      if (res.ok) {
        alert("Course added successfully!");
        setTitle("");
        setSlug("");
        setDescription("");
        setThumbnail("");
        setThumbnailPreview("");
        setLessons([{ title: "", youtubeId: "" }]);
      } else {
        const data = await res.json();
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Add New Course</h1>

      {/* Course Fields */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-semibold">Course Title:</label>
          <input
            className="w-2/3 border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-semibold">Slug:</label>
          <input
            className="w-2/3 border p-2 rounded"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div className="flex items-start gap-4">
          <label className="w-1/3 font-semibold mt-2">Description:</label>
          <textarea
            className="w-2/3 border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Thumbnail</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
          />

          <span className="text-sm text-gray-500">OR</span>

          <input
            className="border p-2 rounded"
            placeholder="Thumbnail URL"
            value={thumbnail}
            onChange={(e) => {
              setThumbnail(e.target.value);
              setThumbnailPreview("");
            }}
          />

          {(thumbnailPreview || thumbnail) && (
            <img
              src={thumbnailPreview || thumbnail}
              alt="Thumbnail preview"
              className="w-64 mt-2 rounded border"
            />
          )}
        </div>
      </div>

      {/* Lessons */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Lessons</h2>

      {lessons.map((lesson, index) => (
        <div key={index} className="mb-6 border p-4 rounded space-y-2">
          <div className="flex items-center gap-4">
            <label className="w-1/3 font-semibold">Lesson Title:</label>
            <input
              className="w-2/3 border p-2 rounded"
              value={lesson.title}
              onChange={(e) =>
                handleLessonChange(index, "title", e.target.value)
              }
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-1/3 font-semibold">YouTube ID:</label>
            <input
              className="w-2/3 border p-2 rounded"
              value={lesson.youtubeId}
              onChange={(e) =>
                handleLessonChange(index, "youtubeId", e.target.value)
              }
            />
          </div>

          {lesson.youtubeId && (
            <div className="relative pt-[56.25%] mt-2 rounded overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
              />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addLesson}
        className="mb-6 px-4 py-2 bg-gray-200 rounded"
      >
        + Add Another Lesson
      </button>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-indigo-600 text-white rounded"
      >
        Save Course
      </button>
    </div>
  );
}
