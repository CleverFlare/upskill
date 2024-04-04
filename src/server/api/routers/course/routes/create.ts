import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db, imagekit } from "@/server/db";

export default publicProcedure
  .input(
    z.object({
      thumbnail: z.string(),
      banner: z.string(),
      name: z.string(),
      description: z.string(),
      technologies: z.object({ logo: z.string(), name: z.string() }).array(),
      prerequisites: z.string().array(),
      instructors: z
        .object({ id: z.string(), role: z.string() })
        .array()
        .nonempty(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const technologyLogos = input.technologies.map(({ logo }) => logo);

      const uploadedThumbnail = await imagekit.upload({
        file: input.thumbnail,
        fileName: `${crypto.randomUUID()}.jpg`,
        folder: "/thumbnails/",
      });

      const uploadedBanner = await imagekit.upload({
        file: input.banner,
        fileName: `${crypto.randomUUID()}.jpg`,
        folder: "/banners/",
      });

      const uploadedTechnologyLogos = await Promise.all(
        technologyLogos.map((logo) =>
          imagekit.upload({
            file: logo,
            fileName: `${crypto.randomUUID()}.png`,
            folder: "/technologies/",
          }),
        ),
      );

      const instructorRelations = input.instructors.map(({ role, id }) => ({
        userId: id,
        role,
      }));

      const createdCourse = await db.course.create({
        data: {
          banner: uploadedBanner.url,
          bannerId: uploadedBanner.fileId,
          thumbnail: uploadedThumbnail.url,
          thumbnailId: uploadedThumbnail.fileId,
          technologies: input.technologies.map(({ name }, index) => ({
            name,
            logoUrl: uploadedTechnologyLogos[index]?.url ?? "",
            logoId: uploadedTechnologyLogos[index]?.fileId ?? "",
          })),
          name: input.name,
          description: input.description,
          prerequisites: input.prerequisites,
          users: {
            createMany: {
              data: instructorRelations,
            },
          },
        },
      });

      return createdCourse;
    } catch (err) {
      console.log("something went wrong!", err);
      throw Error("Something went wrong!");
    }
  });
