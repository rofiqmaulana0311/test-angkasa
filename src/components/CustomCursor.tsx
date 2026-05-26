import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Position targets for smooth lerping
  const targetX = useRef(-100);
  const targetY = useRef(-100);
  const currentX = useRef(-100);
  const currentY = useRef(-100);

  useEffect(() => {
    // Only activate cursor if the device supports a pointing device (desktop)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    // Add pointer class to body
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setHidden(false);
      targetX.current = e.clientX;
      targetY.current = e.clientY;
      
      // Instantly position the center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    // Listen for hover states on link/interactive elements
    const updateHoverState = () => {
      const hoverables = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .interactive-hover'
      );
      
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsPointer(true));
        el.addEventListener('mouseleave', () => setIsPointer(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Initial check and set up periodic updates because dynamic elements render
    updateHoverState();
    const interval = setInterval(updateHoverState, 1000);

    // Lerp loop for the follow ring
    let animationFrameId: number;
    const lerpRing = () => {
      const ease = 0.15; // lerput constant
      currentX.current += (targetX.current - currentX.current) * ease;
      currentY.current += (targetY.current - currentY.current) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(lerpRing);
    };
    
    animationFrameId = requestAnimationFrame(lerpRing);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Tiny active center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cosmic-blue rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-transform duration-100 ease-out"
      />
      {/* Outer follow ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 border border-cosmic-blue/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out will-change-transform ${
          isPointer
            ? 'w-12 h-12 bg-cosmic-blue/10 border-cosmic-blue/70 scale-110'
            : 'w-8 h-8 scale-100'
        }`}
      />
    </>
  );
}
