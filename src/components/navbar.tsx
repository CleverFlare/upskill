import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import Container from "./container";
import { Button } from "./ui/button";

export default function Navbar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className="w-full flex justify-center py-4" {...props}>
      <Container className={cn("flex justify-between items-center w-full", className)}>
        <p className="text-2xl font-bold text-blue-500">UpSkill</p>
        <div className="flex gap-10">
          <Button variant="ghost" size="sm">Home</Button>
          <Button variant="ghost" size="sm">About Us</Button>
          <Button variant="ghost" size="sm">Courses</Button>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="icon">B</Button>
          <Button variant="default">Sign in</Button>
        </div>
      </Container>
    </div>
  )
}
