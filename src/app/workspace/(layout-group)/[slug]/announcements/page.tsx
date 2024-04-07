import Announcement from "@/components/announcement";
import { db } from "@/server/db";
import AnnouncementForm from "./_component/announcement-form";

export default async function Page({
  params,
}: {
  params: Record<string, string | string[]> & { slug: string };
}) {
  const announcementsData = await db.announcement.findMany({
    where: { courseId: params.slug },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <div className="flex w-full flex-1 flex-col gap-4 overflow-auto py-4">
        {!announcementsData.length && (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-3xl font-bold text-gray-400">Empty</p>
          </div>
        )}
        {announcementsData.map(({ title, image, content, id }) => (
          <Announcement
            key={id}
            title={title}
            createdAt={new Date().toISOString()}
            image={image ?? undefined}
          >
            {content}
          </Announcement>
        ))}
      </div>
      <AnnouncementForm courseId={params.slug} />
    </div>
  );
}
