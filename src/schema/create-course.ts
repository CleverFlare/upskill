import { z } from "zod";

const createCourseSchema = z.object({
  name: z
    .string({ required_error: "Course name is required" })
    .min(1, { message: "Course name is required" }),
  thumbnail: z.instanceof(Blob, { message: "The thumbnail is required" }),
  banner: z.instanceof(Blob, { message: "The banner is required" }),
  description: z
    .string({ required_error: "The description is required" })
    .min(1, { message: "The description is required" }),
  prerequisites: z.string().array(),
  technologies: z
    .object({
      name: z.string(),
      logo: z.instanceof(Blob, { message: "The logo is required" }),
    })
    .array()
    .nonempty(),
});

export default createCourseSchema;
