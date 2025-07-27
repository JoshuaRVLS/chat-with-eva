import { registerFont, createCanvas } from "canvas";
import path from "path";
import { readFileSync } from "fs";

// Register fonts (do this once at module level)
registerFont(path.join(process.cwd(), "fonts", "ARIALBD.ttf"), {
  family: "Arial",
});

export const generateProfileImage = async (
  alphabet: string
): Promise<Buffer> => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  // Background color
  const hue = Math.floor(Math.random() * 360);
  ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text styling with custom font
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 80px Arial"; // Fallback chain
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw text
  ctx.fillText(alphabet.toUpperCase(), 100, 100);

  return canvas.toBuffer("image/png");
};
