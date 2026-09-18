"use client";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";

export default function Cortina() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setIsLeaving(true), 400);
    const removeTimer = setTimeout(() => setShowIntro(false), 900);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!showIntro) return null;

  const texto = "anote.";
  const textoArray = texto.split("");

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

      className="fixed inset-0 flex w-full h-screen justify-center items-center bg-white z-50"
    ></motion.div>
  );
}
