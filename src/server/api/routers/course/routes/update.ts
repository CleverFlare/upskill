import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { db, imagekit } from "@/server/db";
import _ from "lodash";
// import { Prisma, UserCourse } from "@prisma/client";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
      thumbnail: z.string().optional(),
      banner: z.string().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
      technologies: z
        .object({
          logo: z.string(),
          name: z.string(),
          logoId: z.string().optional(),
        })
        .array()
        .optional(),
      prerequisites: z.string().array().optional(),
      instructors: z
        .object({ id: z.string(), role: z.string() })
        .array()
        .optional(),
    }),
  )
  .mutation(async ({ input }) => {
    const course = await db.course.findUnique({ where: { id: input.id } });
    if (!course) throw Error("Invalid ID!");

    let modifiedData = {} as Record<string, unknown>;

    const deletedTechnologies = input?.technologies
      ? _.differenceWith(
          course.technologies,
          input.technologies,
          (obj1, obj2) => _.isEqual(obj1, obj2),
        )
      : undefined;

    if (deletedTechnologies)
      await Promise.all(
        deletedTechnologies.map(
          async (tech) => await imagekit.deleteFile(tech.logoId),
        ),
      );

    if (input?.technologies)
      modifiedData.technologies = await Promise.all(
        input.technologies.map(async (tech) => {
          if (tech?.logoId)
            return {
              name: tech.name,
              logoUrl: tech.logo,
              logoId: tech.logoId,
            };

          const storedLogo = await imagekit.upload({
            file: tech.logo,
            fileName: `${crypto.randomUUID()}.png`,
            folder: "/technologies/",
          });
          return {
            name: tech.name,
            logoUrl: storedLogo.url,
            logoId: storedLogo.fileId,
          };
        }),
      );

    if (input?.banner) {
      await imagekit.deleteFile(course.bannerId);

      const storedBanner = await imagekit.upload({
        file: input.banner,
        fileName: `${crypto.randomUUID()}.jpg`,
        folder: "/banners/",
      });

      modifiedData.banner = storedBanner.url;
      modifiedData.bannerId = storedBanner.fileId;
    }

    if (input?.thumbnail) {
      await imagekit.deleteFile(course.thumbnail);

      const storedThumbnail = await imagekit.upload({
        file: input.thumbnail,
        fileName: `${crypto.randomUUID()}.jpg`,
        folder: "/thumbnails/",
      });

      modifiedData.thumbnail = storedThumbnail.url;
      modifiedData.thumbnailId = storedThumbnail.fileId;
    }

    if (input?.instructors) {
      await db.userCourse.deleteMany({
        where: {
          courseId: input.id,
          OR: [{ role: "head" }, { role: "instructor" }],
        },
      });

      const instructorRelations = input.instructors.map(({ role, id }) => ({
        userId: id,
        role,
      }));

      modifiedData.users = {
        createMany: {
          data: instructorRelations,
        },
      };
    }

    modifiedData = { ...input, ...modifiedData };

    delete modifiedData.id;
    delete modifiedData.instructors;

    return await db.course.update({
      where: { id: input.id },
      data: modifiedData,
    });
  });
