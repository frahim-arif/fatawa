"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Search } from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";
const WHATSAPP_NUMBER = "919058596626"; // 91 = India country code

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

  const inputClass =
    "w-full border border-[#C6E2C8] bg-white text-[#333333] px-3 py-3 outline-none focus:border-[#75C178] focus:shadow-[0_0_14px_rgba(117,193,120,0.18)] transition";

  const WhatsAppButton = () => (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 bg-[#25D366] py-3 text-lg text-white transition hover:bg-[#1EBE5A]"
      style={{ fontFamily: font }}
    >
      <MessageCircle className="h-5 w-5" />
      واٹس ایپ پر سوال بھیجیں
    </a>
  );

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
              پہلے ہم دیکھیں گے کہ آپ کے سوال کا جواب سائٹ پر موجود ہے یا نہیں۔
            </p>

            {/* ================= SUCCESS ================= */}
            {status === "success" && (
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
            )}

            {/* ================= FOUND: jawab mil gaya ================= */}
            {status === "found" && (
              <div className="space-y-4">
                <p className="text-lg text-[#287A35]">
                  ✓ آپ کے سوال سے ملتے جلتے جوابات مل گئے ہیں:
                </p>

                <div className="divide-y divide-[#E5F0E5] border border-[#C6E2C8]">
                  {matches.map((item, i) => (
                    <Link
                      key={item._id || item.slug || i}
                      href={`/questions/${item.slug}`}
                      onClick={handleClose}
                      className="flex items-start gap-3 px-3 py-3 transition hover:bg-[#F5FAF5]"
                    >
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF5EA] text-sm text-[#287A35]">
                        {i + 1}
                      </span>
                      <span className="flex-1 text-lg leading-9 text-[#333333]">
                        {item.question}
                      </span>
                      <span className="mt-2 text-[#75C178]">←</span>
                    </Link>
                  ))}
                </div>

                <p className="text-sm text-gray-500">
                  اگر آپ کا سوال ان سے مختلف ہے تو نیچے سے بھیج دیں۔
                </p>

                <button
                  type="button"
                  onClick={submitQuestion}
                  className="w-full border border-[#75C178] bg-white py-3 text-lg text-[#287A35] transition hover:bg-[#EAF5EA]"
                  style={{ fontFamily: font }}
                >
                  میرا سوال مختلف ہے، علماء کو بھیجیں
                </button>

                <WhatsAppButton />

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="w-full py-2 text-sm text-gray-500 hover:text-[#287A35]"
                  style={{ fontFamily: font }}
                >
                  ← سوال میں ترمیم کریں
                </button>
              </div>
            )}

            {/* ================= NOT FOUND / SENDING ================= */}
            {(status === "notfound" || status === "sending") && (
              <div className="space-y-4">
                <div className="border border-[#C6E2C8] bg-[#F5FAF5] px-4 py-4 text-center text-lg leading-9 text-[#333333]">
                  معذرت! اس سوال کا جواب ابھی سائٹ پر موجود نہیں ہے۔
                  <br />
                  آپ واٹس ایپ پر ہمیں سوال بھیج سکتے ہیں۔
                </div>

                <WhatsAppButton />

                <button
                  type="button"
                  onClick={submitQuestion}
                  disabled={status === "sending"}
                  className="w-full border border-[#75C178] bg-white py-3 text-lg text-[#287A35] transition hover:bg-[#EAF5EA] disabled:opacity-60"
                  style={{ fontFamily: font }}
                >
                  {status === "sending"
                    ? "بھیجا جا رہا ہے..."
                    : "سائٹ کے ذریعے علماء کو بھیجیں"}
                </button>

                {errorMsg && (
                  <p className="text-center text-sm text-red-600">{errorMsg}</p>
                )}

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="w-full py-2 text-sm text-gray-500 hover:text-[#287A35]"
                  style={{ fontFamily: font }}
                >
                  ← سوال میں ترمیم کریں
                </button>
              </div>
            )}

            {/* ================= FORM ================= */}
            {(status === "idle" ||
              status === "checking" ||
              status === "error") && (
              <form onSubmit={handleCheck} className="space-y-3">
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
                  disabled={status === "checking"}
                  className="flex w-full items-center justify-center gap-2 bg-[#75C178] py-3 text-lg text-white transition hover:bg-[#63B56A] disabled:opacity-60"
                  style={{ fontFamily: font }}
                >
                  <Search className="h-4 w-4" />
                  {status === "checking" ? "جواب تلاش کیا جا رہا ہے..." : "جواب تلاش کریں"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}