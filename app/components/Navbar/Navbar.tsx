"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/app/providers/AuthProvider";
import AuthenticatedMenu from "./AuthenticatedMenu";
import Link from "next/link";
import Reveal from "../Animations/Reveal";
import Search from "./Search";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <Reveal direction="down">
      <div className="nav">
        <h1 className="font-bitcount font-normal tracking-widest text-primary-text">
          JChatAI
        </h1>
        <Search />
        {user ? (
          <AuthenticatedMenu />
        ) : (
          <Link href="/register" className="btn-outline">
            Sign Up
          </Link>
        )}
      </div>
    </Reveal>
  );
};

export default Navbar;
