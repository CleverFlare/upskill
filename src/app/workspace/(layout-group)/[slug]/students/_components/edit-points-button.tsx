import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function EditPoints({ id }: { id: string }) {
  const router = useRouter();
  const { mutate, isPending } = api.user.acceptStudents.useMutation({
    onSuccess: () => {
      router.push("?");
      router.refresh();
    },
  });

  const params: { slug: string } = useParams();

  return (
    <Button
      size="icon"
      onClick={() => mutate({ students: [id], courseId: params.slug })}
      disabled={isPending}
    >
      {!isPending && <HiOutlineArrowsUpDown className="text-base" />}
      {isPending && <LuLoader2 className="animate-spin text-base" />}
    </Button>
  );
}
