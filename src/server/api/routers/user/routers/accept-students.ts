import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export default publicProcedure
  .input(
    z.object({ students: z.string().array().nonempty(), courseId: z.string() }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.userCourse.updateMany({
        where: { userId: { in: input.students }, courseId: input.courseId },
        data: { isAccepted: true },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
