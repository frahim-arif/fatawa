"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  BookOpen,
  FileText,
  Home,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-8 overflow-hidden border-t border-yellow-700/40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#3b2f2f]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/1943.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 text-yellow-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h2 className="text-2xl font-bold text-yellow-300 mb-2">
              مسلک دیوبند
            </h2>
            <p className="text-sm leading-7 text-yellow-100/80">
              قرآن و سنت کی روشنی میں مستند اسلامی سوالات، جوابات، مضامین اور کتب۔
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-yellow-300 mb-3">
              اہم لنکس
            </h3>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/" className="footer-link"><Home size={15} /> ہوم</Link>
              <Link href="/books" className="footer-link"><BookOpen size={15} /> کتب</Link>
              <Link href="/majameen" className="footer-link"><FileText size={15} /> مضامین</Link>
              <Link href="/40-hadith-free" className="footer-link">40 احادیث</Link>
              <Link href="/privacy" className="footer-link"><ShieldCheck size={15} /> Privacy</Link>
              <Link href="/terms" className="footer-link">Terms</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-yellow-300 mb-3">
              رابطہ
            </h3>

            <div className="space-y-2 text-sm">
              <a href="tel:9058596626" className="footer-contact">
                <Phone size={16} /> 9058596626
              </a>

              <a href="mailto:frahimm46@gmail.com" className="footer-contact">
                <Mail size={16} /> frahimm46@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-yellow-700/50" />

        <div className="text-center space-y-2">
          <p className="text-yellow-300 text-sm">
            فَاسْأَلُوا أَهْلَ الذِّكْرِ إِنْ كُنْتُمْ لَا تَعْلَمُونَ
          </p>

          <p className="text-[11px] text-yellow-100/70">
            © {new Date().getFullYear()} Maslak e Deoband. Developed by Web Core Cube Tech.
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          color: #fde68a;
          transition: 0.25s;
        }

        .footer-link:hover {
          background: rgba(250, 204, 21, 0.16);
          color: #facc15;
        }

        .footer-contact {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #fde68a;
          transition: 0.25s;
        }

        .footer-contact:hover {
          color: #facc15;
        }

        @media (min-width: 768px) {
          .footer-link,
          .footer-contact {
            justify-content: flex-end;
          }
        }
      `}</style>
    </footer>
  );
}