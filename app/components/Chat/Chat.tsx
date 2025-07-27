"use client";

import {
  Character,
  CharacterImage,
  Chat as ChatModel,
  Message,
  User,
  UserProfileImage,
} from "@/app/generated/prisma";
import { AuthContext } from "@/app/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import ReactMarkDown, { Components } from "react-markdown";

const Chat = ({ chatId }: { chatId: string }) => {
  const { isPending, error, data, refetch } = useQuery<
    ChatModel & {
      character: Character & { photo: CharacterImage };
      messages: Message[];
      user: User & { profileImage: UserProfileImage };
    }
  >({
    queryKey: ["chat"],
    queryFn: () =>
      fetch(`/api/chats/${chatId}`).then((res) =>
        res.json().then((data) => data.data)
      ),
  });

  const [message, setMessage] = useState<string>("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const chat = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          content: message,
          userId: user?.id,
          fromUser: true,
        }),
      });

      await refetch();
      if (!response.ok) {
        console.log(response);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 pt-24 p-4 flex justify-center h-full w-full">
      <div className="w-full lg:w-1/2 flex flex-col justify-between h-full">
        <div className="h-full grow flex-[1] overflow-scroll scrollbar-hide p-4">
          <div className={`flex flex-col gap-2 text-lg `}>
            <div className="text-center p-4 text-wrap wrap-break-word">
              {" "}
              <ReactMarkDown
                components={
                  {
                    p: ({ node, ...props }) => (
                      <p
                        className=" text-wrap wrap-break-word whitespace-pre-wrap word-break-break-all"
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong
                        style={{ fontWeight: "bold", color: "white" }}
                        {...props}
                      />
                    ),
                    em: ({ node, ...props }) => (
                      <em
                        style={{ fontStyle: "italic", color: "gray" }}
                        {...props}
                      />
                    ),
                  } as Components
                }
              >
                {data.character.introMessage}
              </ReactMarkDown>
            </div>
            {data.messages.map((message) => (
              <div
                key={message.id}
                className={`w-full flex items-start gap-4 p-4 border-borders shadow border  ${
                  message.fromUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {message.fromUser ? (
                  <span>You</span>
                ) : (
                  <Image
                    src={`data:${
                      data.character.photo.mimetype
                    };base64,${Buffer.from(
                      Object.values(data.character.photo.data)
                    ).toString("base64")}`}
                    width={1000}
                    height={1000}
                    alt={data.character.name}
                    className="size-8 rounded-full shadow object-cover object-top"
                  />
                )}
                <div className="text-wrap wrap-break-word self-center">
                  <ReactMarkDown
                    components={
                      {
                        p: ({ node, ...props }) => (
                          <p
                            className=" text-wrap wrap-break-word whitespace-pre-wrap word-break-break-all"
                            {...props}
                          />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong
                            style={{ fontWeight: "bold", color: "white" }}
                            {...props}
                          />
                        ),
                        em: ({ node, ...props }) => (
                          <em
                            style={{ fontStyle: "italic", color: "gray" }}
                            {...props}
                          />
                        ),
                      } as Components
                    }
                  >
                    {message.content}
                  </ReactMarkDown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex flex-col gap-2 text-lg ">
                <Image
                  src={`data:${
                    data.character.photo.mimetype
                  };base64,${Buffer.from(
                    Object.values(data.character.photo.data)
                  ).toString("base64")}`}
                  width={1000}
                  height={1000}
                  alt={data.character.name}
                  className="size-8 rounded-full shadow object-cover object-top"
                />
                <span>Mengetik...</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-auto relative">
          <input
            className="input w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <FaPaperPlane
            onClick={chat}
            width={50}
            height={50}
            className="absolute right-5 top-7 transition cursor-pointer hover:opacity-70"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
