"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="relative sticky top-0 z-50 shadow-md">

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

      {/* 🔥 Content */}
      <div className="relative max-w-6xl mx-auto p-4 flex justify-between items-center">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          

          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-yellow-300 hover:text-yellow-400 transition"
          >
            مسلک دیوبند
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center text-base font-semibold text-yellow-100">

          <Link href="/ozan-shariah-calculator" className="hover:text-yellow-400 transition">
            اوزان شرعیہ کیلکولیٹر
          </Link>

          <Link href="/" className="hover:text-yellow-400 transition">
            ہوم پیج
          </Link>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-yellow-400 transition"
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
                  className="absolute top-8 right-0 bg-[#2f2626] text-yellow-200 shadow-xl rounded-md w-48 py-2 z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link href="/courses" className="block px-4 py-2 hover:bg-[#3a2f2f]">Courses</Link>
                  <Link href="/about" className="block px-4 py-2 hover:bg-[#3a2f2f]">About</Link>
                  <Link href="/privacy" className="block px-4 py-2 hover:bg-[#3a2f2f]">Privacy Policy</Link>
                  <Link href="/contact" className="block px-4 py-2 hover:bg-[#3a2f2f]">Contact</Link>
                  <Link href="/terms" className="block px-4 py-2 hover:bg-[#3a2f2f]">Terms</Link>
                  <Link href="/disclaimer" className="block px-4 py-2 hover:bg-[#3a2f2f]">Disclaimer</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <Link
            href="/40-hadith-free"
            className="ml-3 px-4 py-2 rounded-md font-semibold text-black"
            style={{ background: "linear-gradient(90deg,#d4af37,#facc15)" }}
          >
            40 احادیث
          </Link>

        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-yellow-200"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="relative md:hidden px-4 pb-4"
          >
            <div className="bg-[#2f2626] text-yellow-100 rounded-xl flex flex-col items-center gap-4 py-4 shadow-lg">

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
                className="mt-2 px-4 py-2 rounded-md font-semibold text-black"
                style={{ background: "linear-gradient(90deg,#d4af37,#facc15)" }}
              >
                40 احادیث
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}