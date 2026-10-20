"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";

export default function AskQuestionForm({ open, onClose, backend }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    question: "",
    website: "", // honeypot (spam bots ke liye)
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setErrorMsg("");
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.question.trim()) {
      setErrorMsg("براہ کرم نام اور سوال لکھیں");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(`${backend}/ask-question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "خرابی");
      }

      setStatus("success");
      setForm({ name: "", contact: "", question: "", website: "" });
    } catch (err) {
      setErrorMsg("سوال بھیجنے میں مسئلہ آیا، دوبارہ کوشش کریں");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border border-[#C6E2C8] bg-white text-[#333333] px-3 py-3 outline-none focus:border-[#75C178] focus:shadow-[0_0_14px_rgba(117,193,120,0.18)] transition";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white border border-[#C6E2C8] shadow-2xl p-5"
            style={{ direction: "rtl", fontFamily: font }}
          >
            <div className="absolute right-0 top-0 left-0 h-[3px] bg-[#75C178]" />

            <button
              type="button"
              onClick={handleClose}
              className="absolute left-3 top-4 p-1 hover:bg-[#EAF5EA] transition"
              aria-label="بند کریں"
            >
              <X className="w-5 h-5 text-[#333333]" />
            </button>

            <h2 className="text-2xl text-[#333333] mb-1 mt-2">
              اپنا سوال بھیجیں
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              آپ کا سوال علمائے کرام کو بھیج دیا جائے گا۔
            </p>

            {status === "success" ? (
              <div className="text-center py-8">
                <p className="text-xl text-[#63B56A] mb-4">
                  ✓ آپ کا سوال موصول ہو گیا ہے
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-7 py-2 bg-[#75C178] text-white hover:bg-[#63B56A] transition"
                  style={{ fontFamily: font }}
                >
                  بند کریں
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="آپ کا نام *"
                  className={inputClass}
                  style={{ fontFamily: font }}
                />

                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="ای میل یا فون نمبر (اختیاری)"
                  className={inputClass}
                  style={{ fontFamily: font, direction: "rtl" }}
                />

                <textarea
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  placeholder="اپنا سوال یہاں لکھیں *"
                  rows={5}
                  maxLength={2000}
                  className={inputClass}
                  style={{ fontFamily: font, lineHeight: "2" }}
                />

                {/* honeypot: users ko nazar nahi aata */}
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                {status === "error" && (
                  <p className="text-red-600 text-sm">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 bg-[#75C178] text-white text-lg hover:bg-[#63B56A] disabled:opacity-60 transition"
                  style={{ fontFamily: font }}
                >
                  {status === "sending" ? "بھیجا جا رہا ہے..." : "سوال بھیجیں"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}