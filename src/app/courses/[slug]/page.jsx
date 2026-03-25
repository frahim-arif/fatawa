"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCourse } from "../../../lib/api";


// Helper function: YouTube link ya ID se sirf ID nikalta hai
const extractYouTubeId = (urlOrId) => {
  if (!urlOrId) return "";
  const match = urlOrId.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([\w-_]+)/);
  return match ? match[1] : urlOrId; // agar ID already hai to wahi return
};

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!slug) return;
    getCourse(slug)
      .then((data) => {
        // Lessons ke YouTube ID ko sanitize karo
        const lessons = data.lessons.map((lesson) => ({
          ...lesson,
          youtubeId: extractYouTubeId(lesson.youtubeId),
        }));
        setCourse({ ...data, lessons });
      })
      .catch((err) => console.error(err));
  }, [slug]);

  if (!course) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading course...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-3">
        {course.title}
      </h1>

      <p className="text-gray-600 mb-8">
        {course.description}
      </p>

      <div className="space-y-10">
        {course.lessons.map((lesson, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-5"
          >
            <h2 className="text-xl font-semibold mb-4">
              {index + 1}. {lesson.title}
            </h2>

            {lesson.youtubeId ? (
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="text-red-500">No video available for this lesson.</p>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
