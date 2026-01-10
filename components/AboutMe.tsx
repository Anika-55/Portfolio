"use client";

import { motion } from "framer-motion";
import Image from "next/image";


export default function AboutMe() {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-20 gap-12 lg:gap-20 relative overflow-hidden ">

      {/* Neon Orb */}
      <div className="absolute -right-40 md:-right-60 top-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-green-500/20 rounded-full blur-[120px]" />

      {/* Left Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full lg:w-1/2 relative flex justify-center"
      >
        <Image
          src="/profileImage.jpg"
          alt="profile"
          width={520}
          height={600}
          className=""
        />
      </motion.div>

      {/* Right Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left"
      >
        <p className="text-green-400 uppercase tracking-widest">About Me</p>

        <h1 className="text-lg md:text-xl lg:text-2xl font-bold leading-snug">
          I am an aspiring full-stack web developer passionate about building modern, interactive web applications. Skilled in TypeScript, React, Next.js,JavaScript,  Node.js, PostgreSQL, Prisma ORM, and Firebase, I enjoy learning new technologies and turning ideas into real projects. I am eager to start my career as a web developer, contribute to meaningful projects, and grow into a confident, professional developer.
        </h1>

        <div className="pt-8 border-t border-white/20 space-y-2 md:space-y-3 text-gray-300 text-sm md:text-base">
          {/* <p>Independent Product Designer — <span className="text-green-400">2025</span></p> */}
        </div>
      </motion.div>
    </section>
  );
}
