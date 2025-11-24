"use client";
import { Barlow_Condensed } from "next/font/google";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const bc = Barlow_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["900"],
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const instaTextRef = useRef<HTMLSpanElement>(null);
  const linkedTextRef = useRef<HTMLSpanElement>(null);
  const localTextRef = useRef<HTMLSpanElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const decodeEffect = (element: HTMLElement | null, originalText: string, duration: number = 0.5) => {
      if (!element) return;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

      return gsap.fromTo(element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration,
          ease: "power2.out",
          onStart: () => {
            gsap.set(element, { visibility: "visible" });
          },
          onUpdate: function () {
            const progress = this.progress();
            const revealLength = Math.floor(originalText.length * progress);

            const revealed = originalText.substring(0, revealLength);

            const scrambled = originalText
              .substring(revealLength)
              .split("")
              .map(() => chars[Math.floor(Math.random() * chars.length)])
              .join("");

            element.innerText = revealed + scrambled;
          },
          onComplete: () => {
            element.innerText = originalText;
          }
        }
      );
    };

    const tl = gsap.timeline({ paused: true });

    tl
      .to(navRef.current, {
        height: "603px",
        duration: 0.5,
        ease: "power3.inOut",
      })
      .to(hamburgerRef.current, { autoAlpha: 0, duration: 0.2 }, "<")
      .fromTo(
        closeBtnRef.current,
        { autoAlpha: 0, rotation: -90 },
        { autoAlpha: 1, rotation: 0, duration: 0.2 },
        "<0.1"
      )
      .to(menuContentRef.current, { autoAlpha: 1, duration: 0.1 }, "<")
      .fromTo(
        ".menu-link",
        { y: "100%" },
        { y: "0%", stagger: 0.08, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(footerRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, "-=0.2");


    tl.add(decodeEffect(instaTextRef.current, "INSTAGRAM"), "-=0.3");
    tl.add(decodeEffect(linkedTextRef.current, "LINKEDIN"), "<0.1");
    tl.add(decodeEffect(localTextRef.current, "LOCAL"), "<0.1");

    tlRef.current = tl;
  }, { scope: navRef });

  useEffect(() => {
    if (tlRef.current) {
      if (isOpen) {
        tlRef.current.play();
      } else {
        tlRef.current.reverse();
      }
    }
  }, [isOpen]);

  return (
    <div className="fixed w-[600px] md:h-[60px] top-6 left-[50%] translate-x-[-50%] flex justify-center z-50 ">
      <div
        ref={navRef}
        className="w-full rounded-[12px] relative bg-background text-[#F9F4EB] shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[60px] flex items-center justify-between px-6 z-20">
          <div className="">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14L5 4H8L12 10L16 4H19L12 14V20H10V14Z" fill="white" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative w-6 h-6">
            <button
              ref={hamburgerRef}
              onClick={() => setIsOpen(true)}
              className="absolute inset-0 flex flex-col justify-center gap-1.5 items-end"
            >
              <span className="w-6 h-0.5 bg-white block"></span>
              <span className="w-6 h-0.5 bg-white block"></span>
            </button>

            <button
              ref={closeBtnRef}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 flex items-center justify-center opacity-0 invisible"
            >
              <span className="absolute w-6 h-0.5 bg-white rotate-45 block"></span>
              <span className="absolute w-6 h-0.5 bg-white -rotate-45 block"></span>
            </button>
          </div>
        </div>

        <div
          ref={menuContentRef}
          className="flex-1 flex flex-col px-6 pt-24 pb-8 gap-10 opacity-0 invisible h-full"
        >
          <div className={`flex ${bc.className} flex-col gap-2`}>
            {["INDEX", "THE DEV", "COOL STUFF", "LOG 01", "PING ME"].map((item, i) => (
              <div key={i} className="overflow-hidden h-[5rem] flex items-center">
                <a
                  href="#"
                  className="menu-link text-[5rem] uppercase leading-[0.85] block translate-y-full will-change-transform"
                >
                  {item}
                </a>
              </div>
            ))}
          </div>

          <div ref={footerRef} className="mt-auto flex justify-between items-end text-[15px] font-mono opacity-60 uppercase tracking-widest text-gray-400">
            <div className="flex gap-6">
              <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
                <span className="text-[8px]">▶</span>
                <span ref={instaTextRef} className="invisible">INSTAGRAM</span>
              </a>
              <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
                <span className="text-[8px]">▶</span>
                <span ref={linkedTextRef} className="invisible">LINKEDIN</span>
              </a>
            </div>
            <div className="flex gap-2">
              <span>{time}</span>
              <span ref={localTextRef} className="invisible">LOCAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;