import { db } from "@/app/utils/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { token } = await req.json();

  const user = await db.user.findFirst({
    where: {
      verificationToken: token,
      verificationTokenExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired verification token" },
      { status: 400 }
    );
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      verified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    },
  });

  return NextResponse.json(
    { success: true, message: "Email verified successfully" },
    { status: 200 }
  );
};
