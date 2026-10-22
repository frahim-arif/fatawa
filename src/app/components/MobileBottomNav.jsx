"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Wrench, BookOpen, Search } from "lucide-react";

const urFont = "'Jameel Noori Nastaleeq', serif";

const ITEMS_UR = [
  { key: "home", label: "ہوم", href: "/", icon: Home },
  { key: "tools", label: "ٹولز", href: null, targetId: "islamic-tools", icon: Wrench },
  { key: "books", label: "کتب", href: "/books", icon: BookOpen },
  { key: "search", label: "تلاش", href: null, targetId: "home-search", icon: Search },
];

const ITEMS_EN = [
  { key: "home", label: "Home", href: "/en", icon: Home },
  { key: "tools", label: "Tools", href: null, targetId: "islamic-tools", icon: Wrench },
  { key: "books", label: "Books", href: "/books", icon: BookOpen },
  { key: "search", label: "Search", href: null, targetId: "home-search", icon: Search },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeScroll, setActiveScroll] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    setActiveScroll(null);
  }, [pathname]);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // admin pages par nav nahi dikhana
  if (pathname?.startsWith("/admin")) return null;

  const isEn = pathname?.startsWith("/en");
  const items = isEn ? ITEMS_EN : ITEMS_UR;
  const homePath = isEn ? "/en" : "/";

  const colors = isEn
    ? { active: "#102d45", activeBg: "#e3ebf2", gold: "#b68a35", idle: "#6b7280" }
    : { active: "#63B56A", activeBg: "#EAF5EA", gold: "#D4AF37", idle: "#6b7280" };

  const isActive = (item) => {
    if (item.href) {
      if (item.href === homePath) return pathname === homePath && !activeScroll;
      return pathname?.startsWith(item.href);
    }
    return activeScroll === item.key;
  };

  // element milne tak intezar karta hai (homepage loader ki wajah se)
  const scrollToWhenReady = (item) => {
    clearInterval(timerRef.current);
    let tries = 0;

    timerRef.current = setInterval(() => {
      const el = document.getElementById(item.targetId);
      tries += 1;

      if (el) {
        clearInterval(timerRef.current);

        el.scrollIntoView({
          behavior: "smooth",
          block: item.key === "search" ? "center" : "start",
        });

        if (item.key === "search") {
          setTimeout(() => el.querySelector("input")?.focus(), 450);
        }
      } else if (tries > 30) {
        clearInterval(timerRef.current);
      }
    }, 150);
  };

  const handleScrollTab = (item) => {
    setActiveScroll(item.key);

    if (pathname !== homePath) {
      router.push(homePath);
    }

    scrollToWhenReady(item);
  };

  const handleHome = () => {
    setActiveScroll(null);
    if (pathname === homePath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        ${isEn ? "" : `.mbn, .mbn * { font-family: ${urFont} !important; }`}
        .mbn-tab:active .mbn-pill { transform: scale(0.92); }
      `}</style>

      <div className="md:hidden" style={{ height: "68px" }} aria-hidden="true" />

      <nav
        className="mbn md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white"
        style={{
          borderTop: `2px solid ${colors.gold}`,
          boxShadow: "0 -6px 20px rgba(0,0,0,0.08)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          direction: isEn ? "ltr" : "rtl",
        }}
        aria-label={isEn ? "Main menu" : "مین مینیو"}
      >
        <ul className="flex items-stretch">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            const inner = (
              <span
                className="mbn-tab relative flex h-full w-full flex-col items-center justify-center gap-0.5 py-2 transition-colors"
                style={{ color: active ? colors.active : colors.idle }}
              >
                <span
                  className="absolute left-1/2 top-0 h-[3px] -translate-x-1/2 transition-all duration-300"
                  style={{ width: active ? 28 : 0, background: colors.gold }}
                />

                <span
                  className="mbn-pill flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    width: 44,
                    height: 28,
                    background: active ? colors.activeBg : "transparent",
                  }}
                >
                  <Icon size={21} strokeWidth={active ? 2.4 : 2} />
                </span>

                <span
                  style={
                    isEn
                      ? { fontSize: "12px", lineHeight: "18px", fontWeight: 600 }
                      : { fontSize: "15px", lineHeight: "22px" }
                  }
                >
                  {item.label}
                </span>
              </span>
            );

            return (
              <li key={item.key} className="flex-1">
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={item.key === "home" ? handleHome : () => setActiveScroll(null)}
                    className="block h-full"
                    aria-current={active ? "page" : undefined}
                  >
                    {inner}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleScrollTab(item)}
                    className="block h-full w-full"
                  >
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}