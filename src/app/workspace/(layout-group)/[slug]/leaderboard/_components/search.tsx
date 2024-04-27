"use client";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams?.get("search") ?? "",
  );
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nativeSearchParams = new URLSearchParams(searchParams);
    nativeSearchParams.set("search", search);
    router.push("?" + nativeSearchParams.toString());
  }
  return (
    <form onSubmit={onSubmit}>
      <Input
        placeholder="Search..."
        className="w-screen max-w-[350px]"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
    </form>
  );
}
