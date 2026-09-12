"use client";

import Link from "next/link";
import Image from "next/image";
import {
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
    <footer
      className="
        relative
        overflow-hidden
        mt-10
        bg-[#071c19]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/1934.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[#071c19]/95" />

        <div
          className="
            absolute
            inset-0
            opacity-[0.06]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(200,174,106,0.5) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(200,174,106,0.5) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "70px 70px",
          }}
        />

        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-[3px]
            bg-gradient-to-r
            from-transparent
            via-[#c8ae6a]
            to-transparent
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative max-w-7xl mx-auto px-5 py-12 md:py-14">

        <div
          className="
            grid
            gap-10
            lg:grid-cols-2
            md:grid-cols-2
            grid-cols-1
          "
        >

          {/* =================================================
              ABOUT
          ================================================= */}

          <div className="text-center md:text-right">

            <div
              className="
                inline-flex
                items-center
                gap-3
                mb-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-11
                  h-11
                  bg-[#174d40]
                  border
                  border-[#c8ae6a]
                  text-[#f5e6bd]
                "
              >
                <BookOpen size={21} />
              </div>

              <span className="hidden sm:block w-10 h-px bg-[#c8ae6a]" />
            </div>

            <h2
              className="
                text-3xl
                md:text-4xl
                font-bold
                text-[#f5e6bd]
                mb-4
              "
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
              }}
            >
              مسلکِ دیوبند
            </h2>

            <p
              className="
                text-[#d6cfbd]
                leading-8
                text-sm
                md:text-base
                max-w-xl
                md:ml-0
                md:mr-auto
              "
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
              }}
            >
              قرآن و سنت کی روشنی میں مستند اسلامی سوالات،
              جوابات، مضامین، کتب اور اہلِ علم کی رہنمائی۔
            </p>

            <div
              className="
                mt-6
                border-r-2
                border-[#c8ae6a]
                pr-4
                text-[#bcae8e]
                text-sm
                leading-7
              "
              style={{
                fontFamily:
                  "'Jameel Noori Nastaleeq', serif",
              }}
            >
              دینی مسائل اور اسلامی معلومات کے لیے
              ایک مفید علمی و تحقیقی ذخیرہ۔
            </div>
          </div>

          {/* =================================================
              LINKS
          ================================================= */}

          <div className="text-center md:text-right">

            <div className="flex items-center gap-3 mb-5 justify-center md:justify-start">

              <h3
                className="
                  text-xl
                  md:text-2xl
                  font-bold
                  text-[#f5e6bd]
                "
                style={{
                  fontFamily:
                    "'Jameel Noori Nastaleeq', serif",
                }}
              >
                اہم لنکس
              </h3>

              <span className="w-10 h-px bg-[#c8ae6a]" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">

              {links.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="
                      group
                      relative
                      overflow-hidden
                      flex
                      items-center
                      justify-center
                      md:justify-end
                      gap-2
                      border
                      border-[#806b3f]/70
                      bg-[#102f2a]/80
                      px-4
                      py-3
                      text-[#e8dfca]
                      transition-all
                      duration-300
                      hover:bg-[#174d40]
                      hover:border-[#c8ae6a]
                      hover:text-[#f5e6bd]
                    "
                  >
                    {/* Gold hover line */}

                    <span
                      className="
                        absolute
                        right-0
                        top-0
                        h-[2px]
                        w-0
                        bg-[#c8ae6a]
                        transition-all
                        duration-300
                        group-hover:w-full
                      "
                    />

                    <span
                      className="
                        text-sm
                        md:text-base
                      "
                      style={{
                        fontFamily:
                          "'Jameel Noori Nastaleeq', serif",
                      }}
                    >
                      {item.name}
                    </span>

                    <Icon
                      size={16}
                      className="
                        text-[#c8ae6a]
                        transition-transform
                        duration-300
                        group-hover:-translate-x-1
                      "
                    />
                  </Link>
                );
              })}

            </div>
          </div>
        </div>

        {/* =================================================
            DECORATIVE DIVIDER
        ================================================= */}

        <div className="flex items-center gap-4 my-10">

          <span className="flex-1 h-px bg-[#806b3f]/40" />

          <div
            className="
              w-2
              h-2
              rotate-45
              border
              border-[#c8ae6a]
              bg-[#174d40]
            "
          />

          <span className="w-16 h-px bg-[#c8ae6a]" />

          <div
            className="
              w-2
              h-2
              rotate-45
              border
              border-[#c8ae6a]
              bg-[#174d40]
            "
          />

          <span className="flex-1 h-px bg-[#806b3f]/40" />

        </div>

        {/* =================================================
            QURAN AYAH
        ================================================= */}

        <div className="text-center">

          <p
            className="
              text-[#e8d39a]
              text-lg
              md:text-xl
              leading-9
            "
            style={{
              fontFamily:
                "'Jameel Noori Nastaleeq', serif",
            }}
          >
            فَاسْأَلُوا أَهْلَ الذِّكْرِ إِنْ كُنْتُمْ
            لَا تَعْلَمُونَ
          </p>

          <p
            className="
              text-[#8f866f]
              text-xs
              mt-1
            "
          >
            "اگر تم نہیں جانتے تو اہلِ ذکر سے پوچھو"
          </p>

        </div>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div
          className="
            border-t
            border-[#806b3f]/30
            mt-8
            pt-5
            text-center
          "
        >
          <p className="text-[#a9a18d] text-xs md:text-sm">
            © {new Date().getFullYear()} Maslak e Deoband
          </p>

          <p className="text-[#6f695b] text-[11px] mt-2">
            Developed by
            <span className="text-[#c8ae6a] mx-1">
              Web Core Cube Tech
            </span>
            — 9058596626
          </p>
        </div>

      </div>
    </footer>
  );
}