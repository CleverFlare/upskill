import TeamMemberCard from "@/components/team-member-card";
import TechnologyCard from "@/components/tech-card";
import Image from "next/image";
import type { ComponentProps } from "react";

interface CourseDetailsProps extends ComponentProps<"div"> {
  name: string;
  description: string;
  bannerUrl: string;
  technologies: { logoUrl: string; name: string }[];
  prerequisites: string[];
}

export default function CourseDetails({
  name,
  bannerUrl,
  description,
  technologies,
  prerequisites,
  ...props
}: CourseDetailsProps) {
  return (
    <div className="flex flex-col gap-10" {...props}>
      <div className="relative h-[217px] w-full overflow-hidden rounded-xl p-5">
        <p className="z-20 text-4xl text-border text-white">{name}</p>
        <Image
          src={bannerUrl}
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
        <p className="text-gray-500 dark:text-gray-300">{description}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          technologies
        </p>
        <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
          {technologies.map((technology) => (
            <TechnologyCard {...technology} />
          ))}
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
        <div className="flex flex-col gap-[10px]">
          {prerequisites.map((prerequisite, index: number) => (
            <div className="flex gap-2">
              <p className="h-full w-5 text-xl font-bold text-primary">
                {index + 1}
              </p>
              <p className="text-gray-500 dark:text-gray-300">{prerequisite}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
