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

const font = "var(--font-bengali), 'Noto Sans Bengali', sans-serif";

// WhatsApp channel ka link yahan likhein, khaali rakhne par button nahi dikhega
const WHATSAPP_CHANNEL = "";

const MAIN_LINKS = [
  { name: "হোম", href: "/bn", icon: Home },
  { name: "ফতোয়া", href: "/bn/fatawa", icon: FileText },
  { name: "প্রবন্ধ", href: "/bn/articles", icon: FileText },
  { name: "পাঠকদের প্রশ্ন", href: "/bn/asked-questions", icon: Users },
  { name: "ইসলামী কিতাব", href: "/books", icon: BookOpen },
  { name: "৪০ হাদিস", href: "/40-hadith-free", icon: Sparkles },
];

const INFO_LINKS = [
  { name: "আমাদের সম্পর্কে", href: "/about", icon: Info },
  { name: "যোগাযোগ", href: "/contact", icon: Mail },
  { name: "গোপনীয়তা নীতি", href: "/privacy", icon: ShieldCheck },
  { name: "ব্যবহারের শর্তাবলী", href: "/terms", icon: FileCheck },
];

const STAR_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cpath d='M22 2 L27 15 L40 10 L33 22 L40 34 L27 29 L22 42 L17 29 L4 34 L11 22 L4 10 L17 15 Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E\")";

function FooterLink({ item }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group relative flex items-center gap-2 overflow-hidden border border-white/15 bg-white/5 px-3 py-2.5 text-[#e8dfc4] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c8ae6a] hover:bg-white/10 hover:text-white"
    >
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-[#c8ae6a] transition-all duration-300 group-hover:w-full" />
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#c8ae6a]">
        <Icon size={15} />
      </span>
      <span className="truncate text-sm leading-7">{item.name}</span>
    </Link>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h3 className="text-lg font-bold leading-9 text-white md:text-xl">{children}</h3>
      <span className="h-px flex-1 bg-gradient-to-r from-[#c8ae6a] to-transparent" />
    </div>
  );
}

export default function FooterBn() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative mt-10 overflow-hidden bg-[#071c19] text-white"
      style={{ fontFamily: font }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: STAR_PATTERN }} />
        <div
          className="absolute left-0 right-0 top-0 h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #806b3f, #c8ae6a, #806b3f, transparent)",
          }}
        />
        <div
          className="absolute -top-24 left-1/2 h-[220px] w-[420px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(23,77,64,0.55), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-6 pt-12 sm:px-5">
        {/* BRAND */}
        <div className="text-center">
          <div
            className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#174d40] shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            style={{ border: "2px solid #c8ae6a" }}
          >
            <BookOpen size={28} />
            <span className="absolute inset-[-7px] rounded-full border border-dashed border-[#c8ae6a]/50" />
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="hidden h-px w-14 bg-[#c8ae6a] sm:block" />
            <h2 className="text-3xl font-bold leading-[3rem] md:text-4xl">মাসলাকে দেওবন্দ</h2>
            <span className="hidden h-px w-14 bg-[#c8ae6a] sm:block" />
          </div>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-8 text-[#e8dfc4] md:text-base">
            কুরআন ও সুন্নাহর আলোকে নির্ভরযোগ্য ইসলামী প্রশ্নোত্তর, প্রবন্ধ, কিতাব
            এবং আহলে ইলমের দিকনির্দেশনা।
          </p>
        </div>

        {/* AYAH CARD */}
        <div
          className="relative mx-auto mt-8 max-w-2xl bg-white/5 px-5 py-5 text-center"
          style={{ border: "1px solid rgba(255,255,255,0.15)", borderTop: "3px solid #c8ae6a" }}
        >
          <span className="absolute left-3 top-2 text-lg text-[#c8ae6a]">✦</span>
          <span className="absolute right-3 top-2 text-lg text-[#c8ae6a]">✦</span>

          <p
            className="text-2xl leading-[3rem] text-[#d8c27d]"
            dir="rtl"
            style={{ fontFamily: "var(--font-amiri), 'Jameel Noori Nastaleeq', serif" }}
          >
            فَاسْأَلُوا أَهْلَ الذِّكْرِ إِنْ كُنْتُمْ لَا تَعْلَمُونَ
          </p>
          <p className="mt-1 text-sm leading-7 text-[#e8dfc4]">
            “যদি তোমরা না জানো, তবে জ্ঞানীদের জিজ্ঞাসা করো।” (সূরা আন-নাহল ১৬:৪৩)
          </p>
        </div>

        {/* LINKS */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <SectionTitle>গুরুত্বপূর্ণ লিংক</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {MAIN_LINKS.map((item) => (
                <FooterLink key={item.href} item={item} />
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>তথ্য</SectionTitle>
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
                style={{ background: "#25D366", borderBottom: "3px solid #c8ae6a" }}
              >
                <MessageCircle size={20} />
                নতুন ফতোয়া হোয়াটসঅ্যাপে পান
              </a>
            )}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/15" />
          <span className="h-2 w-2 rotate-45 border border-[#c8ae6a] bg-[#0b302a]" />
          <span className="h-px w-14 bg-[#c8ae6a]" />
          <span className="h-2 w-2 rotate-45 border border-[#c8ae6a] bg-[#0b302a]" />
          <span className="h-px flex-1 bg-white/15" />
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="order-2 text-center sm:order-1 sm:text-left">
            <p className="text-xs leading-6 text-[#e8dfc4] md:text-sm">
              © {new Date().getFullYear()} Maslak e Deoband. সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="mt-1 text-[11px] text-[#9aa89f]">
              Developed by
              <span className="mx-1 font-medium text-[#c8ae6a]">WebCoreCubeTech</span>
              <a href="tel:+919058596626" className="transition-colors hover:text-white">
                — 9058596626
              </a>
            </p>
          </div>

          <button
            type="button"
            onClick={scrollTop}
            aria-label="উপরে যান"
            className="group order-1 flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 text-sm leading-7 text-white transition-all duration-300 hover:border-[#c8ae6a] hover:bg-[#806b3f] sm:order-2"
          >
            উপরে যান
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