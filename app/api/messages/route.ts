import { db } from "@/app/utils/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { chatId, content, userId, fromUser } = await req.json();

  try {
    const message = await db.message.create({
      data: {
        chat: {
          connect: {
            id: chatId,
          },
        },
        content,
        fromUser,
      },
    });

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message.content,
        chatId: message.chatId,
      }),
    });

    await db.message.create({
      data: {
        chat: {
          connect: {
            id: chatId,
          },
        },
        content: (await response.json()).data,
        fromUser: false,
      },
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
