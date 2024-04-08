"use client";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Navlink from "@/app/_components/_parts/navlink";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import EclipseButton from "@/app/_components/_parts/eclipse-button";
import { useAtom } from "jotai";
import { navigationLinks } from "@/data/navigation";
import MobileMenuButton from "@/app/_components/mobile-menu";
import Logo from "@/components/logo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AuthenticatedUser from "./_parts/authenticated-user";
import { LuLoader2 } from "react-icons/lu";

export default function Navbar({ className, ...props }: ComponentProps<"div">) {
  const [navlinks] = useAtom(navigationLinks);

  const { data: session, status } = useSession();

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
          {!session && (
            <Button
              className={cn(
                "flex gap-2",
                status === "loading" ? "pointer-events-none opacity-50" : "",
              )}
              asChild
            >
              <Link href="/login">
                {status != "loading" && (
                  <HiArrowLeftOnRectangle className="text-base" />
                )}
                {status === "loading" && (
                  <LuLoader2 className="animate-spin text-base" />
                )}
                <p>Sign in</p>
              </Link>
            </Button>
          )}
          {session && (
            <AuthenticatedUser
              firstName={session.user.firstName}
              lastName={session.user.lastName}
              username={session.user.username}
              image={session.user.image}
            />
          )}
        </div>
        <div className="flex md:hidden">
          <MobileMenuButton />
        </div>
      </Container>
    </div>
  );
}
