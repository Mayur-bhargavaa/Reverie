"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=85",
    eyebrow: "Spring / Summer 2026",
    heading: "Live in Beauty",
    subtext: "New season, thoughtfully made. Discover pieces that move with you.",
    cta: "Shop New Arrivals",
    href: "/collections/new-arrivals",
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85",
    eyebrow: "The Dress Edit",
    heading: "Effortless Femininity",
    subtext: "From silk slips to wrap silhouettes — dresses for every moment.",
    cta: "Shop Dresses",
    href: "/collections/dresses",
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85",
    eyebrow: "Limited Time",
    heading: "The Summer Edit",
    subtext: "Curated pieces for warm days and long evenings. Up to 40% off.",
    cta: "Shop the Edit",
    href: "/products",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 700);
    },
    [animating]
  );

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  // Auto-advance every 5 s
  useEffect(() => {
    const id = setTimeout(() => next(), 5000);
    return () => clearTimeout(id);
  }, [current, next]);

  return (
    <section className="relative h-[85vh] min-h-[560px] overflow-hidden bg-[#e8e3dd]">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.heading}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-28 text-white text-center px-6">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-light opacity-90">
              {slide.eyebrow}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide leading-none mb-6">
              {slide.heading}
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-md font-light leading-relaxed mb-8">
              {slide.subtext}
            </p>
            <Link
              href={slide.href}
              className="group inline-flex items-center gap-3 bg-white text-black text-xs tracking-widest uppercase px-8 py-4 font-medium hover:bg-white/90 transition-colors"
            >
              {slide.cta}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      ))}

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
