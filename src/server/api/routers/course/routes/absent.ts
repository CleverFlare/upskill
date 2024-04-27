import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import getUsername from "@/lib/get-username";

export default publicProcedure
  .input(
    z.object({
      classId: z.string(),
      students: z.string().array(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.userClass.updateMany({
        where: {
          classId: input.classId,
          userId: { in: input.students },
        },
        data: {
          attended: false,
        },
      });

      const users = await db.userClass.findMany({
        where: { classId: input.classId, userId: { in: input.students } },
        include: { class: { include: { course: true } }, user: true },
      });

      const usernames = users.map(({ user }) => user.username);

      const username = await getUsername(input.userId);

      const report = `In course \`${
        users?.[0]?.class?.course?.name ?? "Unknown"
      }\` in class \`${
        users?.[0]?.class?.title ?? "Unknown"
      }\` the following students have been marked as absent: ${new Intl.ListFormat(
        "en",
        { type: "conjunction", style: "long" },
      ).format(usernames)}`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Mark Absent",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
