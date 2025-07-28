import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
