import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import DataTable from "./_organisms/table";
import { type Request, columns } from "./_components/columns";
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
        { isActive: false },
        { role: "instructor" },
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
        { isActive: false },
        { role: "instructor" },
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
    ({ firstName, createdAt, image, lastName, id, username }) => ({
      firstName,
      lastName,
      id,
      username,
      avatar: image,
      requestDate: format(createdAt, "PPP"),
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
