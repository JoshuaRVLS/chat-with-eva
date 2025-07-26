import { db } from "@/app/utils/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { characterId, content, userId } = await req.json();

  try {
    const comment = await db.comment.create({
      data: {
        character: {
          connect: {
            id: characterId,
          },
        },
        content,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
    console.log("Commend added");
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
