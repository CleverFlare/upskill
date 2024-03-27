"use client";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import Container from "./container";
import { Button } from "./ui/button";
import Navlink from "./navlink";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import EclipseButton from "./eclipse-button";
import { useAtom } from "jotai";
import { navigationLinks } from "@/data/navigation";
import MobileMenuButton from "./mobile-menu";
import Logo from "./logo";
import Link from "next/link";

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
        <Logo />
        <div className=" hidden gap-10 md:flex">
          {navlinks.map((navlink, index: number) => (
            <Navlink key={`navlink ${index}`} href={navlink.href}>
              {navlink.title}
            </Navlink>
          ))}
        </div>
        <div className="hidden gap-3 md:flex">
          <EclipseButton />
          <Button variant="default" className="flex gap-2" asChild>
            <Link href="/login">
              <HiArrowLeftOnRectangle className="text-base" />
              <p>Sign in</p>
            </Link>
          </Button>
        </div>
        <div className="flex md:hidden">
          <MobileMenuButton />
        </div>
      </Container>
    </div>
  );
}
