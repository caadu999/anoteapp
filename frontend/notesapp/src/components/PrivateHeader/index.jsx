"use client";

import { FaPlus } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function PrivateHeader() {
  const [logoutOpen, setlogoutOpen] = useState(false);
  const router = useRouter();

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/");
  }

  return (
    <header className="flex relative   flex-col items-center justify-between bg-white rounded-lg h-full  w-28 py-10">
      <div className="flex flex-col items-center gap-8 ">
        <h1 className="text-[20px] font-bold">anote.</h1>
        <button className="flex items-center justify-center  cursor-pointer">
          <FaUserCircle color="gray" size={52} />
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
        {logoutOpen && (
          <button
            className="cursor-pointer bg-gray-600 text-white py-2 px-4 rounded-md "
            onClick={() => handleLogOut()}
          >
            Sair
          </button>
        )}
        <button
          onClick={() => setlogoutOpen(!logoutOpen)}
          className="cursor-pointer"
        >
          <FaGear className="text-gray-500" size={24} />
        </button>
      </div>
    </header>
  );
}
