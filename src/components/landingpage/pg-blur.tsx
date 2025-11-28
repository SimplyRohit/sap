import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValue, motion } from "motion/react";
export function ProgressiveBlur() {
  const { scrollY } = useScroll();
  const rafRef = useRef<number | null>(null);

  const opacities = [
    useMotionValue(0.05),
    useMotionValue(0.05),
    useMotionValue(0.05),
    useMotionValue(0.05),
    useMotionValue(0.05),
  ];

  const smoothOpacity = () => {
    const threshold = 0.1;
    let allSettled = true;

    opacities.forEach((opacity) => {
      const current = opacity.get();
      const target = 0.05;
      if (Math.abs(current - target) < threshold) {
        opacity.set(target);
      } else if (current > target) {
        opacity.set(current - (current - target) * 0.2);
        allSettled = false;
      }
    });
    if (!allSettled) {
      rafRef.current = requestAnimationFrame(smoothOpacity);
    } else {
      rafRef.current = null;
    }
  };

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const prev = scrollY.getPrevious() || 0;
      const delta = Math.abs(latest - prev);

      opacities.forEach((opacity, index) => {
        const current = opacity.get();
        const multiplier = 0.01 * (index + 1);
        const easedMultiplier = multiplier * (1 - current);
        const newValue = Math.min(current + delta * easedMultiplier, 0.95);
        opacity.set(newValue);
      });

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      setTimeout(() => {
        if (!rafRef.current) smoothOpacity();
      }, 150);
    });

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollY]);

  return (
    <div className="progressive-blur pointer-events-none fixed inset-0 z-10">
      <div className="absolute bottom-0 left-0 h-70 w-full">
        {opacities.reverse().map((opacity, index) => (
          <motion.div
            key={index}
            className={`blur-layer absolute bottom-0 left-0 h-full w-full blur-layer-${index + 1}`}
            style={{ opacity }}
          />
        ))}
      </div>
    </div>
  );
}

export function BackgroundGrain() {
  return <div className="background-grain" />;
}

export function BackgroundGrid() {
  return <div className="background-grid" aria-hidden />;
}
