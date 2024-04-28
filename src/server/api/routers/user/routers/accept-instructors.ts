import getUsername from "@/lib/get-username";
import { publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/env";
import { render } from "@react-email/render";
import AcceptedEmail from "emails";

const resend = new Resend(env.RESEND_KEY);

export default publicProcedure
  .input(
    z.object({
      instructors: z.string().array().nonempty(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.user.updateMany({
        where: { id: { in: input.instructors } },
        data: { isActive: true },
      });

      const users = await db.user.findMany({
        where: { id: { in: input.instructors } },
      });

      for (const user of users) {
        const { data, error } = await resend.emails.send({
          from: "Upskill <onboarding@resend.dev>",
          to: [user.email],
          subject: "Accepted",
          html: render(AcceptedEmail({ userFirstname: user.firstName })),
        });

        if (!!data)
          console.log(
            `Successfully sent the email to ${user.username}, here is the log:`,
            data,
          );

        if (!!error)
          console.log(
            `Upon sending the accept email for ${user.username}, we stumbled upon the following error:`,
            error,
          );
      }

      const usernames = users.map((user) => `\`${user.username}\``);

      const username = await getUsername(input.userId);

      const report = `The following instructors where accepted: ${new Intl.ListFormat(
        "en",
        { style: "long", type: "conjunction" },
      ).format(usernames)}`;

      await db.log.create({
        data: {
          username: username ?? "Unknown",
          event: "Accept Instructors",
          description: report,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
