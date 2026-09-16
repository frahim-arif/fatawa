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
        bg-[#F5FAF5]
        text-[#333333]
        border-t
        border-[#C6E2C8]
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
          className="object-cover opacity-[0.04]"
        />

        {/* Clean soft-green overlay */}
        <div className="absolute inset-0 bg-[#F5FAF5]/95" />

        {/* Very subtle pattern */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(117,193,120,0.7) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(117,193,120,0.7) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* Primary green top line */}
        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-[3px]
            bg-gradient-to-r
            from-transparent
            via-[#75C178]
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
                  bg-[#EAF5EA]
                  border
                  border-[#C6E2C8]
                  text-[#75C178]
                  shadow-sm
                "
              >
                <BookOpen size={21} />
              </div>

              <span className="hidden sm:block w-10 h-px bg-[#75C178]" />
            </div>

            <h2
              className="
                text-3xl
                md:text-4xl
                font-bold
                text-[#333333]
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
                text-[#555555]
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
                border-[#75C178]
                pr-4
                text-[#666666]
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
            <div
              className="
                flex
                items-center
                gap-3
                mb-5
                justify-center
                md:justify-start
              "
            >
              <h3
                className="
                  text-xl
                  md:text-2xl
                  font-bold
                  text-[#333333]
                "
                style={{
                  fontFamily:
                    "'Jameel Noori Nastaleeq', serif",
                }}
              >
                اہم لنکس
              </h3>

              <span className="w-10 h-px bg-[#75C178]" />
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
                      border-[#C6E2C8]
                      bg-white
                      px-4
                      py-3
                      text-[#444444]
                      transition-all
                      duration-300
                      shadow-sm
                      hover:bg-[#EAF5EA]
                      hover:border-[#75C178]
                      hover:text-[#333333]
                      hover:shadow-md
                    "
                  >
                    {/* Green hover line */}

                    <span
                      className="
                        absolute
                        right-0
                        top-0
                        h-[2px]
                        w-0
                        bg-[#75C178]
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
                        text-[#75C178]
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
          <span className="flex-1 h-px bg-[#C6E2C8]" />

          <div
            className="
              w-2
              h-2
              rotate-45
              border
              border-[#75C178]
              bg-[#EAF5EA]
            "
          />

          <span className="w-16 h-px bg-[#75C178]" />

          <div
            className="
              w-2
              h-2
              rotate-45
              border
              border-[#75C178]
              bg-[#EAF5EA]
            "
          />

          <span className="flex-1 h-px bg-[#C6E2C8]" />
        </div>

        {/* =================================================
            QURAN AYAH
        ================================================= */}

        <div className="text-center">
          <p
            className="
              text-[#63B56A]
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
              text-[#777777]
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
            border-[#C6E2C8]
            mt-8
            pt-5
            text-center
          "
        >
          <p className="text-[#555555] text-xs md:text-sm">
            © {new Date().getFullYear()} Maslak e Deoband
          </p>

          <p className="text-[#888888] text-[11px] mt-2">
            Developed by
            <span className="text-[#75C178] mx-1 font-medium">
              Web Core Cube Tech
            </span>
            — 9058596626
          </p>
        </div>
      </div>
    </footer>
  );
}