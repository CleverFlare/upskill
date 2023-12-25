"use client"
import Link, { type LinkProps } from "next/link";
import { Button, type ButtonProps } from "./ui/button";
import { usePathname } from "next/navigation";

type NavlinkProps = ButtonProps & LinkProps;

export default function Navlink({ variant, size, children, href, asChild, ...props }: NavlinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <Button variant={variant || isActive ? "secondary" : "ghost"} size={size || "sm"} {...props}>
        {children}
      </Button>
    </Link>
  )
}
