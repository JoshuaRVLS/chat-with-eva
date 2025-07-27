import { db } from "@/app/utils/prisma";
import formidable from "formidable";
import fs from "fs";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const form = await req.formData();
    const image = form.get("image") as File;
    const characterName = form.get("characterName");
    const characterAlias = form.get("characterAlias");
    const characterBio = form.get("characterBio");
    const characterPersona = form.get("characterPersona");
    const scenario = form.get("scenario");
    const initialMessage = form.get("initialMessage");
    const userId = form.get("userId");

    await db.character.create({
      data: {
        name: characterName as string,
        bio: characterBio as string,
        persona: characterPersona as string,
        author: {
          connect: {
            id: userId as string,
          },
        },
        introMessage: initialMessage as string,
        photo: {
          create: {
            data: await image.bytes(),
            mimetype: image.type,
            name: image.name,
          },
        },
        scenario: scenario as string,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Karakter Berhasil dibuat",
    });
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (req: Request) => {
  try {
    const characters = await db.character.findMany({
      include: { author: true, photo: true },
    });
    return NextResponse.json({ success: true, data: characters });
  } catch (error) {
    console.log(error);
  }
};
