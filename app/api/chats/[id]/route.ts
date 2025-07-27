import { NextResponse } from "next/server";
import { db } from "@/app/utils/prisma";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const chatId = (await params).id;

  try {
    const chat = await db.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        character: {
          include: {
            photo: true,
          },
        },
        messages: true,
        user: {
          include: {
            profileImage: true,
          },
        },
      },
    });
    console.log(chat);
    return NextResponse.json({ success: true, data: chat }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
