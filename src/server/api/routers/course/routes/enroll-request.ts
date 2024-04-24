import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export default publicProcedure
  .input(z.object({ id: z.string(), courseId: z.string() }))
  .mutation(async ({ input }) => {
    try {
      await db.userCourse.create({
        data: {
          userId: input.id,
          courseId: input.courseId,
          role: "student",
        },
      });
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
