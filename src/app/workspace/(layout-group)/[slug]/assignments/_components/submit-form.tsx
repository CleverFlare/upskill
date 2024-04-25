"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function SubmitForm({ id }: { id: string }) {
  const [value, setValue] = useState<string>("");
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { mutate } = api.course.submitAssignment.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    mutate({ id, userId: session!.user.id, link: value });
  }
  return (
    <form
      className="flex flex-1 items-center justify-end gap-2"
      onSubmit={handleSubmit}
    >
      <Input
        className="w-full max-w-[350px]"
        placeholder="Submit your assignment link here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button variant="outline" disabled={isLoading || !value}>
        {isLoading && <LuLoader2 className="me-2 animate-spin text-base" />}
        {!isLoading && <HiOutlineArrowRightCircle className="me-2 text-base" />}
        Submit
      </Button>
    </form>
  );
}
