import getUsername from "@/lib/get-username";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export default publicProcedure
  .input(
    z.object({
      instructors: z.string().array().nonempty(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.user.updateMany({
        where: { id: { in: input.instructors } },
        data: { isActive: true },
      });

      const users = await db.user.findMany({
        where: { id: { in: input.instructors } },
      });

      const usernames = users.map((user) => `\`${user.username}\``);

      const username = await getUsername(input.userId);

      const report = `The following instructors where accepted: ${new Intl.ListFormat(
        "en",
        { style: "long", type: "conjunction" },
      ).format(usernames)}`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Accept Instructors",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
