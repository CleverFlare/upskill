import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db, imagekit } from "@/server/db";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const announcement = await db.announcement.delete({
        where: { id: input.id },
      });

      if (announcement.imageId)
        await imagekit.deleteFile(announcement.imageId as string);

      return announcement;
    } catch (err) {
      console.log(err);
      throw Error("Something went wrong!");
    }
  });
