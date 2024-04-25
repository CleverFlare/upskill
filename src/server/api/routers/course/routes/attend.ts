import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import _ from "lodash";

export default publicProcedure
  .input(z.object({ classId: z.string(), students: z.string().array() }))
  .mutation(async ({ input }) => {
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
  });
