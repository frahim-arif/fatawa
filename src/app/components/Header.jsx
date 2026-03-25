"use client";

import Link from "next/link";
import { useState } from "react";
import { MoreVertical, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-emerald-800 via-lime-600 to-yellow-400 shadow-2xl sticky top-0 z-50">
      <style>{`
        @keyframes blink-cta {
          0% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.4; transform: translateY(-2px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .blink-cta {
          animation: blink-cta 1.2s infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Maslak e Deoband Logo"
            className="w-12 h-12 object-contain rounded-full border-2 border-yellow-300 shadow-lg"
          />
          <Link
            href="/"
            className="text-2xl font-bold text-yellow-200 hover:text-white transition"
          >
            مسلک دیوبند
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center text-base font-semibold text-white">

          <Link
            href="/ozan-shariah-calculator"
            className="hover:text-yellow-300 transition-all duration-300 hover:scale-110"
          >
            اوزان شرعیہ کیلکولیٹر
          </Link>

          <Link
            href="/"
            className="hover:text-yellow-300 transition-all duration-300 hover:scale-110"
          >
            ہوم پیج
          </Link>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-yellow-300 transition-all duration-300"
            >
              More <ChevronDown size={18} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-8 right-0 bg-white text-emerald-700 shadow-2xl rounded-md w-48 py-2 z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link href="/courses" className="block px-4 py-2 hover:bg-emerald-100">
                    Courses
                  </Link>
                  <Link href="/about" className="block px-4 py-2 hover:bg-emerald-100">About</Link>
                  <Link href="/privacy" className="block px-4 py-2 hover:bg-emerald-100">Privacy Policy</Link>
                  <Link href="/contact" className="block px-4 py-2 hover:bg-emerald-100">Contact</Link>
                  <Link href="/terms" className="block px-4 py-2 hover:bg-emerald-100">Terms</Link>
                  <Link href="/disclaimer" className="block px-4 py-2 hover:bg-emerald-100">Disclaimer</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/40-hadith-free"
            className="ml-3 px-4 py-2 rounded-md font-semibold text-white"
            style={{ background: "linear-gradient(90deg,#22c55e,#84cc16)" }}
          >
            <span className="blink-cta">Free 40 Ahadith</span>
          </Link>
        </nav>

        {/* Mobile Header Buttons */}
        <div className="flex items-center gap-2">

          {/* 3 Dot Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-yellow-200 hover:text-white transition-all duration-300"
          >
            {open ? <X size={28} /> : <MoreVertical size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-gradient-to-b from-emerald-700 to-lime-600 border-t shadow-2xl py-4"
          >
            <div className="flex flex-col items-center gap-4 text-lg font-semibold text-white px-4">

              <Link href="/ozan-shariah-calculator" onClick={() => setOpen(false)}>
                اوزان شرعیہ کیلکولیٹر
              </Link>

              <Link href="/" onClick={() => setOpen(false)}>
                ہوم پیج
              </Link>

              <Link href="/courses" onClick={() => setOpen(false)}>Courses</Link>
              <Link href="/about" onClick={() => setOpen(false)}>About</Link>
              <Link href="/privacy" onClick={() => setOpen(false)}>Privacy Policy</Link>
              <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
              <Link href="/terms" onClick={() => setOpen(false)}>Terms</Link>
              <Link href="/disclaimer" onClick={() => setOpen(false)}>Disclaimer</Link>

              <Link
                href="/40-hadith-free"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-2 rounded-md font-semibold text-white"
                style={{ background: "linear-gradient(90deg,#22c55e,#84cc16)" }}
              >
                <span className="blink-cta">Free 40 Ahadith</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}