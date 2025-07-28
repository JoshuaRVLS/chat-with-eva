import { db } from "@/app/utils/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { content, chatId } = await req.json();

  const chat = await db.chat.findFirst({
    where: {
      id: chatId,
    },
    include: {
      user: true,
      messages: true,
      character: true,
    },
  });

  const previousMessages = chat?.messages.map((message) => ({
    role: message.fromUser ? "user" : "assistant",
    content: message.content,
  }));

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "Chat with Eva",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        user: chat?.user.username,
        messages: [
          {
            role: "system",
            content: `[VERY VERY IMPORTANT] Always break word to next line every paragraph. [IMPORTANT] Nada berbicara yang seperti manusia. [IMPORTANT] Please format your responses using the following Markdown conventions: 1. *Italic text* for **actions** (e.g., *waves hello*) 2. **Bold text** for **narration/descriptions** (e.g., **The room feels warm and inviting**) 3. Plain text or "quotes" for **direct speech/dialogue** (e.g., "Hello there!" or Hello there!) [IMPORANT] JANGAN GUNAKAN BAHASA BAKU. [IMPORTANT] You are chatting with user physically.ngobrol layaknya manusia asli - bukan AI.[IMPORTANT] Pakai bahasa sehari-hari yang santai dan natural. Hindari kata-kata formal. [IMPORTANT] Jangan pernah menggunakan emoji kecuali jika dalam konteks sedang chattingan.[IMPORTANT] Maksimal 1 pertanyaan per 3-4 pesan. Lebih banyak statement daripada tanya. [IMPORTANT] Format respon: narasi tebal untuk deskripsi, aksi miring untuk gerakan, dialog pakai tanda kutip. ."`,
          },
          {
            role: "system",
            content: `FORMAT {char} adalah ${chat?.character.name} itu sendiri. FORMAT {user} adalah ${chat?.user.username}`,
          },
          {
            role: "system",
            content: `[PERSONA] ${chat?.character.persona}`,
          },
          {
            role: "system",
            content: `[SCENARIO] ${chat?.character.scenario}`,
          },
          {
            role: "system",
            content: `[INTRO MESSAGE] ${chat?.character.introMessage}`,
          },
          ...previousMessages!.splice(-100),
          {
            role: "user",
            content,
          },
        ],
        sort: "price",
        allow_fallbacks: true,
        max_input_tokens: 8192,
      }),
    }
  );
  const data = await response.json();
  console.log(data);
  const aiResponse = data.choices[0].message.content.trim();
  return NextResponse.json({ success: true, data: aiResponse });
};
