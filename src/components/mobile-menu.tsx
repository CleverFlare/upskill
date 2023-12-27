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
export default function MobileMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <HiBars3 />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-4 p-4">
          <Navlink
            href="/"
            className="w-full"
            buttonClassName="w-full justify-start gap-2"
            size="default"
          >
            <HiOutlineHome className="text-lg" />
            Home
          </Navlink>
          <Navlink
            href="/about-us"
            className="w-full"
            buttonClassName="w-full justify-start gap-2"
            size="default"
          >
            <HiOutlineInformationCircle className="text-lg" />
            About Us
          </Navlink>
          <Navlink
            href="/courses"
            className="w-full"
            buttonClassName="w-full justify-start gap-2"
            size="default"
          >
            <HiOutlineRectangleGroup className="text-lg" />
            Courses
          </Navlink>
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
