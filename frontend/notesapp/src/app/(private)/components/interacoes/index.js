"use client";

import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/api";

export default function Interacoes({ handleOpen }) {
  const [logoutOpen, setlogoutOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Erro ao sair:", error);
    },
  });

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
      className="flex flex-col gap-4 fixed right-10 bottom-20  items-center justify-center"
    >
      <motion.div
        initial={{
          scale: 0.8,
        }}
        whileInView={{
          scale: 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="flex flex-col items-center gap-4"
      >
        {logoutOpen && (
          <motion.button
            initial={{
              scale: 0,
              opacity: 0,
              originX: 0.5,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            className="cursor-pointer bg-[#141414] text-white py-2 px-4 rounded-md "
            onClick={() => mutation.mutate()}
          >
            Sair
          </motion.button>
        )}
        <motion.button
          tyoe="button"
          onClick={() => setlogoutOpen(!logoutOpen)}
          className="cursor-pointer flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
        >
          <motion.div
            className="flex items-center justify-center"
            initial={false}
            animate={{
              rotate: logoutOpen ? 180 : 0,
              scale: logoutOpen ? 0 : 1,
            }}
          >
            <GoGear size={24} color="black" />
          </motion.div>
          <motion.div
            className="absolute flex items-center justify-center"
            initial={false}
            animate={{
              rotate: logoutOpen ? 0 : 180,
              scale: logoutOpen ? 1 : 0,
            }}
          >
            <IoClose size={24} color="black" />
          </motion.div>
        </motion.button>
      </motion.div>
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          rotate: isHovered ? -2 : 0,
          translateY: isHovered ? -4 : 0,
          translateX: isHovered ? -2 : 0,
          scale: isHovered ? [1, 0.95, 1] : 1,
          backgroundColor: isHovered ? "#000000" : "#141414",
        }}
        transition={{
          duration: 0.2,
          rotate: {
            duration: 0.1,
          },
          scale: {
            duration: 0.4,
          },
          ease: "easeInOut",
        }}
        initial={false}
        onClick={() => handleOpen()}
        className="flex  items-center justify-center w-16 h-16 rounded-full bg-[#141414] cursor-pointer"
      >
        <FaPlus className="text-white" />
      </motion.button>
    </motion.div>
  );
}
