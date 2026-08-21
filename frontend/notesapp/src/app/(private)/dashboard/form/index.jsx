import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Forms({ onNotaCriada, setOpenForm }) {
  const { register, handleSubmit, setValue } = useForm();
  const [isHover, setIsHover] = useState(false);
  const token = localStorage.getItem("token");
  const [selectedColor, setSelectedColor] = useState("#E8E3FF");
  const colors = [
    "#E8E3FF",
    "#FFE1F0",
    "#DDF5E5",
    "#FFF3C4",
    "#FFE1D5",
    "#E5E7EB",
  ];

  async function handleCriar(data) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("erro:", result);
        return;
      }

      console.log("Criado com sucesso:", result);
      onNotaCriada(result);
      setOpenForm(false);
    } catch (erorr) {
      console.error("Erro", erorr);
    }
  }

  return (
    <motion.div className="flex items-center bg-black/20 backdrop-blur-[20px] backdrop-brightness-75 fixed inset-0 h-screen w-full justify-center">
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
        className="flex relative items-center bg-white p-8 rounded-md justify-center flex-col gap-6"
        onSubmit={handleSubmit(handleCriar)}
      >
        <h1 className="text-2xl font-bold self-start">Criar nova nota</h1>
        <button
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
            {...register("title")}
            type="text"
            name="title"
            id="title"
            placeholder="Escreva aqui..."
          />
        </div>
        <div className="flex flex-col self-start gap-2 ">
          <label htmlFor="description" className="font-bold text-md w-fit">
            Descrição
          </label>
          <textarea
            className="bg-white border border-gray-300 h-32 w-86 p-2 pl-4 rounded-md focus:border focus:border-[#141414] outline-none ease-in  duration-100"
            {...register("description")}
            type="text"
            name="description"
            id="description"
            placeholder="Escreva aqui..."
          />
        </div>
        <div className="flex gap-3">
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
        <div className="flex gap-6 items-right self-end">
          <button onClick={() => setOpenForm(false)} className="cursor-pointer">
            Cancelar
          </button>
          <motion.button
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            className="bg-[#242424] z-50 relative overflow-hidden w-40 h-10 text-white cursor-pointer p-2 rounded-lg"
            type="submit"
          >
            <p className=" absolute inset-0 flex items-center justify-center z-10">
              Criar Nota
            </p>
            <motion.div
              animate={{
                y: isHover ? "0%" : "100%",
                scale: isHover ? 12 : 1,
              }}
              initial={false}
              transition={{
                duration: 0.3,
              }}
              className="absolute z-0 bottom-0 left-0  h-10 w-10 rounded-full bg-[#141414]"
            ></motion.div>
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}
