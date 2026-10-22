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

const MAX_LEN = 2000;
const emptyForm = { name: "", contact: "", question: "", website: "", lang: "en" };

export default function AskQuestionFormEn({ open, onClose, backend }) {
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
      setErrorMsg("Please enter your name and your question.");
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
      setErrorMsg("Could not send your question. Please try again.");
      setStatus("error");
    }
  };

  const fieldWrap = (name) =>
    `relative flex items-start border bg-white transition-all duration-300 ${
      focused === name
        ? "border-[#b68a35] shadow-[0_0_0_4px_rgba(182,138,53,0.15)]"
        : "border-[#d5dfe7] hover:border-[#9fb3c4]"
    }`;

  const inputBase =
    "w-full bg-transparent px-3 py-3 text-base text-[#173b57] placeholder-gray-400 outline-none";

  const labelClass = "mb-1 block text-sm font-semibold text-[#315b7a]";

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
            className="relative max-h-[94vh] w-full max-w-lg overflow-y-auto bg-[#f6f9fb] shadow-[0_25px_70px_rgba(0,0,0,0.4)]"
            role="dialog"
            aria-modal="true"
            aria-label="Ask your question"
          >
            {/* HEADER */}
            <div
              className="relative overflow-hidden px-5 pb-6 pt-7 text-center"
              style={{
                background: "linear-gradient(135deg, #0b2236 0%, #102d45 55%, #174261 100%)",
              }}
            >
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="starEn" width="44" height="44" patternUnits="userSpaceOnUse">
                    <path
                      d="M22 2 L27 15 L40 10 L33 22 L40 34 L27 29 L22 42 L17 29 L4 34 L11 22 L4 10 L17 15 Z"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#starEn)" />
              </svg>

              <div
                className="absolute left-0 right-0 top-0 h-[3px]"
                style={{
                  background: "linear-gradient(90deg, transparent, #d7aa4b, transparent)",
                }}
              />

              <button
                type="button"
                onClick={handleClose}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center text-white/90 transition hover:bg-white/20 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
                className="relative mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
                style={{ border: "3px solid #b68a35" }}
              >
                <MessageCircleQuestion className="h-8 w-8 text-[#102d45]" />
              </motion.div>

              <h2 className="relative text-2xl font-bold text-white md:text-[28px]">
                Ask Your Question
              </h2>
              <p className="relative mt-1 text-sm text-[#c9d8e5]">
                Your question will be presented to our scholars
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
                      className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#b68a35] bg-[#eef3f8]"
                    >
                      <CheckCircle2 className="h-14 w-14 text-[#102d45]" />
                    </motion.div>

                    <p className="text-2xl font-bold text-[#102d45]">
                      JazakAllah Khair
                    </p>
                    <p className="mt-1 text-lg text-[#315b7a]">
                      Your question has been received.
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      The answer will be published on this website once it is ready.
                    </p>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-6 bg-[#102d45] px-10 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#174261]"
                      style={{ borderBottom: "3px solid #b68a35" }}
                    >
                      Close
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
                        Your name <span className="text-red-500">*</span>
                      </label>
                      <div className={fieldWrap("name")}>
                        <span className="pl-3 pt-[14px] text-[#b68a35]">
                          <User className="h-5 w-5" />
                        </span>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused("")}
                          placeholder="Enter your name"
                          maxLength={100}
                          autoComplete="name"
                          className={inputBase}
                        />
                      </div>
                    </div>

                    {/* CONTACT */}
                    <div>
                      <label className={labelClass}>
                        Phone or email{" "}
                        <span className="font-normal text-gray-400">(optional)</span>
                      </label>
                      <div className={fieldWrap("contact")}>
                        <span className="pl-3 pt-[14px] text-[#b68a35]">
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
                        Your question <span className="text-red-500">*</span>
                      </label>
                      <div className={fieldWrap("question")}>
                        <span className="pl-3 pt-[14px] text-[#b68a35]">
                          <MessageCircleQuestion className="h-5 w-5" />
                        </span>
                        <textarea
                          name="question"
                          value={form.question}
                          onChange={handleChange}
                          onFocus={() => setFocused("question")}
                          onBlur={() => setFocused("")}
                          placeholder="Write your question in detail..."
                          rows={5}
                          maxLength={MAX_LEN}
                          className={`${inputBase} resize-none leading-7`}
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
                          className="flex items-center gap-2 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
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
                      className="flex w-full items-center justify-center gap-2 bg-[#102d45] py-3 text-lg font-semibold text-white transition-colors hover:bg-[#174261] disabled:opacity-70"
                      style={{ borderBottom: "3px solid #b68a35" }}
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Question
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-gray-400">
                      Add a phone number or email so we can let you know when it is answered.
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