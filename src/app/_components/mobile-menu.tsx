"use client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  HiArrowLeftOnRectangle,
  HiArrowRightOnRectangle,
  HiBars3,
  HiOutlineWindow,
} from "react-icons/hi2";
import EclipseButton from "@/app/_components/_parts/eclipse-button";
import Navlink from "@/app/_components/_parts/navlink";
import { Separator } from "@/components/ui/separator";
import { useAtom } from "jotai";
import { navigationLinks } from "@/data/navigation";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function MobileMenuButton() {
  const [navlinks] = useAtom(navigationLinks);
  const { data: session } = useSession();
  const [isSignOutLoading, setSignOutLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleSignOut() {
    setSignOutLoading(true);

    await signOut({
      redirect: false,
    });

    setSignOutLoading(false);

    router.refresh();
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <HiBars3 />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-4 p-4">
          {navlinks.map((navlink, index: number) => (
            <Navlink
              key={`navlink ${index}`}
              href={navlink.href}
              className="w-full"
              buttonClassName="w-full justify-start gap-2"
              size="default"
            >
              {navlink.icon}
              {navlink.title}
            </Navlink>
          ))}
          {!!session && (
            <>
              <Separator decorative />
              <Button
                variant="ghost"
                className="flex w-full flex-1 justify-start gap-2"
                asChild
              >
                <Link href="/workspace">
                  <HiOutlineWindow className="text-base" />
                  Workspace
                </Link>
              </Button>
              <Button
                variant="destructive"
                className="flex w-full flex-1 justify-start gap-2"
                disabled={isSignOutLoading}
                onClick={() => handleSignOut()}
              >
                {!isSignOutLoading && (
                  <HiArrowRightOnRectangle className="text-base" />
                )}
                {isSignOutLoading && <LuLoader2 className="animate-spin" />}
                <p>Sign Out</p>
              </Button>
            </>
          )}
          <Separator decorative />
          <div className="flex items-center justify-between gap-3">
            {!session && (
              <Button
                variant="default"
                className="flex w-full flex-1 gap-2"
                asChild
              >
                <Link href="/login">
                  <HiArrowLeftOnRectangle className="text-base" />
                  <p>Sign In</p>
                </Link>
              </Button>
            )}
            {!!session && (
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={session.user.image} />
                  <AvatarFallback>
                    {session.user.firstName[0]?.toUpperCase()}
                    {session.user.lastName[1]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-base">
                    {session.user.firstName} {session.user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {session.user.username}
                  </p>
                </div>
              </div>
            )}
            <EclipseButton />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
