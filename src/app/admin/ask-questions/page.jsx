"use client";

import React, { useState, useEffect, useCallback } from "react";

const backend = "https://f-backend-vdi1.onrender.com/api";
const font = "'Jameel Noori Nastaleeq', serif";

// ⚠️ Yahan wo key likhein jisme aapka admin login token save hota hai
const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

const formatDate = (d) =>
  new Date(d).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// contact se WhatsApp ya email link banana
const getContactLink = (contact) => {
  if (!contact) return null;
  if (contact.includes("@")) {
    return { href: `mailto:${contact}`, label: "ای میل" };
  }
  let digits = contact.replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits; // India
  if (digits.length < 10) return null;
  return { href: `https://wa.me/${digits}`, label: "WhatsApp" };
};

export default function AdminAskQuestionsPage() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("pending"); // pending | answered | all
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const qs = filter === "all" ? "" : `?status=${filter}`;
      const res = await fetch(`${backend}/ask-question${qs}`, {
        headers: authHeaders(),
        cache: "no-store",
      });

      if (res.status === 401) {
        setError("لاگ اِن ضروری ہے (token نہیں ملا یا ختم ہو گیا)");
        setItems([]);
        return;
      }

      const data = await res.json();
      if (data.success) setItems(data.data || []);
      else setError("ڈیٹا لوڈ نہیں ہوا");
    } catch (e) {
      setError("سرور سے رابطہ نہیں ہو سکا");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id, status) => {
    await fetch(`${backend}/ask-question/${id}/status`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    });
    load();
  };

  const remove = async (id) => {
    if (!confirm("کیا آپ یہ سوال حذف کرنا چاہتے ہیں؟")) return;
    await fetch(`${backend}/ask-question/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    load();
  };

  const copyQuestion = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("سوال کاپی ہو گیا");
    } catch {
      alert("کاپی نہیں ہو سکا");
    }
  };

  const tabs = [
    { key: "pending", label: "نئے" },
    { key: "answered", label: "جواب دیے گئے" },
    { key: "all", label: "سب" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4" style={{ fontFamily: font }}>
      <h1 className="text-3xl text-[#333333] mb-4 text-right">
        آئے ہوئے سوالات
      </h1>

      {/* Filter tabs */}
      <div className="flex border border-[#C6E2C8] mb-4" style={{ direction: "rtl" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setFilter(t.key)}
            className={`flex-1 py-2 text-xl transition ${
              filter === t.key
                ? "bg-[#75C178] text-white"
                : "bg-[#EAF5EA] text-[#333333] hover:bg-[#F5FAF5]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-gray-500">لوڈ ہو رہا ہے...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="text-center text-gray-500 py-8">کوئی سوال موجود نہیں۔</p>
      )}

      <div className="space-y-4">
        {items.map((item) => {
          const contact = getContactLink(item.contact);
          return (
            <div
              key={item._id}
              className="relative bg-white border border-[#C6E2C8] shadow p-4"
              style={{ direction: "rtl" }}
            >
              <div
                className={`absolute right-0 top-0 bottom-0 w-1 ${
                  item.status === "pending" ? "bg-[#D4AF37]" : "bg-[#75C178]"
                }`}
              />

              <div className="flex justify-between items-start gap-2 pr-2">
                <div>
                  <p className="text-xl text-[#333333]">{item.name}</p>
                  {item.contact && (
                    <p className="text-sm text-gray-500" style={{ direction: "ltr", textAlign: "right" }}>
                      {item.contact}
                    </p>
                  )}
                </div>
                <div className="text-left">
                  <span
                    className={`text-sm px-2 py-1 ${
                      item.status === "pending"
                        ? "bg-[#FFF6D6] text-[#8a6d00]"
                        : "bg-[#EAF5EA] text-[#3f8f46]"
                    }`}
                  >
                    {item.status === "pending" ? "نیا" : "جواب دیا گیا"}
                  </span>
                  <p className="text-xs text-gray-400 mt-1" style={{ direction: "ltr" }}>
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>

              <p
                className="text-xl text-[#333333] mt-3 pr-2 whitespace-pre-wrap"
                style={{ lineHeight: "2.2" }}
              >
                {item.question}
              </p>

              <div className="flex flex-wrap gap-2 mt-4 pr-2">
                <button
                  type="button"
                  onClick={() => copyQuestion(item.question)}
                  className="px-3 py-1 border border-[#C6E2C8] hover:bg-[#EAF5EA] transition"
                >
                  کاپی
                </button>

                {contact && (
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 border border-[#C6E2C8] hover:bg-[#EAF5EA] transition"
                  >
                    {contact.label}
                  </a>
                )}

                {item.status === "pending" ? (
                  <button
                    type="button"
                    onClick={() => setStatus(item._id, "answered")}
                    className="px-3 py-1 bg-[#75C178] text-white hover:bg-[#63B56A] transition"
                  >
                    ✓ جواب دیا گیا
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStatus(item._id, "pending")}
                    className="px-3 py-1 border border-[#C6E2C8] hover:bg-[#EAF5EA] transition"
                  >
                    دوبارہ نیا کریں
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => remove(item._id)}
                  className="px-3 py-1 text-red-600 border border-red-200 hover:bg-red-50 transition mr-auto"
                >
                  حذف
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}