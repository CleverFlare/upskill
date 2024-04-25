import { cn } from "@/lib/utils";
import type { Element } from "hast";
import Image from "next/image";
import { HiLink } from "react-icons/hi2";
import { type ExtraProps } from "react-markdown";

type Components = Partial<{
  [TagName in keyof JSX.IntrinsicElements]:  // Class component:
    | (new (
        props: JSX.IntrinsicElements[TagName] & ExtraProps,
      ) => JSX.ElementClass)
    // Function component:
    | ((
        props: JSX.IntrinsicElements[TagName] & ExtraProps,
      ) => JSX.Element | string | null | undefined)
    // Tag name:
    | keyof JSX.IntrinsicElements;
}>;

export const components: Components = {
  h1: ({ className, ...props }) => (
    <h1 className={cn("text-6xl font-bold", className)} {...props}></h1>
  ),
  h2: ({ className, ...props }) => (
    <h1 className={cn("text-5xl font-bold", className)} {...props}></h1>
  ),
  h3: ({ className, ...props }) => (
    <h1 className={cn("text-4xl font-bold", className)} {...props}></h1>
  ),
  h4: ({ className, ...props }) => (
    <h1 className={cn("text-3xl font-bold", className)} {...props}></h1>
  ),
  h5: ({ className, ...props }) => (
    <h1 className={cn("text-2xl font-bold", className)} {...props}></h1>
  ),
  h6: ({ className, ...props }) => (
    <h1 className={cn("text-1xl font-bold", className)} {...props}></h1>
  ),
  p: ({ className, ...props }) => (
    <p className={cn("inline-code-paragraph", className)} {...props}></p>
  ),
  pre: ({ className, ...props }) => (
    <pre className={cn("code-block", className)} {...props}></pre>
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("list-inside list-disc", className)} {...props}></ul>
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("list-inside list-decimal", className)} {...props}></ol>
  ),
  img: ({ className, src, alt, ...props }) => (
    <img
      className={cn("rounded-lg", className)}
      src={src}
      alt={alt ?? "Image"}
      {...props}
    />
  ),
  a: ({ className, target, children, ...props }) => (
    <a
      className={cn(
        "inline-flex w-max items-center rounded-md bg-primary/10 px-1 py-0.5 hover:bg-primary/20",
        className,
      )}
      target="_blank"
      {...props}
    >
      <HiLink className="me-2 text-base" />
      {children}
    </a>
  ),
};
