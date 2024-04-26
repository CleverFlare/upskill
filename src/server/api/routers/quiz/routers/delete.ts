import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.quiz.delete({
        where: { id: input.id },
      });
    } catch (err) {
      console.log("ERROR:", err);
      throw err;
    }
  });
