"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineUserMinus } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function UnenrollButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { mutate } = api.user.deleteCourseStudents.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const params: { slug: string } = useParams();
  const { data: session } = useSession();

  function handleRequest() {
    setIsLoading(true);
    mutate({
      students: [session!.user.id],
      courseId: params.slug,
      userId: session!.user.id,
    });
  }

  return (
    <Button
      onClick={handleRequest}
      disabled={isLoading}
      variant="outline"
      className="text-destructive hover:text-destructive"
    >
      {!isLoading && <HiOutlineUserMinus className="me-2 text-base" />}
      {isLoading && <LuLoader2 className="me-2 animate-spin text-base" />}
      Remove enroll request
    </Button>
  );
}
