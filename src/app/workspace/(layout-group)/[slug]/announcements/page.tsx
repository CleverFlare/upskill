import Announcement from "@/components/announcement";

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col justify-end">
      <div className="flex w-full flex-1 gap-4 overflow-auto py-4">
        <Announcement
          title="Breaking News!"
          createdAt={new Date().toISOString()}
          image="/banners/4e99044f-c339-4aa7-ba92-cc64c08614cb.jpg"
        >
          Hi there!
        </Announcement>
      </div>
      <div></div>
    </div>
  );
}
