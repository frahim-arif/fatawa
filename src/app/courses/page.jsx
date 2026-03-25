"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCourses } from "../../lib/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-4">
        Our Courses
      </h1>

      {/* <p className="text-center text-gray-600 mb-10">
        Authentic Islamic courses based on Quran & Sunnah
      </p> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden"
          >
            {/* <img
              src={course.thumbnail || "https://via.placeholder.com/1000"}
              className="w-full h-48 object-cover"
              alt={course.title}
            /> */}
            <img
              src="/images/th.png"
              alt="Course"
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>

              <p className="text-gray-600 text-sm mb-4">{course.description}</p>

              <Link
                href={`/courses/${course.slug}`}
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold"
              >
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
