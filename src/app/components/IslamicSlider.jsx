
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

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full m-0 p-0 overflow-hidden">

      {/* Images */}
      <div className="relative w-full m-0 p-0">

        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            className={`
              w-full
              h-auto
              block
              m-0
              p-0
              transition-opacity
              duration-700
              ${index === current ? 'opacity-100' : 'opacity-0'}
              ${index === 0 ? 'relative' : 'absolute top-0 left-0'}
            `}
          />
        ))}

      </div>

      {/* Previous */}
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
          z-20
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
          transition
          backdrop-blur-sm
        "
      >
        <span className="text-2xl md:text-3xl">
          ‹
        </span>
      </button>

      {/* Next */}
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
          z-20
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
          transition
          backdrop-blur-sm
        "
      >
        <span className="text-2xl md:text-3xl">
          ›
        </span>
      </button>

      {/* Dots */}
      <div
        className="
          absolute
          bottom-3
          md:bottom-5
          left-1/2
          -translate-x-1/2
          z-20
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

    </section>
  );
}

