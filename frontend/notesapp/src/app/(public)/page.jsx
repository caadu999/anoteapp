"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion, easeInOut } from "framer-motion";
import Cadastro from "./cadastro";
import Login from "./login";
import Cortina from "@/components/Cortina";
import Link from "next/link";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <>
      <Cortina />
      <div className="flex relative h-full p-6 w-full flex-1  items-center justify-center font-sans text-[#141414] ">
        <Link
          href="/"
          className="font-extrabold absolute left-14 select-none cursor-pointer  top-14 text-4xl "
        >
          anote.
        </Link>

        <div className="flex w-[50%] h-full  bg-cover rounded-lg bg-no-repeat border-none  bg-[url('/001.png')]  p-20 flex-col  justify-between">
          <div className="flex h-full justify-end flex-col gap-6">
            <div className="w-10 h-2 bg-[#141414] ml-1 rounded-full"></div>

            <h2 className="text-6xl font-bold">
              Suas ideias, <br />
              organizadas.
            </h2>
            <p className="text-lg text-white">
              Crie, favorite e compartilhe suas notas <br /> com facilidade
            </p>
          </div>
        </div>
        <div className="flex w-[50%]  flex-col items-center justify-center">
          <div className="text-md fixed right-14 text-gray-500 top-10 gap-2 flex mb-4 ">
            Já tem uma conta?
            <div
              onClick={() => setOpenLogin(!openLogin)}
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
          {openLogin ? <Login /> : <Cadastro />}
        </div>
      </div>
    </>
  );
}
