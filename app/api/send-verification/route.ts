import { db } from "@/app/utils/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const POST = async (req: Request) => {
  const { email, verificationToken } = await req.json();
  console.log("MASUK KE SEND VERIFICATION");

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST as string,
    secure: false,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  } as SMTPTransport.Options);

  const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

  try {
    await transporter.sendMail({
      from: `"JCorp" <${process.env.BREVO_EMAIL}>`,
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <p>Please click the link below to verify your email:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>Or copy this link: ${verificationLink}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send verification email" },
      { status: 500 }
    );
  }
};
