"use client";

import { useState, useEffect, useCallback } from "react";
import { CldImage } from 'next-cloudinary';
import { heroSlides } from "@/data/products";
import styles from "./Hero.module.css";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length);
  }, [current, goTo]);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className={styles.hero} id="hero" aria-label="Featured promotions">
      <div className={styles.slides}>
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${i === current ? styles.active : ""}`}
            style={{
              "--slide-bg": slide.bgColor,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})`
            }}
          >
            {/* Decorative elements */}
            <div className={styles.decorCircle1} />
            <div className={styles.decorCircle2} />
            <div className={styles.decorLine} />

            <div className={`container ${styles.content}`}>
              <div className={styles.textBlock}>
                <span className={`${styles.eyebrow} font-montserrat`}>{slide.subtitle}</span>
                <h1 className={styles.title}>{slide.title}</h1>
                <p className={`${styles.desc} font-montserrat`}>{slide.description}</p>
                <a href={slide.ctaLink} className={`btn btn-gold btn-lg ${styles.cta} font-montserrat`}>
                  {slide.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
