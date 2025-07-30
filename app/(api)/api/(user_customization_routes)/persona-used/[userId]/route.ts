import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: any) => {
  const { userId } = params;
  try {
    const user = await db?.user.findFirst({
      where: {
        id: userId,
      },
    });
    NextResponse.json({ success: true, data: user?.personaUsed });
  } catch (error) {
    console.log(error);
  }
};
