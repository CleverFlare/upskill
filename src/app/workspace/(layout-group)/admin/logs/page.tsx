import { db } from "@/server/db";
import Log from "./_components/log";
import Paginator from "@/components/pagination";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const logs = await db.log.findMany({
    take: 10,
    skip: searchParams?.page ? 10 * (+searchParams.page - 1) : 0,
    orderBy: {
      createdAt: "desc",
    },
  });

  let logsCount = await db.log.count({});

  logsCount = Math.ceil(logsCount / 10);

  return (
    <div className="flex flex-col gap-2">
      {logs.map((log) => (
        <Log
          username={log.username}
          event={log.event}
          createdAt={new Date(log.createdAt)}
          description={log.description}
          key={`Log ${log.id}`}
        />
      ))}
      {logsCount > 1 && <Paginator total={logsCount} />}
    </div>
  );
}
