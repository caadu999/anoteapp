"use client";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";

export default function Cortina() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setIsLeaving(true), 1800);
    const removeTimer = setTimeout(() => setShowIntro(false), 2300);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!showIntro) return null;

  const texto = "anote.";
  const textoArray = texto.split("");
  console.log(textoArray);

  return (
    <motion.div
      initial={{
        clipPath: "inset(0 0 0% 0)",
      }}

      animate={{
        clipPath: isLeaving ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
      }}

      transition={{
        ease: [0.76, 0, 0.24, 1],
        duration: 0.5,
      }}

      className="fixed inset-0 flex justify-center items-center bg-[#141414] z-50"
    >
      <motion.div
        className="text-6xl font-extrabold text-white"
        initial={{
          opacity: 0,
          y: 16,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.6,
        }}
      >
        {textoArray.map((letra, index) => (
          <motion.p
            className="inline-block"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: index * 0.15,
              duration: 0.18,
            }}

            key={index}
          >
            {letra}{" "}
          </motion.p>
        ))}
      </motion.div>
    </motion.div>
  );
}
