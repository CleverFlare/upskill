import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export default publicProcedure
  .input(
    z.object({
      type: z.enum(["addition", "subtraction"]),
      ids: z.string().array().nonempty(),
      number: z.number(),
      courseId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.userCourse.updateMany({
        where: { userId: { in: input.ids }, courseId: input.courseId },
        data: {
          points: {
            ...(input.type === "addition" && { increment: input.number }),
            ...(input.type === "subtraction" && { decrement: input.number }),
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
