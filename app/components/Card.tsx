"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReactMarkDown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { Message } from "./types/types";
import { BiArrowToRight, BiEdit, BiRefresh, BiTrash } from "react-icons/bi";
import remarkGfm from "remark-gfm";
import { useSettings } from "../stores/useSettings";
import { models, completion } from "../utils/openai";

const Card = ({
  msg,
  messages,
  setMessages,
  idx,
  addItem,
  setLoading,
  model,
}: {
  msg: Message;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  idx: number;
  addItem: (msg: Message) => Promise<void>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  model: number;
}) => {
  const [hover, setHover] = useState<boolean>(false);

  const {
    topP,
    topK,
    maxTokens,
    temperature,
    presencePenalty,
    frequencyPenalty,
    repetitionPenalty,
  } = useSettings();

  const deleteMessage = () => {
    const newMessages = [...messages];
    newMessages.splice(idx, 1);
    setMessages(newMessages);
    localStorage.setItem("messages", JSON.stringify(newMessages));
  };
  const editMessage = () => {};

  const restartMessage = async () => {
    setLoading(true);
    const newMessages = [...messages];
    newMessages.splice(idx, 1);
    setMessages(newMessages);
    const response = await completion(
      models[model],
      msg.content,
      newMessages,
      topP,
      topK,
      maxTokens,
      temperature,
      presencePenalty,
      frequencyPenalty,
      repetitionPenalty
    );
    await addItem({
      role: "user",
      content: response.choices[0].message.content,
      fromUser: false,
    });
    setLoading(false);
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative transition flex p-4 rounded-md bg-white gap-3 items-start`}
    >
      <div
        className={` ${
          hover && "opacity-100"
        } opacity-0 transition rounded-md absolute right-0 -top-5 p-1 flex gap-2 bg-gray-300`}
      >
        <BiTrash
          onClick={deleteMessage}
          className="transition cursor-pointer hover:opacity-80"
          size={20}
        />
        <BiEdit
          className="transition cursor-pointer hover:opacity-80"
          size={20}
        />
        <BiRefresh
          onClick={restartMessage}
          className="transition cursor-pointer hover:opacity-80"
          size={20}
        />
        <BiArrowToRight
          className="transition cursor-pointer hover:opacity-80"
          size={20}
        />
      </div>
      {!msg.fromUser && (
        <Image
          src="/cewek.jpeg"
          alt="ai"
          width={80}
          height={80}
          className="rounded-full"
        />
      )}
      <span
        className={`prose max-w-full overflow-x-auto text-black text-wrap wrap-break-word h-full w-full ${
          msg?.fromUser && "text-right"
        }`}
      >
        <ReactMarkDown
          components={
            {
              strong: ({ node, ...props }) => (
                <strong
                  style={{ fontWeight: "bold", color: "black" }}
                  {...props}
                />
              ),
              em: ({ node, ...props }) => (
                <em style={{ fontStyle: "italic", color: "gray" }} {...props} />
              ),
            } as Components
          }
        >
          {msg.content}
        </ReactMarkDown>
      </span>
    </div>
  );
};

export default Card;
