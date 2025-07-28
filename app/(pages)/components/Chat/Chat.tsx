"use client";

import React, {
  useContext,
  useMemo,
  useCallback,
  useState,
  useRef,
} from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa";
import MarkDown from "../MarkDown/MarkDown";
import { bytesToBase64 } from "@/app/utils/image";
import { AuthContext } from "@/app/(pages)/providers/AuthProvider";
import type {
  Character,
  CharacterImage,
  Chat as ChatModel,
  Message,
  User,
  UserProfileImage,
} from "@/app/generated/prisma";

type ChatData = ChatModel & {
  character: Character & { photo: CharacterImage };
  messages: Message[];
  user: User & { profileImage: UserProfileImage };
};

const Chat = ({ chatId }: { chatId: string }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Memoize the query key to prevent unnecessary refetches
  const { data, isLoading, error, refetch } = useQuery<ChatData>({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const res = await fetch(`/api/chats/${chatId}`);
      if (!res.ok) throw new Error("Failed to fetch chat");
      return res.json().then((data) => data.data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
  });

  // Memoize user and character images to prevent recalculations
  const userImage = useMemo(
    () =>
      data?.user?.profileImage ? bytesToBase64(data.user.profileImage) : null,
    [data?.user?.profileImage]
  );

  const characterImage = useMemo(
    () => (data?.character?.photo ? bytesToBase64(data.character.photo) : null),
    [data?.character?.photo]
  );

  // Auto-scroll to bottom when messages update
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!message.trim() || !user?.id || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          content: message,
          userId: user.id,
          fromUser: true,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setMessage("");
      await refetch();
      scrollToBottom();
    } catch (error) {
      console.error("Message submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [message, user?.id, chatId, isSubmitting, refetch, scrollToBottom]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  if (isLoading)
    return (
      <div className="fixed inset-0 pt-24 p-4 flex justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="fixed inset-0 pt-24 p-4 flex justify-center">
        Error: {error.message}
      </div>
    );
  if (!data)
    return (
      <div className="fixed inset-0 pt-24 p-4 flex justify-center">
        No chat data found
      </div>
    );

  return (
    <div className="fixed inset-0 pt-24 p-4 flex justify-center h-full w-full">
      <div className="w-full lg:w-1/2 flex flex-col justify-between h-full">
        <div className="h-full grow flex-[1] overflow-y-auto p-4">
          <div className="flex flex-col gap-2 text-lg">
            <div className="text-center p-4 text-wrap break-words">
              {data.character.introMessage}
            </div>

            {data.messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                userImage={userImage}
                characterImage={characterImage}
                isUserMessage={message.fromUser}
              />
            ))}

            {isSubmitting && (
              <div className="flex gap-4 p-4 border border-borders shadow">
                <Image
                  src={characterImage || "/default-character.png"}
                  width={32}
                  height={32}
                  alt={data.character.name}
                  className="size-8 rounded-full shadow object-cover object-top"
                  priority
                />
                <span>Mengetik...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="mt-auto relative">
          <textarea
            className="input w-full resize-none p-4 pr-12"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            placeholder="Type your message..."
            rows={3}
          />
          <button
            onClick={handleSubmit}
            disabled={!message.trim() || isSubmitting}
            className="absolute right-4 bottom-4 top-0 transition cursor-pointer hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <FaPaperPlane size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Memoized message bubble component to prevent unnecessary re-renders
// Update the MessageBubble component to handle null images
const MessageBubble = React.memo(
  ({
    message,
    userImage,
    characterImage,
    isUserMessage,
  }: {
    message: Message;
    userImage: string | null;
    characterImage: string | null;
    isUserMessage: boolean;
  }) => {
    // Fallback image source
    const imageSrc = isUserMessage
      ? userImage || "/default-user.png"
      : characterImage || "/default-character.png";

    const altText = isUserMessage ? "User" : "Character";

    return (
      <div
        className={`w-full flex items-start gap-4 p-4 border border-borders shadow ${
          isUserMessage ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Image
          src={imageSrc}
          width={32}
          height={32}
          alt={altText}
          className="size-8 rounded-full shadow object-cover object-top flex-shrink-0"
          priority
        />
        <div className="text-wrap break-words">
          <MarkDown>{message.content}</MarkDown>
        </div>
      </div>
    );
  }
);

MessageBubble.displayName = "MessageBubble";

export default Chat;
