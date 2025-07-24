"use client";

import { AuthContext } from "@/app/providers/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import Reveal from "../Animations/Reveal";
import { signOut } from "next-auth/react";
import Image from "next/image";

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

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

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
        className="object-cover rounded-full"
      />

      {menuOpen && (
        <Reveal direction="right">
          <div className="relative -z-10 select-none">
            <div className="absolute flex gap-2 min-w-36 top-2 right-0 w-fit p-4 border-borders bg-primary-background border font-light">
              <button className="btn-outline w-full" onClick={() => signOut()}>
                Sign Out
              </button>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
};

export default Profile;
