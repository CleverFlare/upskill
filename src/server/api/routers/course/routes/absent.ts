import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import _ from "lodash";

export default publicProcedure
  .input(z.object({ classId: z.string(), students: z.string().array() }))
  .mutation(async ({ input }) => {
    await db.userClass.updateMany({
      where: {
        classId: input.classId,
        userId: { in: input.students },
      },
      data: {
        attended: false,
      },
    });
  });
