import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export default publicProcedure
  .input(z.string().array().nonempty())
  .mutation(async ({ input }) => {
    try {
      await db.user.updateMany({
        where: { id: { in: input } },
        data: { isActive: true },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
