import { db } from "@/server/db";

export default async function getUsername(id: string) {
  if (id === "0") return "admin";

  const user = await db.user.findUnique({ where: { id } });

  return user?.username;
}
