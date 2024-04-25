import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineXCircle } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function AbsentManyButton({
  ids,
  onSuccess,
}: {
  ids: string[];
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const { mutate, isPending } = api.course.absent.useMutation({
    onSuccess: () => {
      router.refresh();
      !!onSuccess && onSuccess();
    },
  });

  const searchParams = useSearchParams();

  return (
    <Button
      onClick={() =>
        mutate({
          students: ids as [string, ...string[]],
          classId: searchParams.get("id")!,
        })
      }
      disabled={!ids.length || isPending}
      variant="outline"
      className="text-destructive hover:text-destructive"
    >
      {!isPending && <HiOutlineXCircle className="me-2 text-base" />}
      {isPending && <LuLoader2 className="me-2 animate-spin text-base" />}
      Absent
    </Button>
  );
}
