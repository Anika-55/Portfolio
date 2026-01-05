"use client";

import { motion } from "framer-motion";
import { FaProjectDiagram } from "react-icons/fa";
import {
  SiReact, SiJavascript, SiNextdotjs, SiNodedotjs, SiExpress,
  SiMongodb, SiPostgresql, SiPrisma, SiTypescript,
  SiTailwindcss,
  SiFirebase
} from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Prisma ORM", icon: SiPrisma },
    { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Firebase Auth", icon: SiFirebase },
  { name: "System Design", icon: FaProjectDiagram},
];

export default function SkillGalaxy() {
  return (
    <section className="min-h-screen bg-black text-white py-32 px-6 relative overflow-hidden mb-29">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,200,0.15),transparent_70%)]" />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-5xl font-bold mb-20"
      >
        My <span className="text-green-400">Tech Galaxy</span>
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12, scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-green-400/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition" />

              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-10 flex flex-col items-center space-y-4">
                <Icon className="text-5xl text-green-400" />
                <p className="text-sm tracking-widest text-gray-300 uppercase">
                  {skill.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
