import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

export default function AcceptButton({ id }: { id: string }) {
  const router = useRouter();
  const { data: session } = useSession();
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
      onClick={() =>
        mutate({
          students: [id],
          courseId: params.slug,
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
