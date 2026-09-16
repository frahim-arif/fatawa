
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomeLoader() {
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev;

        const increment = Math.floor(Math.random() * 5) + 1;

        return Math.min(prev + increment, 92);
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="
        fixed
        inset-0
        z-[99999]
        flex
        items-center
        justify-center
        overflow-hidden
      "
      style={{
        background:
          "radial-gradient(circle at center, #FFFFFF 0%, #F5FAF5 50%, #EAF5EA 100%)",
      }}
    >
      {/* =====================================================
          SOFT GRID BACKGROUND
      ===================================================== */}

      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(117,193,120,0.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(117,193,120,0.08) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "120px 120px",
        }}
      />

      {/* =====================================================
          GOLDEN CAMERA CORNERS
      ===================================================== */}

      <div className="absolute top-16 left-8 w-14 h-14 border-l-2 border-t-2 border-[#D4AF37]" />

      <div className="absolute top-16 right-8 w-14 h-14 border-r-2 border-t-2 border-[#D4AF37]" />

      <div className="absolute bottom-16 left-8 w-14 h-14 border-l-2 border-b-2 border-[#D4AF37]" />

      <div className="absolute bottom-16 right-8 w-14 h-14 border-r-2 border-b-2 border-[#D4AF37]" />

      {/* =====================================================
          REC
      ===================================================== */}

      <div className="absolute top-24 left-14 flex items-center gap-2">
        <motion.div
          animate={{
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className="w-3 h-3 rounded-full bg-red-500"
        />

        <span className="text-red-500 text-xs tracking-[4px] font-medium">
          REC
        </span>
      </div>

      {/* =====================================================
          TIME CODE
      ===================================================== */}

      <div className="absolute top-24 right-14">
        <span className="text-[#63B56A] text-xs tracking-[3px] font-mono font-medium">
          TC 00:00:{String(progress).padStart(2, "0")}:14
        </span>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative w-[82%] max-w-md text-center">

        {/* ===================================================
            LOGO / SITE NAME
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mb-3"
        >
          <h1
            className="
              text-4xl
              md:text-5xl
              font-bold
              tracking-tight
              whitespace-nowrap
            "
          >
            <span className="text-[#333333]">
              Maslak-e-
            </span>

            <span className="text-[#75C178]">
              Deoband
            </span>

            <span className="text-[#D4AF37]">
              |
            </span>
          </h1>
        </motion.div>

        {/* ===================================================
            SUBTITLE
        =================================================== */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
            duration: 0.8,
          }}
          className="
            text-[#555555]
            text-[10px]
            md:text-xs
            tracking-[5px]
            md:tracking-[7px]
            font-medium
          "
        >
          ISLAMIC KNOWLEDGE LIBRARY
        </motion.p>

        {/* ===================================================
            PROGRESS
        =================================================== */}

        <div className="mt-14">

          <div
            className="
              relative
              h-4
              w-full
              rounded-full
              bg-[#EAF5EA]
              border
              border-[#C6E2C8]
              overflow-visible
            "
          >

            {/* Progress Fill */}

            <motion.div
              className="
                absolute
                left-0
                top-0
                h-full
                rounded-full
              "
              style={{
                background:
                  "linear-gradient(90deg, #75C178, #63B56A)",
                boxShadow:
                  "0 0 12px rgba(117,193,120,0.35)",
              }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            />

            {/* Red Playhead */}

            <motion.div
              className="
                absolute
                top-[-8px]
                w-[3px]
                h-11
                bg-red-400
              "
              animate={{
                left: `${progress}%`,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              style={{
                boxShadow:
                  "0 0 8px rgba(255,80,80,0.35)",
              }}
            >
              <div
                className="absolute -top-1 left-[-5px]"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft:
                    "6px solid transparent",
                  borderRight:
                    "6px solid transparent",
                  borderTop:
                    "8px solid #ff6666",
                }}
              />
            </motion.div>
          </div>

          {/* =================================================
              LOADING TEXT
          ================================================= */}

          <div className="flex justify-between mt-5">

            <motion.span
              key={progress}
              initial={{
                opacity: 0.5,
              }}
              animate={{
                opacity: 1,
              }}
              className="
                text-[#555555]
                text-[10px]
                tracking-[3px]
                md:tracking-[4px]
                font-medium
              "
            >
              LOADING ISLAMIC CONTENT
            </motion.span>

            <span
              className="
                text-[#75C178]
                text-sm
                font-mono
                font-bold
              "
            >
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
        </div>

        {/* ===================================================
            BOTTOM LOADING ANIMATION
        =================================================== */}

        <div className="mt-8 flex justify-center gap-1">

          {[1, 2, 3, 4, 5].map((item) => (
            <motion.div
              key={item}
              className="
                w-1
                h-1
                rounded-full
                bg-[#75C178]
              "
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: item * 0.12,
              }}
            />
          ))}

        </div>
      </div>

      {/* =====================================================
          BOTTOM STATUS
      ===================================================== */}

      <div
        className="
          absolute
          bottom-8
          left-0
          right-0
          text-center
        "
      >
        <span
          className="
            text-[#777777]
            text-[9px]
            tracking-[3px]
            md:tracking-[5px]
            font-medium
          "
        >
          INITIALIZING MASLAK-E-DEOBAND
        </span>
      </div>
    </motion.div>
  );
}

