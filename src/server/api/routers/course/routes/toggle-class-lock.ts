import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db, imagekit } from "@/server/db";
import { pusher } from "@/server/pusher";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
      courseId: z.string(),
      locked: z.boolean(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const firstCourse = await db.class.findFirst({
        where: { courseId: input.courseId },
      });

      if (firstCourse?.id === input.id) return;

      await db.class.update({
        where: {
          id: input.id,
          courseId: input.courseId,
        },
        data: {
          locked: input.locked,
        },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
