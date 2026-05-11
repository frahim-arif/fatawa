"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MajameenPage() {

  const [majameen, setMajameen] = useState([]);

  useEffect(() => {
    fetchMajameen();
  }, []);

  const fetchMajameen = async () => {
    try {

      const res = await fetch(
        "https://f-backend-vdi1.onrender.com/api/majameen"
      );

      const data = await res.json();

      if (data.success) {
        setMajameen(data.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf3] px-3 py-5">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-6">

        <h1
          className="mt-3 text-3xl font-bold text-[#9b7a20]"
          style={{
            fontFamily: "'Jameel Noori Nastaleeq', serif",
          }}
        >
          📚 مضامین
        </h1>

        <p className="text-gray-500 mt-1 text-xs">
          Click to Read Full Majmoon
        </p>

      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto space-y-3">

        {majameen.map((item) => {

          return (
            <Link
              key={item._id}
              href={`/majameen/${item._id}`}
              className="block bg-white border border-[#f0dfb2] rounded-2xl overflow-hidden shadow-sm hover:bg-[#fffaf0] transition"
            >

              <div className="flex items-center justify-between px-4 py-4">

                <div className="text-right">

                  <h2
                    className="text-[20px] font-bold text-[#8b6b1b]"
                    style={{
                      fontFamily:
                        "'Jameel Noori Nastaleeq', serif",
                    }}
                  >
                    {item.title}
                  </h2>

                  <p className="text-[11px] text-gray-500 mt-1">
                    ✍️ {item.author || "Admin"}
                  </p>

                </div>

                <span className="text-[#b08a2c] text-sm">
                  Read →
                </span>

              </div>

            </Link>
          );
        })}

      </div>
    </div>
  );
}