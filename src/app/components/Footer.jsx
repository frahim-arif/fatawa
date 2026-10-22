"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FooterEn from "./FooterEn";
import {
  BookOpen,
  FileText,
  Home,
  ShieldCheck,
  FileCheck,
  Users,
  Info,
  Mail,
  MessageCircle,
  ArrowUp,
  Sparkles,
} from "lucide-react";

const font = "'Jameel Noori Nastaleeq', serif";

// WhatsApp channel ka link yahan likhein, khaali rakhne par button nahi dikhega
const WHATSAPP_CHANNEL = "";

const MAIN_LINKS = [
  { name: "ہوم", href: "/", icon: Home },
  { name: "اسلامی کتب", href: "/books", icon: BookOpen },
  { name: "مضامین", href: "/majameen", icon: FileText },
  { name: "لوگوں کے سوالات", href: "/asked-questions", icon: Users },
  { name: "40 احادیث", href: "/40-hadith-free", icon: Sparkles },
  { name: "مسنون دعائیں", href: "/masnoon-duayee", icon: BookOpen },
];

const INFO_LINKS = [
  { name: "ہمارے بارے میں", href: "/about", icon: Info },
  { name: "رابطہ", href: "/contact", icon: Mail },
  { name: "پرائیویسی پالیسی", href: "/privacy", icon: ShieldCheck },
  { name: "شرائط و ضوابط", href: "/terms", icon: FileCheck },
];

const STAR_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cpath d='M22 2 L27 15 L40 10 L33 22 L40 34 L27 29 L22 42 L17 29 L4 34 L11 22 L4 10 L17 15 Z' fill='none' stroke='%2375C178' stroke-width='1'/%3E%3C/svg%3E\")";

function FooterLink({ item }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="
        group
        relative
        overflow-hidden
        flex
        items-center
        gap-2
        border
        border-[#C6E2C8]
        bg-white
        px-3
        py-2.5
        text-[#444444]
        shadow-sm
        transition-all
        duration-300
        hover:bg-[#EAF5EA]
        hover:border-[#75C178]
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <span
        className="
          absolute
          top-0
          right-0
          h-[2px]
          w-0
          bg-[#D4AF37]
          transition-all
          duration-300
          group-hover:w-full
        "
      />

      <span
        className="
          shrink-0
          flex
          items-center
          justify-center
          w-7
          h-7
          rounded-full
          bg-[#EAF5EA]
          text-[#63B56A]
          transition-colors
          group-hover:bg-white
        "
      >
        <Icon size={15} />
      </span>

      <span
        className="truncate"
        style={{ fontFamily: font, fontSize: "17px", lineHeight: "30px" }}
      >
        {item.name}
      </span>
    </Link>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h3
        className="text-[#333333]"
        style={{ fontFamily: font, fontSize: "24px", lineHeight: "40px" }}
      >
        {children}
      </h3>
      <span className="flex-1 h-px bg-gradient-to-l from-[#D4AF37] to-transparent" />
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/en")) return <FooterEn />;

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative overflow-hidden mt-10 bg-[#F5FAF5] text-[#333333]"
      style={{ borderTop: "1px solid #C6E2C8" }}
    >
      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: STAR_PATTERN }}
        />

        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #D4AF37, #75C178, #D4AF37, transparent)",
          }}
        />

        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[220px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(117,193,120,0.16), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ================= CONTENT ================= */}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 pt-12 pb-6">
        {/* ---------- BRAND ---------- */}

        <div className="text-center">
          <div
            className="
              relative
              mx-auto
              mb-4
              flex
              items-center
              justify-center
              w-16
              h-16
              rounded-full
              bg-white
              text-[#63B56A]
              shadow-[0_8px_24px_rgba(117,193,120,0.25)]
            "
            style={{ border: "2px solid #D4AF37" }}
          >
            <BookOpen size={28} />
            <span className="absolute inset-[-7px] rounded-full border border-dashed border-[#75C178]/50" />
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="hidden sm:block w-14 h-px bg-[#D4AF37]" />
            <h2
              className="text-[#333333]"
              style={{ fontFamily: font, fontSize: "38px", lineHeight: "62px" }}
            >
              مسلکِ دیوبند
            </h2>
            <span className="hidden sm:block w-14 h-px bg-[#D4AF37]" />
          </div>

          <p
            className="text-[#555555] max-w-xl mx-auto"
            style={{ fontFamily: font, fontSize: "19px", lineHeight: "36px" }}
          >
            قرآن و سنت کی روشنی میں مستند اسلامی سوالات، جوابات، مضامین، کتب اور
            اہلِ علم کی رہنمائی۔
          </p>
        </div>

        {/* ---------- AYAH CARD ---------- */}

        <div
          className="relative max-w-2xl mx-auto mt-8 bg-white text-center px-5 py-5 shadow-[0_8px_26px_rgba(0,0,0,0.07)]"
          style={{ border: "1px solid #C6E2C8", borderTop: "3px solid #D4AF37" }}
        >
          <span className="absolute top-2 right-3 text-[#D4AF37] text-lg">✦</span>
          <span className="absolute top-2 left-3 text-[#D4AF37] text-lg">✦</span>

          <p
            className="text-[#3f8f46]"
            style={{ fontFamily: font, fontSize: "26px", lineHeight: "54px" }}
          >
            فَاسْأَلُوا أَهْلَ الذِّكْرِ إِنْ كُنْتُمْ لَا تَعْلَمُونَ
          </p>

          <p
            className="text-[#777777]"
            style={{ fontFamily: font, fontSize: "16px", lineHeight: "30px" }}
          >
            "اگر تم نہیں جانتے تو اہلِ ذکر سے پوچھو"
          </p>
        </div>

        {/* ---------- LINKS ---------- */}

        <div className="grid gap-8 md:grid-cols-2 mt-10" style={{ direction: "rtl" }}>
          <div>
            <SectionTitle>اہم لنکس</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {MAIN_LINKS.map((item) => (
                <FooterLink key={item.href} item={item} />
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>معلومات</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {INFO_LINKS.map((item) => (
                <FooterLink key={item.href} item={item} />
              ))}
            </div>

            {WHATSAPP_CHANNEL && (
              <a
                href={WHATSAPP_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-3
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
                style={{
                  background: "#25D366",
                  borderBottom: "3px solid #D4AF37",
                  fontFamily: font,
                  fontSize: "20px",
                  lineHeight: "34px",
                }}
              >
                <MessageCircle size={20} />
                نئے فتاویٰ واٹس ایپ پر پائیں
              </a>
            )}
          </div>
        </div>

        {/* ---------- DIVIDER ---------- */}

        <div className="flex items-center gap-4 my-8">
          <span className="flex-1 h-px bg-[#C6E2C8]" />
          <span className="w-2 h-2 rotate-45 border border-[#D4AF37] bg-[#EAF5EA]" />
          <span className="w-14 h-px bg-[#75C178]" />
          <span className="w-2 h-2 rotate-45 border border-[#D4AF37] bg-[#EAF5EA]" />
          <span className="flex-1 h-px bg-[#C6E2C8]" />
        </div>

        {/* ---------- BOTTOM ---------- */}

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-right order-2 sm:order-1">
            <p className="text-[#555555] text-xs md:text-sm">
              © {new Date().getFullYear()} Maslak e Deoband. تمام حقوق محفوظ ہیں۔
            </p>

            <p className="text-[#888888] text-[11px] mt-1">
              Developed by
              <span className="text-[#63B56A] mx-1 font-medium">
                WebCoreCubeTech
              </span>
              <a
                href="tel:+919058596626"
                className="hover:text-[#63B56A] transition-colors"
                dir="ltr"
              >
                — 9058596626
              </a>
            </p>
          </div>

          <button
            type="button"
            onClick={scrollTop}
            aria-label="اوپر جائیں"
            className="
              order-1
              sm:order-2
              group
              flex
              items-center
              gap-2
              px-4
              py-2
              bg-white
              text-[#3f8f46]
              border
              border-[#C6E2C8]
              shadow-sm
              transition-all
              duration-300
              hover:bg-[#75C178]
              hover:text-white
              hover:border-[#D4AF37]
            "
            style={{ fontFamily: font, fontSize: "17px", lineHeight: "30px" }}
          >
            اوپر جائیں
            <ArrowUp
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}