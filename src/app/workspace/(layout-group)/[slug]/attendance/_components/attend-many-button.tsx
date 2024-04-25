import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function AttendManyButton({
  ids,
  onSuccess,
}: {
  ids: string[];
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const { mutate, isPending } = api.course.attend.useMutation({
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
    >
      {!isPending && <HiOutlineCheckCircle className="me-2 text-base" />}
      {isPending && <LuLoader2 className="me-2 animate-spin text-base" />}
      Attend
    </Button>
  );
}
