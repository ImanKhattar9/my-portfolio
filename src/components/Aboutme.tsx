"use client";

import { motion } from "framer-motion";

export default function AboutMe() {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.section
        id="about"
        className="text-white py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        {/* Grid wrapper to ensure equal height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 md:px-12">

          {/* Education Section */}
          <div className="relative flex flex-col">
            <h3 className="text-xl font-cinzel font-semibold mb-6 ml-4 md:ml-12 text-black">
              
              Education
            </h3>
            <div className="relative flex flex-col flex-grow">
              
            <div className="absolute left-[6px] md:left-[30px] top-0 bottom-0 w-0.5 bg-gray-400"></div>
              {[
                { title: "Bachelor Degree - MUBS", date: "2019 - 2023", description: "Studied Computer Science with a focus on programming, algorithms, software development, and system design." },
                { title: "Bacc technique 3 - Ajial Al Ghad", date: "2017 - 2019", description: "Gained proficiency in programming languages, database management, and troubleshooting." },
                { title: "Bootcamp - Park Innovation", date: "2022 - 2023", description: "Completed Mobile & JavaScript Bootcamp, gaining hands-on experience in app development." },
              ].map((item, index) => (
                <motion.div key={index} className="flex flex-col flex-grow">
         <motion.div className="absolute left-[3px] md:left-[27px] w-2 h-2 bg-white rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div className="border-2 shadow-md p-4 pl-10 ml-4 mb-2 md:ml-12 flex flex-col flex-grow"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.date}</p>
                    <p className="mt-2 text-gray-800">{item.description}</p>
                  </motion.div>

                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="relative flex flex-col">
            <h3 className="text-xl font-cinzel font-semibold mb-6 ml-12 text-black">
              Experience
            </h3>
            <div className="relative flex flex-col flex-grow">
              
               {/* line */}
              <div className="absolute left-[6px] md:left-[30px] top-0 bottom-0 w-0.5 bg-gray-400"></div>

              {[
                { title: "Web Developer - Freelancer", date: "2023 - present", description: "I write efficient code, ensure responsive design, and implement SEO strategies to enhance website visibility." },
                { title: "Content Creator & IT Support - Bassel Computers", date: "2021 - 2023", description: "Managed IT tasks and created digital content, including laptop setup and software maintenance." },
                { title: "Internship Web Developer - A World IT", date: "2022 - 2023", description: "Gained expertise in Angular and TypeScript, working on projects like the Matensa app." },
              ].map((item, index) => (
                <motion.div key={index} className="flex flex-col flex-grow">

                    {/* Dot */}
         <motion.div className="absolute left-[3px] md:left-[27px] w-2 h-2 bg-white rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div className="border-2 shadow-md p-4 pl-10 ml-4 mb-2 md:ml-12 flex flex-col flex-grow"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.date}</p>
                    <p className="mt-2 text-gray-800">{item.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </motion.section>
    </motion.div>
  );
}
