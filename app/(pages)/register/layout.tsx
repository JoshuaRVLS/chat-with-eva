import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
