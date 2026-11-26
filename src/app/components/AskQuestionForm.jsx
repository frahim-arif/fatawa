"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MessageCircle,
  Search,
  User,
  Phone,
  PenLine,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";
const WHATSAPP_NUMBER = "919058596626"; // 91 = India country code
const MAX_LENGTH = 2000;

const STEPS = ["سوال لکھیں", "جواب تلاش", "ارسال"];

export default function AskQuestionForm({ open, onClose, backend }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    question: "",
    website: "", // honeypot (spam bots ke liye)
  });
  // idle | checking | found | notfound | sending | success | error
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [matches, setMatches] = useState([]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setErrorMsg("");
      setMatches([]);
    }, 300);
  };

  /* ---------- Escape se band + background scroll lock ---------- */

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `السلام علیکم،\n\nمیرا سوال:\n${form.question.trim()}\n\nنام: ${form.name.trim()}`
  )}`;

  /* ---------- STEP 1: pehle site par jawab dhundho ---------- */

  const handleCheck = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.question.trim()) {
      setErrorMsg("براہ کرم نام اور سوال لکھیں");
      setStatus("error");
      return;
    }

    setStatus("checking");
    setErrorMsg("");

    try {
      // lamba sawal ho to shuru ke 100 characters se search
      const q = form.question.trim().slice(0, 100);

      const res = await fetch(
        `${backend}/admin/questions/search?q=${encodeURIComponent(q)}`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error("Search error");

      const data = await res.json();
      const list = data.success ? data.data || [] : [];

      if (list.length > 0) {
        setMatches(list.slice(0, 5));
        setStatus("found");
      } else {
        setMatches([]);
        setStatus("notfound");
      }
    } catch (err) {
      // search fail ho jaye to bhi user ruke nahi
      setMatches([]);
      setStatus("notfound");
    }
  };

  /* ---------- STEP 2: sawal ulama ko bhejo ---------- */

  const submitQuestion = async () => {
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
      setStatus("notfound");
    }
  };

  /* ---------- styles ---------- */

  const inputClass =
    "w-full rounded-xl border border-[#D6EBD8] bg-[#F9FCF9] py-3 pr-11 pl-3 text-lg text-[#1F2D1F] placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#75C178] focus:bg-white focus:shadow-[0_0_0_4px_rgba(117,193,120,0.18)]";

  const primaryBtn =
    "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#3A9448] to-[#287A35] py-3 text-lg text-white shadow-[0_6px_18px_rgba(40,122,53,0.35)] transition-all duration-300 hover:from-[#33853F] hover:to-[#20652B] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

  const outlineBtn =
    "flex w-full items-center justify-center gap-2 rounded-xl border border-[#75C178] bg-white py-3 text-lg text-[#287A35] transition-all duration-200 hover:bg-[#EEF7EE] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

  const backBtn =
    "flex w-full items-center justify-center gap-1 py-2 text-sm text-gray-500 transition hover:text-[#287A35]";

  /* ---------- WhatsApp button ---------- */

  const whatsappButton = (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#2BD96B] to-[#1EBE5A] py-3 text-lg text-white shadow-[0_6px_18px_rgba(37,211,102,0.35)] transition-all duration-300 hover:brightness-95 active:scale-[0.98]"
      style={{ fontFamily: font }}
    >
      <MessageCircle className="h-5 w-5" />
      واٹس ایپ پر سوال بھیجیں
    </a>
  );

  /* ---------- step indicator ---------- */

  const currentStep =
    status === "success"
      ? 3
      : status === "found" || status === "notfound" || status === "sending"
      ? 2
      : 1;

  const showSteps = status !== "success";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-3 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl border border-[#D6EBD8] bg-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.45)]"
            style={{ direction: "rtl", fontFamily: font }}
          >
            {/* ================= HEADER ================= */}

            <div className="relative overflow-hidden bg-gradient-to-br from-[#287A35] via-[#3A9448] to-[#4FAE5B] px-5 pb-5 pt-5">
              {/* pattern */}
              <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cpath d='M22 2 L27 15 L40 10 L33 22 L40 34 L27 29 L22 42 L17 29 L4 34 L11 22 L4 10 L17 15 Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E\")",
                }}
              />

              {/* gold bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-l from-[#B8901F] via-[#F5D76E] to-[#B8901F]" />

              <button
                type="button"
                onClick={handleClose}
                className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 active:scale-90"
                aria-label="بند کریں"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-[1] flex items-center gap-3">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/70 bg-gradient-to-br from-[#F5D76E] to-[#D4AF37] text-white shadow-[0_6px_16px_rgba(0,0,0,0.25)]">
                  <HelpCircle className="h-7 w-7" strokeWidth={2.2} />
                </span>

                <div className="min-w-0 flex-1">
                  <h2
                    className="text-2xl text-white"
                    style={{
                      lineHeight: "40px",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                  >
                    اپنا سوال بھیجیں
                  </h2>
                  <p className="text-sm leading-6 text-[#E6F5E7]">
                    پہلے ہم دیکھیں گے کہ جواب سائٹ پر موجود ہے یا نہیں
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              {/* ================= STEPS ================= */}

              {showSteps && (
                <div className="mb-5 flex items-center justify-between">
                  {STEPS.map((label, i) => {
                    const num = i + 1;
                    const done = currentStep > num;
                    const active = currentStep === num;

                    return (
                      <React.Fragment key={label}>
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-300 ${
                              done
                                ? "bg-[#287A35] text-white"
                                : active
                                ? "bg-[#D4AF37] text-white shadow-[0_0_0_4px_rgba(212,175,55,0.25)]"
                                : "bg-[#EEF7EE] text-gray-400"
                            }`}
                          >
                            {done ? "✓" : num}
                          </span>
                          <span
                            className={`text-xs ${
                              active || done
                                ? "text-[#287A35]"
                                : "text-gray-400"
                            }`}
                          >
                            {label}
                          </span>
                        </div>

                        {i < STEPS.length - 1 && (
                          <div
                            className={`mx-1 mb-5 h-[2px] flex-1 rounded transition-all duration-300 ${
                              currentStep > num ? "bg-[#287A35]" : "bg-[#E1EEE2]"
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}

              {/* ================= SUCCESS ================= */}

              {status === "success" && (
                <div className="py-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF5EA] shadow-[0_0_0_8px_rgba(117,193,120,0.15)]"
                  >
                    <CheckCircle2 className="h-12 w-12 text-[#287A35]" />
                  </motion.div>

                  <p className="mb-1 text-2xl text-[#287A35]">
                    جزاک اللہ خیراً
                  </p>
                  <p className="mb-6 text-lg leading-9 text-gray-600">
                    آپ کا سوال موصول ہو گیا ہے۔
                    <br />
                    علمائے کرام جلد جواب دیں گے۔
                  </p>

                  <button
                    type="button"
                    onClick={handleClose}
                    className={primaryBtn}
                    style={{ fontFamily: font }}
                  >
                    بند کریں
                  </button>
                </div>
              )}

              {/* ================= FOUND ================= */}

              {status === "found" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 rounded-xl bg-[#EAF5EA] px-3 py-3 text-[#287A35]">
                    <CheckCircle2 className="h-6 w-6 shrink-0" />
                    <p className="text-lg leading-8">
                      آپ کے سوال سے ملتے جلتے جوابات مل گئے ہیں
                    </p>
                  </div>

                  <div className="space-y-2">
                    {matches.map((item, i) => (
                      <Link
                        key={item._id || item.slug || i}
                        href={`/questions/${item.slug}`}
                        onClick={handleClose}
                        className="group flex items-start gap-3 rounded-xl border border-[#D6EBD8] bg-white px-3 py-3 transition-all duration-200 hover:border-[#75C178] hover:bg-[#F5FAF5] hover:shadow-[0_4px_14px_rgba(40,122,53,0.12)]"
                      >
                        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF5EA] text-sm text-[#287A35]">
                          {i + 1}
                        </span>
                        <span className="flex-1 text-lg leading-9 text-[#333333] transition-colors group-hover:text-[#287A35]">
                          {item.question}
                        </span>
                        <ArrowLeft className="mt-2 h-5 w-5 shrink-0 text-[#75C178] transition-transform group-hover:-translate-x-1" />
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="h-px flex-1 bg-[#E1EEE2]" />
                    <p className="text-sm text-gray-500">
                      اگر آپ کا سوال مختلف ہے
                    </p>
                    <div className="h-px flex-1 bg-[#E1EEE2]" />
                  </div>

                  <button
                    type="button"
                    onClick={submitQuestion}
                    className={outlineBtn}
                    style={{ fontFamily: font }}
                  >
                    <Send className="h-4 w-4" />
                    میرا سوال مختلف ہے، علماء کو بھیجیں
                  </button>

                  {whatsappButton}

                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className={backBtn}
                    style={{ fontFamily: font }}
                  >
                    <ArrowRight className="h-4 w-4" />
                    سوال میں ترمیم کریں
                  </button>
                </div>
              )}

              {/* ================= NOT FOUND / SENDING ================= */}

              {(status === "notfound" || status === "sending") && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#F0E0A8] bg-[#FFFBEA] px-4 py-4 text-center">
                    <p className="text-lg leading-9 text-[#6B5410]">
                      معذرت! اس سوال کا جواب ابھی سائٹ پر موجود نہیں ہے۔
                    </p>
                    <p className="text-base leading-8 text-[#8A7220]">
                      آپ واٹس ایپ پر یا سائٹ کے ذریعے سوال بھیج سکتے ہیں۔
                    </p>
                  </div>

                  {whatsappButton}

                  <button
                    type="button"
                    onClick={submitQuestion}
                    disabled={status === "sending"}
                    className={outlineBtn}
                    style={{ fontFamily: font }}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        بھیجا جا رہا ہے...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        سائٹ کے ذریعے علماء کو بھیجیں
                      </>
                    )}
                  </button>

                  {errorMsg && (
                    <p className="flex items-center justify-center gap-1 text-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className={backBtn}
                    style={{ fontFamily: font }}
                  >
                    <ArrowRight className="h-4 w-4" />
                    سوال میں ترمیم کریں
                  </button>
                </div>
              )}

              {/* ================= FORM ================= */}

              {(status === "idle" ||
                status === "checking" ||
                status === "error") && (
                <form onSubmit={handleCheck} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="mb-1 block text-base text-[#287A35]">
                      آپ کا نام <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#75C178]" />
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="اپنا نام لکھیں"
                        className={inputClass}
                        style={{ fontFamily: font }}
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="mb-1 block text-base text-[#287A35]">
                      ای میل یا فون نمبر{" "}
                      <span className="text-sm text-gray-400">(اختیاری)</span>
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#75C178]" />
                      <input
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        placeholder="جواب بھیجنے کے لیے"
                        className={inputClass}
                        style={{ fontFamily: font, direction: "rtl" }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div>
                    <label className="mb-1 block text-base text-[#287A35]">
                      آپ کا سوال <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <PenLine className="pointer-events-none absolute right-3 top-4 h-5 w-5 text-[#75C178]" />
                      <textarea
                        name="question"
                        value={form.question}
                        onChange={handleChange}
                        placeholder="اپنا سوال یہاں تفصیل سے لکھیں"
                        rows={5}
                        maxLength={MAX_LENGTH}
                        className={`${inputClass} resize-none`}
                        style={{ fontFamily: font, lineHeight: "2" }}
                      />
                    </div>
                    <p className="mt-1 text-left text-xs text-gray-400" dir="ltr">
                      {form.question.length} / {MAX_LENGTH}
                    </p>
                  </div>

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
                    <p className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "checking"}
                    className={primaryBtn}
                    style={{ fontFamily: font }}
                  >
                    {status === "checking" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        جواب تلاش کیا جا رہا ہے...
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5" />
                        جواب تلاش کریں
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}