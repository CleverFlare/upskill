"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { usePagination } from "@mantine/hooks";

export default function Paginator({ total }: { total: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const isPaginating = !!page;

  function onChange(page: number) {
    const nativeSearchParams = new URLSearchParams(searchParams);
    nativeSearchParams.set("page", String(page));
    router.push("?" + nativeSearchParams.toString());
  }

  const { setPage, range, next, previous, active } = usePagination({
    total: total,
    page: isPaginating ? +page : 1,
    onChange,
  });
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={previous} />
        </PaginationItem>
        {range.map((page: number | "dots") =>
          page === "dots" ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationButton
                onClick={() => setPage(page)}
                isActive={page === active}
              >
                {page}
              </PaginationButton>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext onClick={next} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
