import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function AcceptManyButton({
  ids,
  onSuccess,
}: {
  ids: string[];
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const { mutate, isPending } = api.user.acceptStudents.useMutation({
    onSuccess: () => {
      router.push("?");
      router.refresh();
      !!onSuccess && onSuccess();
    },
  });

  const params: { slug: string } = useParams();

  return (
    <Button
      onClick={() =>
        mutate({
          students: ids as [string, ...string[]],
          courseId: params.slug,
        })
      }
      disabled={!ids.length || isPending}
    >
      {!isPending && <HiOutlineCheckCircle className="me-2 text-base" />}
      {isPending && <LuLoader2 className="me-2 animate-spin text-base" />}
      Accept
    </Button>
  );
}
