// app/api/users/profile-image/[userId]/route.ts
import { db } from "@/app/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: (await params).id },
      select: { profileImage: true },
    });

    if (!user?.profileImage) {
      return new NextResponse(null, { status: 404 });
    }

    // Create a response with the binary data
    return new NextResponse(user.profileImage.data, {
      headers: {
        "Content-Type": user.profileImage.mimetype,
        "Cache-Control": "public, max-age=604800", // 1 week cache
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 500 });
  }
}
