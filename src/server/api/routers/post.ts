import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { imagekit, db } from "@/server/db";
import _ from "lodash";

export const postRouter = createTRPCRouter({
  createCourse: publicProcedure
    .input(
      z.object({
        thumbnail: z.string(),
        banner: z.string(),
        name: z.string(),
        description: z.string(),
        technologies: z.object({ logo: z.string(), name: z.string() }).array(),
        prerequisites: z.string().array(),
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
          },
        });

        return createdCourse;
      } catch (err) {
        console.log("something went wrong!", err);
        throw Error("Something went wrong!");
      }
    }),
  updateCourse: publicProcedure
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
      }),
    )
    .mutation(async ({ input }) => {
      // console.log(input);
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

      modifiedData = { ...input, ...modifiedData };

      delete modifiedData.id;

      return await db.course.update({
        where: { id: input.id },
        data: modifiedData,
      });
    }),
  deleteCourse: publicProcedure
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
    }),
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),
  //
  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //
  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),
  //
  // getLatest: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),
  //
  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
