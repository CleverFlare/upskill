import { HiOutlineCheckCircle, HiOutlineMinusCircle } from "react-icons/hi2";
import { Button, type ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface TopicProps extends ButtonProps {
  href: string;
  locked?: boolean;
}

export default function Topic({
  href,
  className,
  variant = "outline",
  children,
  title,
  locked,
  ...props
}: TopicProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        "h-max justify-start rounded-lg px-4 py-1 text-base shadow",
        locked ? "pointer-events-none opacity-50" : "",
        className,
      )}
      title={title ?? String(children)}
      {...props}
      asChild
    >
      <Link href={href}>
        <p className="w-full overflow-hidden text-ellipsis">{children}</p>
      </Link>
    </Button>
  );
}
