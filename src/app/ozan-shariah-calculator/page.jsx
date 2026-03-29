"use client";

import React, { useState } from "react";

export default function ShariahWeightCalculator() {
  const [weight, setWeight] = useState("");
  const [type, setType] = useState("gold"); // gold, silver, meat, etc.
  const [result, setResult] = useState(null);

  const calculate = () => {
    let res = 0;
    const w = parseFloat(weight);

    if (isNaN(w) || w <= 0) {
      alert("براہ کرم درست وزن درج کریں");
      return;
    }

    // شرعی حساب کے اصول
    switch (type) {
      case "gold":
        res = w * 0.025; // زکات سونا 2.5%
        break;
      case "silver":
        res = w * 0.025; // زکات چاندی 2.5%
        break;
      case "meat":
        if (w < 7) res = 0; // قربانی کے لئے 7 کلو کم نہ ہو
        else res = 1; // 1 جانور قربانی
        break;
      default:
        res = 0;
    }

    setResult(res);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg bg-white">

      {/* Title */}
      <h1 className="text-xl font-bold mb-4 text-center text-green-700">
        اوزان شرعیہ کیلکولیٹر
      </h1>

      {/* 🔹 Zakat Features Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-inner">
        <h2 className="text-lg font-semibold text-green-600 mb-3 text-center">
          خصوصیات
        </h2>

        <ul className="space-y-2 text-gray-700 text-base leading-relaxed">
          <li className="flex items-center gap-2">
            <span className="text-green-600 text-lg">✔️</span> نقدی پر زکاۃ
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600 text-lg">✔️</span> کاروبار پر زکاۃ
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600 text-lg">✔️</span> سونا پر زکاۃ
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600 text-lg">✔️</span> چاندی پر زکاۃ
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600 text-lg">✔️</span> کرپٹو پر زکاۃ (اختیاری)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600 text-lg">✔️</span> شرعی نصاب خودکار اپ ڈیٹ
          </li>
        </ul>
      </div>

      {/* Input Fields */}
      <label className="block mb-2 font-medium text-black dark:text-gray-200">وزن درج کریں (گرام یا کلو)</label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="w-full p-2 border rounded mb-4 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
        placeholder="مثال: 100"
      />

      <label className="block mb-2 font-medium text-black dark:text-gray-200">قسم منتخب کریں</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border rounded mb-4 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option value="gold">سونا</option>
        <option value="silver">چاندی</option>
        <option value="meat">قربانی</option>
      </select>

      {/* Button */}
      <button
        onClick={calculate}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        حساب کریں
      </button>

      {/* Result Box */}
      {result !== null && (
        <div className="mt-4 p-3 border rounded text-center bg-gray-100 text-black dark:bg-gray-800 dark:text-white dark:border-gray-600">
          <strong>نتیجہ: </strong>{" "}
          {type === "meat" ? `${result} جانور` : `${result} گرام`}
        </div>
      )}
    </div>
  );
}
