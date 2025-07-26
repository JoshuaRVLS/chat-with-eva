import { User } from "@/app/generated/prisma";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultJPG from "@/public/default.jpg";

const CharacterCard = ({
  characterName,
  image,
  characterBio,
  authorName,
}: {
  characterName: string;
  image: File | Blob | string | null;
  characterBio: string;
  authorName: string;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>("");

  useEffect(() => {
    if (!image) {
      setImageUrl(null);
      return;
    }

    // If image is already a URL string
    if (typeof image === "string") {
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
    <div className="card">
      <span>{characterName}</span>
      <div className="w-full">
        {image && (
          <Image
            src={imageUrl || defaultJPG}
            width={50}
            height={50}
            className="object-cover object-top w-full h-40"
            alt="Image"
          />
        )}
      </div>
      <span className="font-light text-purple-300">@{authorName}</span>
      <span className="font-light wrap-break-word overflow-hidden">
        {characterBio}
      </span>
    </div>
  );
};

export default CharacterCard;
