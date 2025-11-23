"use client";

// import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
// import { useGSAP } from "@gsap/react";
// import Lenis from "lenis";
import Navbar from "../components/landingpage/Navbar.jsx";
import Hero from "../components/landingpage/Hero.jsx";
import Cocktails from "../components/landingpage/Cocktails.jsx";
import About from "../components/landingpage/About.jsx";
import Art from "../components/landingpage/Art.jsx";
import Menu from "../components/landingpage/Menu.jsx";
import Contact from "../components/landingpage/Contact.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  // const container = useRef<HTMLDivElement>(null);
  // const textRef = useRef<HTMLHeadingElement>(null);

  // useGSAP(
  //   () => {
  //     const lenis = new Lenis();
  //     lenis.on("scroll", () => ScrollTrigger.update());
  //     gsap.ticker.add((time) => {
  //       lenis.raf(time * 1000);
  //     });
  //     gsap.ticker.lagSmoothing(0);

  //     gsap.set(textRef.current, {
  //       xPercent: -50,
  //       yPercent: -50,
  //       left: "50%",
  //       top: "50%",
  //       position: "absolute",
  //     });

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: container.current,
  //         start: "top top",
  //         end: "+=150%",
  //         scrub: 1,
  //         pin: true,
  //       },
  //     });

  //     tl.to(textRef.current, {
  //       scale: 50,
  //       opacity: 0,
  //       ease: "power2.inOut",
  //       force3D: true,
  //     });

  //     return () => {
  //       lenis.destroy();
  //     };
  //   },
  //   { scope: container },
  // );

  return (
    <main
    // ref={container}
    // className="relative flex min-h-screen w-full overflow-hidden"
    >
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
      <Art />
      <Menu />
      <Contact />
    </main>
  );
}
