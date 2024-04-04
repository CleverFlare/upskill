import { z } from "zod";

const updateCourseSchema = z.object({
  name: z
    .string({ required_error: "Course name is required" })
    .min(1, { message: "Course name is required" }),
  thumbnail: z.union([
    z.instanceof(Blob, { message: "The thumbnail is required" }),
    z.string(),
  ]),
  banner: z.union([
    z.instanceof(Blob, { message: "The banner is required" }),
    z.string(),
  ]),
  description: z
    .string({ required_error: "The description is required" })
    .min(1, { message: "The description is required" }),
  prerequisites: z.string().array(),
  technologies: z
    .record(
      z.string(),
      z.object({
        name: z.string(),
        logo: z.union([z.instanceof(Blob), z.string()]),
        logoId: z.string().optional(),
      }),
    )
    .refine((data) => Object.keys(data).length > 0, {
      message: "Record must contain at least one technology",
    }),
  instructors: z
    .object({
      id: z.string(),
      name: z.string(),
      username: z.string(),
      role: z.string(),
      image: z.union([z.string().optional(), z.undefined(), z.null()]),
    })
    .array(),
});

export default updateCourseSchema;
