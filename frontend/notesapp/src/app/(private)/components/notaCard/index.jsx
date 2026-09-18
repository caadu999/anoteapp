"use client";

import { FaTrash } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { RiStarOffFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NotaCard({ note, handleFavorite, handleDelete }) {
  const [isHovered, setIsHovered] = useState(false);
  const data = note.createdAt.replace(/-/g, " ").slice(0, 10);

  return (
    <motion.div
      initial={{
        scale: 0.8,
      }}
      whileInView={{
        scale: 1,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`flex flex-col justify-between text-[#141414]  gap-4 py-6 rounded-md  max-w-85 h-60 min-w-84 p-4 shadow-[0_8px_24px_rgba(149,157,165,0.2)]`}
      style={{ backgroundColor: note.color }}
      exit={{
        scale: 0,
      }}
    >
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between  pb-2 border-b border-gray-300 ">
          <h1 className="font-bold text-[1.1em]">{note.title}</h1>
          <motion.button
            onClick={() => handleDelete(note.cardId)}
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="cursor-pointer  p-2 rounded-full   ease-in-out"
          >
            <FaTrash className="text-gray-500 hover:text-[#141414] transition-colors duration-150 ease-in" />
          </motion.button>
        </div>
        <p>{note.description}</p>
      </div>
      <div className="flex justify-between">
        <div className="text-gray-500 flex self-baseline-last">
          <p className="flex items-center gap-2">
            <CiCalendar />
            {data}
          </p>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => handleFavorite(note.cardId)}
        >
          {note.favorite ? (
            <RiStarOffFill
              size={20}
              className="text-gray-500 hover:text-[#141414] transition-colors duration-150 ease-in "
            />
          ) : (
            <FaRegStar
              size={20}
              className="text-gray-500 hover:text-[#141414] transition-colors duration-150 ease-in"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
