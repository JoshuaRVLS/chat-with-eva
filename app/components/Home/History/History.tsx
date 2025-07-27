"use client";

import {
  Character,
  CharacterImage,
  Chat,
  Message,
  User,
} from "@/app/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CharacterCard from "../../CharacterCard/CharacterCard";
import Link from "next/link";

const History = () => {
  const { isPending, data, error } = useQuery<
    (Chat & {
      character: Character & { photo: CharacterImage; author: User };
      messages: Message[];
    })[]
  >({
    queryKey: ["chatsHistory"],
    queryFn: () =>
      fetch("/api/chats").then((res) => res.json().then((data) => data.data)),
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div
      className={`"flex flex-col gap-4 mb-12 h-full w-full ${
        !data.length && "hidden"
      }`}
    >
      <h1 className="text-3xl">Continue Chat</h1>
      <div className="flex  gap-3 overflow-auto">
        {data.map((chat) => (
          <div
            className="flex flex-col gap-1 flex-[1] lg:flex-auto grow"
            key={chat.id}
          >
            <CharacterCard
              authorName={chat.character.author.username}
              characterBio={chat.character.bio}
              characterName={chat.character.name}
              characterId={chat.character.id}
              image={
                chat.character.photo?.data
                  ? `data:${chat.character.photo.mimetype};base64,${Buffer.from(
                      Object.values(chat.character.photo.data)
                    ).toString("base64")}`
                  : null
              }
            />
            <Link
              href={`/chat/${chat.id}`}
              className="btn-outline text-center font-bitcount"
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
