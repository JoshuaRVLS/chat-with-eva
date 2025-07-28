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
    <div className="nav">
      <Link
        href="/"
        className="font-bitcount text-3xl font-normal tracking-widest text-primary-text"
      >
        JChatAI<sup>BETA</sup>
      </Link>
      {/* <Search /> */}
      {user ? (
        <AuthenticatedMenu />
      ) : (
        <Link href="/register" className="btn-outline">
          Sign Up
        </Link>
      )}
    </div>
  );
};

export default Navbar;
