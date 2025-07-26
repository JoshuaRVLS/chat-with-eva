"use client";
import { User } from "next-auth";
import { User as UserModel } from "../generated/prisma";
import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

type AuthContextData = {
  user?: User;
  status?: "loading" | "authenticated" | "unauthenticated";
};

export const AuthContext = createContext<AuthContextData>({});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AuthContextData>({});
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") setData({ user: session.user, status });
  }, [status]);

  return (
    <AuthContext.Provider value={data}>
      {status === "loading" ? null : children}
    </AuthContext.Provider>
  );
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}
