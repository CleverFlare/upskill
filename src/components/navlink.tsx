"use client";
import Link, { type LinkProps } from "next/link";
import { Button, type ButtonProps } from "./ui/button";
import { usePathname } from "next/navigation";

type NavlinkProps = ButtonProps & LinkProps & { buttonClassName?: string };

export default function Navlink({
  variant,
  size,
  children,
  href,
  className,
  buttonClassName,
  ...props
}: NavlinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={className}>
      <Button
        variant={variant ?? isActive ? "secondary" : "ghost"}
        size={size ?? "sm"}
        className={buttonClassName}
        {...props}
      >
        {children}
      </Button>
    </Link>
  );
}
