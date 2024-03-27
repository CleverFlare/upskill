import { z } from "zod";

const LoginSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, { message: "Username is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z]).*$/, {
      message: "Password must at least contain one capital character",
    })
    .regex(/^(?=.*[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/gi, {
      message: "Password must at least contain one special character",
    }),
});

export default LoginSchema;
