"use client";

import React, { useState, useEffect } from "react";
import { Share2, Link2, Check, MessageCircle, Send } from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";

export default function ShareButtons({ title, url }) {
  const [pageUrl, setPageUrl] = useState(url || "");
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (!url) setPageUrl(window.location.href);
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, [url]);

  const text = `${title}\n${pageUrl}`;

  const links = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("لنک کاپی نہیں ہو سکا");
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url: pageUrl });
    } catch {
      /* user ne cancel kiya */
    }
  };

  const btn =
    "inline-flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg";

  return (
    <div
      className="my-5 p-4 bg-[#F5FAF5] border border-[#C6E2C8]"
      style={{ direction: "rtl", fontFamily: font, borderTop: "3px solid #D4AF37" }}
    >
      <p className="text-[#333333] mb-3" style={{ fontSize: "20px", lineHeight: "34px" }}>
        یہ مسئلہ دوسروں تک پہنچائیں
      </p>

      <div className="flex flex-wrap gap-2">
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          style={{ background: "#25D366", fontSize: "18px" }}
        >
          <MessageCircle size={18} />
          واٹس ایپ
        </a>

        <a
          href={links.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          style={{ background: "#1877F2", fontSize: "18px" }}
        >
          <Share2 size={18} />
          فیس بک
        </a>

        <a
          href={links.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          style={{ background: "#229ED9", fontSize: "18px" }}
        >
          <Send size={18} />
          ٹیلی گرام
        </a>

        <button
          type="button"
          onClick={copyLink}
          className={btn}
          style={{ background: copied ? "#63B56A" : "#75C178", fontSize: "18px" }}
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
          {copied ? "کاپی ہو گیا" : "لنک کاپی کریں"}
        </button>

        {canNativeShare && (
          <button
            type="button"
            onClick={nativeShare}
            className={btn}
            style={{ background: "#6b7280", fontSize: "18px" }}
          >
            <Share2 size={18} />
            مزید
          </button>
        )}
      </div>
    </div>
  );
}