"use client";

import { Character, CharacterTag, User } from "@/app/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import Comments from "../Comments/Comments";
import { useRouter } from "next/navigation";

const CharacterView = ({ id }: { id: string }) => {
  const { isPending, error, data } = useQuery<
    Character & {
      author: User;
      photo: { data: Uint8Array; mimetype: string; name: string };
      tags: CharacterTag[];
    }
  >({
    queryKey: ["character"],
    queryFn: () =>
      fetch(`/api/characters/${id}`).then((res) =>
        res.json().then((data) => data.data)
      ),
  });

  const router = useRouter();

  if (isPending) return <p></p>;
  if (error) return <p>{error.message}</p>;

  const startChat = async () => {
    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          characterId: id,
          userId: data.author.id,
        }),
      });
      if (!response.ok) {
        console.log(response);
        return;
      }

      const { chat } = await response.json();

      router.push(`/chat/${chat.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-24 mt-8 px-6 flex flex-col lg:flex-row gap-4">
      <div className="w-full h-[50%] lg:w-[40%] lg:h-[40%] flex-col flex gap-2 p-12 shadow border border-borders">
        <h1 className="text-5xl">{data.name}</h1>
        <Image
          src={`data:${data.photo.mimetype};base64,${Buffer.from(
            Object.values(data.photo.data)
          ).toString("base64")}`}
          width={1000}
          height={1000}
          alt={data.name}
          className="h-full w-full shadow object-cover object-top"
        />
        <span className="btn w-full text-center p-2" onClick={startChat}>
          Start Chat
        </span>
        <div className="flex gap-2 flex-wrap">
          {data.tags.length &&
            data.tags.map((tag) => (
              <span
                key={tag.id}
                className="p-2 rounded-full border-borders border"
              >
                {tag.name}
              </span>
            ))}
        </div>
        <span className="py-5 rounded-full border-borders border px-5 w-fit">
          by <b>@{data.author.username}</b>
        </span>
        <span className="font-light tracking-wide wrap-break-word">
          {data.bio}
        </span>
      </div>
      <div className="flex flex-col justify-start p-4 gap-4 w-full">
        <span className="text-2xl rounded-full border-borders p-4 border">
          Character Definition, Total:{" "}
          {Math.floor(
            (data.persona.length +
              data.introMessage.length +
              data.scenario.length) /
              4
          )}
          , permanent:{" "}
          {Math.floor((data.persona.length + data.scenario.length) / 4)}
        </span>
        <Dropdown
          label={`Scenario ( ${Math.floor(data.scenario.length / 4)} TOKENS )`}
        >
          <p className="p-4 wrap-break-word border border-borders shadow text-lg mt-4">
            {data.scenario}
          </p>
        </Dropdown>
        <Dropdown
          label={`Persona ( ${Math.floor(data.persona.length / 4)} TOKENS )`}
        >
          <p className="p-4 wrap-break-word border border-borders shadow text-lg mt-4">
            {data.persona}
          </p>
        </Dropdown>
        <Dropdown
          label={`Intro Message ( ${Math.floor(
            data.introMessage.length / 4
          )} TOKENS )`}
        >
          <p className="p-4 wrap-break-word border border-borders shadow text-lg mt-4">
            {data.introMessage}
          </p>
        </Dropdown>
        <Comments characterId={data.id} />
      </div>
    </div>
  );
};

export default CharacterView;
