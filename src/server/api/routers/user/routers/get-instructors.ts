import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export default publicProcedure.input(z.string()).mutation(async ({ input }) => {
  const instructors = await db.user.findMany({
    where: {
      role: "instructor",
      OR: [
        {
          firstName: {
            startsWith: input,
          },
        },
        {
          lastName: {
            startsWith: input,
          },
        },
        {
          username: {
            startsWith: input,
          },
        },
      ],
    },
    select: {
      id: true,
      image: true,
      firstName: true,
      lastName: true,
      username: true,
    },
    take: 10,
  });

  return instructors;
});
