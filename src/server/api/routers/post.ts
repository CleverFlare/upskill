import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { imagekit, db } from "@/server/db";

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
            thumbnail: uploadedThumbnail.url,
            technologies: input.technologies.map(({ name }, index) => ({
              name,
              logoUrl: uploadedTechnologyLogos[index]?.url ?? "",
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
