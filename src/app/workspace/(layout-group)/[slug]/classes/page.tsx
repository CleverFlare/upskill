import Topic from "@/components/topic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiLink, HiOutlineCheckCircle } from "react-icons/hi2";

export default function Page() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-1 flex-col items-start gap-4">
        <iframe
          src="https://www.youtube.com/embed/ArekDdGCXLM?si=Nvzewi5MohKllUQF"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="aspect-[2/1] max-h-[600px] w-full rounded-lg border-none"
        ></iframe>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold">Title</h2>

          <Button variant="outline">
            <HiOutlineCheckCircle className="me-2 text-base" />
            Mark As Finished
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
            description
          </p>
          <p className="text-gray-500 dark:text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem,
            earum molestiae possimus quas itaque animi expedita accusamus ex.
            Delectus nulla quibusdam, eum reiciendis commodi obcaecati sit
            magnam enim a numquam?
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
            resources
          </p>
          <div className="flex gap-2">
            <Button className="rounded-sm" asChild>
              <Link href="#">
                <HiLink className="me-2 text-base" />
                Some Resource On The Internet
              </Link>
            </Button>
            <Button className="rounded-sm" asChild>
              <Link href="#">
                <HiLink className="me-2 text-base" />
                Some Resource On The Internet
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-[400px] flex-col gap-4">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          Course Content
        </p>
        <div className="flex flex-col gap-2">
          <Topic href="classes/class" completed>
            Variable Declaration
          </Topic>
          <Topic href="classes/class">Variable Declaration</Topic>
          <Topic href="classes/class">Function Declaration</Topic>
          <Topic href="classes/class">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
            maiores!
          </Topic>
        </div>
      </div>
    </div>
  );
}
