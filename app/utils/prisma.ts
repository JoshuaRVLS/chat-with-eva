import { PrismaClient } from "../generated/prisma";

declare global {
  var db: PrismaClient | undefined;
}

// Using prisma client and make sure no duplicate instance
export const db = global.db || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.db = db;
