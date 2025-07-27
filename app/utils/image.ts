import { createCanvas } from "@napi-rs/canvas"; // This works in Vercel

export const generateProfileImage = async (
  alphabet: string
): Promise<Buffer> => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  // Background color
  const hue = Math.floor(Math.random() * 360);
  ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text styling
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 80px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw text
  ctx.fillText(alphabet.toUpperCase(), 100, 100);

  return canvas.toBuffer("image/png");
};
