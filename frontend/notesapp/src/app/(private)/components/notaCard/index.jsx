"use client";

import { FaTrash } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { RiStarOffFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NotaCard({ note, handleToggle, handleDelete }) {
  const [isHovered, setIsHovered] = useState(false);
  const data = note.date.replace(/-/g, " ").slice(0, 10);

  return (
    <div>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`flex flex-col justify-between  gap-4 py-6 rounded-md  max-w-85 h-60 min-w-0 p-4 shadow-[0_8px_24px_rgba(149,157,165,0.2)]`}
        style={{ backgroundColor: note.color }}
      >
        <div className="flex flex-col gap-4 ">
          <div className="flex justify-between  pb-2 border-b border-gray-300 ">
            <h1 className="font-bold text-[1.1em]">{note.title}</h1>
            <motion.button
              onClick={() => handleDelete(note._id)}
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
            onClick={() => handleToggle(note._id)}
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
    </div>
  );
}
