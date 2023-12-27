"use client";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import Container from "./container";
import { Button } from "./ui/button";
import Navlink from "./navlink";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import EclipseButton from "./eclipse-button";
import MobileMenu from "./mobile-menu";
import { useAtom } from "jotai";
import { navigationLinks } from "@/data/navigation";

export default function Navbar({ className, ...props }: ComponentProps<"div">) {
  const [navlinks] = useAtom(navigationLinks);

  return (
    <div
      className="border-gray/20 flex w-full justify-center border-b py-4"
      {...props}
    >
      <Container
        className={cn("flex w-full items-center justify-between", className)}
      >
        <p className="text-2xl font-bold text-blue-500">UpSkill</p>
        <div className=" hidden gap-10 md:flex">
          {navlinks.map((navlink) => (
            <Navlink href={navlink.href}>{navlink.title}</Navlink>
          ))}
        </div>
        <div className="hidden gap-3 md:flex">
          <EclipseButton />
          <Button variant="default" className="flex gap-2">
            <HiArrowRightOnRectangle />
            <p>Sign in</p>
          </Button>
        </div>
        <div className="flex md:hidden">
          <MobileMenu />
        </div>
      </Container>
    </div>
  );
}
