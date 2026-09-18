"use client";

import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/button/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

export default function Forms({ onNotaCriada, setOpenForm }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isHover, setIsHover] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#E8E3FF");
  const colors = [
    "#E8E3FF",
    "#FFE1F0",
    "#DDF5E5",
    "#FFF3C4",
    "#FFE1D5",
    "#E5E7EB",
  ];
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      setOpenForm(false);
    },
    onError: (error) => {
      console.error("Erro ao criar nota", error);
    },
  });

  return (
    <motion.div className="flex items-center z-9999 bg-black/20 text-[#141414] backdrop-blur-[20px] backdrop-brightness-75 fixed inset-0 h-screen w-full justify-center">
      <motion.form
        initial={{
          opacity: 0,
          scale: 0.5,
          originX: 0.5,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.5,
          originX: 0.5,
        }}
        className="flex relative items-center bg-white p-8 rounded-md justify-center flex-col gap-6"
        onSubmit={handleSubmit(mutation.mutate)}
      >
        <h1 className="text-2xl font-bold self-start">Criar nova nota</h1>
        <button
          type="button"
          onClick={() => setOpenForm(false)}
          className="flex absolute right-4 top-4 self-end  cursor-pointer"
        >
          <IoClose size={24} color="gray" />
        </button>
        <div className="flex flex-col self-start gap-2 w-86 ">
          <label htmlFor="title" className="font-bold w-fit text-md">
            Título
          </label>
          <input
            className="bg-white border border-gray-300 p-2 pl-4 rounded-md focus:border focus:border-[#141414] outline-none ease-in    duration-100"
            {...register("title", {
              required: "O título é obrigatorio",
              maxLength: {
                value: 20,
                message: "O título não pode passar de 20 caracteres.",
              },
            })}
            type="text"
            name="title"
            id="title"
            placeholder="Escreva aqui..."
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>
        <div className="flex flex-col self-start gap-2 ">
          <label htmlFor="description" className="font-bold text-md w-fit">
            Descrição
          </label>
          <textarea
            className="bg-white border border-gray-300 h-32 w-86 p-2 pl-4 rounded-md focus:border focus:border-[#141414] outline-none ease-in  duration-100"
            {...register("description", {
              required: "A descrição é obrigatoria",
              maxLength: {
                value: 100,
                message: "A mensagem não pode passar de 100 caracteres.",
              },
            })}
            type="text"
            name="description"
            id="description"
            placeholder="Escreva aqui..."
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="flex mt-2 gap-3">
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => {
                setSelectedColor(color);
                setValue("color", color);
              }}
              style={{ backgroundColor: color }}
              className={`w-8 h-8 rounded-full cursor-pointer transition-colors duration-100 border border-gray-300 ${selectedColor === color ? "border-2 border-gray-500 " : ""}`}
            />
          ))}
        </div>
        <div className="flex my-4 items-center justify-center">
          <Button texto="Criar" />
        </div>
      </motion.form>
    </motion.div>
  );
}
