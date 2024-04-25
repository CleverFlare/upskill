"use client";
import DateInput from "@/components/input/date";
import FieldInput from "@/components/input/field";
import TextareaInput from "@/components/input/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import createAssignmentSchema from "@/schema/create-assignment";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { components } from "../_components/components";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiOutlineClock } from "react-icons/hi2";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import { useState } from "react";

export default function Page() {
  const { control, handleSubmit, watch } = useForm<
    z.infer<typeof createAssignmentSchema>
  >({
    resolver: zodResolver(createAssignmentSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { mutate } = api.course.createAssignment.useMutation({
    onSuccess: () => {
      router.push(".");
      router.refresh();
    },
  });

  const params: { slug: string } = useParams();

  function submitData(data: z.infer<typeof createAssignmentSchema>) {
    setIsLoading(true);
    mutate({
      courseId: params.slug,
      title: data.title,
      content: data.content,
      dueDate: data.dueDate.toISOString(),
    });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitData)}>
      <h2 className="text-3xl font-bold">Create Assignment</h2>
      <Tabs defaultValue="write" className="flex w-full flex-col gap-[inherit]">
        <TabsList className="w-max">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" asChild>
          <div className="flex flex-col gap-[inherit]">
            <div className="grid max-w-[600px] grid-cols-2 gap-2">
              <FieldInput
                control={control}
                name="title"
                placeholder="title..."
              />
              <DateInput
                control={control}
                name="dueDate"
                placeholder="due date..."
                fromYear={new Date().getFullYear()}
                toYear={new Date().getFullYear() + 10}
                disabled={{ before: new Date() }}
              />
            </div>
            <TextareaInput
              control={control}
              name="content"
              placeholder="content"
              className="h-[200px]"
            />
          </div>
        </TabsContent>
        <TabsContent value="preview" asChild>
          <div className="flex flex-col gap-[inherit]">
            <h2 className="text-3xl font-bold">{watch().title}</h2>
            <p className="text-sm text-gray-500">
              {format(new Date().toISOString(), "PPp")}
            </p>
            <div className="flex flex-col gap-2">
              <Markdown components={components}>{watch().content}</Markdown>
            </div>
            {!!watch().dueDate && (
              <p className="flex items-center text-base text-gray-500">
                <HiOutlineClock className="me-2 text-xl text-gray-500" />
                {format(watch().dueDate.toISOString(), "PPp")}
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="outline" asChild type="button">
          <Link href=".">Cancel</Link>
        </Button>
        <Button disabled={isLoading}>
          {isLoading && <LuLoader2 className="me-2 animate-spin text-base" />}
          Create
        </Button>
      </div>
    </form>
  );
}
