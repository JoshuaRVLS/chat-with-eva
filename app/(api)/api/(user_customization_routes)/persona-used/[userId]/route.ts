import { NextResponse } from "next/server";
import { db } from "@/app/utils/prisma";

export const GET = async (request: Request, { params }: any) => {
  const { userId } = params;
  try {
    const user = await db?.user.findFirst({
      where: {
        id: userId,
      },
    });
    return NextResponse.json({ success: true, data: user?.personaUsed });
  } catch (error) {
    console.log(error);
  }
};
