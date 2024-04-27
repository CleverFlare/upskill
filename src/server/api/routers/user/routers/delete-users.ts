import getUsername from "@/lib/get-username";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export default publicProcedure
  .input(z.object({ users: z.string().array().nonempty(), userId: z.string() }))
  .mutation(async ({ input }) => {
    try {
      const users = await db.user.findMany({
        where: { id: { in: input.users } },
      });

      await db.user.deleteMany({
        where: { id: { in: input.users } },
      });

      const usernames = users.map((user) => `\`${user.username}\``);

      const username = await getUsername(input.userId);

      const report = `The following users have been deleted: ${new Intl.ListFormat(
        "en",
        {
          style: "long",
          type: "conjunction",
        },
      ).format(usernames)}`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Delete Users",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
