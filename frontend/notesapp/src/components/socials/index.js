"use client";
import { motion, easeInOut } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useState } from "react";

export default function Socials() {
  const links = [
    {
      id: 1,
      icon: <FaGithub size={26} />,
      link: "https://github.com/caadu999",
    },
    {
      id: 2,
      icon: <FaLinkedin size={26} />,
      link: "https://www.linkedin.com/in/eduardosdev/",
    },
    {
      id: 3,
      icon: <IoMdMail size={26} />,
      link: "mailto:carlossouza.ems@gmail.com",
    },
  ];

  const [isHover, setIsHover] = useState(false);
  const [id, setId] = useState(0);

  function handleHover() {
    setIsHover(!isHover);
  }

  function handleMouseEnter(id) {
    setIsHover(true);
    setId(id);
  }
  function handleMouseLeave() {
    setIsHover(false);
    setId(0);
  }

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <motion.a
          href={link.link}
          key={link.link}
          onMouseEnter={() => handleMouseEnter(link.id)}
          onMouseLeave={() => setIsHover(false)}
          animate={{
            rotate: id === link.id && isHover ? -2 : 0,
            translateY: id === link.id && isHover ? -6 : 0,
            translateX: id === link.id && isHover ? -2 : 0,
            scale: id === link.id && isHover ? [1, 0.95, 1] : 1,
          }}
          transition={{
            duration: 0.2,
            rotate: {
              duration: 0.1,
            },
            scale: {
              duration: 0.4,
            },
            ease: easeInOut,
          }}
          initial={false}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center cursor-pointer "
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  );
}
