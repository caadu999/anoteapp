"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, easeInOut } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        console.log("Erro:", result.error);
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userId);

      console.log("Login realizado:", result);

      router.replace("/dashboard");
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
    }
  }

  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <h1 className="font-bold text-4xl">Bem-vindo de volta!</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-[#FAF8FC]  w-120  p-6 rounded-sm gap-8 flex flex-col justify-start items-start"
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="w-fit">
            Email
          </label>
          <input
            {...register("email", { required: "Email é obrigatório" })}
            type="email"
            name="email"
            id="email"
            placeholder="seu@email.com"
            className="bg-white w-full border border-gray-300 rounded-md p-2 focus:border focus:border-[#141414] outline-none ease-in delay-100   duration-150"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="w-fit">
            Senha
          </label>
          <input
            placeholder="••••••••"
            className="bg-white w-full border border-gray-300 rounded-md p-2 focus:border focus:border-[#141414] outline-none ease-in delay-100   duration-150"
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 8,
                message: "A senha precisa ter no mínimo 8 caracteres ",
              },
            })}
            type="password"
            name="password"
            id="password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <motion.button
          type="submit"
          className={`relative cursor-pointer flex h-14 w-full items-center justify-center gap-4 overflow-hidden rounded-full border-[1.9px] border-solid border-[#CACACA] bg-[#080807] p-2 pl-5 pr-5 text-[20px] font-[700] transition-all duration-200 ease-in md:h-12 md:rounded-md md:text-[20px] lg:w-full lg:text-[20px] `}
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          whileHover={{
            backgroundColor: "#181818",
          }}
          initial={false}
        >
          <motion.p
            initial={false}
            animate={{
              y: isHover ? "-120%" : 0,
            }}
            transition={{
              duration: 0.3,
              ease: easeInOut,
            }}
            className="absolute flex shrink-0 items-center text-[#cacaca]"
          >
            Entrar
          </motion.p>
          <motion.p
            initial={false}
            animate={{
              y: isHover ? 0 : "120%",
            }}
            transition={{
              duration: 0.28,
              ease: easeInOut,
            }}
            className="absolute z-30 flex shrink-0 items-center text-[#cacaca]"
          >
            Entrar
          </motion.p>
          <motion.div
            animate={{
              y: isHover ? "0%" : "100%",
              scale: isHover ? 24 : 1,
            }}
            initial={false}
            transition={{
              duration: 0.3,
            }}
            className="absolute  bottom-0 left-0  h-10 w-10 rounded-full bg-[#2D2D2D]"
          ></motion.div>
        </motion.button>
      </form>
    </div>
  );
}
