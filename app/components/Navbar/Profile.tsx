"use client";

import { AuthContext } from "@/app/providers/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import OpenMenu from "./OpenMenu";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).id !== "profile") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <div>
      <Image
        onClick={() => setMenuOpen(!menuOpen)}
        src={`/api/users/picture/${user?.id}`}
        alt={`Your Profile`}
        width={40}
        height={40}
        className={`object-cover rounded-full hover:scale-125 transition ${
          menuOpen ? "brightness-75 scale-125" : "brightness-100 scale-100"
        }`}
      />

      {menuOpen && <OpenMenu />}
    </div>
  );
};

export default Profile;
