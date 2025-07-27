"use client";

import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Reveal from "../components/Animations/Reveal";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = useCallback(
    async (e: FormEvent) => {
      setLoading(true);
      e.preventDefault();
      try {
        const response = await signIn("credentials", {
          redirect: false,
          username,
          password,
          callbackUrl: "/",
        });

        if (response?.error) {
          toast.error(response.error);
        }

        if (response?.ok) {
          toast.success("Login Success");
          router.push("/");
        }

        router.push("/");
      } catch (error) {
        console.log(error);
        toast.error("An unexpected error occurred");
      }
      setLoading(false);
    },
    [username, password]
  );

  return (
    <div className="center">
      <Reveal>
        <form onSubmit={login} className="form">
          <h1 className="title">LOGIN</h1>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="input"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="input"
          />
          <button
            disabled={loading}
            type="submit"
            className={`btn ${loading && "opacity-70"}`}
          >
            {!loading ? "Login" : "Verifiying..."}
          </button>
          <Link href="/register" className="link">
            Register
          </Link>
        </form>
      </Reveal>
    </div>
  );
}
