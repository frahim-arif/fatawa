"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";

export default function MajameenPage() {

  const [majameen, setMajameen] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

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

  const toggleCard = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf3] px-3 py-5">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-6">

        {/* <div className="inline-flex items-center gap-2 bg-[#ecd9a3] text-[#6b4d00] px-4 py-1.5 rounded-full shadow-sm">
          <BookOpen size={15} />
          <span className="text-xs tracking-wide font-medium">
            Islamic Majameen
          </span>
        </div> */}

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

      {/* Accordion */}
      <div className="max-w-4xl mx-auto space-y-3">

        {majameen.map((item, index) => {

          const isOpen = openIndex === index;

          return (
            <div
              key={item._id}
              className="bg-white border border-[#f0dfb2] rounded-2xl overflow-hidden shadow-sm"
            >

              {/* Header */}
              <button
                onClick={() => toggleCard(index)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#fffdf8] hover:bg-[#fff7df] transition"
              >

                <div className="text-right">

                  <h2
                    className="text-[18px] font-bold text-[#8b6b1b]"
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

                <ChevronDown
                  size={20}
                  className={`text-[#b08a2c] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />

              </button>

              {/* Content */}
              <AnimatePresence>

                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >

                    <div className="p-5 border-t border-[#f3e6bf] bg-[#fffef9]">

                      <div
                        className="text-[18px] leading-10 text-gray-800 whitespace-pre-line"
                        style={{
                          fontFamily:
                            "'Jameel Noori Nastaleeq', serif",
                        }}
                      >
                        {item.content}
                      </div>

                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          );
        })}

      </div>
    </div>
  );
}