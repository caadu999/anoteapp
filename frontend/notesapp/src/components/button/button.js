"use client";

import { motion, easeInOut } from "framer-motion";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function Button({ texto }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className="flex items-center  justify-center"
    >
      <motion.div
        className="flex text-white h-12 shrink-0 items-center justify-center cursor-pointer "
        animate={{
          width: isHover ? 0 : 48,
        }}
        transition={{
          duration: 0.25,
          ease: easeInOut,
        }}
      >
        <motion.div
          className="flex h-12 w-12 shrink-0 rotate-30 items-center justify-center rounded-full bg-[#080807]"
          animate={{
            scale: isHover ? 0 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: easeInOut,
          }}
        >
          <FaArrowUp size={18} />
        </motion.div>
      </motion.div>

      <motion.button
        type="submit"
        className="relative z-10 flex h-14 w-full shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#080807] p-2 pl-5 pr-5 text-[22px] font-bold md:h-13 md:text-[24px] lg:w-38 lg:text-[24px]"

        animate={{
          rotate: isHover ? -2 : 0,
          translateY: isHover ? -8 : 0,
          scale: isHover ? [1, 0.95, 1] : 1,
        }}
        transition={{
          duration: 0.1,
          rotate: {
            duration: 0.1,
          },
          scale: {
            duration: 0.4,
          },
          ease: easeInOut,
        }}
        initial={false}
      >
        <motion.p
          initial={false}
          className="absolute flex shrink-0 items-center text-white "
        >
          {texto}
        </motion.p>
      </motion.button>

      <motion.div
        className="flex h-12 shrink-0 items-center justify-center overflow-hidden"
        initial={{
          width: 0,
        }}
        animate={{
          width: isHover ? 48 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: easeInOut,
        }}
      >
        <motion.div
          className="flex h-12 w-12 shrink-0 cursor-pointer rotate-30 items-center justify-center rounded-full bg-[#080807]"
          initial={{
            scale: 0,
          }}
          animate={{
            scale: isHover ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            delay: isHover ? 0.05 : 0,
            ease: easeInOut,
          }}
        >
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: isHover ? 0 : 20,
              opacity: isHover ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
              delay: isHover ? 0.2 : 0,
            }}
          >
            <FaArrowUp size={18} color="white" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
