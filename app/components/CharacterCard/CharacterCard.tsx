import { User } from "@/app/generated/prisma";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultJPG from "@/public/default.jpg";
import { useRouter } from "next/navigation";

const CharacterCard = ({
  characterName,
  image,
  characterBio,
  authorName,
  characterId,
  className,
}: {
  characterName: string;
  image: File | Blob | string | null;
  characterBio: string;
  authorName: string;
  characterId?: string;
  className?: string;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const router = useRouter();

  useEffect(() => {
    if (!image) {
      setImageUrl(null);
      return;
    }

    // If image is already a URL string
    if (typeof image === "string") {
      console.log("Set image url");
      setImageUrl(image);
      return;
    }

    // If image is a File or Blob object
    const url = URL.createObjectURL(image);
    setImageUrl(url);

    // Clean up the object URL when component unmounts
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [image]);

  return (
    <div className={`card ${className}`}>
      <div className="flex flex-col gap-1 overflow-hidden">
        <span>{characterName}</span>
        <div className="w-full">
          {image && (
            <Image
              src={imageUrl || defaultJPG}
              width={50}
              height={50}
              className="object-cover object-top w-full h-52"
              alt="Image"
            />
          )}
        </div>
        <span className="font-light text-purple-300">@{authorName}</span>
        <span className="font-light wrap-break-word overflow-hidden">
          {characterBio}
        </span>
      </div>
      <div>
        <button
          onClick={() => router.push(`/character/${characterId}`)}
          className="btn-outline w-full"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
