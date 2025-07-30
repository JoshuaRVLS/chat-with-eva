import { NextResponse } from "next/server";
import { db } from "@/app/utils/prisma";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) => {
  const { userId } = await params;
  try {
    const personas = await db.userPersona.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json({ success: true, data: personas });
  } catch (error) {
    console.log(error);
  }
};
