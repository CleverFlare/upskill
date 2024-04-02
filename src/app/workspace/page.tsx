import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  if (session.user.role === "admin") redirect("/workspace/admin");

  return <div>Your Courses</div>;
}
