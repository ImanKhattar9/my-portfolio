"use client";

import { useEffect, useRef, ReactNode } from "react";

interface HorizontalScrollWrapperProps {
  children: ReactNode[];
}

export default function HorizontalScrollWrapper({ children }: HorizontalScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const aboutSection = aboutRef.current;

    if (!container || !aboutSection) return;

    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      const atEndOfHorizontalScroll =
        Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) < 5;

      const isAtTopOfAbout = aboutSection.scrollTop <= 0;

      // When not yet in About — scroll horizontally
      if (!atEndOfHorizontalScroll) {
        e.preventDefault();
        container.scrollBy({
          left: -deltaY,
          behavior: "smooth",
        });
        startY = currentY;
      } else {
        // Inside About, only scroll back to Home if at top and scrolling down
        if (deltaY > 60 && isAtTopOfAbout) {
          e.preventDefault();
          container.scrollBy({
            left: -container.clientWidth,
            behavior: "smooth",
          });
        }
        // else: allow normal vertical scroll inside About
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const atEndOfHorizontalScroll =
        Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) < 5;
      const isAtTopOfAbout = aboutSection.scrollTop <= 0;

      if (!atEndOfHorizontalScroll) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY,
          behavior: "smooth",
        });
      } else if (e.deltaY < -30 && isAtTopOfAbout) {
        e.preventDefault();
        container.scrollBy({
          left: -container.clientWidth,
          behavior: "smooth",
        });
      }
      // otherwise, allow natural scroll inside About
    };

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
      style={{ height: "100vh", overscrollBehavior: "none" }}
    >
      {/* Home Section */}
      <section className="w-screen h-screen flex-shrink-0 snap-start">
        {children[0]}
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="w-screen h-screen flex-shrink-0 snap-start overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-hide"
        style={{ overscrollBehavior: "contain" }}
      >
        {children[1]}
      </section>
    </div>
  );
}
