
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Globe2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguageOpen((prev) => !prev);
    setMobileMenuOpen(false);
    setMoreOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setLanguageOpen(false);
    setMoreOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] shadow-md">

      {/* 🔥 Base Color */}
      <div className="absolute inset-0 bg-[#3b2f2f]" />

      {/* 🔥 Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/images/1943.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 🔥 Header Content */}
      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 py-2">

        <div className="flex items-center justify-between min-h-[48px]">

         



{/* 🌐 Language Dropdown */}
<div className="relative shrink-0">

  {/* Language Button */}
  <button
    type="button"
    onClick={toggleLanguage}
    aria-expanded={languageOpen}
    aria-label="Select language"
    className="
      flex items-center gap-1.5
      whitespace-nowrap
      text-xs
      uppercase
      tracking-wider
      font-medium
      text-yellow-500
      hover:text-yellow-500
      transition-all duration-200
      focus:outline-none
    "
  >
    <span>Select Language</span>

    <ChevronDown
      size={22}
      strokeWidth={2}
      className={`
        transition-transform duration-200
        ${languageOpen ? "rotate-180" : ""}
      `}
    />
  </button>


  {/* Language Dropdown */}
  <AnimatePresence>
    {languageOpen && (
      <motion.div
        initial={{
          opacity: 0,
          y: -8,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: -8,
          scale: 0.96,
        }}
        transition={{
          duration: 0.18,
          ease: "easeOut",
        }}
        className="
          absolute
          left-0
          top-full
          mt-2
          z-[9999]

          w-[170px]
          sm:w-[180px]

          rounded-xl
          border border-yellow-700/30

          bg-[#241d1d]/95
          backdrop-blur-md

          p-2
          shadow-2xl
        "
      >

      


        {/* English */}
        <Link
          href="/en"
          onClick={() => setLanguageOpen(false)}
          className="
            flex items-center justify-center
            w-full

            rounded-lg
            border border-yellow-700/50

            px-4 py-2.5
            mb-2

            text-sm
            font-medium
            tracking-wide

            text-yellow-300

            hover:bg-[#3a2f2f]
            hover:border-yellow-400
            hover:text-yellow-200

            transition-all duration-200
          "
        >
          English
        </Link>


        {/* Urdu */}
        <Link
          href="/"
          onClick={() => setLanguageOpen(false)}
          className="
            flex items-center justify-center
            w-full

            rounded-lg
            border border-yellow-700/50

            px-4 py-2.5
            mb-2

            text-base
            font-medium

            text-yellow-200

            hover:bg-[#3a2f2f]
            hover:border-yellow-400
            hover:text-yellow-300

            transition-all duration-200
          "
        >
          اردو
        </Link>


        {/* Bangla */}
        <Link
          href="/bn"
          onClick={() => setLanguageOpen(false)}
          className="
            flex items-center justify-center
            w-full

            rounded-lg
            border border-yellow-700/50

            px-4 py-2.5

            text-sm
            font-medium
            tracking-wide

            text-yellow-200

            hover:bg-[#3a2f2f]
            hover:border-yellow-400
            hover:text-yellow-300

            transition-all duration-200
          "
        >
          বাংলা
        </Link>

      </motion.div>
    )}
  </AnimatePresence>

</div>







          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <nav className="hidden md:flex items-center gap-6 text-base font-semibold text-yellow-100">

            <Link
              href="/ozan-shariah-calculator"
              className="hover:text-yellow-400 transition"
            >
              اوزان شرعیہ کیلکولیٹر
            </Link>

            <Link
              href="/"
              className="hover:text-yellow-400 transition"
            >
              ہوم پیج
            </Link>

            {/* More Dropdown */}
            <div className="relative">

              <button
                type="button"
                onClick={() => {
                  setMoreOpen(!moreOpen);
                  setLanguageOpen(false);
                }}
                className="
                  flex items-center gap-1
                  hover:text-yellow-400
                  transition
                "
              >
                More

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                    className="
                      absolute
                      top-full
                      right-0
                      mt-2
                      w-52
                      bg-[#241d1d]/95
                      backdrop-blur-md
                      border border-yellow-700/30
                      rounded-xl
                      shadow-2xl
                      overflow-hidden
                      z-[9999]
                    "
                  >

                    <Link
                      href="/courses"
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-3 hover:bg-[#3a2f2f] transition"
                    >
                      Courses
                    </Link>

                    <Link
                      href="/about"
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-3 hover:bg-[#3a2f2f] transition"
                    >
                      About
                    </Link>

                    <Link
                      href="/privacy"
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-3 hover:bg-[#3a2f2f] transition"
                    >
                      Privacy Policy
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-3 hover:bg-[#3a2f2f] transition"
                    >
                      Contact
                    </Link>

                    <Link
                      href="/terms"
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-3 hover:bg-[#3a2f2f] transition"
                    >
                      Terms
                    </Link>

                    <Link
                      href="/disclaimer"
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-3 hover:bg-[#3a2f2f] transition"
                    >
                      Disclaimer
                    </Link>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* CTA */}
            <Link
              href="/40-hadith-free"
              className="
                ml-2
                px-4 py-2
                rounded-md
                font-semibold
                text-black
                shadow-sm
                hover:scale-[1.02]
                transition
              "
              style={{
                background:
                  "linear-gradient(90deg,#d4af37,#facc15)",
              }}
            >
              40 احادیث
            </Link>

          </nav>


          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="
              md:hidden
              text-yellow-200
              p-2
              rounded-lg
              hover:bg-white/10
              transition
            "
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>
      </div>


      {/* =========================
          MOBILE MENU
      ========================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              relative
              md:hidden
              overflow-visible
              border-t
              border-yellow-900/30
            "
          >

            <div className="px-3 sm:px-4 pb-4 pt-3">

              <div
                className="
                  bg-[#2f2626]/95
                  backdrop-blur-md
                  border border-yellow-900/30
                  text-yellow-100
                  rounded-xl
                  shadow-xl
                  overflow-hidden
                "
              >

                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    block text-center
                    px-4 py-3
                    hover:bg-[#3a2f2f]
                    transition
                  "
                >
                  ہوم پیج
                </Link>

                {/* Calculator */}
                <Link
                  href="/ozan-shariah-calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    block text-center
                    px-4 py-3
                    hover:bg-[#3a2f2f]
                    transition
                  "
                >
                  اوزان شرعیہ کیلکولیٹر
                </Link>

                {/* Courses */}
                <Link
                  href="/courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    block text-center
                    px-4 py-3
                    hover:bg-[#3a2f2f]
                    transition
                  "
                >
                  Courses
                </Link>

                {/* About */}
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    block text-center
                    px-4 py-3
                    hover:bg-[#3a2f2f]
                    transition
                  "
                >
                  About
                </Link>

                {/* Privacy */}
                <Link
                  href="/privacy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    block text-center
                    px-4 py-3
                    hover:bg-[#3a2f2f]
                    transition
                  "
                >
                  Privacy Policy
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    block text-center
                    px-4 py-3
                    hover:bg-[#3a2f2f]
                    transition
                  "
                >
                  Contact
                </Link>

                {/* Terms */}
                <Link
                  href="/terms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    block text-center
                    px-4 py-3
                    hover:bg-[#3a2f2f]
                    transition
                  "
                >
                  Terms
                </Link>

                {/* Disclaimer */}
                <Link
                  href="/disclaimer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    block text-center
                    px-4 py-3
                    hover:bg-[#3a2f2f]
                    transition
                  "
                >
                  Disclaimer
                </Link>

                {/* CTA */}
                <div className="px-4 py-4">
                  <Link
                    href="/40-hadith-free"
                    onClick={() => setMobileMenuOpen(false)}
                    className="
                      block
                      text-center
                      px-4 py-3
                      rounded-lg
                      font-semibold
                      text-black
                      shadow-md
                    "
                    style={{
                      background:
                        "linear-gradient(90deg,#d4af37,#facc15)",
                    }}
                  >
                    40 احادیث
                  </Link>
                </div>

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
