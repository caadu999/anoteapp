import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion, easeInOut } from "framer-motion";


export default function Cadastro() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleCadastro(data) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.error || "Erro ao cadastrar");
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userId);

      router.replace("/dashboard");
      console.log("Cadastro Realizado:", result);
    } catch (erorr) {
      console.error("Erro", erorr);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleCadastro)}
        action=""
        className=" bg-[#FAF8FC]  w-120  p-6 rounded-sm gap-8 flex flex-col justify-start items-start"
      >
        <div className="flex flex-col w-full gap-4">
          <h1 className="font-bold text-4xl">Bem-vindo!</h1>
          <p className="text-gray-500 font-medium">
            Acesse suas notas de qualquer lugar <br />e mantenha tudo em
            perfeito fluxo
          </p>
        </div>
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="name">Nome</label>
          <input
            {...register("name", { required: "O nome é obrigatório" })}

            placeholder="seu nome"
            type="text"
            name="name"
            id="name"
            className="bg-white border pl-4 border-gray-300 rounded-md p-2 focus:border focus:border-[#141414] outline-none ease-in delay-100   duration-150"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: "Email é obrigatório" })}
            placeholder="seu@email.com"
            type="email"
            name="email"
            id="email"
            className="bg-white border pl-4 border-gray-300 rounded-md p-2 transition-all focus:border focus:border-[#141414] outline-none ease-in delay-100   duration-150"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="password">Senha</label>
          <input
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
            placeholder="••••••••"
            className="bg-white  border border-gray-300 pl-4 rounded-md p-2 focus:border focus:border-[#141414] outline-none ease-in delay-100   duration-150"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            {...register("confirmPassword", {
              required: "Confirme sua senha",
              validate: (value) =>
                value === watch("password") || "As senhas não conferem",
            })}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="••••••••"
            className="bg-white border border-gray-300 pl-4 rounded-md p-2 focus:border focus:border-[#141414] outline-none ease-in delay-100   duration-150"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

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
            Cadastrar
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
            Cadastrar
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
