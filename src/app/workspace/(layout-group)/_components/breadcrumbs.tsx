import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { type ComponentPropsWithRef } from "react";

type BreadcrumbItemType = { name: string; href: string };

interface BreadcrumbsProps extends ComponentPropsWithRef<"nav"> {
  items: (BreadcrumbItemType | string)[];
}

export default function Breadcrumbs({ items, ...rest }: BreadcrumbsProps) {
  return (
    <Breadcrumb {...rest}>
      <BreadcrumbList>
        {items.map((item, index: number) => (
          <>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem className="text-base">
              {!(item as BreadcrumbItemType)?.href && (item as string)}
              {!!(item as BreadcrumbItemType)?.href && (
                <BreadcrumbLink asChild>
                  <Link href={(item as BreadcrumbItemType).href}>
                    {(item as BreadcrumbItemType).name}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
