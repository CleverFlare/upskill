import DataTable from "./_organisms/table";
import { columns, type Student } from "./_components/columns";
import Paginator from "@/components/pagination";
import { db } from "@/server/db";
import { format } from "date-fns";
import ClassDropDown from "./_components/class-drop-down";
import {
  HiExclamationCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | string[]> & {
    page?: string;
    search?: string;
    id?: string;
  };
  params: { slug: string };
}) {
  const studentsData = await db.user.findMany({
    where: {
      AND: [
        {
          courses: {
            some: {
              AND: [
                { courseId: params.slug },
                { isAccepted: true },
                { role: "student" },
              ],
            },
          },
        },
        {
          OR: [
            {
              username: { startsWith: searchParams?.search ?? "" },
            },
            {
              firstName: { startsWith: searchParams?.search ?? "" },
            },
            {
              lastName: { startsWith: searchParams?.search ?? "" },
            },
          ],
        },
      ],
    },
    take: 10,
    skip: searchParams?.page ? 10 * (+searchParams.page - 1) : 0,
    include: {
      classes: {
        where: {
          ...(searchParams?.id && { classId: searchParams.id }),
        },
      },
    },
  });

  let studentsCount = await db.user.count({
    where: {
      AND: [
        {
          courses: {
            some: { AND: [{ courseId: params.slug }, { isAccepted: false }] },
          },
        },
        {
          OR: [
            {
              username: { startsWith: searchParams?.search ?? "" },
            },
            {
              firstName: { startsWith: searchParams?.search ?? "" },
            },
            {
              lastName: { startsWith: searchParams?.search ?? "" },
            },
          ],
        },
      ],
    },
  });

  studentsCount = Math.ceil(studentsCount / 10);

  const data: Student[] = studentsData.map(
    ({ firstName, image, lastName, classes, id, username }) => ({
      firstName,
      lastName,
      id,
      username,
      avatar: image ?? undefined,
      attended: classes[0]?.attended ?? false,
    }),
  );

  const classes = await db.class.findMany({
    where: {
      courseId: params.slug,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Attendance</h1>
      <ClassDropDown
        classes={classes.map((item) => ({ id: item.id, name: item.title }))}
      />
      {!searchParams.id && (
        <p className="flex items-center">
          <HiOutlineExclamationCircle className="me-2 animate-pulse text-xl" />
          You must select a class first to manage its attendance.
        </p>
      )}
      {!!searchParams.id && (
        <>
          <DataTable data={data} columns={columns} />
          {studentsCount > 1 && <Paginator total={studentsCount} />}
        </>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
