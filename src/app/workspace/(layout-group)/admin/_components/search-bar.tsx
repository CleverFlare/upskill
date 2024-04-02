"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { type FormEventHandler, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    router.push(`?search=${search}`);
  }

  return (
    <form
      onSubmit={handleSubmit as unknown as FormEventHandler<HTMLFormElement>}
      className="flex w-full max-w-[400px] rounded-md focus-within:ring-2 focus-within:ring-primary"
    >
      <Input
        type="search"
        placeholder="Search..."
        className="rounded-ee-none rounded-se-none focus-visible:outline-none focus-visible:ring-0"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-es-none rounded-ss-none"
      >
        <HiMagnifyingGlass className="text-lg" />
      </Button>
    </form>
  );
}
