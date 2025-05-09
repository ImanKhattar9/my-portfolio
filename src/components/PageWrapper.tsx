"use client";

import { useEffect, useRef, ReactNode } from "react";

interface HorizontalScrollWrapperProps {
  children: ReactNode[];
}

export default function HorizontalScrollWrapper({ children }: HorizontalScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Track how many times user scrolls up while already at the top
  const upScrollCount = useRef(0);

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
      const atAboutSection = Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) < 5;
      const atTopOfAboutSection = aboutSection.scrollTop <= 0;

      if (!atAboutSection) {
        e.preventDefault();
        container.scrollBy({ left: -deltaY * 2, behavior: "auto" });
        startY = currentY;
        return;
      }

      // At About section
      if (deltaY > 0 && atTopOfAboutSection) {
        // Only scroll to Home if user pulls up again
        upScrollCount.current += 1;
        if (upScrollCount.current >= 2) {
          e.preventDefault();
          container.scrollBy({
            left: -container.clientWidth,
            behavior: "smooth",
          });
          upScrollCount.current = 0;
        }
      } else {
        // Reset count if not pulling up
        upScrollCount.current = 0;
      }

      startY = currentY;
    };

    const handleWheel = (e: WheelEvent) => {
      const atAboutSection = Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) < 5;
      const atTopOfAboutSection = aboutSection.scrollTop <= 0;

      if (!atAboutSection) {
        e.preventDefault();
        container.scrollBy({ left: e.deltaY, behavior: "smooth" });
        return;
      }

      if (e.deltaY < 0 && atTopOfAboutSection) {
        upScrollCount.current += 1;
        if (upScrollCount.current >= 2) {
          e.preventDefault();
          container.scrollBy({
            left: -container.clientWidth,
            behavior: "smooth",
          });
          upScrollCount.current = 0;
        }
      } else {
        upScrollCount.current = 0;
      }
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
