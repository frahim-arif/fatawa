"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  BookOpen,
  FileText,
  Home,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";

export default function Footer() {
  const links = [
    {
      name: "ہوم",
      href: "/",
      icon: Home,
    },
    {
      name: "کتب",
      href: "/books",
      icon: BookOpen,
    },
    {
      name: "مضامین",
      href: "/majameen",
      icon: FileText,
    },
    {
      name: "40 احادیث",
      href: "/40-hadith-free",
      icon: ChevronLeft,
    },
    {
      name: "Privacy",
      href: "/privacy",
      icon: ShieldCheck,
    },
    {
      name: "Terms",
      href: "/terms",
      icon: ChevronLeft,
    },
  ];

  return (
    <footer className="relative bg-black overflow-hidden mt-10">

      {/* Background Image */}
      <Image
        // src="/images/6134461.jpg"
        alt="Footer Background"
        fill
        priority
        className="object-cover -z-20"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 -z-10"></div>

      {/* Golden Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-transparent to-black/40 -z-10"></div>

      <div className="max-w-7xl mx-auto px-5 py-14">

        <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">

          {/* About */}

          <div className="text-center md:text-right">

            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              مسلک دیوبند
            </h2>

            <p className="text-yellow-100/80 leading-8">
              قرآن و سنت کی روشنی میں مستند اسلامی سوالات، جوابات،
              مضامین، کتب اور اہلِ علم کی رہنمائی۔
            </p>

          </div>

          {/* Links */}

          <div className="text-center md:text-right">

            <h3 className="text-xl text-yellow-300 font-semibold mb-5">
              اہم لنکس
            </h3>

           <div className="grid grid-cols-2 gap-3">
  {links.map((item, index) => {
    const Icon = item.icon;

    return (
      <Link
        key={index}
        href={item.href}
        className="
          group
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-yellow-500/20
          bg-white/5
          px-4
          py-3
          text-white
          transition-all
          duration-300
          hover:border-yellow-400
          hover:bg-yellow-500/20
          hover:text-white
        "
      >
        <Icon
          size={16}
          className="shrink-0 text-white transition-colors duration-300"
        />

        <span className="text-sm font-medium text-white">
          {item.name}
        </span>
      </Link>
    );
  })}
</div>

          </div>

          {/* Contact */}


        </div>

        {/* Divider */}

        <div className="border-t border-yellow-500/20 my-10"></div>

        {/* Bottom */}

        <div className="text-center">

          <p className="text-yellow-300 text-lg leading-8">
            فَاسْأَلُوا أَهْلَ الذِّكْرِ إِنْ كُنْتُمْ لَا تَعْلَمُونَ
          </p>

          <p className="text-yellow-100/70 mt-3 text-sm">
            © {new Date().getFullYear()} Maslak e Deoband
            <br />
            Developed by -Web Core Cube Tech-9058596626
          </p>

        </div>

      </div>

    </footer>
  );
}