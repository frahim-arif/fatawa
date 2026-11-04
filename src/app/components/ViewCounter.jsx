
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

    const updateViews = async () => {
      try {
        let alreadyViewed = false;

        try {
          alreadyViewed = !!sessionStorage.getItem(storageKey);
        } catch {}

        const endpoint = alreadyViewed
          ? `${API}/views/${encodeURIComponent(slug)}`
          : `${API}/views/${encodeURIComponent(slug)}`;

        const res = await fetch(endpoint, {
          method: alreadyViewed ? "GET" : "POST",
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();

        if (data.success) {
          setViews(Number(data.views) || 0);

          if (!alreadyViewed) {
            try {
              sessionStorage.setItem(storageKey, "1");
            } catch {}
          }
        }
      } catch (err) {
        console.error("Question view error:", err);
      }
    };

    updateViews();
  }, [slug]);

  return (
    <div
      className="flex items-center justify-end gap-2 text-sm text-gray-500"
      dir="rtl"
    >
      <span>👁</span>
      <span>دیکھنے والوں کی تعداد:</span>
      <b className="text-gray-700">
        {views.toLocaleString("en-IN")}
      </b>
    </div>
  );
}
