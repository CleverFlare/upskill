import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  HiArrowRightOnRectangle,
  HiArrowUturnLeft,
  HiHome,
  HiOutlineMegaphone,
} from "react-icons/hi2";

export default function Sidebar() {
  return (
    <div className="row-span-2 flex h-full w-[270px] flex-col gap-6 bg-gray-50 p-5">
      <Logo />
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400">
          progress
        </p>
        <Progress value={50} />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400">
          section
        </p>
        <Button className="justify-start gap-2 px-4" size="lg">
          <HiHome className="text-base" />
          Home
        </Button>
        <Button variant="ghost" className="justify-start gap-2 px-4" size="lg">
          <HiOutlineMegaphone className="text-base" />
          Announcements
        </Button>
      </div>
      <div className="mt-auto flex w-full flex-col gap-3">
        <Button variant="outline" className="flex w-full gap-2" asChild>
          <Link href="/">
            <HiArrowUturnLeft />
            Back to website
          </Link>
        </Button>
        <Button variant="destructive" className="flex w-full gap-2">
          <HiArrowRightOnRectangle />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
