import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export default publicProcedure
  .input(z.object({ userId: z.string(), courseId: z.string() }))
  .mutation(async ({ input }) => {
    try {
      const courseRelation = await db.userCourse.findUnique({
        where: { courseId: input.courseId, userId: input.userId },
      });
      console.log("course results", courseRelation);
      return courseRelation;
    } catch (err) {
      console.log(err);
      if (err instanceof Error) throw Error(err.message);
    }
  });
