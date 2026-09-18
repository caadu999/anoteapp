"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api";
import Button from "@/components/button/button";

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Erro no registro:", error);
    },
  });

  function onSubmit(data) {
    const { confirmPassword, ...payload } = data;
    mutation.mutate(payload);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className=" bg-transparent  w-120  p-6 rounded-sm gap-8 flex flex-col justify-start items-start"
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

        <div className="flex w-full justify-center">
          <Button texto="Cadastrar" />
        </div>
      </form>
    </div>
  );
}
