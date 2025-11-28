"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import Navbar from "~/components/landingpage/Navbar";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import {
  BackgroundGrain,
  ProgressiveBlur,
} from "~/components/landingpage/pg-blur";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP, ScrambleTextPlugin);
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);

      const tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      const heroText = document.querySelector<HTMLElement>(".hero-text");
      if (heroText) {
        const viewportWidth = window.innerWidth;
        const textWidth = heroText.scrollWidth;

        const startX = viewportWidth;
        const endX = (viewportWidth - textWidth) / 2;

        heroTimeline
          .fromTo(
            heroText,
            {
              x: startX,
              opacity: 0,
            },
            {
              x: endX,
              opacity: 1,
              ease: "power2.inOut",
              duration: 0.6,
            },
            0,
          )
          .to(
            heroText,
            {
              opacity: 1,
              ease: "none",
              duration: 0.4,
            },
            0.6,
          );
      }

      return () => {
        lenis.destroy();
        gsap.ticker.remove(tickerFn);
      };
    },
    { scope: containerRef },
  );

  return (
    <main className="relative" ref={containerRef}>
      <BackgroundGrain />
      <ProgressiveBlur />
      <Navbar />

      <div className="w-full bg-[#f4f1ea] text-black">
        <section className="hero-section relative flex h-screen w-full items-center justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#f4f1ea] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#f4f1ea] to-transparent" />

          <p className="hero-text relative inline-block text-[9vw] font-semibold tracking-tight whitespace-nowrap text-[#ff6f55] uppercase will-change-transform">
            We turn what's left into what's next.
          </p>

          <span className="pointer-events-none absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-xs tracking-[0.4em] text-[#ff6f55]/80 uppercase">
            Scroll to explore
          </span>

          <div className="progressive-blur pointer-events-none fixed inset-0 z-10"></div>
        </section>

        <section className="relative w-full bg-[#f6f2ea] px-6 py-24 text-[#332f2e]">
          <div className="mx-auto max-w-5xl space-y-6 text-lg leading-relaxed">
            <p>
              We purchase by-products. We sell ingredients. Explore how our
              circular ecosystem connects buyers and sellers while keeping
              resources in motion.
            </p>
            <p>
              Scroll to continue discovering the portfolio, capabilities, and
              stories that sit beyond this hero.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
