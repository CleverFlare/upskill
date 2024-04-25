import DataTable from "./_organisms/table";
import { columns, type Submission } from "./_components/columns";
import Paginator from "@/components/pagination";
import { db } from "@/server/db";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | string[]> & {
    page: string;
    search: string;
  };
  params: { slug3: string };
}) {
  const submissionsData = await db.assignmentSubmission.findMany({
    where: {
      AND: [
        {
          assignmentId: params.slug3,
        },
        {
          OR: [
            {
              user: {
                username: { startsWith: searchParams?.search ?? "" },
              },
            },
            {
              user: {
                firstName: { startsWith: searchParams?.search ?? "" },
              },
            },
            {
              user: {
                lastName: { startsWith: searchParams?.search ?? "" },
              },
            },
          ],
        },
      ],
    },
    take: 10,
    skip: searchParams?.page ? 10 * (+searchParams.page - 1) : 0,
    include: {
      user: true,
    },
  });

  let submissionsCount = await db.assignmentSubmission.count({
    where: {
      AND: [
        {
          assignmentId: params.slug3,
        },
        {
          OR: [
            {
              user: {
                username: { startsWith: searchParams?.search ?? "" },
              },
            },
            {
              user: {
                firstName: { startsWith: searchParams?.search ?? "" },
              },
            },
            {
              user: {
                lastName: { startsWith: searchParams?.search ?? "" },
              },
            },
          ],
        },
      ],
    },
  });

  submissionsCount = Math.ceil(submissionsCount / 10);

  const data: Submission[] = submissionsData.map(({ user, id, link }) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    id,
    username: user.username,
    avatar: user?.image ?? undefined,
    link,
  }));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Assignment Submissions</h1>
      <DataTable data={data} columns={columns} />
      {submissionsCount > 1 && <Paginator total={submissionsCount} />}
    </div>
  );
}

export const dynamic = "force-dynamic";
