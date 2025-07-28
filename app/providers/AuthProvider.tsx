"use client";
import { User } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextData = {
  user?: User;
  status: "loading" | "authenticated" | "unauthenticated";
};

export const AuthContext = createContext<AuthContextData>({
  status: "loading",
});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [contextValue, setContextValue] = useState<AuthContextData>({
    status: "loading",
  });

  useEffect(() => {
    setContextValue({
      user: session?.user,
      status: status,
    });
  }, [session, status]);

  return (
    <AuthContext.Provider value={contextValue}>
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
