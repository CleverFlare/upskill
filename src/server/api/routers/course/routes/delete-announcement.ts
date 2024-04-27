import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db, imagekit } from "@/server/db";
import getUsername from "@/lib/get-username";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const announcement = await db.announcement.delete({
        where: { id: input.id },
        include: {
          course: true,
        },
      });

      if (announcement.imageId) await imagekit.deleteFile(announcement.imageId);

      const username = await getUsername(input.userId);

      const report = `In course \`${
        announcement.course.name ?? "Unknown"
      }\` an announcement with the title \`${
        announcement.title
      }\` has been deleted`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Delete Announcement",
          description: report,
        },
      });

      return announcement;
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
