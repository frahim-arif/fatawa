
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/slider06.png.jpg',
    alt: 'اسلامی معلومات',
  },
  {
    id: 2,
    image: '/images/slider09.png.jpg',
    alt: 'اسلامی تعلیمات',
  },
  {
    id: 3,
    image: '/images/slider03.png',
    alt: 'مسائل اور فتاویٰ',
  },
];

export default function IslamicSlider() {
  const [current, setCurrent] = useState(0);

  // =====================================================
  // AUTO SLIDE
  // =====================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // NEXT
  // =====================================================

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  // =====================================================
  // PREVIOUS
  // =====================================================

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full px-3 md:px-5 py-5 md:py-8">
      <div className="max-w-7xl mx-auto">

        {/* =================================================
            SLIDER
        ================================================= */}

        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#f5f5f2]">

          {/* Slides */}

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >

            {slides.map((slide) => (
              <div
                key={slide.id}
                className="relative min-w-full aspect-[16/8] md:aspect-[16/7]"
              >

                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={slide.id === 1}
                  sizes="100vw"
                  className="object-cover"
                />

              </div>
            ))}

          </div>


          {/* =================================================
              PREVIOUS BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="
              absolute
              left-3
              md:left-5
              top-1/2
              -translate-y-1/2
              w-9
              h-9
              md:w-11
              md:h-11
              rounded-full
              bg-black/35
              hover:bg-[#166534]
              text-white
              flex
              items-center
              justify-center
              transition
              backdrop-blur-sm
            "
          >
            <span className="text-xl md:text-2xl leading-none">
              ‹
            </span>
          </button>


          {/* =================================================
              NEXT BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              absolute
              right-3
              md:right-5
              top-1/2
              -translate-y-1/2
              w-9
              h-9
              md:w-11
              md:h-11
              rounded-full
              bg-black/35
              hover:bg-[#166534]
              text-white
              flex
              items-center
              justify-center
              transition
              backdrop-blur-sm
            "
          >
            <span className="text-xl md:text-2xl leading-none">
              ›
            </span>
          </button>


          {/* =================================================
              DOTS
          ================================================= */}

          <div
            className="
              absolute
              bottom-3
              md:bottom-5
              left-1/2
              -translate-x-1/2
              flex
              items-center
              gap-2
            "
          >

            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    current === index
                      ? 'w-7 bg-[#c9a227]'
                      : 'w-2 bg-white/70 hover:bg-white'
                  }
                `}
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

