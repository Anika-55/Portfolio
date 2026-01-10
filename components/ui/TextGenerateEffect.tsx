"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    console.log(wordsArray);
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
  {wordsArray.map((word, idx) => {
    return (
      <motion.span
        key={word + idx}
        className={`
          opacity-0 
          ${idx > 3 
            ? "text-[#CBACF9]" 
            : "bg-gradient-to-r from-purple-400 via-blue-500 to-green-200 bg-clip-text text-transparent"
          }
        `}
      >
        {word}{" "}
      </motion.span>
    );
  })}
</motion.div>

    );
  };

  return (
    <div className={cn("font-bold", className)}>
      {/* mt-4 to my-4 */}
      <div className="my-4">
        {/* remove  text-2xl from the original */}
        <div className=" dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};