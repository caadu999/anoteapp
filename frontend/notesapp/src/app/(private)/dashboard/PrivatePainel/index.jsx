import NotaCard from "@/app/(private)/components/notaCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/lib/api";
export default function PrivatePainel({ handleFavorite, handleDelete }) {
  const {
    data: favs = [],
    isLoading: isLoadingFavorites,
    isError: isErrorFavorites,
    error: favoritesError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getFavorites(),
  });

  if (isLoadingFavorites) return <div>Carregando...</div>;
  if (isErrorFavorites) return <div>{favoritesError.message}</div>;
  if (favoritesError) return <div>Erro ao carregar usuário</div>;
  return (
    <div className="flex items-center justify-center h-full w-full overflow-hidden rounded-lg">
      <div className=" h-full items-center w-96 2xl:w-100 flex flex-col gap-2 overflow-y-scroll custom-scrollbar bg-white ">
        <div className="flex items-center pl-4 pr-2 py-10 justify-between   w-full">
          <h1 className="font-bold flex items-center gap-3 text-[1.3em] text-[#141414] ">
            <FaRegStar size={24} /> Favoritos
          </h1>
          <div className="bg-[#CBE3FD] font-bold text-sm text-[#365681] p-4 rounded-full w-8 h-1 flex items-center justify-center">
            {favs.length}
          </div>
        </div>
        <motion.div className="flex mb-8 items-center  flex-col gap-6 w-full ">
          <AnimatePresence>
            {favs.map((note) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.18,
                  ease: "easeInOut",
                }}
                key={note.cardId}
              >
                <NotaCard
                  note={note}
                  handleFavorite={() => handleFavorite(note.cardId)}
                  handleDelete={() => handleDelete(note.cardId)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
