import { NextResponse } from "next/server";
import { db } from "@/app/utils/prisma";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;
  try {
    const characters = await db.character.findMany({
      where: {
        authorId: id,
      },
      include: { author: true, photo: true },
    });
    return NextResponse.json({ success: true, data: characters });
  } catch (error) {
    console.log(error);
  }
};
