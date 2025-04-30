"use client";

import { useEffect, useRef, ReactNode } from "react";

interface HorizontalScrollWrapperProps {
  children: ReactNode[];
}

export default function HorizontalScrollWrapper({ children }: HorizontalScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const aboutSection = aboutRef.current;

    if (!container || !aboutSection) return;

    let startY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      touchStartTime = Date.now();
      isScrollingRef.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrollingRef.current) return;
      
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      const atAboutSection = Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) < 5;

      if (!atAboutSection) {
        // Home section - horizontal scroll only
        e.preventDefault();
        container.scrollBy({
          left: -deltaY * 2, // Multiply for better sensitivity
          behavior: "auto",
        });
        startY = currentY;
      } else {
        // About section
        const atTopOfAboutSection = aboutSection.scrollTop <= 0;
        const isScrollDown = deltaY < 0;
        const isScrollUp = deltaY > 0;
        const isFastSwipe = (Date.now() - touchStartTime) < 300 && Math.abs(deltaY) > 50;

        if (isScrollUp && atTopOfAboutSection) {
          // Trying to scroll up at top of About section - transition to Home
          e.preventDefault();
          isScrollingRef.current = true;
          container.scrollBy({
            left: -container.clientWidth,
            behavior: "smooth",
          });
          setTimeout(() => { isScrollingRef.current = false; }, 1000);
        } else if (isScrollDown && atTopOfAboutSection && isFastSwipe) {
          // Fast swipe down at top - allow vertical scroll
          return;
        } else if (isScrollUp && atTopOfAboutSection) {
          // Prevent vertical scroll when at top
          e.preventDefault();
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const atAboutSection = Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) < 5;

      if (!atAboutSection) {
        // Home page: horizontal scroll
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY,
          behavior: "smooth",
        });
      } else {
        // About section
        if (e.deltaY < 0 && aboutSection.scrollTop <= 0) {
          // Scrolling up at top of About: move back to Home
          e.preventDefault();
          container.scrollBy({
            left: -container.clientWidth,
            behavior: "smooth",
          });
        }
      }
    };

    // Attach event listeners
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory w-screen [&::-webkit-scrollbar]:hidden scrollbar-hide"
      style={{ height: "100vh", scrollBehavior: "smooth" }}
    >
      {/* Home Section */}
      <section className="w-screen h-screen flex-shrink-0 snap-start">
        {children[0]}
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="w-screen h-screen flex-shrink-0 snap-start overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-hide"
      >
        {children[1]}
      </section>
    </div>
  );
}