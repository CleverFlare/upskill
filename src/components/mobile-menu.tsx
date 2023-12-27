"use client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "./ui/button";
import {
  HiArrowRightOnRectangle,
  HiBars3,
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineRectangleGroup,
} from "react-icons/hi2";
import EclipseButton from "./eclipse-button";
import Navlink from "./navlink";
import { Separator } from "./ui/separator";
import { useAtom } from "jotai";
import { navigationLinks } from "@/data/navigation";
export default function MobileMenu() {
  const [navlinks] = useAtom(navigationLinks);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <HiBars3 />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-4 p-4">
          {navlinks.map((navlink) => (
            <Navlink
              href={navlink.href}
              className="w-full"
              buttonClassName="w-full justify-start gap-2"
              size="default"
            >
              {navlink.icon}
              {navlink.title}
            </Navlink>
          ))}
          <Separator decorative />
          <div className="flex gap-3">
            <Button variant="default" className="flex w-full flex-1 gap-2">
              <HiArrowRightOnRectangle />
              <p>Sign in</p>
            </Button>
            <EclipseButton />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
