"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  MessageCircleQuestion,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";
const MAX_LEN = 2000;

const emptyForm = { name: "", contact: "", question: "", website: "" };

export default function AskQuestionForm({ open, onClose, backend }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState("");

  // Esc se band + background scroll lock
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
      setForm(emptyForm);
    } catch (err) {
      setErrorMsg("سوال بھیجنے میں مسئلہ آیا، دوبارہ کوشش کریں");
      setStatus("error");
    }
  };

  const fieldWrap = (name) =>
    `relative flex items-start border bg-white transition-all duration-300 ${
      focused === name
        ? "border-[#75C178] shadow-[0_0_0_4px_rgba(117,193,120,0.14)]"
        : "border-[#C6E2C8] hover:border-[#9fd1a2]"
    }`;

  const inputBase =
    "w-full bg-transparent text-[#333333] placeholder-gray-400 outline-none px-3 py-3 text-lg";

  const labelClass = "block text-[#3f8f46] text-lg mb-1 pr-1";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm md:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[94vh] overflow-y-auto bg-[#FAFDFA] shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
            style={{ direction: "rtl", fontFamily: font }}
            role="dialog"
            aria-modal="true"
            aria-label="اپنا سوال بھیجیں"
          >
            {/* ================= HEADER ================= */}
            <div
              className="relative overflow-hidden px-5 pt-7 pb-6 text-center"
              style={{
                background:
                  "linear-gradient(135deg, #4FA855 0%, #75C178 55%, #63B56A 100%)",
              }}
            >
              {/* Islamic star pattern */}
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="star"
                    width="44"
                    height="44"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M22 2 L27 15 L40 10 L33 22 L40 34 L27 29 L22 42 L17 29 L4 34 L11 22 L4 10 L17 15 Z"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#star)" />
              </svg>

              {/* gold line */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                }}
              />

              <button
                type="button"
                onClick={handleClose}
                className="absolute left-3 top-3 z-10 w-9 h-9 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition"
                aria-label="بند کریں"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
                className="relative mx-auto mb-3 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
                style={{ border: "3px solid #D4AF37" }}
              >
                <MessageCircleQuestion className="w-8 h-8 text-[#63B56A]" />
              </motion.div>

              <h2
                className="relative text-white"
                style={{ fontSize: "30px", lineHeight: "46px" }}
              >
                اپنا سوال بھیجیں
              </h2>
              <p
                className="relative text-white/90"
                style={{ fontSize: "17px", lineHeight: "30px" }}
              >
                آپ کا سوال علمائے کرام کی خدمت میں پیش کیا جائے گا
              </p>
            </div>

            {/* ================= BODY ================= */}
            <div className="px-5 py-5">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  /* ---------- SUCCESS ---------- */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                      className="mx-auto mb-4 w-24 h-24 rounded-full bg-[#EAF5EA] border-2 border-[#75C178] flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-14 h-14 text-[#63B56A]" />
                    </motion.div>

                    <p
                      className="text-[#333333]"
                      style={{ fontSize: "26px", lineHeight: "44px" }}
                    >
                      جزاک اللہ خیراً
                    </p>
                    <p
                      className="text-[#63B56A]"
                      style={{ fontSize: "20px", lineHeight: "36px" }}
                    >
                      آپ کا سوال موصول ہو گیا ہے
                    </p>
                    <p
                      className="text-gray-500 mt-1"
                      style={{ fontSize: "16px", lineHeight: "30px" }}
                    >
                      جواب تیار ہونے پر اسی ویب سائٹ پر شائع کیا جائے گا۔
                    </p>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-6 px-10 py-3 bg-[#75C178] text-white text-lg hover:bg-[#63B56A] hover:shadow-[0_0_18px_rgba(117,193,120,0.3)] transition-all duration-300"
                      style={{ fontFamily: font }}
                    >
                      بند کریں
                    </button>
                  </motion.div>
                ) : (
                  /* ---------- FORM ---------- */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* NAME */}
                    <div>
                      <label className={labelClass}>
                        آپ کا نام <span className="text-red-500">*</span>
                      </label>
                      <div className={fieldWrap("name")}>
                        <span className="pt-[14px] pr-3 text-[#75C178]">
                          <User className="w-5 h-5" />
                        </span>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused("")}
                          placeholder="یہاں نام لکھیں"
                          maxLength={100}
                          autoComplete="name"
                          className={inputBase}
                          style={{ fontFamily: font }}
                        />
                      </div>
                    </div>

                    {/* CONTACT */}
                    <div>
                      <label className={labelClass}>
                        موبائل / ای میل{" "}
                        <span className="text-gray-400 text-base">(اختیاری)</span>
                      </label>
                      <div className={fieldWrap("contact")}>
                        <span className="pt-[14px] pr-3 text-[#75C178]">
                          <Phone className="w-5 h-5" />
                        </span>
                        <input
                          name="contact"
                          value={form.contact}
                          onChange={handleChange}
                          onFocus={() => setFocused("contact")}
                          onBlur={() => setFocused("")}
                          placeholder="9876543210"
                          maxLength={100}
                          autoComplete="off"
                          dir="ltr"
                          className={`${inputBase} text-right`}
                        />
                      </div>
                    </div>

                    {/* QUESTION */}
                    <div>
                      <label className={labelClass}>
                        آپ کا سوال <span className="text-red-500">*</span>
                      </label>
                      <div className={fieldWrap("question")}>
                        <span className="pt-[14px] pr-3 text-[#75C178]">
                          <MessageCircleQuestion className="w-5 h-5" />
                        </span>
                        <textarea
                          name="question"
                          value={form.question}
                          onChange={handleChange}
                          onFocus={() => setFocused("question")}
                          onBlur={() => setFocused("")}
                          placeholder="اپنا سوال تفصیل سے یہاں لکھیں..."
                          rows={5}
                          maxLength={MAX_LEN}
                          className={`${inputBase} resize-none`}
                          style={{ fontFamily: font, lineHeight: "2.1" }}
                        />
                      </div>
                      <div
                        className="text-left text-xs text-gray-400 mt-1"
                        style={{ direction: "ltr" }}
                      >
                        {form.question.length} / {MAX_LEN}
                      </div>
                    </div>

                    {/* honeypot */}
                    <input
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                    />

                    {/* ERROR */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, x: 0 }}
                          animate={{ opacity: 1, x: [0, -8, 8, -6, 6, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-3 py-2"
                          style={{ fontSize: "17px", lineHeight: "30px" }}
                        >
                          <AlertCircle className="w-5 h-5 shrink-0" />
                          <span>{errorMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* SUBMIT */}
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 text-white flex items-center justify-center gap-2 disabled:opacity-70 hover:shadow-[0_8px_24px_rgba(99,181,106,0.4)] transition-shadow duration-300"
                      style={{
                        fontFamily: font,
                        fontSize: "23px",
                        lineHeight: "38px",
                        background:
                          "linear-gradient(135deg, #63B56A 0%, #75C178 100%)",
                        borderBottom: "3px solid #D4AF37",
                      }}
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          بھیجا جا رہا ہے...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 -scale-x-100" />
                          سوال بھیجیں
                        </>
                      )}
                    </motion.button>

                    <p
                      className="text-center text-gray-400"
                      style={{ fontSize: "15px", lineHeight: "26px" }}
                    >
                      جواب ملنے کی اطلاع کے لیے رابطہ نمبر ضرور لکھیں
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}