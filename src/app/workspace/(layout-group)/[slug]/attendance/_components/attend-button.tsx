import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function AttendButton({ id }: { id: string }) {
  const router = useRouter();
  const { mutate, isPending } = api.course.attend.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const searchParams = useSearchParams();

  const { data: session } = useSession();

  return (
    <Button
      size="icon"
      onClick={() =>
        mutate({
          students: [id],
          classId: searchParams.get("id")!,
          userId: session!.user.id,
        })
      }
      disabled={isPending}
    >
      {!isPending && <HiOutlineCheckCircle className="text-base" />}
      {isPending && <LuLoader2 className="animate-spin text-base" />}
    </Button>
  );
}
