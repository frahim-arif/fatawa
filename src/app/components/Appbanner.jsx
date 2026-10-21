"use client";

import React, { useState, useEffect } from "react";

// 👇 Apna asli package name yahan likhein
const PACKAGE_NAME = "com.maslakedeoband.app";
const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;
const STORAGE_KEY = "appBannerClosed";

export default function AppBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Sirf Android mobile par dikhao
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (!isAndroid) return;

    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch (e) {}

    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {}
  };

  if (!show) return null;
  return (
    <>
      {/* Spacer: taaki banner ke neeche content na chhupe */}
      <div style={{ height: 72 }} />

      <div
        className="fixed top-0 left-0 right-0 flex items-center gap-3 px-3 py-2.5 bg-[#0f172a] text-white border-b border-slate-700"
        style={{ zIndex: 99999, fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="text-slate-400 text-2xl leading-none px-1.5"
        >
          &times;
        </button>

        <img
          src="/app-logo.png"
          alt="Maslakedeoband.in"
          className="w-[52px] h-[52px] rounded-xl bg-white shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="text-base font-bold truncate">Maslakedeoband.in</div>
          <div className="text-xs text-slate-400 mt-0.5">
            <span className="text-yellow-400 tracking-wider mr-1">★★★★★</span>
            Free on Play Store
          </div>
        </div>
        <a
          href={PLAY_STORE_URL}
          className="bg-orange-500 text-white font-bold text-[13px] px-3.5 py-2.5 rounded-[10px] whitespace-nowrap"
        >
          OPEN IN APP
        </a>
      </div>
    </>
  );
}