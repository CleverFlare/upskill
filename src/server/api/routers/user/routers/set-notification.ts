import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export default publicProcedure
  .input(
    z.object({
      userId: z.string(),
      courseId: z.string(),
      notification: z.number(),
      name: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.userCourse.update({
        where: { userId: input.userId, courseId: input.courseId },
        data: { [input.name]: input.notification },
      });

      return { [input.name]: input.notification };
    } catch (err) {
      console.log(err);
      if (err instanceof Error) throw Error(err?.message);
    }
  });
