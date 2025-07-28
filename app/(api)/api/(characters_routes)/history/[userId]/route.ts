import { db } from "@/app/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) => {
  const userId = (await params).userId;
  try {
    const chats = await db.chat.findMany({
      where: {
        userId,
      },
      include: {
        character: {
          include: {
            author: true,
            photo: true,
          },
        },
        messages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ success: true, data: chats }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
