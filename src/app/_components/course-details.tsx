import TeamMemberCard from "@/components/team-member-card";
import TechnologyCard from "@/components/tech-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

export default function CourseDetails() {
  return (
    <div className="flex flex-col gap-10">
      <div className="relative h-[217px] w-full overflow-hidden rounded-xl p-5">
        <p className="z-20 text-4xl text-border text-white">
          Front-End Development
        </p>
        <Image
          src="/course thumbnail.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="-z-10"
          alt="banner"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          track description
        </p>
        <p className="text-gray-500 dark:text-gray-300">
          Imagine crafting worlds of vibrant pixels, where every click sparks
          magic and design dances with interactivity. That's front-end
          development: bringing websites and apps to life, pixel by pixel, line
          by line. It's not just coding, it's conjuring experiences, weaving
          user journeys, and shaping the digital landscapes we explore every
          day. Buckle up, because in front-end, every line is an adventure!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          technologies
        </p>
        <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
          <TechnologyCard />
          <TechnologyCard />
          <TechnologyCard />
          <TechnologyCard />
          <TechnologyCard />
          <TechnologyCard />
          <TechnologyCard />
          <TechnologyCard />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          team
        </p>
        <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
          <TeamMemberCard />
          <TeamMemberCard />
          <TeamMemberCard />
          <TeamMemberCard />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          prerequisites
        </p>
        <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
          <div className="flex gap-2">
            <p className="h-full w-5 text-xl font-bold text-primary">1</p>
            <p className="text-gray-500 dark:text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores perferendis tempore repellendus impedit consequatur!
              Neque voluptatum nostrum voluptates officia vitae, recusandae
              debitis nam id quae laudantium esse, quia impedit ratione.
            </p>
          </div>
          <div className="flex gap-2">
            <p className="h-full w-5 text-xl font-bold text-primary">2</p>
            <p className="text-gray-500 dark:text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores perferendis tempore repellendus impedit consequatur!
              Neque voluptatum nostrum voluptates officia vitae, recusandae
              debitis nam id quae laudantium esse, quia impedit ratione.
            </p>
          </div>
        </div>
        <Button variant="outline" className="flex gap-2" asChild>
          <Link href="/">
            <HiArrowRightOnRectangle />
            <p>Sign in to enroll</p>
          </Link>
        </Button>
      </div>
    </div>
  );
}
