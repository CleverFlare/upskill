"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function EnrollButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { mutate } = api.course.enrollRequest.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const params: { slug: string } = useParams();
  const { data: session } = useSession();

  function handleRequest() {
    setIsLoading(true);
    mutate({ id: session!.user.id, courseId: params.slug });
  }

  return (
    <Button onClick={handleRequest} disabled={isLoading}>
      {!isLoading && <HiOutlineUserPlus className="me-2 text-base" />}
      {isLoading && <LuLoader2 className="me-2 animate-spin text-base" />}
      Enroll to this course
    </Button>
  );
}
