"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Forms from "./form";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import PrivatePainel from "./PrivatePainel";
import NotaCard from "@/app/(private)/components/notaCard";
import Cortina from "@/components/Cortina";
import Image from "next/image";
import { GoGear } from "react-icons/go";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const router = useRouter();
  const [userName, setUserName] = useState("null");
  const [isHovered, setIsHovered] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [logoutOpen, setlogoutOpen] = useState(false);

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("DASHBOARD - TOKEN:", token);

    if (!token) {
      console.log("REDIRECIONANDO PARA / PORQUE NÃO TEM TOKEN");
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3008/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Erro:", data.error);
        return;
      }

      setUserName(data.name);
    }

    getUser();
  }, []);

  useEffect(() => {
    async function getNotes() {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch("http://localhost:3008/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.log("Erro:", data.error);
          return;
        }

        setNotes(data);
      } catch (error) {
        console.error("Erro ao buscar notas:", error);
      }
    }

    getNotes();
  }, []);

  useEffect(() => {
    async function getFavorites() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3008/api/notes/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();

        if (!response.ok) {
          console.log("Erro:", data.error);
          return;
        }
        setFavorites(data);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    }

    getFavorites();
  }, []);

  async function handleToggle(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3008/api/notes/${id}/favorites/toggle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const notaAtualizada = await response.json();

      if (!response.ok) {
        console.log("Erro:", notaAtualizada.error);
        return;
      }
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? notaAtualizada : note)),
      );

      setFavorites((prevFavorites) => {
        if (notaAtualizada.favorite) {
          return [...prevFavorites, notaAtualizada];
        }

        return prevFavorites.filter((favorite) => favorite._id !== id);
      });
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
    }
  }

  async function handleDelete(id) {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:3008/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite._id !== id),
      );
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
    }
  }

  return (
    <>
      <Cortina />
      <main className="flex w-full min-h-screen items-center gap-4 p-5 overflow-hidden  bg-[#F7F6F6]">
        <div className="flex gap-1 h-full shadow-[0_8px_24px_rgba(149,157,165,0.2)] ">
          <PrivatePainel
            favorites={favorites}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            setFavorites={setFavorites}
          />
        </div>

        <div className="flex flex-col relative min-w-0 p-6 gap-7 overflow-y-scroll custom-scrollbar bg-white shadow-[0_8px_24px_rgba(149,157,165,0.2)] rounded-lg h-full flex-1">
          <h1 className="font-extrabold absolute text-[#141414] self-end text-3xl select-none">
            anote.
          </h1>
          <div
            className="flex shrink-0 flex-col mb-4 mt-12 gap-4 items-start justify-center   "
            style={{ display: notes.length === 0 ? "none" : "flex" }}
          >
            <h1 className="font-bold text-6xl">Olá, {userName}!</h1>
            <p className="text-gray-500 text-[1.3em]">Aqui estão suas notas</p>
          </div>

          {notes.length === 0 ? (
            <div className=" flex flex-col h-full items-center gap-6 w-full justify-center">
              <h1 className="font-extrabold text-center text-6xl text-[#141414]">
                Olá, {userName}!
              </h1>
              <p className="text-gray-500 text-lg font-medium">
                Crie uma nota para começar
              </p>
              <div className="flex gap-4">
                <Image
                  priority
                  src={"/notess.png"}
                  alt="notes"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,340px))]  w-full justify-start gap-6  pb-8">
              {notes.map((note) => (
                <NotaCard
                  handleDelete={handleDelete}
                  handleToggle={handleToggle}
                  setNotes={setNotes}
                  key={note._id}
                  note={note}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              ))}
            </div>
          )}

          <div className="flex flex-col gap-4 fixed right-10 bottom-20  items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              {logoutOpen && (
                <motion.button
                  initial={{
                    scale: 0,
                    opacity: 0,
                    originX: 0.5,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  className="cursor-pointer bg-[#141414] text-white py-2 px-4 rounded-md "
                  onClick={() => handleLogOut()}
                >
                  Sair
                </motion.button>
              )}
              <button
                onClick={() => setlogoutOpen(!logoutOpen)}
                className="cursor-pointer flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
              >
                <GoGear size={24} />
              </button>
            </div>
            <motion.button
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={() => setOpenForm(!openForm)}
              className="flex  items-center justify-center w-16 h-16 rounded-full bg-[#141414] cursor-pointer"
              animate={{
                backgroundColor: isHovered ? "#000000" : "#141414",
              }}
            >
              <FaPlus className="text-white" />
            </motion.button>
          </div>
        </div>

        {openForm && (
          <Forms
            setOpenForm={setOpenForm}
            onNotaCriada={(novaNota) => setNotes((prev) => [...prev, novaNota])}
          />
        )}
      </main>
    </>
  );
}
