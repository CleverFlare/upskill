import DataTable from "./_organisms/table";
import { type User, columns } from "./_components/columns";
import Paginator from "@/components/pagination";
import { db } from "@/server/db";
import { format } from "date-fns";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[]> & {
    page: string;
    search: string;
  };
}) {
  const requestsData = await db.user.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              role: "student",
            },
            {
              role: "instructor",
              isActive: true,
            },
          ],
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
  });

  let requestsCount = await db.user.count({
    where: {
      AND: [
        {
          OR: [
            {
              role: "student",
            },
            {
              role: "instructor",
              isActive: true,
            },
          ],
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

  const data: User[] = requestsData.map(
    ({
      firstName,
      birthDay,
      email,
      phone,
      gender,
      image,
      lastName,
      id,
      username,
    }) => ({
      firstName,
      lastName,
      id,
      username,
      avatar: image ?? undefined,
      birthDay: format(birthDay, "PPP"),
      email,
      phone,
      gender,
    }),
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Users</h1>
      <DataTable data={data} columns={columns} />
      {requestsCount > 1 && <Paginator total={requestsCount} />}
    </div>
  );
}

export const dynamic = "force-dynamic";
