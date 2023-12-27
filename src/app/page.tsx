// import Link from "next/link";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiArrowRight, HiArrowRightOnRectangle } from "react-icons/hi2";

// import { CreatePost } from "@/app/_components/create-post";
// import { getServerAuthSession } from "@/server/auth";
// import { api } from "@/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    <Container className="flex flex-1 flex-col justify-center">
      <div className="flex w-1/2 flex-col gap-6">
        <h1 className="text-4xl font-bold md:text-6xl">
          <span className="text-primary">Learn from the best</span> and get
          ahead in your field
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to UpSkill, the only platform you need to unlock your true
          potential and land your dream job, you’ll find all the necessary
          skills required for your career in comprehensible set of courses
          instructed by leading names in the fields.
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" asChild className="flex gap-2">
            <Link href="about-us">
              Learn More About Us
              <HiArrowRight className="text-lg" />
            </Link>
          </Button>
          <Button className="flex gap-2">
            <HiArrowRightOnRectangle className="text-lg" />
            Sign in now
          </Button>
        </div>
      </div>
    </Container>
  );
}
