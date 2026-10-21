"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, Star, Smartphone } from 'lucide-react';
import { Capacitor } from '@capacitor/core';

export const SmartAppBanner: React.FC = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Never show inside the native Capacitor APK app itself
    if (typeof window === 'undefined' || Capacitor.isNativePlatform()) {
      setIsVisible(false);
      return;
    }

    // Check if dismissed in this session
    try {
      const dismissed = sessionStorage.getItem('fzo_app_banner_dismissed');
      if (dismissed === 'true') {
        setIsVisible(false);
        return;
      }
    } catch (_) {}

    // Only show on mobile browser screen widths
    const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    setIsVisible(isMobileDevice);
  }, [pathname]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    try {
      sessionStorage.setItem('fzo_app_banner_dismissed', 'true');
    } catch (_) {}
  };

  const handleOpenApp = () => {
    const currentPath = window.location.pathname + window.location.search;
    const pathWithSlash = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
    const cleanPath = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const playStoreUrl = `https://play.google.com/store/apps/details?id=com.maslakedeoband.app`;

    if (isAndroid) {
      // Android Intent: Uses verified https host + package name
      // If App is installed -> Opens exact page in App
      // If App is NOT installed -> Chrome automatically opens Google Play Store to download maslakedeoband
      const intentUrl = `intent://maslakedeoband.in${pathWithSlash}#Intent;scheme=https;package=com.maslakedeoband.app;S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`;

      try {
        window.location.href = intentUrl;
      } catch (_) {
        window.location.href = `maslakedeoband://${cleanPath || 'open'}`;
      }
    } else if (isIOS) {
      const customScheme = `maslakedeoband://${cleanPath || 'open'}`;
      const start = Date.now();
      window.location.href = customScheme;
      setTimeout(() => {
        if (Date.now() - start < 2000) {
          window.location.href = 'https://maslakedeoband.in';
        }
      }, 1500);
    } else {
      window.location.href = `maslakedeoband://${cleanPath || 'open'}`;
    }
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="w-full bg-[#0f1426] text-white px-3 py-2 flex items-center justify-between text-xs z-[99998] border-b border-gray-800 shadow-md">
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white p-0.5 rounded-full"
          aria-label="Dismiss banner"
        >
          <X size={15} />
        </button>

        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-1 shrink-0 shadow-xs">
          <img src="/icon.png" alt="maslakedeoband App" className="w-full h-full object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/favicon.ico'; }} />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="font-bold text-[12px] truncate text-white leading-tight flex items-center gap-1">
            <span>maslakedeoband</span>
          </span>
          <span className="text-[10px] text-gray-300 leading-tight flex items-center gap-1">
            <span className="flex text-amber-400">★★★★★</span>
            <span className="text-gray-400">Free on Play Store</span>
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleOpenApp}
        className="px-3 py-1.5 bg-gradient-to-r from-[#ff6a00] to-[#f4580c] hover:from-[#e05d00] text-white font-extrabold text-[11px] rounded-lg tracking-wide shrink-0 shadow-sm transition-transform active:scale-95 cursor-pointer"
      >
        OPEN IN APP
      </button>
    </div>
  );
};

export default SmartAppBanner;