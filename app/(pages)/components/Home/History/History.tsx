"use client";

import {
  Character,
  CharacterImage,
  Chat,
  Message,
  User,
} from "@/app/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import CharacterCard from "../../CharacterCard/CharacterCard";
import Link from "next/link";
import { AuthContext } from "@/app/(pages)/providers/AuthProvider";
import Reveal from "../../Animations/Reveal";

const History = () => {
  const { user } = useContext(AuthContext);
  const { isPending, data, error } = useQuery<
    (Chat & {
      character: Character & { photo: CharacterImage; author: User };
      messages: Message[];
    })[]
  >({
    queryKey: ["chatsHistory"],
    queryFn: () =>
      fetch(`/api/history/${user?.id}`).then((res) =>
        res.json().then((data) => data.data)
      ),
    enabled: !!user?.id,
  });

  if (isPending) return <p></p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div
      className={`" flex flex-col gap-4 mb-12 h-full w-full ${
        !data.length && "hidden"
      }`}
    >
      <h1 className="text-3xl">Continue Chat</h1>
      <span className="hidden lg:block font-light text-gray-400">
        Pencet shift terus scroll untuk scroll ke kanan/kiri.
      </span>
      <div className="flex w-full gap-3 overflow-auto">
        {data.map((chat) => (
          <div
            className="flex flex-col w-full min-w-full md:min-w-auto md:max-w-56 lg:max-w-72 gap-1"
            key={chat.id}
          >
            <Reveal>
              <CharacterCard
                className="history-card"
                authorName={chat.character.author.username}
                characterBio={chat.character.bio}
                characterName={chat.character.name}
                characterId={chat.character.id}
                image={
                  chat.character.photo?.data
                    ? `data:${
                        chat.character.photo.mimetype
                      };base64,${Buffer.from(
                        Object.values(chat.character.photo.data)
                      ).toString("base64")}`
                    : null
                }
              />
            </Reveal>

            <Link
              href={`/chat/${chat.id}`}
              className="btn-outline w-full text-center font-bitcount"
            >
              Continue
            </Link>
            <span className="text-md text-center p-2">
              {chat.messages.length} Messages
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
