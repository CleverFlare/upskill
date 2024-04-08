import RegisterSchema from "@/schema/register";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import bcrypt from "bcrypt";

export default publicProcedure
  .input(RegisterSchema)
  .mutation(async ({ input }) => {
    try {
      const { birthDay, password, ...restInput } = input;

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await db.user.create({
        data: {
          ...restInput,
          birthDay: birthDay.toISOString(),
          password: hashedPassword,
        },
      });

      console.log(createdUser)

      return createdUser;
    } catch (err) {
      console.log(err);
      throw Error("Some data are invalid");
    }
  });
