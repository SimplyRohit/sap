"use client"
import {useMotionValue , useScroll} from "motion/react"
import {useEffect} from "react"
const opacities = [
  useMotionValue(0.05),
  useMotionValue(0.05),
  useMotionValue(0.05),
  useMotionValue(0.05),
  useMotionValue(0.05),
 ];  

export function ProgressiveBlur() {
 const { scrollY } = useScroll();
 useEffect(() => {
  const unsubscribe = scrollY.on('change', latest => {
   const prev = scrollY.getPrevious() || 0;
   const delta = Math.abs(latest - prev);

   opacities.forEach((opacity, index) => {
    const current = opacity.get();
    const multiplier = 0.01 * (index + 1);
    const easedMultiplier = multiplier * (1 - current);
    const newValue = Math.min(current + delta * easedMultiplier, 0.95);
    opacity.set(newValue);
   });

  return () => {
   unsubscribe();
  };
 }, [scrollY]);
 return (
  <div className='progressive-blur pointer-events-none fixed inset-0 z-10'>
   <div className='absolute bottom-0 left-0 w-full h-70'>
    {opacities.reverse().map((opacity, index) => (
     <motion.div
      key={index}
      className={`blur-layer absolute bottom-0 left-0 w-full h-full blur-layer-${index + 1}`}
      style={{ opacity }}
     />
    ))}
   </div>
  </div>
 );
}