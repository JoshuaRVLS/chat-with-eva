"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Character, User } from "@/app/generated/prisma";
import CharacterCard from "../../CharacterCard/CharacterCard";
import Reveal from "../../Animations/Reveal";

const Characters = () => {
  const { isPending, error, data } = useQuery<
    (Character & {
      author: User;
      photo: { data: Uint8Array; mimetype: string; name: string };
    })[]
  >({
    queryKey: ["characters"],
    queryFn: () =>
      fetch("/api/characters").then((res) =>
        res.json().then((data) => data.data)
      ),
  });

  if (isPending) return <p className="text-center">Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Community Characters</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((character) => (
          <Reveal key={character.id}>
            <CharacterCard
              characterName={character.name}
              image={
                character.photo?.data
                  ? `data:${character.photo.mimetype};base64,${Buffer.from(
                      Object.values(character.photo.data)
                    ).toString("base64")}`
                  : null
              }
              characterId={character.id}
              characterBio={character.bio}
              authorName={character.author.username}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Characters;
