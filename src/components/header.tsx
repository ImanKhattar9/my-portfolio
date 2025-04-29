'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleClick = () => {
    window.location.href = 'mailto:email@imankhattar.com';
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  const menuVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.3,
      },
    },
    exit: { x: '100%' },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.header
      className="flex items-center justify-between px-2 bg-white rounded-full shadow-lg mt-7 ml-3 mr-3 md:ml-8 md:mr-8 h-[10vh] relative z-40"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.1 }}>
        <Image
          src="/pictures/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="w-11 ml-2 sm:w-8 md:w-10 lg:w-10"
        />
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-grow justify-center">
        <ul className="flex space-x-6 text-sm items-center">
          <li className="flex items-center">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:underline">
              About
            </a>
          </li>
          <span className="mx-4 text-gray-400">/</span>
          <li className="flex items-center">
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:underline">
              Projects
            </a>
          </li>
          <span className="mx-4 text-gray-400">/</span>
          <li className="flex items-center">
            <a href="#knowledge" onClick={(e) => scrollToSection(e, 'knowledge')} className="hover:underline">
              Knowledge
            </a>
          </li>
          <span className="mx-4 text-gray-400">/</span>
          <li className="flex items-center">
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="text-sm text-white bg-pink-500/75 px-4 py-2 cursor-pointer lg:px-8 mr-4 hidden sm:inline-block"
            onClick={handleClick}
          >
            Hire me
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMenu}
          className="lg:hidden p-3 mr-1 rounded-lg hover:bg-gray-100 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={isMenuOpen ? 'open' : 'closed'}
            variants={{
              open: { rotate: 90 },
              closed: { rotate: 0 },
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-16 6h16'}
              />
            </svg>
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Menu with animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-30"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              onClick={toggleMenu}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-6 right-0 h-screen w-62 bg-white shadow-xl z-50 lg:hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Close Button */}
                <motion.button
                  onClick={toggleMenu}
                  className="self-end mb-8 p-2 hover:bg-gray-100 rounded-lg"
                  whileHover={{ rotate: 90 }}
                  transition={{ type: 'spring' }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                {/* Menu Items */}
                <ul className="flex flex-col space-y-6">
                  <li>
                    <a
                      href="#about"
                      onClick={(e) => scrollToSection(e, 'about')}
                      className="text-lg flex items-center justify-between"
                    >
                      <span className="hover:underline">About</span>
                      <motion.span
                        className="text-gray-400 text-xl"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#projects"
                      onClick={(e) => scrollToSection(e, 'projects')}
                      className="text-lg flex items-center justify-between"
                    >
                      <span className="hover:underline">Projects</span>
                      <motion.span
                        className="text-gray-400 text-xl"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#knowledge"
                      onClick={(e) => scrollToSection(e, 'knowledge')}
                      className="text-lg flex items-center justify-between"
                    >
                      <span className="hover:underline">Knowledge</span>
                      <motion.span
                        className="text-gray-400 text-xl"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={(e) => scrollToSection(e, 'contact')}
                      className="text-lg flex items-center justify-between"
                    >
                      <span className="hover:underline">Contact</span>
                      <motion.span
                        className="text-gray-400 text-xl"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </a>
                  </li>
                </ul>

                {/* Mobile Hire Button */}
                <Button
                  className="w-full text-white bg-pink-500/75 text-lg py-6 mt-82 cursor-pointer"
                  onClick={handleClick}
                >
                  Hire me
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
