import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import _ from "lodash";
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
      const preexisting = await db.userClass.findMany({
        where: { classId: input.classId, userId: { in: input.students } },
      });

      const updateStudents = preexisting.map((student) => student.userId);

      const createStudents = _.difference(input.students, updateStudents);

      if (!!updateStudents.length)
        await db.userClass.updateMany({
          where: {
            classId: input.classId,
            userId: { in: updateStudents },
          },
          data: {
            attended: true,
          },
        });

      if (!!createStudents.length)
        await db.userClass.createMany({
          data: createStudents.map((id) => ({
            attended: true,
            classId: input.classId,
            userId: id,
          })),
        });

      const users = await db.userClass.findMany({
        where: { classId: input.classId, userId: { in: input.students } },
        include: { class: { include: { course: true } }, user: true },
      });

      const usernames = users.map(({ user }) => user.username);

      const username = await getUsername(input.userId);

      const report = `In course \`${
        users?.[0]?.class?.course?.name ?? "Unknown"
      }\` the following students have been marked as attended in class \`${
        users?.[0]?.class?.title ?? "Unknown"
      }\` : ${new Intl.ListFormat("en", {
        style: "long",
        type: "conjunction",
      }).format(usernames)}`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Mark Attended",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
