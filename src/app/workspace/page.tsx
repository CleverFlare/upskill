import CourseDetails from "../_components/course-details";

export default function Page() {
  return (
    <CourseDetails
      name="Hi there"
      bannerUrl="/banners/a74b7a07-0f04-4468-a572-b1e26a5b908a.jpg"
      technologies={[
        {
          logoUrl: "/technologies/423da97e-223a-4a36-8f9f-2d5fd4109176.png",
          name: "HTML",
        },
      ]}
      description="Hello there!"
      prerequisites={["Something"]}
    />
  );
}
