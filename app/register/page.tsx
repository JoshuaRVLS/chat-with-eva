"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Reveal from "../components/Animations/Reveal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (password !== confirmPassword) {
      if (!error) {
        setError("Password doesn't match");
      }
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  const register = useCallback(
    async (e: FormEvent) => {
      setLoading(true);
      e.preventDefault();

      try {
        const response = await fetch("/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          setLoading(false);
          return toast.error(data.message);
        }

        toast.success(data.message);

        router.push("/login");
      } catch (error) {
        if (error instanceof Error) {
          setLoading(false);
          toast.error(error.message);
        }
        toast.error("An unexpected error occurred");
      }
      setLoading(false);
    },
    [username, email, password, confirmPassword]
  );

  return (
    <div className="center">
      <Reveal>
        <form onSubmit={register} className="form">
          <h1 className="title">REGISTER</h1>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="input"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            className="input"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="input"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="confirm password"
            className="input"
          />
          <span className={`error ${!error ? "opacity-0" : "opacity-100"}`}>
            {error}
          </span>
          <button
            disabled={loading}
            type="submit"
            className={`btn ${loading && "opacity-70"}`}
          >
            {!loading ? "Register" : "Verifying..."}
          </button>
          <Link href="/login" className="link">
            Login
          </Link>
        </form>
      </Reveal>
    </div>
  );
}
