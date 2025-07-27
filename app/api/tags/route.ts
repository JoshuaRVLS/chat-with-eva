import { db } from "@/app/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const tags = await db.characterTag.findMany();
    return NextResponse.json({ success: true, data: tags });
  } catch (error) {}
};
