"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Wrench, BookOpen, Search } from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";

const items = [
  { key: "home", label: "ہوم", href: "/", icon: Home },
  { key: "tools", label: "ٹولز", href: null, targetId: "islamic-tools", icon: Wrench },
  { key: "books", label: "کتب", href: "/books", icon: BookOpen },
  { key: "search", label: "تلاش", href: null, targetId: "home-search", icon: Search },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // scroll wale tabs (ٹولز / تلاش) ko active dikhane ke liye
  const [activeScroll, setActiveScroll] = useState(null);
  const timerRef = useRef(null);

  // page badalne par scroll-tab ka active nishan hata do
  useEffect(() => {
    setActiveScroll(null);
  }, [pathname]);

  // component hatne par timer saaf
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // admin pages par nav nahi dikhana
  if (pathname?.startsWith("/admin")) return null;

  const isActive = (item) => {
    if (item.href) {
      if (item.href === "/") return pathname === "/" && !activeScroll;
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

    if (pathname !== "/") {
      router.push("/");
    }

    scrollToWhenReady(item);
  };

  const handleHome = () => {
    setActiveScroll(null);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        .mbn, .mbn * { font-family: ${font} !important; }
        .mbn-tab:active .mbn-pill { transform: scale(0.92); }
      `}</style>

      {/* nav ke neeche content na chhupe, is liye spacer */}
      <div className="md:hidden" style={{ height: "68px" }} aria-hidden="true" />

      <nav
        className="mbn md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white"
        style={{
          borderTop: "2px solid #D4AF37",
          boxShadow: "0 -6px 20px rgba(0,0,0,0.08)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          direction: "rtl",
        }}
        aria-label="مین مینیو"
      >
        <ul className="flex items-stretch">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            const inner = (
              <span
                className="mbn-tab relative flex flex-col items-center justify-center gap-0.5 w-full h-full py-2 transition-colors"
                style={{ color: active ? "#63B56A" : "#6b7280" }}
              >
                {/* upar ki sunehri patti (active tab par) */}
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] bg-[#D4AF37] transition-all duration-300"
                  style={{ width: active ? 28 : 0 }}
                />

                <span
                  className="mbn-pill flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    width: 44,
                    height: 28,
                    background: active ? "#EAF5EA" : "transparent",
                  }}
                >
                  <Icon size={21} strokeWidth={active ? 2.4 : 2} />
                </span>

                <span style={{ fontSize: "15px", lineHeight: "22px" }}>
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
                    className="block w-full h-full"
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