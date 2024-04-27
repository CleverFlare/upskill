"use client";

import DateInput from "@/components/input/date";
import FieldInput from "@/components/input/field";
import TimeInput from "@/components/input/time";
import { Button } from "@/components/ui/button";
import createQuizSchema from "@/schema/create-quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi2";
import { type z } from "zod";
import QuestionForm from "./_components/question-form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import { useSession } from "next-auth/react";

export default function Page() {
  const { control, handleSubmit } = useForm<z.infer<typeof createQuizSchema>>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      questions: [],
    },
  });

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name: "questions",
  });

  const params: { slug: string } = useParams();

  const router = useRouter();

  const { data: session } = useSession();

  const { mutate, isPending } = api.quiz.create.useMutation({
    onSuccess: () => {
      router.push(".");
      router.refresh();
    },
  });

  function submitData(data: z.infer<typeof createQuizSchema>) {
    const date = new Date(data.deadlineDate.toISOString());
    const [hours, minutes] = data.deadlineTime.split(":");
    date.setHours(+hours!);
    date.setMinutes(+minutes!);

    mutate({
      deadline: date.toISOString(),
      questions: data.questions,
      name: data.name,
      courseId: params.slug,
      userId: session!.user.id,
    });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitData)}>
      <h1 className="text-4xl font-bold">Create Quiz</h1>
      <div className="grid grid-cols-3 gap-2">
        <FieldInput control={control} name="name" placeholder="name..." />
        <DateInput
          control={control}
          name="deadlineDate"
          placeholder="date..."
          fromYear={new Date().getFullYear()}
          toYear={new Date().getFullYear() + 10}
        />
        <TimeInput control={control} name="deadlineTime" />
      </div>
      <div
        className={cn(
          "flex flex-col gap-3 rounded-lg p-3",
          error ? "border-2 border-destructive" : "border border-border",
        )}
      >
        {!value.length && (
          <div className="flex flex-col gap-1 p-2 text-center">
            <p className="text-xl font-bold capitalize">Questions</p>
            <p className="text-muted-foreground">
              At least one question is required
            </p>
          </div>
        )}
        {!!value.length &&
          value.map((question, index) => (
            <QuestionForm
              value={question}
              onChange={(newValue) => {
                value[index] = newValue;
                onChange(value);
              }}
            />
          ))}
      </div>
      <Button
        variant="ghost"
        className="border-2 border-dashed border-primary hover:bg-primary/5"
        onClick={() =>
          onChange([
            ...value,
            {
              statement: "",
              points: 0,
              options: ["", "", "", ""],
              correct: "",
            },
          ])
        }
        type="button"
      >
        <HiPlus className="text-primary" />
      </Button>
      <div className="flex w-full justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href=".">Cancel</Link>
        </Button>
        <Button disabled={isPending}>
          {isPending && <LuLoader2 className="me-2 animate-spin text-base" />}
          Create
        </Button>
      </div>
    </form>
  );
}
