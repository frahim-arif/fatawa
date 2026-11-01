"use client";

import { useEffect } from "react";

const API = "https://f-backend-vdi1.onrender.com/api/admin/questions";

export default function ViewCounter({ slug }) {
  useEffect(() => {
    if (!slug) return;

    // ek browser session me ek sawal ka ek hi view
    const key = `viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage band ho to bhi chalne do */
    }

    fetch(`${API}/views/${encodeURIComponent(slug)}`, {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
  }, [slug]);

  return null;
}