"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 bg-gradient-to-r from-emerald-800 via-lime-600 to-yellow-400 text-green-900 rounded-t-3xl shadow-2xl py-6">
      <div className="flex flex-col items-center gap-4 px-4">
        {/* Social Icons */}
        <div className="flex items-center gap-5">
          {/* Facebook */}
          <Link
            href="https://www.facebook.com/share/1KgXVbfgXS/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition-transform duration-300 hover:scale-110 backdrop-blur-md shadow-md"
          >
            <Facebook size={20} />
          </Link>

          {/* YouTube */}
          <Link
            href="#"
            className="p-3 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition-transform duration-300 hover:scale-110 backdrop-blur-md shadow-md"
          >
            <Youtube size={20} />
          </Link>

          {/* Email */}
          <Link
            href="mailto:frahimm46@gmail.com"
            className="p-3 bg-white/10 rounded-full hover:bg-yellow-300 hover:text-green-900 transition-transform duration-300 hover:scale-110 backdrop-blur-md shadow-md"
          >
            <Mail size={20} />
          </Link>
        </div>

        {/* Bottom Text */}
        <p className="text-sm font-medium opacity-90 text-white">
          © {new Date().getFullYear()} Maslak e Deoband — تمام حقوق محفوظ ہیں۔
        </p>
      </div>
    </footer>
  );
}
