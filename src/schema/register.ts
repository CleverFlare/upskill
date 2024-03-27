import { z } from "zod";

const RegisterSchema = z.object({
  role: z.enum(["student", "instructor"]),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  birthDay: z.date(),
  gender: z.enum(["male", "female"]),
  email: z.string().email(),
  phone: z.string().min(8),
  username: z.string().min(1, { message: "Required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z]).*$/, {
      message: "Password must at least contain one capital character",
    })
    .regex(/^(?=.*[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/gi, {
      message: "Password must at least contain one special character",
    }),
});

export default RegisterSchema;
