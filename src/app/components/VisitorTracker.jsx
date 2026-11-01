"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const API = "https://f-backend-vdi1.onrender.com/api";
const KEY = "mde_vid";

function getVisitorId() {
  try {
    let id = localStorage.getItem(KEY);

    if (!id) {
      id =
        (typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36)
        ).replace(/[^A-Za-z0-9_-]/g, "");

      localStorage.setItem(KEY, id);
    }

    return id;
  } catch {
    return null;
  }
}

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const id = getVisitorId();
    if (!id) return;

    // ek session me ek hi baar ginti
    try {
      if (sessionStorage.getItem("mde_pinged")) return;
      sessionStorage.setItem("mde_pinged", "1");
    } catch {
      /* storage band ho to bhi chalne do */
    }

    fetch(`${API}/visitors/ping`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId: id }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}