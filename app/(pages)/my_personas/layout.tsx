import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Personas",
  description: "My Personas",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
