"use client";

import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <section className="relative pb-20 pt-36 overflow-hidden">
      {/* Spotlight layers */}
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen w-screen"
        fill="white"
      />
      <Spotlight
        className="top-10 left-[80%] -translate-x-1/2 h-[80vh] w-[50vw]"
        fill="purple"
      />
      <Spotlight
        className="left-80 top-28 h-[80vh] w-[50vw]"
        fill="blue"
      />

      {/* Background mask */}
      <div
        className="absolute inset-0 pointer-events-none bg-black-100 dark:bg-black-100/[0.03] 
          [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center text-center">
          {/* Small heading */}
          <p className="uppercase tracking-widest text-xs text-blue-100 mb-1">
            Dynamic Web Magic with Next.js
          </p>

          {/* Main animated text */}
          <TextGenerateEffect
            words="Transforming Concepts into Seamless User Experiences"
            className="text-[40px] md:text-5xl lg:text-6xl font-bold mb-6 mt-1"
          />
 
          {/* Description */}
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi! I&apos;m Anika, a Full-Stack Web Developer specializing in Next.js,React , TypeScript, and PostgreSQL, focused on creating high-performance, user-centered digital experiences
          </p>

          {/* Button */}
          <a href="#about">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
