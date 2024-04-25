import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineXCircle } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function AbsentButton({ id }: { id: string }) {
  const router = useRouter();
  const { mutate, isPending } = api.course.absent.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const searchParams = useSearchParams();

  return (
    <Button
      size="icon"
      variant="outline"
      className="text-destructive hover:text-destructive"
      onClick={() =>
        mutate({ students: [id], classId: searchParams.get("id")! })
      }
      disabled={isPending}
    >
      {!isPending && <HiOutlineXCircle className="text-base" />}
      {isPending && <LuLoader2 className="animate-spin text-base" />}
    </Button>
  );
}
