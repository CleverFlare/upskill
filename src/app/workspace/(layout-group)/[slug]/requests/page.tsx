import DataTable from "./_organisms/table";
import { type Request, columns } from "./_components/columns";
import Paginator from "@/components/pagination";
import { db } from "@/server/db";
import { format } from "date-fns";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | string[]> & {
    page: string;
    search: string;
  };
  params: { slug: string };
}) {
  const requestsData = await db.user.findMany({
    where: {
      AND: [
        {
          courses: {
            some: {
              AND: [
                { courseId: params.slug },
                { isAccepted: false },
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
      courses: {
        where: {
          courseId: params.slug,
        },
      },
    },
  });

  let requestsCount = await db.user.count({
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

  requestsCount = Math.ceil(requestsCount / 10);

  const data: Request[] = requestsData.map(
    ({ firstName, courses, image, lastName, id, username }) => ({
      firstName,
      lastName,
      id,
      username,
      avatar: image ?? undefined,
      requestDate: format(courses[0]!.createdAt, "PPP"),
    }),
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Requests</h1>
      <DataTable data={data} columns={columns} />
      {requestsCount > 1 && <Paginator total={requestsCount} />}
    </div>
  );
}

export const dynamic = "force-dynamic";
