'use client';

import { useEffect, useState } from 'react';

const slides = [
  {
    id: 1,
    image: '/images/slider06.png',
    alt: 'اسلامی معلومات',
  },
  {
    id: 2,
    image: '/images/slider09.png',
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
  // NEXT SLIDE
  // =====================================================

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  // =====================================================
  // PREVIOUS SLIDE
  // =====================================================

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full py-0">
      
      {/* =================================================
          SLIDER
      ================================================= */}

      <div className="relative w-full overflow-hidden">

        {/* Slides */}

        <div
          className="flex w-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative min-w-full w-full"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="block w-full h-auto"
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
            md:left-6
            top-1/2
            -translate-y-1/2
            w-9
            h-9
            md:w-11
            md:h-11
            rounded-full
            bg-black/30
            hover:bg-[#166534]
            text-white
            flex
            items-center
            justify-center
            transition-all
            duration-200
            backdrop-blur-sm
          "
        >
          <span className="text-2xl md:text-3xl leading-none -mt-1">
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
            md:right-6
            top-1/2
            -translate-y-1/2
            w-9
            h-9
            md:w-11
            md:h-11
            rounded-full
            bg-black/30
            hover:bg-[#166534]
            text-white
            flex
            items-center
            justify-center
            transition-all
            duration-200
            backdrop-blur-sm
          "
        >
          <span className="text-2xl md:text-3xl leading-none -mt-1">
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
              aria-label={`Slide ${index + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300

                ${
                  current === index
                    ? 'w-7 bg-[#c9a227]'
                    : 'w-2 bg-white/80 hover:bg-white'
                }
              `}
            />
          ))}
        </div>

      </div>

    </section>
  );
}