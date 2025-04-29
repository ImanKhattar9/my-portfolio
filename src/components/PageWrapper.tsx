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
    let isAtTopOfAbout = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      isAtTopOfAbout = aboutSection.scrollTop <= 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      const atAboutSection =
        Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) < 5;

      if (!atAboutSection) {
        e.preventDefault();
        container.scrollBy({
          left: -deltaY,
          behavior: "smooth",
        });
        startY = currentY;
      } else {
        if (deltaY > 60 && isAtTopOfAbout) {
          // Only navigate to Home if scrolling up while at the top of About
          e.preventDefault();
          container.scrollBy({
            left: -container.clientWidth,
            behavior: "smooth",
          });
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const atAboutSection =
        Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) < 5;
      const isAtTopOfAbout = aboutSection.scrollTop <= 0;

      if (!atAboutSection) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY,
          behavior: "smooth",
        });
      } else {
        if (e.deltaY < -30 && isAtTopOfAbout) {
          e.preventDefault();
          container.scrollBy({
            left: -container.clientWidth,
            behavior: "smooth",
          });
        }
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
