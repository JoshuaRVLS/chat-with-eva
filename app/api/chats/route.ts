import { db } from "@/app/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const chats = await db.chat.findMany({
      include: {
        character: {
          include: {
            author: true,
            photo: true,
          },
        },
        messages: true,
      },
    });
    return NextResponse.json({ success: true, data: chats }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

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
