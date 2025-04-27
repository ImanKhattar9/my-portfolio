"use client";

import { NextPage } from "next";
import { motion } from "framer-motion";
import { FaCalendar, FaClock, FaCss3, FaHtml5, FaJs, FaPaperclip, FaReact, FaShoppingCart, FaStore, FaWordpress } from "react-icons/fa";
import { SiFramer } from "react-icons/si";
import Image from "next/image";

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const Projects: NextPage = () => {
  // Sample card data
  const cardsData = [
    {
      title: "Escape 2001",
      description: "A Lebanon-based e-commerce site offering exclusive artistic products, with a smooth shopping experience and social media integration.",
      image: "/projects/escape.png",
      techStack: [
        <FaWordpress key="wordpress-1" size={20} className="text-pink-400/75" />,
        <FaShoppingCart key="shopping-cart-1" size={20} className="text-pink-400/75" />,
        <FaStore key="store-1" size={20} className="text-pink-400/75" />,
      ],
      link: "https://escape2001.com",
    },
    {
      title: "Zinatalhafla",
      description: "A Saudi Arabia-based beauty services platform, offering a variety of treatments with an easy booking system and seamless user experience",
      image: "/projects/zinat.png",
      techStack: [
        <FaWordpress key="wordpress-2" size={20} className="text-pink-400/75" />,
        <FaCalendar key="calendar-2" size={20} className="text-pink-400/75" />,
        <FaClock key="clock-2" size={20} className="text-pink-400/75" />,
      ],
      link: "https://zinatalhafla.com",
    },
    {
      title: "Inas kiwan portfolio",
      description: "A portfolio showcasing web development skills with a clean, responsive design and interactive features, highlighting creativity and technical expertise.",
      image: "/projects/portfolio.png",
      techStack: [
        <FaHtml5 key="html-3" size={20} className="text-pink-400/75" />,
        <FaCss3 key="css-3" size={20} className="text-pink-400/75" />,
        <FaJs key="js-3" size={20} className="text-pink-400/75" />,
      ],
      link: "https://tan-woodcock-506703.hostingersite.com/",
    },
    {
      title: "my portfolio",
      description: "A portfolio showcasing web development skills with a clean, responsive design and interactive features, highlighting creativity and technical expertise.",
      image: "/projects/mypfl.png",
      techStack: [
        <FaReact key="react-4" size={20} className="text-pink-400/75" />,
        <FaCss3 key="css-4" size={20} className="text-pink-400/75" />,
        <SiFramer key="framer-4" size={20} className="text-pink-400/75" />,
      ],
      link: "https://imankhattar.com/",
    },
    {
      title: "Biomahcosmetics",
      description: "A Lebanon-based e-commerce site offering a variety of cosmetics with an easy shopping experience (under const, coming soon).",
      image: "/projects/biomah.png",
      techStack: [
        <FaWordpress key="wordpress-5" size={20} className="text-pink-400/75" />,
        <FaShoppingCart key="shopping-cart-5" size={20} className="text-pink-400/75" />,
        <FaStore key="store-5" size={20} className="text-pink-400/75" />,
      ],
      link: "https://biomahcosmetics.com",
    },
    {
      title: "Mirasmirrorbeauty",
      description: "A Lebanon-based beauty services website, offering a range of beauty treatments with an easy-to-use online booking system.",
      image: "/projects/beauty.png",
      techStack: [
        <FaWordpress key="wordpress-6" size={20} className="text-pink-400/75" />,
        <FaCalendar key="calendar-6" size={20} className="text-pink-400/75" />,
        <FaClock key="clock-6" size={20} className="text-pink-400/75" />,
      ],
      link: "https://mirasmirrorbeauty.com",
    },
    // {
    //   title: "Project 6",
    //   description: "A description for Project 6.",
    //   image: "projects/biomah.png",
    //   techStack: [
    //     <FaReact size={20} className="text-pink-400/75" />,
    //     <FaNodeJs size={20} className="text-pink-400/75" />,
    //     <FaJs size={20} className="text-pink-400/75" />,
    //   ],
    //   link: "https://biomahcosmetics.com",
    // },
  ];

  return (
    <div id="projects" className="min-h-screen text-white flex justify-center items-center">
      {/* Cards Container */}
      <div className="flex flex-col items-center  gap-12">
        {cardsData.map((card, index) => (
          <motion.div
            id="project"
            key={index}
            variants={pageVariants}

            className="sticky top-20 card flex flex-col md:flex-row bg-gray-300 rounded-xl shadow-lg w-[95%] max-w-s md:max-w-4xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Image Section */}
            <Image
              src={card.image}
              alt={card.title}
              width={400}  // Use the image's original width or desired width
              height={300} // Use the image's original height or a proportional height
              className="w-full md:w-2/5 h-60 md:h-60"
            />

            {/* Text Section */}
            <div className="p-4 md:p-8 flex flex-col justify-between">
              <h2 className="text-lg md:text-2xl font-play font-bold">{card.title}</h2>
              <p className="text-sm md:text-sm text-gray-700 mt-2 md:mt-4">{card.description}</p>

              <div className="flex items-center mt-2 md:mt-4">
                {card.techStack.map((icon, index) => (
                  <span key={index} className="mr-2 md:mr-3">
                    {icon}
                  </span>
                ))}
              </div>

              <div className="flex items-center mt-2 md:mt-4">
                <FaPaperclip size={14} className="mr-2" />
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400 text-sm md:text-base"
                >
                  View Project
                </a>
              </div>
            </div>
          </motion.div>

        ))}
      </div>
    </div>
  );
};

export default Projects;
