import { z } from "zod";

const createTechnologySchema = z.object({
  name: z.string().min(1),
  logo: z.instanceof(Blob, { message: "Required" }),
});

export default createTechnologySchema;
