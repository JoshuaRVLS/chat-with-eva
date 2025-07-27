import { registerFont, createCanvas } from "canvas";
import path from "path";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export const generateProfileImage = async (
  alphabet: string
): Promise<Buffer> => {
  // Use process.cwd() for Vercel's filesystem
  const fontPath = join(process.cwd(), "public", "fonts", "ARIALBD.ttf");
  const fontData = readFileSync(fontPath);

  // Create temporary font file
  const tempPath = join("/tmp", "ARIALBD.ttf");
  writeFileSync(tempPath, fontData);

  registerFont(tempPath, { family: "Arial", weight: "bold" });

  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  // Background color
  const hue = Math.floor(Math.random() * 360);
  ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text styling with custom font
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 80px Arial, Roboto, sans-serif"; // Fallback chain
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw text
  ctx.fillText(alphabet.toUpperCase(), 100, 100);

  return canvas.toBuffer("image/png");
};
