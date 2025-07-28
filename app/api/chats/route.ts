import { db } from "@/app/utils/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { characterId, userId } = await req.json();

  try {
    const chat = await db.chat.create({
      data: {
        character: {
          connect: {
            id: characterId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        character: true,
      },
    });
    return NextResponse.json({ success: true, chat }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
