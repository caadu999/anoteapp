"use client";

import { useState } from "react";
import Forms from "./form";
import { motion, AnimatePresence } from "framer-motion";
import PrivatePainel from "./PrivatePainel";
import NotaCard from "@/app/(private)/components/notaCard";
import Button from "@/components/button/button";
import { getNotes, getUser, deleteNote, toggleFavorite } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Cortina from "@/components/Cortina";
import Interacoes from "@/app/(private)/components/interacoes";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: notas = [],
    isLoading: isLoadingNotas,
    isError: isErrorNotas,
    error: notasError,
  } = useQuery({
    queryKey: ["notas"],
    queryFn: () => getNotes(),
  });

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notas"]);
      setOpenForm(false);
    },
    onError: (error) => {
      console.error("Erro ao deletar nota", error);
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(["notas"]);
    },
    onError: (error) => {
      console.error("Erro ao favoritar nota", error);
    },
  });

  if (isLoadingNotas || isLoadingUser)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Carregando...
      </div>
    );
  if (isErrorNotas) return <div>{notasError.message}</div>;
  if (userError) return <div>Erro ao carregar usuário</div>;

  function handleOpen() {
    setOpenForm(!openForm);
  }

  return (
    <>
      <Cortina />
      <main className="flex flex-col md:flex-row w-full min-h-screen items-center gap-4 p-6 2xl:p-8 overflow-hidden  bg-[#F7F6F6]">
        <div className="hidden md:flex gap-1 h-full shadow-[0_8px_24px_rgba(149,157,165,0.2)] ">
          <PrivatePainel
            handleFavorite={(cardId) => favoriteMutation.mutate(cardId)}
            handleDelete={(cardId) => deleteMutation.mutate(cardId)}
          />
        </div>

        <div className="flex flex-col w-full relative min-w-0 p-6 gap-7 overflow-y-scroll custom-scrollbar bg-white shadow-[0_8px_24px_rgba(149,157,165,0.2)] rounded-lg h-full flex-1">
          <h1 className="font-extrabold absolute text-[#141414] self-end text-3xl select-none">
            anote.
          </h1>
          <div
            className="flex shrink-0 flex-col mb-4 mt-12 gap-4 items-start justify-center   "
            style={{ display: notes.length === 0 ? "none" : "flex" }}
          >
            <h1 className="font-bold text-6xl">Olá, {user?.name}!</h1>
            <p className="text-gray-500 text-[1.3em]">Aqui estão suas notas</p>
          </div>

          {notas.length === 0 ? (
            <div className=" flex flex-col h-full items-center gap-6 w-full justify-center">
              <h1 className="font-extrabold  text-center text-6xl text-[#141414]">
                Olá,{" "}
                <span className="relative">
                  {user.name}!{" "}
                  <svg
                    className="absolute top-0 -left-4"
                    width="298"
                    height="84"
                    viewBox="0 0 298 84"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      initial={{
                        pathLength: 0,
                      }}
                      whileInView={{
                        pathLength: 1,
                      }}

                      transition={{
                        duration: 0.9,
                        ease: "easeInOut",
                      }}
                      d="M157.081 0.700081C138.248 3.20008 95.2814 9.40008 74.0814 14.2001C47.5814 20.2001 8.08139 33.7001 1.58139 51.2001C-4.91861 68.7001 24.5814 85.2001 88.5814 82.7001C152.581 80.2001 188.081 81.7001 249.081 70.7001C297.881 61.9001 300.081 45.3667 295.081 38.2001C291.915 33.3667 267.981 21.8001 197.581 14.2001C109.581 4.70008 62.0814 7.70008 44.0814 8.70008"
                      stroke="black"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    ></motion.path>
                  </svg>
                </span>
              </h1>
              <div className="text-gray-500 relative text-lg font-medium">
                Crie uma nota para começar
                <svg
                  className="absolute right-0"
                  width="81"
                  height="8"
                  viewBox="0 0 81 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    initial={{
                      pathLength: 0,
                    }}
                    whileInView={{
                      pathLength: 1,
                    }}

                    transition={{
                      delay: 0.2,
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    d="M0.0708618 2.53833C13.7097 1.1511 45.4511 -0.791027 63.3057 2.53833C81.1602 5.86769 81.2842 6.70002 79.1144 6.70002"
                    stroke="black"
                    strokeWidth="1.4"
                  ></motion.path>
                </svg>
              </div>
              <div
                onClick={() => setOpenForm(!openForm)}
                className="flex relative flex-col gap-4"
              >
                <Button texto="Criar" />
              </div>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                exit={{
                  scale: 0,
                }}
                className="grid grid-cols-[repeat(auto-fit,minmax(280px,340px))]  w-full md:justify-start justify-center gap-6  pb-8"
              >
                <AnimatePresence>
                  {notas.map((note) => (
                    <NotaCard
                      key={note.cardId}
                      note={note}

                      handleFavorite={() =>
                        favoriteMutation.mutate(note.cardId)
                      }
                      handleDelete={() => deleteMutation.mutate(note.cardId)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          )}

          <Interacoes
            handleOpen={handleOpen}
            openForm={openForm}
            setOpenForm={setOpenForm}
          />
        </div>

        <AnimatePresence>
          {openForm && (
            <Forms
              setOpenForm={setOpenForm}
              onNotaCriada={(novaNota) =>
                setNotes((prev) => [...prev, novaNota])
              }
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
