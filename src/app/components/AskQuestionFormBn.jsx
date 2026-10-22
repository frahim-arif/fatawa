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

const font = "var(--font-bengali), 'Noto Sans Bengali', sans-serif";
const MAX_LEN = 2000;
const emptyForm = { name: "", contact: "", question: "", website: "", lang: "bn" };

export default function AskQuestionFormBn({ open, onClose, backend }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState("");

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
      setErrorMsg("অনুগ্রহ করে আপনার নাম ও প্রশ্ন লিখুন।");
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
        throw new Error(data.message || "Error");
      }

      setStatus("success");
      setForm(emptyForm);
    } catch {
      setErrorMsg("প্রশ্ন পাঠানো যায়নি, আবার চেষ্টা করুন।");
      setStatus("error");
    }
  };

  const fieldWrap = (name) =>
    `relative flex items-start border bg-white transition-all duration-300 ${
      focused === name
        ? "border-[#c8ae6a] shadow-[0_0_0_4px_rgba(200,174,106,0.2)]"
        : "border-[#d9cfbf] hover:border-[#b8a875]"
    }`;

  const inputBase =
    "w-full bg-transparent px-3 py-3 text-base text-[#1d332f] placeholder-gray-400 outline-none";

  const labelClass = "mb-1 block text-sm font-semibold text-[#174d40]";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center md:px-4"
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
            className="relative max-h-[94vh] w-full max-w-lg overflow-y-auto bg-[#fffaf0] shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
            style={{ fontFamily: font }}
            role="dialog"
            aria-modal="true"
            aria-label="আপনার প্রশ্ন পাঠান"
          >
            {/* HEADER */}
            <div
              className="relative overflow-hidden px-5 pb-6 pt-7 text-center"
              style={{
                background: "linear-gradient(135deg, #071c19 0%, #0b302a 55%, #174d40 100%)",
              }}
            >
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="starBn" width="44" height="44" patternUnits="userSpaceOnUse">
                    <path
                      d="M22 2 L27 15 L40 10 L33 22 L40 34 L27 29 L22 42 L17 29 L4 34 L11 22 L4 10 L17 15 Z"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#starBn)" />
              </svg>

              <div
                className="absolute left-0 right-0 top-0 h-[3px]"
                style={{
                  background: "linear-gradient(90deg, transparent, #c8ae6a, transparent)",
                }}
              />

              <button
                type="button"
                onClick={handleClose}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center text-white/90 transition hover:bg-white/20 hover:text-white"
                aria-label="বন্ধ করুন"
              >
                <X className="h-5 w-5" />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
                className="relative mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
                style={{ border: "3px solid #c8ae6a" }}
              >
                <MessageCircleQuestion className="h-8 w-8 text-[#174d40]" />
              </motion.div>

              <h2 className="relative text-2xl font-bold leading-10 text-[#f5e6bd] md:text-[28px]">
                আপনার প্রশ্ন পাঠান
              </h2>
              <p className="relative mt-1 text-sm leading-6 text-[#d8c27d]">
                আপনার প্রশ্ন আলেমদের কাছে পেশ করা হবে
              </p>
            </div>

            {/* BODY */}
            <div className="px-5 py-5">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                      className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#c8ae6a] bg-[#f8f1df]"
                    >
                      <CheckCircle2 className="h-14 w-14 text-[#174d40]" />
                    </motion.div>

                    <p className="text-2xl font-bold leading-10 text-[#174d40]">
                      জাযাকাল্লাহু খাইরান
                    </p>
                    <p className="mt-1 text-lg leading-8 text-[#806b3f]">
                      আপনার প্রশ্ন পাওয়া গেছে
                    </p>
                    <p className="mt-1 text-sm leading-7 text-gray-500">
                      উত্তর প্রস্তুত হলে এই ওয়েবসাইটে প্রকাশ করা হবে।
                    </p>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-6 bg-[#174d40] px-10 py-3 font-semibold text-[#f5e6bd] transition-all duration-300 hover:bg-[#216353]"
                      style={{ borderBottom: "3px solid #c8ae6a" }}
                    >
                      বন্ধ করুন
                    </button>
                  </motion.div>
                ) : (
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
                        আপনার নাম <span className="text-red-500">*</span>
                      </label>
                      <div className={fieldWrap("name")}>
                        <span className="pl-3 pt-[14px] text-[#806b3f]">
                          <User className="h-5 w-5" />
                        </span>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused("")}
                          placeholder="এখানে নাম লিখুন"
                          maxLength={100}
                          autoComplete="name"
                          className={inputBase}
                        />
                      </div>
                    </div>

                    {/* CONTACT */}
                    <div>
                      <label className={labelClass}>
                        মোবাইল / ইমেইল{" "}
                        <span className="font-normal text-gray-400">(ঐচ্ছিক)</span>
                      </label>
                      <div className={fieldWrap("contact")}>
                        <span className="pl-3 pt-[14px] text-[#806b3f]">
                          <Phone className="h-5 w-5" />
                        </span>
                        <input
                          name="contact"
                          value={form.contact}
                          onChange={handleChange}
                          onFocus={() => setFocused("contact")}
                          onBlur={() => setFocused("")}
                          placeholder="name@example.com"
                          maxLength={100}
                          autoComplete="off"
                          className={inputBase}
                        />
                      </div>
                    </div>

                    {/* QUESTION */}
                    <div>
                      <label className={labelClass}>
                        আপনার প্রশ্ন <span className="text-red-500">*</span>
                      </label>
                      <div className={fieldWrap("question")}>
                        <span className="pl-3 pt-[14px] text-[#806b3f]">
                          <MessageCircleQuestion className="h-5 w-5" />
                        </span>
                        <textarea
                          name="question"
                          value={form.question}
                          onChange={handleChange}
                          onFocus={() => setFocused("question")}
                          onBlur={() => setFocused("")}
                          placeholder="আপনার প্রশ্ন বিস্তারিত লিখুন..."
                          rows={5}
                          maxLength={MAX_LEN}
                          className={`${inputBase} resize-none leading-8`}
                        />
                      </div>
                      <div className="mt-1 text-right text-xs text-gray-400">
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
                          className="flex items-center gap-2 border border-red-200 bg-red-50 px-3 py-2 text-sm leading-7 text-red-600"
                        >
                          <AlertCircle className="h-5 w-5 shrink-0" />
                          <span>{errorMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* SUBMIT */}
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center justify-center gap-2 bg-[#174d40] py-3 text-lg font-semibold text-[#f5e6bd] transition-colors hover:bg-[#216353] disabled:opacity-70"
                      style={{ borderBottom: "3px solid #c8ae6a" }}
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          পাঠানো হচ্ছে...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          প্রশ্ন পাঠান
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs leading-6 text-gray-400">
                      উত্তর পেলে জানানোর জন্য ফোন নম্বর বা ইমেইল দিন
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