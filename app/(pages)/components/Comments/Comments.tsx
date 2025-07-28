"use client";

import { Comment, User, UserProfileImage } from "@/app/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import { FaPaperPlane } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/app/(pages)/providers/AuthProvider";
import Image from "next/image";
import { bytesToBase64 } from "@/app/utils/image";

const Comments = ({ characterId }: { characterId: string }) => {
  const [comment, setComment] = useState<string>("");
  const { user } = useContext(AuthContext);
  const { isPending, data, refetch } = useQuery<
    (Comment & { author: User & { profileImage: UserProfileImage } })[]
  >({
    queryKey: ["comments", characterId],
    queryFn: () =>
      fetch(`/api/comments/${characterId}`).then((res) =>
        res.json().then((data) => data.data)
      ),
  });

  const addComment = async () => {
    setComment("");
    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          characterId,
          content: comment,
          userId: user?.id,
        }),
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl p-2">
        {isPending ? "Loading..." : data?.length.toString()} Comments
      </h1>
      <div className="w-full relative">
        <input
          className="input w-full"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment here assshole"
        />
        <FaPaperPlane
          onClick={addComment}
          width={50}
          height={50}
          className="absolute right-5 top-7 transition cursor-pointer hover:opacity-70"
        />
      </div>
      <div className="w-full">
        {!data?.length && <p className="p-4">No Comments</p>}
        {data?.map((comment) => (
          <div
            key={comment.id}
            className="w-full flex flex-col gap-2 border-b border-borders p-2"
          >
            <div className="w-full flex gap-2 items-center ">
              <Image
                src={bytesToBase64(comment.author.profileImage)}
                width={1000}
                height={1000}
                alt={comment.author.username}
                className="size-8 rounded-full shadow object-cover object-top"
              />
              <h1>{comment.author.username}</h1>
            </div>
            <p className="wrap-break-word p-4">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
