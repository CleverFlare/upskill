import Container from "@/components/container";
import HomeSVG from "@/components/home-svg";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import {
  HiArrowLeftOnRectangle,
  HiArrowRight,
  HiOutlineWindow,
} from "react-icons/hi2";

// import { CreatePost } from "@/app/_components/create-post";
// import { getServerAuthSession } from "@/server/auth";
// import { api } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <main className="flex flex-1 overflow-hidden">
      <Container className="relative flex h-auto flex-1 flex-col py-5">
        <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-6 lg:mt-[150px] lg:h-auto lg:w-1/2 lg:items-start lg:justify-normal">
          <h1 className="text-center text-4xl font-bold sm:text-6xl lg:text-start">
            <span className="text-primary">Learn from the best</span> and get
            ahead in your field
          </h1>
          <p className="text-center text-gray-600 lg:text-start dark:text-gray-400">
            Welcome to Upskill, the only platform you need to unlock your true
            potential and land your dream job, you’ll find all the necessary
            skills required for your career in comprehensible set of courses
            instructed by leading names in the fields.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="ghost" asChild className="flex gap-2">
              <Link href="about-us">
                Learn More About Us
                <HiArrowRight className="text-lg" />
              </Link>
            </Button>
            {!session && (
              <Button className="flex gap-2" asChild>
                <Link href="/login">
                  <HiArrowLeftOnRectangle className="text-lg" />
                  Sign in now
                </Link>
              </Button>
            )}
            {!!session && (
              <Button className="flex gap-2" asChild>
                <Link href="/workspace">
                  <HiOutlineWindow className="text-base" />
                  Your Workspace
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="absolute -right-[600px] -top-[100px] hidden aspect-square h-[1360px] lg:block">
          <HomeSVG />
        </div>
      </Container>
    </main>
  );
}
