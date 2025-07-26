import { NextResponse } from "next/server";
import { db } from "@/app/utils/prisma";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const characterId = (await params).id;

  try {
    const character = await db.character.findUnique({
      where: {
        id: characterId,
      },
    });
    return NextResponse.json(
      { success: true, data: { name: character?.name, bio: character?.bio } },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};
