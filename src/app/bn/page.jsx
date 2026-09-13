"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Mic,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Calculator,
  Moon,
  Compass,
  Scale,
  Clock3,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import axios from "axios";

const backend = "https://f-backend-vdi1.onrender.com/api";

/* =====================================================
   HERO SLIDES
===================================================== */

const heroSlides = [
  {
    image: "/images/ramadan_15_03_2022_1.jpg",
    title: "ইসলামী প্রশ্ন ও উত্তর",
    description:
      "কুরআন ও সুন্নাহর আলোকে ইসলামী জ্ঞান অর্জন করুন",
    buttonText: "ফতোয়া দেখুন",
    buttonLink: "/bn/fatawa",
  },
  {
    image: "/images/1943.jpg",
    title: "ইসলামী জ্ঞান ও শিক্ষা",
    description:
      "বিশ্বস্ত আলেমদের মাধ্যমে ইসলামী মাসআলা ও ফতোয়া জানুন",
    buttonText: "প্রশ্ন ও উত্তর",
    buttonLink: "/bn/fatawa",
  },
  {
    image: "/images/ramadan_15_03_2022_1.jpg",
    title: "ইসলামী প্রবন্ধ",
    description:
      "ইসলামের বিভিন্ন বিষয় সম্পর্কে গুরুত্বপূর্ণ প্রবন্ধ পড়ুন",
    buttonText: "প্রবন্ধ পড়ুন",
    buttonLink: "/bn/articles",
  },
];

/* =====================================================
   STATIC ISLAMIC BOOKS
===================================================== */

const islamicBooks = [
  {
    title: "তাফসীর ও কুরআন",
    description:
      "কুরআন ও তাফসীর সম্পর্কিত ইসলামী জ্ঞান",
    image: "/images/1943.jpg",
    link: "/bn/books",
  },
  {
    title: "হাদীস শরীফ",
    description:
      "হাদীস ও সুন্নাহ সম্পর্কিত গুরুত্বপূর্ণ আলোচনা",
    image: "/images/1943.jpg",
    link: "/bn/books",
  },
  {
    title: "ফিকহ ও মাসআলা",
    description:
      "দৈনন্দিন জীবনের ইসলামী মাসআলা ও বিধান",
    image: "/images/1943.jpg",
    link: "/bn/books",
  },
  {
    title: "ইসলামী সাহিত্য",
    description:
      "ইসলামী ইতিহাস, শিক্ষা ও নসীহতমূলক গ্রন্থ",
    image: "/images/1943.jpg",
    link: "/bn/books",
  },
];

/* =====================================================
   ISLAMIC TOOLS
===================================================== */

const islamicTools = [
  {
    title: "যাকাত ক্যালকুলেটর",
    description:
      "আপনার যাকাতের হিসাব সহজে নির্ণয় করুন",
    icon: Scale,
    link: "/ozan-shariah-calculator",
  },
  {
    title: "নামাজের সময়",
    description:
      "দৈনিক পাঁচ ওয়াক্ত নামাজের সময় দেখুন",
    icon: Clock3,
    link: "/bn/prayer-times",
  },
  {
    title: "কিবলা",
    description:
      "কিবলার দিক সম্পর্কে তথ্য জানুন",
    icon: Compass,
    link: "/bn/qibla",
  },
  {
    title: "ইসলামী ক্যালকুলেটর",
    description:
      "বিভিন্ন ইসলামী হিসাব ও ক্যালকুলেটর",
    icon: Calculator,
    link: "/ozan-shariah-calculator",
  },
];

/* =====================================================
   HELPERS
===================================================== */

const getApiData = (response) => {
  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return [];
};

const getCategorySlug = (item) => {
  return (
    item?.banglaSlug ||
    item?.bnSlug ||
    item?.slugBn ||
    item?.slug ||
    item?._id ||
    ""
  );
};

const getQuestion = (item) => {
  return (
    item?.question ||
    item?.banglaQuestion ||
    item?.bnQuestion ||
    item?.questionBn ||
    ""
  );
};

const getQuestionSlug = (item) => {
  return (
    item?.banglaSlug ||
    item?.bnSlug ||
    item?.slugBn ||
    item?.slug ||
    item?._id ||
    ""
  );
};

const getArticleTitle = (item) => {
  return (
    item?.banglaTitle ||
    item?.bnTitle ||
    item?.titleBn ||
    ""
  );
};

const getArticleContent = (item) => {
  return (
    item?.banglaContent ||
    item?.bnContent ||
    item?.contentBn ||
    ""
  );
};

const getArticleSlug = (item) => {
  return (
    item?.banglaSlug ||
    item?.bnSlug ||
    item?.slugBn ||
    item?.slug ||
    item?._id ||
    ""
  );
};

/* =====================================================
   COMPONENT
===================================================== */

export default function BanglaHomePage() {
  const [query, setQuery] = useState("");

  const [categories, setCategories] = useState([]);
  const [latestQuestions, setLatestQuestions] =
    useState([]);
  const [articles, setArticles] = useState([]);

  const [prayerTimes, setPrayerTimes] =
    useState(null);

  const [currentSlide, setCurrentSlide] =
    useState(0);

  const [categoryLoading, setCategoryLoading] =
    useState(true);

  const [questionLoading, setQuestionLoading] =
    useState(true);

  const [articleLoading, setArticleLoading] =
    useState(true);

  /* =====================================================
     HERO AUTO SLIDER
  ===================================================== */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((previous) =>
        previous === heroSlides.length - 1
          ? 0
          : previous + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((previous) =>
      previous === heroSlides.length - 1
        ? 0
        : previous + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((previous) =>
      previous === 0
        ? heroSlides.length - 1
        : previous - 1
    );
  };

  /* =====================================================
     CATEGORIES
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${backend}/bn/categories`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = getApiData(response);

        if (!mounted) return;

        setCategories(
          data
            .filter(
              (item) =>
                item?.name &&
                getCategorySlug(item)
            )
            .slice(0, 8)
        );
      } catch (error) {
        console.error(
          "Bangla categories error:",
          error?.response?.data ||
            error?.message
        );

        if (mounted) {
          setCategories([]);
        }
      } finally {
        if (mounted) {
          setCategoryLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     QUESTIONS
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${backend}/bn/questions?limit=10&skip=0`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = getApiData(response);

        if (!mounted) return;

        setLatestQuestions(
          data
            .filter(
              (item) =>
                getQuestion(item) &&
                getQuestionSlug(item)
            )
            .slice(0, 5)
        );
      } catch (error) {
        console.error(
          "Bangla questions error:",
          error?.response?.data ||
            error?.message
        );

        if (mounted) {
          setLatestQuestions([]);
        }
      } finally {
        if (mounted) {
          setQuestionLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     ARTICLES
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${backend}/majameen`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = getApiData(response);

        if (!mounted) return;

        setArticles(
          data
            .filter((item) => {
              return (
                getArticleTitle(item) &&
                getArticleContent(item) &&
                getArticleSlug(item)
              );
            })
            .slice(0, 5)
        );
      } catch (error) {
        console.error(
          "Bangla articles error:",
          error?.response?.data ||
            error?.message
        );

        if (mounted) {
          setArticles([]);
        }
      } finally {
        if (mounted) {
          setArticleLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     PRAYER TIMES
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Guwahati&country=India&method=1",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Prayer time request failed"
          );
        }

        const data = await response.json();

        if (
          mounted &&
          data?.code === 200 &&
          data?.data?.timings
        ) {
          setPrayerTimes(
            data.data.timings
          );
        }
      } catch (error) {
        console.error(
          "Prayer time error:",
          error
        );
      }
    };

    fetchPrayerTimes();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     SEARCH
  ===================================================== */

  const normalizedQuery = query
    .trim()
    .toLowerCase();

  const filteredQuestions = useMemo(() => {
    if (!normalizedQuery) {
      return latestQuestions;
    }

    return latestQuestions.filter(
      (item) =>
        getQuestion(item)
          .toLowerCase()
          .includes(normalizedQuery)
    );
  }, [
    latestQuestions,
    normalizedQuery,
  ]);

  const filteredArticles = useMemo(() => {
    if (!normalizedQuery) {
      return articles;
    }

    return articles.filter(
      (item) =>
        getArticleTitle(item)
          .toLowerCase()
          .includes(normalizedQuery)
    );
  }, [
    articles,
    normalizedQuery,
  ]);

  /* =====================================================
     VOICE SEARCH
  ===================================================== */

  const startListening = () => {
    if (typeof window === "undefined") {
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "ভয়েস সার্চ এই ব্রাউজারে সমর্থিত নয়।"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "bn-BD";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const text =
        event?.results?.[0]?.[0]
          ?.transcript || "";

      setQuery(text);
    };

    recognition.onerror = (event) => {
      console.error(
        "Voice search error:",
        event?.error
      );
    };

    try {
      recognition.start();
    } catch (error) {
      console.error(error);
    }
  };

  /* =====================================================
     PRAYER HELPER
  ===================================================== */

  const getPrayerTime = (name) => {
    return (
      prayerTimes?.[name]
        ?.split(" ")[0] || "--"
    );
  };

  const prayerList = [
    {
      name: "ফজর",
      key: "Fajr",
    },
    {
      name: "যোহর",
      key: "Dhuhr",
    },
    {
      name: "আসর",
      key: "Asr",
    },
    {
      name: "মাগরিব",
      key: "Maghrib",
    },
    {
      name: "এশা",
      key: "Isha",
    },
  ];

  /* =====================================================
     HERO
  ===================================================== */

  const slide = heroSlides[currentSlide];

  return (
    <main
      lang="bn"
      dir="ltr"
      className="min-h-screen bg-[#f7f3e8]"
    >
      {/* =================================================
          HERO SLIDER
      ================================================= */}

      <section className="relative h-[430px] overflow-hidden bg-[#2d2222] md:h-[520px]">

        {heroSlides.map(
          (item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/55" />
            </div>
          )
        )}

        <div className="relative z-20 flex h-full items-center justify-center px-5 text-center">
          <div className="max-w-3xl text-white">

            <div className="mb-4 inline-flex items-center gap-2 border border-yellow-400/60 bg-black/30 px-4 py-2 text-sm text-yellow-200 backdrop-blur-sm">
              <Sparkles
                className="h-4 w-4"
              />
              <span>
                মাসলাকে দেওবন্দ
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-yellow-300 sm:text-4xl md:text-6xl">
              {slide.title}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-yellow-50 md:text-xl">
              {slide.description}
            </p>

            <Link
              href={slide.buttonLink}
              className="mt-7 inline-flex items-center gap-2 border border-yellow-500 bg-[#3b2f2f] px-6 py-3 font-semibold text-yellow-200 transition hover:bg-[#4a3a3a]"
            >
              {slide.buttonText}
              <ArrowLeft
                className="h-4 w-4 rotate-180"
              />
            </Link>
          </div>
        </div>

        {/* PREVIOUS */}

        <button
          type="button"
          onClick={previousSlide}
          className="absolute left-3 top-1/2 z-30 -translate-y-1/2 border border-white/40 bg-black/40 p-2 text-white transition hover:bg-black/70 md:left-6"
          aria-label="পূর্ববর্তী স্লাইড"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* NEXT */}

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 top-1/2 z-30 -translate-y-1/2 border border-white/40 bg-black/40 p-2 text-white transition hover:bg-black/70 md:right-6"
          aria-label="পরবর্তী স্লাইড"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* DOTS */}

        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {heroSlides.map(
            (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  setCurrentSlide(index)
                }
                aria-label={`স্লাইড ${index + 1}`}
                className={`h-2.5 transition-all ${
                  index === currentSlide
                    ? "w-8 bg-yellow-400"
                    : "w-2.5 bg-white/60"
                }`}
              />
            )
          )}
        </div>
      </section>

      {/* =================================================
          PRAYER TIMES
      ================================================= */}

      <section className="border-b-2 border-[#75593f] bg-[#181313]">

        <div className="mx-auto max-w-6xl px-3 py-3">

          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-yellow-400">
            <Moon className="h-4 w-4" />
            আজকের নামাজের সময়
          </div>

          <div className="grid grid-cols-5 divide-x divide-[#75593f] border border-[#75593f]">

            {prayerList.map(
              (prayer) => (
                <div
                  key={prayer.key}
                  className="px-1 py-2 text-center sm:px-3"
                >
                  <div className="text-xs text-yellow-100 sm:text-sm">
                    {prayer.name}
                  </div>

                  <div className="mt-1 text-sm font-bold text-yellow-400 sm:text-base">
                    {getPrayerTime(
                      prayer.key
                    )}
                  </div>
                </div>
              )
            )}

          </div>
        </div>
      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="mx-auto max-w-6xl px-3 py-10 md:px-4">

        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="mb-12">

          <div className="mx-auto max-w-4xl">

            <div className="mb-3 text-center">
              <h2 className="text-2xl font-bold text-[#4b3415]">
                ইসলামী জ্ঞান খুঁজুন
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                আপনার প্রশ্ন লিখে ফতোয়া ও প্রবন্ধ খুঁজুন
              </p>
            </div>

            <div className="flex overflow-hidden border border-yellow-600 bg-white shadow-md">

              <div className="flex items-center px-3">
                <Search
                  className="h-5 w-5 text-yellow-600"
                />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="আপনার প্রশ্ন লিখুন..."
                aria-label="প্রশ্ন খুঁজুন"
                className="w-full bg-transparent py-4 text-gray-800 outline-none"
              />

              {query && (
                <button
                  type="button"
                  onClick={() =>
                    setQuery("")
                  }
                  className="px-3 text-xl text-gray-400 hover:text-gray-700"
                  aria-label="অনুসন্ধান মুছে ফেলুন"
                >
                  ×
                </button>
              )}

              <button
                type="button"
                onClick={startListening}
                className="border-l border-gray-200 px-4 transition hover:bg-yellow-50"
                aria-label="ভয়েস সার্চ"
              >
                <Mic className="h-5 w-5 text-yellow-600" />
              </button>

            </div>
          </div>
        </section>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <section className="mb-14">

          <SectionHeading
            title="ইসলামী বিষয়সমূহ"
            link="/bn/categories"
            linkText="সব বিষয় দেখুন →"
          />

          {categoryLoading ? (
            <LoadingGrid />
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

              {categories.map(
                (category) => {
                  const slug =
                    getCategorySlug(
                      category
                    );

                  return (
                    <Link
                      key={
                        category?._id ||
                        slug
                      }
                      href={`/bn/categories/${encodeURIComponent(
                        slug
                      )}`}
                      className="group border border-[#c8b27a] bg-gradient-to-b from-[#f8f2df] to-[#d5bd7b] p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <span className="font-semibold leading-6 text-[#4b3415] group-hover:text-[#2f2110]">
                        {category.name}
                      </span>
                    </Link>
                  );
                }
              )}

            </div>
          ) : (
            <EmptyBox text="কোনো ইসলামী বিষয় পাওয়া যায়নি।" />
          )}
        </section>

        {/* =================================================
            ISLAMIC BOOKS
        ================================================= */}

        <section className="mb-14">

          <SectionHeading
            title="ইসলামী কিতাব"
            link="/bn/books"
            linkText="সব কিতাব দেখুন →"
          />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {islamicBooks.map(
              (book, index) => (
                <Link
                  key={index}
                  href={book.link}
                  className="group overflow-hidden border border-[#d7c79e] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="relative h-44 overflow-hidden bg-[#e9dfc4]">

                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  <div className="p-4">

                    <div className="mb-2 flex items-center gap-2 text-yellow-700">
                      <BookOpen className="h-4 w-4" />

                      <span className="text-xs font-semibold">
                        ইসলামী কিতাব
                      </span>
                    </div>

                    <h3 className="font-bold text-[#3b2f2f]">
                      {book.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {book.description}
                    </p>

                    <span className="mt-3 inline-block text-sm font-semibold text-yellow-700">
                      দেখুন →
                    </span>

                  </div>
                </Link>
              )
            )}

          </div>
        </section>

        {/* =================================================
            ISLAMIC TOOLS
        ================================================= */}

        <section className="mb-14">

          <SectionHeading
            title="ইসলামী টুলস"
            link="/ozan-shariah-calculator"
            linkText="আরও দেখুন →"
          />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

            {islamicTools.map(
              (tool, index) => {
                const Icon =
                  tool.icon;

                return (
                  <Link
                    key={index}
                    href={tool.link}
                    className="group border border-[#c8b27a] bg-[#3b2f2f] p-5 text-center text-yellow-100 shadow-sm transition hover:bg-[#4a3a3a] hover:shadow-md"
                  >

                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center border border-yellow-500/50 bg-black/20 text-yellow-400">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="font-bold">
                      {tool.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-yellow-100/75">
                      {tool.description}
                    </p>

                  </Link>
                );
              }
            )}

          </div>
        </section>

        {/* =================================================
            LATEST FATAWA
        ================================================= */}

        <section className="mb-14">

          <SectionHeading
            title="নতুন ফতোয়া"
            link="/bn/fatawa"
            linkText="সব ফতোয়া দেখুন →"
          />

          {questionLoading ? (
            <LoadingList />
          ) : filteredQuestions.length > 0 ? (
            <div className="space-y-3">

              {filteredQuestions.map(
                (item) => {
                  const question =
                    getQuestion(item);

                  const slug =
                    getQuestionSlug(item);

                  return (
                    <Link
                      key={
                        item?._id ||
                        slug
                      }
                      href={`/bn/fatawa/${encodeURIComponent(
                        slug
                      )}`}
                      className="group block border border-yellow-200 bg-white p-5 shadow-sm transition hover:border-yellow-500 hover:shadow-md"
                    >

                      <div className="flex items-start gap-3">

                        <div className="mt-1 shrink-0 text-yellow-700">
                          <BookOpen className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="font-semibold leading-7 text-gray-800 group-hover:text-[#4b3415]">
                            {question}
                          </h3>

                          <span className="mt-2 inline-block text-sm font-semibold text-yellow-700">
                            ফতোয়া পড়ুন →
                          </span>
                        </div>

                      </div>

                    </Link>
                  );
                }
              )}

            </div>
          ) : (
            <EmptyBox
              text={
                query
                  ? "কোনো প্রশ্ন পাওয়া যায়নি।"
                  : "এখনো কোনো বাংলা ফতোয়া পাওয়া যায়নি।"
              }
            />
          )}

        </section>

        {/* =================================================
            ARTICLES
        ================================================= */}

        <section className="mb-10">

          <SectionHeading
            title="নির্বাচিত প্রবন্ধ"
            link="/bn/articles"
            linkText="সব প্রবন্ধ দেখুন →"
          />

          {articleLoading ? (
            <LoadingList />
          ) : filteredArticles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">

              {filteredArticles.map(
                (item) => {
                  const title =
                    getArticleTitle(
                      item
                    );

                  const slug =
                    getArticleSlug(
                      item
                    );

                  return (
                    <Link
                      key={
                        item?._id ||
                        slug
                      }
                      href={`/bn/articles/${encodeURIComponent(
                        slug
                      )}`}
                      className="group border border-yellow-200 bg-white p-5 shadow-sm transition hover:border-yellow-500 hover:shadow-md"
                    >

                      <div className="flex gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#3b2f2f] text-yellow-300">
                          <BookOpen className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="font-bold leading-7 text-gray-800 group-hover:text-[#4b3415]">
                            {title}
                          </h3>

                          <span className="mt-2 inline-block text-sm font-semibold text-yellow-700">
                            প্রবন্ধ পড়ুন →
                          </span>
                        </div>

                      </div>

                    </Link>
                  );
                }
              )}

            </div>
          ) : (
            <EmptyBox text="এখনো কোনো বাংলা প্রবন্ধ পাওয়া যায়নি।" />
          )}

        </section>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <section className="border border-[#75593f] bg-[#3b2f2f] px-5 py-10 text-center">

          <h2 className="text-2xl font-bold text-yellow-300 md:text-3xl">
            আপনার ইসলামী প্রশ্নের উত্তর খুঁজুন
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-yellow-100">
            কুরআন, হাদীস ও ফিকহের আলোকে বিভিন্ন
            ইসলামী প্রশ্ন ও ফতোয়া পড়ুন।
          </p>

          <Link
            href="/bn/fatawa"
            className="mt-6 inline-flex items-center gap-2 border border-yellow-500 bg-yellow-500 px-6 py-3 font-bold text-[#3b2f2f] transition hover:bg-yellow-400"
          >
            ফতোয়া অনুসন্ধান করুন
            <ArrowLeft
              className="h-4 w-4 rotate-180"
            />
          </Link>

        </section>

      </div>
    </main>
  );
}

/* =====================================================
   SECTION HEADING
===================================================== */

function SectionHeading({
  title,
  link,
  linkText,
}) {
  return (
    <div className="mb-5 flex items-center justify-between border-b border-[#c8b27a] pb-2">

      <h2 className="text-2xl font-bold text-[#4b3415]">
        {title}
      </h2>

      <Link
        href={link}
        className="text-sm font-semibold text-yellow-700 transition hover:text-yellow-900 sm:text-base"
      >
        {linkText}
      </Link>

    </div>
  );
}

/* =====================================================
   LOADING GRID
===================================================== */

function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(
        (item) => (
          <div
            key={item}
            className="h-[88px] animate-pulse border border-yellow-100 bg-white"
          />
        )
      )}
    </div>
  );
}

/* =====================================================
   LOADING LIST
===================================================== */

function LoadingList() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map(
        (item) => (
          <div
            key={item}
            className="h-[90px] animate-pulse border border-yellow-100 bg-white"
          />
        )
      )}
    </div>
  );
}

/* =====================================================
   EMPTY BOX
===================================================== */

function EmptyBox({ text }) {
  return (
    <div className="border border-yellow-200 bg-white p-8 text-center">
      <p className="text-gray-500">
        {text}
      </p>
    </div>
  );
}