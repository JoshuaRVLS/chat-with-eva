import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Character",
  description: "Create Character",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
