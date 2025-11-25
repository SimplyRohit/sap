"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useIsMobile } from "~/hooks/use-mobile";
import { NAVBAR_CONFIG, NAV_LINKS  , FOOTER_LINKS} from "~/constant/type";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isMobile = useIsMobile();

  const updateTime = useCallback(() => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setTime(formattedTime);
  }, []);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(navRef.current, {
      height: NAVBAR_CONFIG.expandedHeight,
      duration: NAVBAR_CONFIG.animationDuration,
      ease: "power3.inOut",
    })
    .to(".hamburger", { autoAlpha: 0, duration: 0.2 }, "<")
    .fromTo(
      ".close-btn",
      { autoAlpha: 0, rotation: -90 },
      { autoAlpha: 1, rotation: 0, duration: 0.2 },
      "<0.1"
    )
    .to(".menu-content", { autoAlpha: 1, duration: 0.1 }, "<")
    .fromTo(
      ".menu-link",
      { y: "100%" },
      { 
        y: "0%", 
        stagger: NAVBAR_CONFIG.staggerDelay, 
        duration: NAVBAR_CONFIG.animationDuration, 
        ease: "power3.out" 
      },
      "-=0.2"
    )
    .fromTo(
      ".footer", 
      { autoAlpha: 0 }, 
      { autoAlpha: 1, duration: 0.2 }, 
      "-=0.2"
    );

    const scrambleTargets = [
      { selector: ".scramble-about", text: "ABOUT US", delay: "-=0.3" },
      { selector: ".scramble-policy", text: "POLICY", delay: "<0.1" },
      { selector: ".scramble-local", text: "LOCAL", delay: "<0.1" },
    ];

    scrambleTargets.forEach(({ selector, text, delay }) => {
      tl.to(selector, {
        duration: 1,
        scrambleText: { 
          text, 
          chars: NAVBAR_CONFIG.scrambleChars, 
          speed: 1 
        },
        onStart: () => void gsap.set(selector, { visibility: "visible" }),
      }, delay);
    });

    tlRef.current = tl;
  }, { scope: navRef });

  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [isOpen]);


  return (
    <div className="fixed md:w-[600px] md:px px-2 h-[60px] w-full top-6 left-1/2 -translate-x-1/2 flex  justify-center z-10">
      <nav
        ref={navRef}
        className="w-full rounded-xl relative bg-background text-[#F9F4EB] shadow-2xl flex flex-col overflow-hidden"
        aria-label="Main navigation"
      >
        <div className="absolute top-0 left-0 w-full h-[60px] flex items-center justify-between px-6 z-20">
          <a href="/" aria-label="Home" className="font-bold text-[1.2rem]">
          Y
          </a>

          <div className="relative w-6 h-6">
            <button
              onClick={() => setIsOpen(true)}
              className="hamburger absolute inset-0 flex flex-col justify-center gap-1.5 items-end"
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <span className="w-6 h-0.5 bg-white block" aria-hidden="true"></span>
              <span className="w-6 h-0.5 bg-white block" aria-hidden="true"></span>
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="close-btn absolute inset-0 flex items-center justify-center opacity-0 invisible"
              aria-label="Close menu"
              tabIndex={isOpen ? 0 : -1}
            >
              <span className="absolute w-6 h-0.5 bg-white rotate-45 block" aria-hidden="true"></span>
              <span className="absolute w-6 h-0.5 bg-white -rotate-45 block" aria-hidden="true"></span>
            </button>
          </div>
        </div>

        <div className="menu-content flex-1 flex flex-col px-6 pt-18 pb-8 gap-10 opacity-0 invisible h-full">
          <div className={`flex font-barlow flex-col gap-2 ${isMobile ? "text-[4rem]" : "text-[5rem]"}`}>
            {NAV_LINKS.map((item) => (
              <div 
                key={item} 
                className="overflow-hidden h-[5rem] flex items-center"
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className="menu-link uppercase leading-[0.85] block translate-y-full will-change-transform hover:opacity-70 transition-opacity"
                  tabIndex={isOpen ? 0 : -1}
                >
                  {item}
                </a>
              </div>
            ))}
          </div>

          <footer className="footer mt-auto flex justify-between items-end text-[15px] font-mono opacity-60 uppercase tracking-widest text-gray-400">
            <div className="flex gap-6">
              {FOOTER_LINKS.map(({ text, className }) => (
                <a 
                  key={text}
                  href={`#${text.toLowerCase().replace(" ", "-")}`}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                  tabIndex={isOpen ? 0 : -1}
                >
                  <span className="text-[8px]" aria-hidden="true">▶</span>
                  <span className={`${className} invisible`}>{text}</span>
                </a>
              ))}
            </div>
            
            <div className="hidden md:flex gap-2" aria-live="polite" aria-atomic="true">
              <time dateTime={new Date().toISOString()}>{time}</time>
              <span className="scramble-local invisible">LOCAL</span>
            </div>
          </footer>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;