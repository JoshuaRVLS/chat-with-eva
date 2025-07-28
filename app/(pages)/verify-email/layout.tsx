import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify Email",
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
