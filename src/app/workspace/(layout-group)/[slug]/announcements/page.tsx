import { db } from "@/server/db";
import AnnouncementForm from "./_component/announcement-form";
import AnnouncementWithActions from "./_component/announcement-with-actions";
import { getServerAuthSession } from "@/server/auth";
import Announcement from "@/components/announcement";
import Paginator from "@/components/pagination";

export default async function Page({
  params,
  searchParams,
}: {
  params: Record<string, string | string[]> & { slug: string };
  searchParams: { page?: string };
}) {
  const session = await getServerAuthSession();

  const isInstructor = session?.user.role === "instructor";

  const announcementsData = await db.announcement.findMany({
    where: { courseId: params.slug },
    orderBy: { createdAt: "desc" },
    take: 10,
    skip: searchParams?.page ? 10 * (+searchParams.page - 1) : 0,
  });

  let announcementsCount = await db.announcement.count({
    where: { courseId: params.slug },
  });

  announcementsCount = Math.ceil(announcementsCount / 10);

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <div className="flex w-full flex-1 flex-col gap-4 overflow-auto py-4">
        {!announcementsData.length && (
          <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-border">
            <p className="text-xl font-bold capitalize">No announcements yet</p>
            <p className="text-muted-foreground">
              There are currently no announcements to view
            </p>
          </div>
        )}
        {isInstructor &&
          announcementsData.map(({ title, image, content, id }) => (
            <AnnouncementWithActions
              key={`Announcement With Actions ${id}`}
              id={id}
              title={title}
              createdAt={new Date().toISOString()}
              image={image ?? undefined}
            >
              {content}
            </AnnouncementWithActions>
          ))}
        {!isInstructor &&
          announcementsData.map(({ title, image, content, id }) => (
            <Announcement
              key={`Announcement ${id}`}
              title={title}
              createdAt={new Date().toISOString()}
              image={image ?? undefined}
            >
              {content}
            </Announcement>
          ))}
        {announcementsCount > 1 && <Paginator total={announcementsCount} />}
      </div>
      {isInstructor && <AnnouncementForm courseId={params.slug} />}
    </div>
  );
}

export const dynamic = "force-dynamic";
