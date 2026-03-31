"use client";
import React from "react";

export default function IslamiNaamPage() {
  return (
    <div className="min-h-screen p-6 bg-yellow-50 text-right">
      <h1 className="text-3xl font-bold text-yellow-700 mb-6">
        👶 اسلامی نام
      </h1>

      <div className="space-y-4">
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-xl">محمد</p>
          <p className="text-gray-600">تعریف: قابلِ تعریف</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-xl">فاطمہ</p>
          <p className="text-gray-600">تعریف: پاکیزہ</p>
        </div>
      </div>
    </div>
  );
}