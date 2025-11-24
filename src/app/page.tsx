"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from '@gsap/react';
import Lenis from "lenis";
import Navbar from "~/components/landingpage/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}



export default function HomePage() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const endSectionRef = useRef<HTMLDivElement>(null);
  const endWordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".fixed")) return;
      const clickX = e.clientX;
      const clickY = e.clientY;
      const numberOfDashes = 4;
      const distance = 40;

      for (let i = 0; i < numberOfDashes; i++) {
        const dash = document.createElement("div");
        dash.style.position = "fixed";
        dash.style.left = "0";
        dash.style.top = "0";
        dash.style.width = "4px";
        dash.style.height = "10px";
        dash.style.backgroundColor = "black";
        dash.style.borderRadius = "2px";
        dash.style.pointerEvents = "none";
        dash.style.zIndex = "9999";

        const angle = -65 + (i * (130 / (numberOfDashes - 1)));

        gsap.set(dash, {
          x: clickX,
          y: clickY,
          xPercent: -50,
          yPercent: -50,
          rotation: angle,
          scale: 0.5,
          opacity: 1,
        });

        document.body.appendChild(dash);

        const rad = angle * (Math.PI / 180);
        const finalX = clickX + Math.sin(rad) * distance;
        const finalY = clickY - Math.cos(rad) * distance;

        gsap.to(dash, {
          x: finalX,
          y: finalY,
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            if (document.body.contains(dash)) {
              document.body.removeChild(dash);
            }
          }
        });
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis();
    lenis.on("scroll", () => ScrollTrigger.update());

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    gsap.set(textRef.current, {
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: "50%",
      position: "absolute",
    });

    const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: "50%",
      position: "absolute",
      transformOrigin: "center center"
    });

    gsap.set(card1Ref.current, { rotation: -5, x: -10, zIndex: 3 });
    gsap.set(card2Ref.current, { rotation: 0, zIndex: 2 });
    gsap.set(card3Ref.current, { rotation: 5, x: 10, zIndex: 1 });
    gsap.set(detailsRef.current, { opacity: 0, y: 50 });
    gsap.set(endWordsRef.current, { opacity: 0.1, y: 100, filter: "blur(10px)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    tl
      .to(textRef.current, { scale: 100, opacity: 0, duration: 2, ease: "power2.inOut" }, "start")
      .to(card1Ref.current, { xPercent: -150, yPercent: 0, left: "20%", top: "60%", rotation: 0, scale: 1, duration: 2, ease: "power2.inOut" }, "start")
      .to(card2Ref.current, { xPercent: -50, left: "50%", top: "60%", rotation: 0, duration: 2, ease: "power2.inOut" }, "start")
      .to(card3Ref.current, { xPercent: 50, left: "80%", top: "60%", rotation: 0, duration: 2, ease: "power2.inOut" }, "start")
      .to(detailsRef.current, { opacity: 1, y: 0, duration: 1, ease: "power1.out" }, "-=0.5");

    const tlEnd = gsap.timeline({
      scrollTrigger: {
        trigger: endSectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
      }
    });

    tlEnd.to(endWordsRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, { scope: container });

  const endText = ["SCROLL", "ENDS", "BUT", "IDEAS", "DON'T"];

  return (
    <div className="relative" ref={container}>
      <Navbar />

      <main className="w-full bg-[#f4f1ea] text-black cursor-crosshair">

        <div className="relative h-screen w-full overflow-hidden">
          <h1 ref={textRef} className="whitespace-nowrap font-black uppercase text-black leading-none select-none z-0 will-change-transform" style={{ fontSize: "15vw" }}>
            Juno Watts
          </h1>

          <div ref={card1Ref} className="absolute w-[20vw] h-[28vw] min-w-[200px] min-h-[280px] bg-[#a7b5fd] border-2 border-black flex flex-col justify-between p-4 shadow-lg will-change-transform">
            <div className="flex justify-between font-bold text-sm"><span>01</span><span>PLAN</span></div>
            <div className="text-4xl font-bold opacity-20 self-center">P</div>
            <div className="text-xs font-mono">STRATEGY / AUDIT / UX</div>
          </div>

          <div ref={card2Ref} className="absolute w-[20vw] h-[28vw] min-w-[200px] min-h-[280px] bg-[#ffb1b1] border-2 border-black flex flex-col justify-between p-4 shadow-lg will-change-transform">
            <div className="flex justify-between font-bold text-sm"><span>02</span><span>DESIGN</span></div>
            <div className="text-4xl font-bold opacity-20 self-center">D</div>
            <div className="text-xs font-mono">UI / VISUAL / INTERACTION</div>
          </div>

          <div ref={card3Ref} className="absolute w-[20vw] h-[28vw] min-w-[200px] min-h-[280px] bg-[#fde08a] border-2 border-black flex flex-col justify-between p-4 shadow-lg will-change-transform">
            <div className="flex justify-between font-bold text-sm"><span>03</span><span>DEVELOP</span></div>
            <div className="text-4xl font-bold opacity-20 self-center">D</div>
            <div className="text-xs font-mono">GSAP / NEXT.JS / WEBGL</div>
          </div>

          <div ref={detailsRef} className="absolute top-[20%] w-full text-center z-20">
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter">Equipped and Ready<br />for Scroll Battles</h2>
            <p className="mt-4 font-mono text-sm opacity-60">[ SCROLL DETECTED ]</p>
          </div>
        </div>

        <section ref={endSectionRef} className="h-screen bg-black text-[#f4f1ea] flex flex-col items-center justify-center p-10 relative">
          <div className="max-w-[90vw] text-center flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2 leading-none">
            {endText.map((word, i) => (
              <span key={i} ref={(el) => { if (el) endWordsRef.current[i] = el; }} className="text-5xl md:text-[8vw] font-black uppercase inline-block will-change-transform">
                {word}
              </span>
            ))}
          </div>
          <div className="mt-20 opacity-50 font-mono text-sm">( KEEP SCROLLING TO REVEAL )</div>
        </section>

        <div className="h-[50vh] bg-black w-full flex items-center justify-center text-zinc-600">
          <p>End of Transmission</p>
        </div>
      </main>
    </div>
  );
}