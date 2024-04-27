"use client";
import FieldInput from "@/components/input/field";
import TextareaInput from "@/components/input/textarea";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import createClassSchema from "@/schema/create-class-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import { type z } from "zod";
import ResourceInput from "./resource-input";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi2";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import { useSession } from "next-auth/react";

interface CreateClassDialogProps {
  data?: {
    videoId: string;
    title: string;
    description: string;
    resources: { title: string; url: string }[];
  };
  onSuccess?: () => void;
}

export default function CreateClassDialog({
  data,
  onSuccess,
}: CreateClassDialogProps) {
  const isEdit = !!data;
  const { control, reset, handleSubmit } = useForm<
    z.infer<typeof createClassSchema>
  >({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      resources: [],
    },
  });
  const {
    field: { value: resourcesValue, onChange: resourcesChange },
  } = useController({
    control,
    name: "resources",
  });

  function handleResourcesChange(
    index: number,
    type: "name" | "url",
    value: string,
  ) {
    const arrayCopy: { name: string; url: string }[] = [...resourcesValue];
    const objToUpdate = {
      ...(arrayCopy[index] as { name: string; url: string }),
    };

    if (type === "name") objToUpdate.name = value;
    else if (type === "url") objToUpdate.url = value;

    arrayCopy[index] = objToUpdate;

    resourcesChange(arrayCopy);
  }

  function handleRemoveResource(index: number) {
    const newArray = [
      ...resourcesValue.slice(0, index),
      ...resourcesValue.slice(index + 1),
    ];
    resourcesChange(newArray);
  }

  const params: { slug: string } = useParams();

  const { mutate, isPending } = api.course.createClass.useMutation({
    onSuccess: () => {
      onSuccess && onSuccess();
      reset();
    },
  });

  const { data: session } = useSession();

  function submitData(data: z.infer<typeof createClassSchema>) {
    mutate({
      ...data,
      courseId: params.slug,
      userId: session!.user.id,
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{isEdit ? "Edit" : "Create"} Class</DialogTitle>
        <DialogDescription>
          Here you can {isEdit ? "edit a" : "create a new"} course
        </DialogDescription>
      </DialogHeader>
      <form
        className="grid-col-1 grid gap-2"
        onSubmit={handleSubmit(submitData)}
      >
        <FieldInput control={control} name="title" placeholder="title..." />
        <FieldInput control={control} name="videoId" placeholder="videoId..." />
        <TextareaInput
          control={control}
          name="description"
          placeholder="description..."
        />
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          Resources
        </p>
        <div className="flex flex-col gap-2">
          {resourcesValue.map((val, index) => (
            <ResourceInput
              name={val.name}
              url={val.url}
              onRemove={() => handleRemoveResource(index)}
              onChange={(type, value) =>
                handleResourcesChange(index, type, value)
              }
              key={`Resource Input ${index}`}
            />
          ))}
          <Button
            type="button"
            onClick={() =>
              resourcesChange([...resourcesValue, { name: "", url: "" }])
            }
          >
            <HiPlus className="me-2 text-base" /> Add a resource
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            {isPending && <LuLoader2 className="me-2 animate-spin text-base" />}
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
