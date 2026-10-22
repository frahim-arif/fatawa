
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Capacitor } from "@capacitor/core";

export default function AppBanner() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      setIsVisible(false);
      return;
    }

    try {
      if (
        sessionStorage.getItem("fzo_app_banner_dismissed") === "true"
      ) {
        setIsDismissed(true);
        setIsVisible(false);
        return;
      }
    } catch {}

    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    setIsVisible(isMobile);
  }, [pathname]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);

    try {
      sessionStorage.setItem("fzo_app_banner_dismissed", "true");
    } catch {}
  };

  const handleOpenApp = () => {
    const currentPath =
      window.location.pathname + window.location.search;

    const pathWithSlash = currentPath.startsWith("/")
      ? currentPath
      : `/${currentPath}`;

    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=com.maslakedeoband.app";

    if (/Android/i.test(navigator.userAgent)) {
      const intentUrl =
        `intent://maslakedeoband.in${pathWithSlash}` +
        `#Intent;scheme=https;package=com.maslakedeoband.app;` +
        `S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`;

      window.location.href = intentUrl;
      return;
    }

    window.location.href = playStoreUrl;
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 w-full flex items-center justify-between gap-3 px-3 py-2.5 bg-[#0f172a] text-white border-t border-slate-700 shadow-md"
      style={{
        zIndex: 99999,
        marginBottom: 0,
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* App details */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="text-gray-400 hover:text-white p-0.5 rounded-full shrink-0"
        >
          <X size={15} />
        </button>

        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-1 shrink-0">
          <img
            src="/icon.png"
            alt="Maslakedeoband app"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/favicon.ico";
            }}
          />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="font-bold text-[12px] truncate leading-tight">
            maslakedeoband
          </span>

          <span className="text-[10px] text-gray-300 leading-tight flex items-center gap-1">
            <span className="text-amber-400">★★★★★</span>
            <span className="text-gray-400">Free on Play Store</span>
          </span>
        </div>
      </div>

      {/* Open app button */}
      <button
        type="button"
        onClick={handleOpenApp}
        className="px-3 py-1.5 bg-gradient-to-r from-[#ff6a00] to-[#f4580c] text-white font-extrabold text-[11px] rounded-lg tracking-wide shrink-0 shadow-sm"
      >
        OPEN IN APP
      </button>
    </div>
  );
}
