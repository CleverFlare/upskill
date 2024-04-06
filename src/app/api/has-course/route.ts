import { db } from "@/server/db";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const validationSchema = z.object({
    userId: z.string(),
    courseId: z.string(),
  });

  const body: z.infer<typeof validationSchema> =
    (await request.json()) as z.infer<typeof validationSchema>;

  const validation = await validationSchema.safeParseAsync(body);

  if (!validation.success)
    return NextResponse.json({ message: "Invalid Input" }, { status: 400 });

  const userCourse = await db.userCourse.findFirst({
    where: {
      userId: body.userId,
      courseId: body.courseId,
    },
  });

  if (!userCourse)
    return NextResponse.json(
      { message: "User doesn't have this course" },
      { status: 401 },
    );

  return NextResponse.json(
    { message: "User has this course" },
    { status: 200 },
  );
}
