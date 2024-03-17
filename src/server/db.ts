import { PrismaClient } from "@prisma/client";
import { env } from "@/env";
import ImageKit from "imagekit";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export const imagekit = new ImageKit({
  publicKey: env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: env.IMAGE_KIT_URL,
});
