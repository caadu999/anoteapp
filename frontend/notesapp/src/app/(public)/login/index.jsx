"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api";
import Button from "@/components/button/button";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <h1 className="font-bold text-4xl">Bem-vindo de volta!</h1>
      <form
        onSubmit={handleSubmit(mutation.mutate)}
        className=" bg-transparent  w-120  p-6 rounded-sm gap-8 flex flex-col justify-start items-start"
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
        <div className="flex items-center justify-center w-full">
          <Button texto={"Entrar"} />
        </div>
      </form>
    </div>
  );
}
