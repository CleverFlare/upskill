import { HiOutlineCheckCircle, HiOutlineMinusCircle } from "react-icons/hi2";
import { Button, type ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SubTopicProps extends ButtonProps {
  href: string;
  completed?: boolean;
}

export default function Topic({
  href,
  completed,
  className,
  variant = "outline",
  children,
  title,
  ...props
}: SubTopicProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        "h-max justify-start rounded-lg px-4 py-1 text-base shadow",
        completed
          ? "border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900"
          : "",
        className,
      )}
      title={title ?? String(children)}
      {...props}
      asChild
    >
      <Link href={href}>
        {completed && (
          <HiOutlineCheckCircle className="me-2 text-lg text-primary" />
        )}
        {!completed && (
          <HiOutlineMinusCircle className="me-2 text-lg text-gray-500" />
        )}
        <p className="w-full overflow-hidden text-ellipsis">{children}</p>
      </Link>
    </Button>
  );
}
