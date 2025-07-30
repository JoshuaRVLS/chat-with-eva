import { NextResponse } from "next/server";
import { db } from "@/app/utils/prisma";

export const POST = async (req: Request) => {
  const { userId, personaId } = await req.json();

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        personaUsed: personaId,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
