"use client";

import React from "react";
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

// element milne tak intezar karta hai (homepage loader ki wajah se)
function scrollToWhenReady(id, { focusInput = false } = {}) {
  let tries = 0;

  const timer = setInterval(() => {
    const el = document.getElementById(id);
    tries += 1;

    if (el) {
      clearInterval(timer);
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      if (focusInput) {
        setTimeout(() => el.querySelector("input")?.focus(), 400);
      }
    } else if (tries > 30) {
      clearInterval(timer);
    }
  }, 150);
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // admin pages par nav nahi dikhana
  if (pathname?.startsWith("/admin")) return null;

  const isActive = (item) => {
    if (!item.href) return false;
    if (item.href === "/") return pathname === "/";
    return pathname?.startsWith(item.href);
  };

  const handleScrollTab = (item) => {
    const opts = { focusInput: item.key === "search" };

    if (pathname === "/") {
      scrollToWhenReady(item.targetId, opts);
    } else {
      router.push("/");
      scrollToWhenReady(item.targetId, opts);
    }
  };

  return (
    <>
      <style>{`
        .mbn, .mbn * { font-family: ${font} !important; }
      `}</style>

      {/* nav ke neeche content na chhupe, is liye spacer */}
      <div className="md:hidden" style={{ height: "68px" }} />

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
                className="flex flex-col items-center justify-center gap-0.5 w-full h-full py-2 transition-colors"
                style={{ color: active ? "#63B56A" : "#6b7280" }}
              >
                <span
                  className="flex items-center justify-center rounded-full transition-all"
                  style={{
                    width: 40,
                    height: 26,
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
                  <Link href={item.href} className="block h-full">
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