import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Profile from "./Profile";

const AuthenticatedMenu = () => {
  return (
    <div className="flex gap-2 items-center">
      <Link className="rounded-full btn-outline" href={"/create_character"}>
        Create Character
      </Link>
      <Profile />
    </div>
  );
};

export default AuthenticatedMenu;
