"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from '@gsap/react';
import Lenis from "lenis";
import Navbar from "~/components/landingpage/Navbar";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CARD_DATA, CLICK_ANIMATION, END_TEXT} from "~/constant/type";



if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP, ScrambleTextPlugin);
}



   

// const Card = ({ data, cardRef }: { data: typeof CARD_DATA[0]; cardRef: React.RefObject<HTMLDivElement> }) => (
//   <div
//     ref={cardRef}
//     className={`card-${data.id} absolute w-[20vw] h-[28vw] min-w-[200px] min-h-[280px] ${data.color} border-2 border-black flex flex-col justify-between p-4 shadow-lg will-change-transform`}
//   >
//     <div className="flex justify-between font-bold text-sm">
//       <span>{data.number}</span>
//       <span>{data.title}</span>
//     </div>
//     <div className="text-4xl font-bold opacity-20 self-center">{data.letter}</div>
//     <div className="text-xs font-mono">{data.subtitle}</div>
//   </div>
// );

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const endSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
      },
    });

    heroTimeline
      .to(".hero-text", {
        scale: 100,
        opacity: 0,
        duration: 2,
        ease: "power2.inOut",
      }, "start")
      // .to(".card-1", {
      //   xPercent: -150,
      //   yPercent: 0,
      //   left: "20%",
      //   top: "60%",
      //   rotation: 0,
      //   scale: 1,
      //   duration: 2,
      //   ease: "power2.inOut",
      // }, "start")
      // .to(".card-2", {
      //   xPercent: -50,
      //   left: "50%",
      //   top: "60%",
      //   rotation: 0,
      //   duration: 2,
      //   ease: "power2.inOut",
      // }, "start")
      // .to(".card-3", {
      //   xPercent: 50,
      //   left: "80%",
      //   top: "60%",
      //   rotation: 0,
      //   duration: 2,
      //   ease: "power2.inOut",
      // }, "start")
      .to(".hero-details", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power1.out",
      }, "-=0.5");

    // const endTimeline = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".end-section",
    //     start: "top top",
    //     end: "+=150%",
    //     scrub: 1,
    //     pin: true,
    //   },
    // });

    // endTimeline.to(".end-word", {
    //   opacity: 1,
    //   y: 0,
    //   filter: "blur(0px)",
    //   stagger: 0.2,
    //   duration: 1,
    //   ease: "power3.out",
    // });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, { scope: containerRef });

  // const card1Ref = useRef<HTMLDivElement>(null);
  // const card2Ref = useRef<HTMLDivElement>(null);
  // const card3Ref = useRef<HTMLDivElement>(null);

 

  return (
    
    <main className="relative" ref={containerRef}>
  <div className='background-grain' />

      <Navbar />
      <div className="w-full bg-[#f4f1ea] text-black ">
        <section className="hero-section relative h-screen w-full overflow-hidden">
          <h1 
            className="hero-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-black uppercase text-black leading-none select-none z-0 will-change-transform text-[14vw]"
          >
           AI TEAMS
          </h1>
          <div className='progressive-blur pointer-events-none fixed inset-0 z-10'>
 
  </div>
          {/* <Card data={CARD_DATA[0]} cardRef={card1Ref} />
          <Card data={CARD_DATA[1]} cardRef={card2Ref} />
          <Card data={CARD_DATA[2]} cardRef={card3Ref} /> */}
          {/* <div className="hero-details absolute top-[20%] w-full text-center z-20 opacity-0 translate-y-12">
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter">
              Equipped and Ready<br />for Scroll Battles
            </h2>
            <p className="mt-4 font-mono text-sm opacity-60">[ SCROLL DETECTED ]</p>
          </div> */}
        </section>

        {/* <section 
          ref={endSectionRef}
          className="end-section h-screen bg-black text-[#f4f1ea] flex flex-col items-center justify-center p-10 relative"
        >
          <div className="max-w-[90vw] text-center flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2 leading-none">
            {END_TEXT.map((word, index) => (
              <span
                key={word}
                className="end-word text-5xl md:text-[8vw] font-black uppercase inline-block will-change-transform opacity-10 translate-y-24 blur-[10px]"
              >
                {word}
              </span>
            ))}
          </div>
          <p className="mt-20 opacity-50 font-mono text-sm">( KEEP SCROLLING TO REVEAL )</p>
        </section>

        <footer className="h-[50vh] bg-black w-full flex items-center justify-center text-zinc-600">
          <p>End of Transmission</p>
        </footer> */}
      </div>
    </main>
  );
}