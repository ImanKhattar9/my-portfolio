"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import React from "react";

// Fix for ESLint display-name warning
const AnchorWithRef = React.forwardRef<HTMLAnchorElement, React.ComponentProps<'a'>>(
  (props, ref) => <a ref={ref} {...props} />
);
AnchorWithRef.displayName = "AnchorWithRef";
const MotionAnchor = motion(AnchorWithRef);

export default function ProfileAnimation() {
  const ovalControls = useAnimation();
  const nameControls = useAnimation();
  const text = "Web Developer • ";
  const repeatedText = text.repeat(2);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sequence = async () => {
      await ovalControls.start({ scale: 1, transition: { duration: 1, ease: "anticipate" } });
      await nameControls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
      await ovalControls.start({ rotateY: 180, transition: { duration: 1.5, ease: "anticipate" } });
    };
    sequence();
  }, [nameControls, ovalControls]);

  return (
    <div className="h-[94vh] flex flex-col items-center justify-center text-white relative mt-3 md:min-h-screen">
      {/* Name Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={nameControls}
        className="absolute z-10 font-special text-[4.2rem] sm:text-[12rem] md:text-[9rem] lg:text-[10rem] font-bold text-center px-2"
      >
        <div className="overflow-hidden">
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, ease: "anticipate", delay: 2 }}
            className="mb-2 sm:mb-0"
          >
            IMAN
          </motion.div>
        </div>
        <div className="overflow-hidden -mt-8 sm:-mt-20">
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, ease: "anticipate", delay: 2 }}
          >
            KHATTAR
          </motion.div>
        </div>
      </motion.div>

      {/* Oval Container */}
      <motion.div
        initial={{ scale: 0 }}
        animate={ovalControls}
        className="relative w-14 h-24 sm:w-28 sm:h-44 z-20"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full bg-pink-400/75 rounded-full flex flex-col items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className=" text-xs sm:text-2xl">Web</div>
          <div className="text-xs sm:text-2xl">Developer</div>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-pink-400/75 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src="/pictures/me.png"
            alt="Iman Khattar"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </motion.div>

      {/* Circular Text Animation */}
      <div className="absolute top-20 right-7 sm:right-20 sm:top-20 flex items-center">
        {isVisible && (
          <motion.svg
            width="70"
            height="70"
            viewBox="0 0 200 200"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            <defs>
              <path
                id="circlePath"
                d="M 100, 100
                   m -75, 0
                   a 75,75 0 1,1 150,0
                   a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text
              fontSize="29"
              className="sm:text-[29px]"
              fontFamily="better minds"
              fill="black"
              letterSpacing="2"
            >
              <textPath href="#circlePath">{repeatedText}</textPath>
            </text>
          </motion.svg>
        )}
      </div>

      {/* Download CV */}
      <MotionAnchor
        href="/my cv.pdf"
        download
        className="fixed bottom-4 sm:bottom-1 right-3 flex items-center group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative flex items-center gap-2 px-2 py-2 bg-pink-500/75 backdrop-blur-sm rounded-full text-white font-semibold shadow-lg hover:shadow-pink-500/30 transition-all">
          <FiDownload className="text-white text-xl" />
          <span className="absolute bottom-full mb-2 left-1/4 -translate-x-1/2 text-center bg-white text-black text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Download My CV
          </span>
        </div>
      </MotionAnchor>
    </div>
  );
}

