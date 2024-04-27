import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db, imagekit } from "@/server/db";
import { pusher } from "@/server/pusher";
import getUsername from "@/lib/get-username";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const courseClass = await db.class.delete({
        where: {
          id: input.id,
        },
        include: { course: true },
      });
      const username = await getUsername(input.userId);

      const report = `In course \`${
        courseClass?.course?.name ?? "Unknown"
      }\` a class with the title \`${
        courseClass?.title ?? "Unknown"
      }\` has been delete`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Delete Class",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
