import React from "react";

// app/character/[id]/page.tsx
import { Metadata } from "next";
import CharacterView from "@/app/components/CharacterView/CharacterView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Fetch your data (this will be deduped with the same call in the Page component)
  const { data } = await fetch(
    `${process.env.NEXTAUTH_URL}/api/character-name/${(await params).id}`
  ).then((res) => res.json());

  return {
    title: `${data.name} | Character Profile`,
    description: data.bio,
    // other metadata...
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  return <CharacterView id={id} />;
};

export default page;
