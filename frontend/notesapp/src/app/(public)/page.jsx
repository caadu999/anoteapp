"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion, easeInOut } from "framer-motion";
import Cadastro from "./cadastro";
import Login from "./login";
import Link from "next/link";
import Socials from "@/components/socials";
import { IoIosArrowBack } from "react-icons/io";
import image01 from "../../../public/001.png";
import Image from "next/image";
import Cortina from "@/components/Cortina";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  function handleLoginClick() {
    setOpenLogin(!openLogin);
  }

  return (
    <>
      <Cortina />
      <div className="flex relative h-full p-6 w-full flex-1 z-10  items-center justify-center font-sans text-[#141414] ">
        <Link
          href="/"
          className="font-extrabold z-10 absolute left-14 select-none cursor-pointer  top-14 text-4xl "
        >
          anote.
        </Link>

        <div className="hidden lg:flex w-[50%] h-full  relative overflow-x-hidden rounded-lg border-none  p-20 flex-col  justify-between">
          <div className="z-0 absolute w-full h-full inset-0 bg-black">
            <Image
              src={image01}
              fill
              alt="image01"
              placeholder="blur"
              quality={70}
              priority
            ></Image>
          </div>
          <div className="flex h-full z-10 justify-end flex-col gap-6">
            <div className="w-10 h-2 bg-[#141414] ml-1 rounded-full"></div>

            <h2 className="text-6xl font-bold">
              Suas ideias, <br />
              organizadas.
            </h2>
            <p className="text-lg text-white">
              Crie, favorite e compartilhe suas notas <br /> com facilidade
            </p>
            <Socials />
          </div>
        </div>
        <div className="flex w-[50%]  flex-col items-center justify-center">
          {" "}
          {openLogin ? (
            <div className="text-md fixed right-14 text-gray-500 top-10 gap-2 flex mb-4 ">
              <div className="flex gap-2 items-center">
                <IoIosArrowBack />
                Voltar para
              </div>
              <div
                onClick={() => handleLoginClick()}
                className="font-bold text-black relative cursor-pointer "
              >
                <motion.p
                  onHoverStart={() => setIsHover(true)}
                  onHoverEnd={() => setIsHover(false)}
                >
                  Cadastro
                </motion.p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isHover ? "100%" : 0 }}
                  transition={{ duration: 0.3, ease: easeInOut }}

                  className="absolute bottom-0 left-0 w-full h-0.5 bg-black"
                ></motion.div>
              </div>
            </div>
          ) : (
            <div className="text-md fixed right-14 text-gray-500 top-10 gap-2 flex mb-4 ">
              Já tem uma conta?
              <div
                onClick={() => handleLoginClick()}
                className="font-bold text-black relative cursor-pointer "
              >
                <motion.p
                  onHoverStart={() => setIsHover(true)}
                  onHoverEnd={() => setIsHover(false)}
                >
                  Login
                </motion.p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isHover ? "100%" : 0 }}
                  transition={{ duration: 0.3, ease: easeInOut }}

                  className="absolute bottom-0 left-0 w-full h-0.5 bg-black"
                ></motion.div>
              </div>
            </div>
          )}
          {openLogin ? <Login /> : <Cadastro />}
        </div>
      </div>
      <svg
        className="absolute inset-0 z-0 w-full h-full"

        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-300 117.535 C283.761 23.2019 853.142 -55.3912 710.261 195.035 C570.761 439.535 461.261 750.19 689.761 723.035 C966.261 690.176 1057.76 435.035 1539.76 401.035"

          stroke="white"
          strokeWidth="54"
        ></path>
      </svg>
    </>
  );
}
