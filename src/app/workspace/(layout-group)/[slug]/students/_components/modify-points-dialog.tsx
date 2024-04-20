import NumberInput from "@/components/input/number";
import SelectInput from "@/components/input/select";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SelectItem } from "@/components/ui/select";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LuLoader2 } from "react-icons/lu";
import { z } from "zod";

const zodType = z.object({
  type: z.enum(["addition", "subtraction"]),
  number: z.number(),
});

export default function ModifyPointsDialog({
  ids,
  onClose,
  onSuccess,
}: {
  ids: [string, ...string[]];
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const { control, reset, handleSubmit } = useForm<z.infer<typeof zodType>>({
    defaultValues: {
      type: "addition",
    },
    resolver: zodResolver(zodType),
  });

  const router = useRouter();

  const { mutate, isPending } = api.user.modifyStudentsPoints.useMutation({
    onSuccess: () => {
      router.refresh();
      onClose();
      reset();
      onSuccess && onSuccess();
    },
  });

  const params: { slug: string } = useParams();

  function submitData(data: z.infer<typeof zodType>) {
    mutate({
      type: data.type,
      number: data.number,
      ids,
      courseId: params.slug,
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Modify Points</DialogTitle>
        <DialogDescription>
          Modify the points of the student[s] by increasing or decreasing them.
        </DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitData)}>
        <div className="grid gap-2 sm:grid-cols-[100px_1fr]">
          <SelectInput control={control} name="type">
            <SelectItem value="addition">Add</SelectItem>
            <SelectItem value="subtraction">Subtract</SelectItem>
          </SelectInput>
          <NumberInput
            control={control}
            name="number"
            placeholder="Number..."
            valueAsNumber
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} aria-disabled={isPending}>
            {isPending && <LuLoader2 className="me-2 animate-spin" />}
            Modify
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
