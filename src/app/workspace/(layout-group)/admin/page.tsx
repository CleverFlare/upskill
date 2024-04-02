import { adminOnly } from "@/server/auth";

export default async function Page() {
  await adminOnly();

  return <div>Courses</div>;
}
