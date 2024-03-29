import { publicProcedure } from "@/server/api/trpc";
import { db, imagekit } from "@/server/db";
import { z } from "zod";

export default publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }) => {
    const deletedCourse = await db.course.delete({ where: { id: input.id } });
    if (!deletedCourse) throw Error("Invalid ID");

    await imagekit.deleteFile(deletedCourse.bannerId);

    await imagekit.deleteFile(deletedCourse.thumbnailId);

    await Promise.all(
      deletedCourse.technologies.map(
        async (tech) => await imagekit.deleteFile(tech.logoId),
      ),
    );
  });
