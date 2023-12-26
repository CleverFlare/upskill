import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import Container from "./container";
import { Button } from "./ui/button";
import Navlink from "./navlink";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import EclipseButton from "./eclipse-button";

export default function Navbar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className="border-gray/20 flex w-full justify-center border-b py-4"
      {...props}
    >
      <Container
        className={cn("flex w-full items-center justify-between", className)}
      >
        <p className="text-2xl font-bold text-blue-500">UpSkill</p>
        <div className="flex gap-10">
          <Navlink href="/">Home</Navlink>
          <Navlink href="/about-us">About Us</Navlink>
          <Navlink href="/courses">Courses</Navlink>
        </div>
        <div className="flex gap-3">
          <EclipseButton />
          <Button variant="default" className="flex gap-2">
            <HiArrowRightOnRectangle />
            <p>Sign in</p>
          </Button>
        </div>
      </Container>
    </div>
  );
}
