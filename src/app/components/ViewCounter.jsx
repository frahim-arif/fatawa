
"use client";

import { useEffect, useRef, useState } from "react";

const API =
  "https://f-backend-vdi1.onrender.com/api/admin/questions";

export default function ViewCounter({ slug, initialViews = 0 }) {
  const [views, setViews] = useState(Number(initialViews) || 0);
  const called = useRef(false);

  useEffect(() => {
    if (!slug || called.current) return;

    called.current = true;

    const storageKey = `question_view_${slug}`;

    try {
      if (sessionStorage.getItem(storageKey)) return;
    } catch {
      // Storage unavailable: continue with API request
    }

    const addView = async () => {
      try {
        const res = await fetch(
          `${API}/slug/${encodeURIComponent(slug)}/view`,
          { method: "POST" }
        );

        if (!res.ok) return;

        try {
          sessionStorage.setItem(storageKey, "1");
        } catch {
          // Storage unavailable
        }

        setViews((prev) => prev + 1);
      } catch (err) {
        console.error("Question view error:", err);
      }
    };

    addView();
  }, [slug]);

  return (
    <div
      className="flex items-center justify-end gap-2 text-sm text-gray-500"
      dir="rtl"
    >
      <span>👁</span>
      <span>دیکھنے والوں کی تعداد:</span>
      <b className="text-gray-700">{views.toLocaleString("en-IN")}</b>
    </div>
  );
}
