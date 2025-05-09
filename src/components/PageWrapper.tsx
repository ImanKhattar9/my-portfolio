"use client";

import { useEffect, useRef, ReactNode } from "react";

interface HorizontalScrollWrapperProps {
  children: ReactNode[];
}

export default function HorizontalScrollWrapper({ children }: HorizontalScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const reachedTopOnce = useRef(false);
  const startYRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const aboutSection = aboutRef.current;
    if (!container || !aboutSection) return;

    const handleTouchStart = (e: TouchEvent) => {
      startYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startYRef.current;
      startYRef.current = currentY;

      const isAtAbout =
        Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) < 5;
      const atTop = aboutSection.scrollTop <= 0;
      const atBottom =
        Math.abs(aboutSection.scrollTop + aboutSection.clientHeight - aboutSection.scrollHeight) < 5;

      // Horizontal scroll from Home to About
      if (!isAtAbout) {
        e.preventDefault();
        container.scrollBy({ left: -deltaY * 2, behavior: "auto" });
        return;
      }

      // First, let user scroll to top of About
      if (deltaY > 0 && !reachedTopOnce.current) {
        if (atTop) {
          reachedTopOnce.current = true;
        }
        return; // don't scroll to Home yet
      }

      // Then allow scroll to Home only if already at top
      if (deltaY > 0 && atTop && reachedTopOnce.current) {
        e.preventDefault();
        container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
        reachedTopOnce.current = false; // reset
        return;
      }

      // Scroll down from About to vertical sections
      if (deltaY < 0 && atBottom) {
        e.preventDefault();
        requestAnimationFrame(() => {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        });
      } else {
        reachedTopOnce.current = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const isAtAbout =
        Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) < 5;
      const atTop = aboutSection.scrollTop <= 0;
      const atBottom =
        Math.abs(aboutSection.scrollTop + aboutSection.clientHeight - aboutSection.scrollHeight) < 5;

      if (!isAtAbout) {
        e.preventDefault();
        container.scrollBy({ left: e.deltaY, behavior: "smooth" });
        return;
      }

      if (e.deltaY < 0 && !reachedTopOnce.current) {
        if (atTop) reachedTopOnce.current = true;
        return;
      }

      if (e.deltaY < 0 && atTop && reachedTopOnce.current) {
        e.preventDefault();
        container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
        reachedTopOnce.current = false;
        return;
      }

      if (e.deltaY > 0 && atBottom) {
        e.preventDefault();
        requestAnimationFrame(() => {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        });
      } else {
        reachedTopOnce.current = false;
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
      style={{
        height: "100vh",
        scrollBehavior: "smooth",
        overscrollBehavior: "contain",
      }}
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
