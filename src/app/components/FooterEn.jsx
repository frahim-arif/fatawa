"use client";

import Link from "next/link";
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

// WhatsApp channel ka link yahan likhein, khaali rakhne par button nahi dikhega
const WHATSAPP_CHANNEL = "";

const MAIN_LINKS = [
  { name: "Home", href: "/en", icon: Home },
  { name: "Fatwas", href: "/en/fatawa", icon: FileText },
  { name: "Articles", href: "/en/articles", icon: FileText },
  { name: "Reader Questions", href: "/en/asked-questions", icon: Users },
  { name: "Islamic Books", href: "/books", icon: BookOpen },
  { name: "40 Hadith", href: "/40-hadith-free", icon: Sparkles },
];

const INFO_LINKS = [
  { name: "About Us", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "Privacy Policy", href: "/privacy", icon: ShieldCheck },
  { name: "Terms of Use", href: "/terms", icon: FileCheck },
];

const STAR_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cpath d='M22 2 L27 15 L40 10 L33 22 L40 34 L27 29 L22 42 L17 29 L4 34 L11 22 L4 10 L17 15 Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E\")";

function FooterLink({ item }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group relative flex items-center gap-2 overflow-hidden border border-white/15 bg-white/5 px-3 py-2.5 text-[#dbe6ef] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b68a35] hover:bg-white/10 hover:text-white"
    >
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-[#d7aa4b] transition-all duration-300 group-hover:w-full" />
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#d7aa4b]">
        <Icon size={15} />
      </span>
      <span className="truncate text-sm">{item.name}</span>
    </Link>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h3 className="text-lg font-bold text-white md:text-xl">{children}</h3>
      <span className="h-px flex-1 bg-gradient-to-r from-[#b68a35] to-transparent" />
    </div>
  );
}

export default function FooterEn() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-10 overflow-hidden bg-[#071827] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: STAR_PATTERN }}
        />
        <div
          className="absolute left-0 right-0 top-0 h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #b68a35, #d7aa4b, #b68a35, transparent)",
          }}
        />
        <div
          className="absolute -top-24 left-1/2 h-[220px] w-[420px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(49,91,122,0.35), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-6 pt-12 sm:px-5">
        {/* BRAND */}
        <div className="text-center">
          <div
            className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#102d45] shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            style={{ border: "2px solid #b68a35" }}
          >
            <BookOpen size={28} />
            <span className="absolute inset-[-7px] rounded-full border border-dashed border-[#d7aa4b]/50" />
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="hidden h-px w-14 bg-[#b68a35] sm:block" />
            <h2 className="text-3xl font-bold md:text-4xl">Maslak-e-Deoband</h2>
            <span className="hidden h-px w-14 bg-[#b68a35] sm:block" />
          </div>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#c9d8e5] md:text-base">
            Authentic Islamic questions and answers, articles, books and guidance
            from people of knowledge, in the light of the Quran and Sunnah.
          </p>
        </div>

        {/* AYAH CARD */}
        <div
          className="relative mx-auto mt-8 max-w-2xl bg-white/5 px-5 py-5 text-center"
          style={{ border: "1px solid rgba(255,255,255,0.15)", borderTop: "3px solid #b68a35" }}
        >
          <span className="absolute left-3 top-2 text-lg text-[#d7aa4b]">✦</span>
          <span className="absolute right-3 top-2 text-lg text-[#d7aa4b]">✦</span>

          <p
            className="text-2xl leading-[3rem] text-[#d7aa4b]"
            dir="rtl"
            style={{ fontFamily: "var(--font-amiri), 'Jameel Noori Nastaleeq', serif" }}
          >
            فَاسْأَلُوا أَهْلَ الذِّكْرِ إِنْ كُنْتُمْ لَا تَعْلَمُونَ
          </p>
          <p className="mt-1 text-sm italic text-[#c9d8e5]">
            “Ask the people of knowledge if you do not know.” (An-Nahl 16:43)
          </p>
        </div>

        {/* LINKS */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <SectionTitle>Quick Links</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {MAIN_LINKS.map((item) => (
                <FooterLink key={item.href} item={item} />
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>Information</SectionTitle>
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
                className="mt-3 flex items-center justify-center gap-2 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "#25D366", borderBottom: "3px solid #b68a35" }}
              >
                <MessageCircle size={20} />
                Get new fatwas on WhatsApp
              </a>
            )}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/15" />
          <span className="h-2 w-2 rotate-45 border border-[#b68a35] bg-[#102d45]" />
          <span className="h-px w-14 bg-[#b68a35]" />
          <span className="h-2 w-2 rotate-45 border border-[#b68a35] bg-[#102d45]" />
          <span className="h-px flex-1 bg-white/15" />
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="order-2 text-center sm:order-1 sm:text-left">
            <p className="text-xs text-[#c9d8e5] md:text-sm">
              © {new Date().getFullYear()} Maslak e Deoband. All rights reserved.
            </p>
            <p className="mt-1 text-[11px] text-[#8ea5b8]">
              Developed by
              <span className="mx-1 font-medium text-[#d7aa4b]">WebCoreCubeTech</span>
              <a href="tel:+919058596626" className="transition-colors hover:text-white">
                — 9058596626
              </a>
            </p>
          </div>

          <button
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            className="group order-1 flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition-all duration-300 hover:border-[#d7aa4b] hover:bg-[#b68a35] sm:order-2"
          >
            Back to top
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