"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { HiChevronDown } from "react-icons/hi2";
import Question, { type QuestionProps } from "./question";
import { format } from "date-fns";
import { type FormEvent, useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LuLoader2 } from "react-icons/lu";
import collectPoints from "@/server/api/routers/quiz/routers/collect-points";

export interface QuizProps {
  id: string;
  name: string;
  createdAt: string;
  deadline: string | null;
  questions: QuestionProps[];
  defaultOpen?: boolean;
  isCollected?: boolean;
}

export default function Quiz({
  id,
  name,
  deadline,
  createdAt,
  questions,
  defaultOpen,
  isCollected,
}: QuizProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen ?? false);
  const [timeLeft, setTimeLeft] = useState<string | null>();
  const [choices, setChoices] = useState<Record<string, string>>({});

  const { data: session } = useSession();

  useEffect(() => {
    if (!deadline) return;

    const intervalId = setInterval(() => {
      // Convert deadline to Date object
      const deadlineDate = new Date(deadline);

      // Get current date and time
      const currentDate = new Date();

      // Calculate the difference in milliseconds
      const difference = deadlineDate.getTime() - currentDate.getTime();

      // Convert milliseconds to hours, minutes, and seconds
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Format the result
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      setTimeLeft(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setChoices({});
  }, [open]);

  const router = useRouter();

  const { mutate: submitMutate, isPending: submitPending } =
    api.quiz.submitQuiz.useMutation({
      onSuccess: () => {
        router.refresh();
      },
    });

  const { mutate: collectMutate, isPending: collectPending } =
    api.quiz.collectPoints.useMutation({
      onSuccess: () => {
        router.refresh();
      },
    });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !!questions.length &&
      !questions[0]?.chosen &&
      Object.keys(choices).length > 0
    )
      submitMutate({
        id,
        userId: session!.user.id,
        answers: Object.entries(choices).map(([key, value]) => ({
          questionId: key,
          answer: value,
        })),
      });

    if (!!questions.length && questions[0]?.chosen && !deadline && !isCollected)
      collectMutate({ id, userId: session!.user.id });
  }

  return (
    <form
      className="rounded-lg border border-border shadow-sm"
      onSubmit={handleSubmit}
    >
      <Collapsible open={open} onOpenChange={(open) => setOpen(open)}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="flex w-full items-center justify-between px-3"
          >
            <div className="flex items-center gap-3">
              <p className="text-xl font-bold">{name}</p>
              <p className="text-gray-500">{format(createdAt, "PPp")}</p>
              <p>{!!timeLeft && timeLeft}</p>
            </div>
            <HiChevronDown className="text-xl font-bold" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 p-3">
          {questions.map((question) => (
            <Question
              key={question.id}
              {...question}
              onSelect={(id, choice) =>
                setChoices((prev) => ({ ...prev, [id]: choice }))
              }
            />
          ))}
          {!!questions.length &&
            questions[0]?.chosen &&
            !deadline &&
            !isCollected && (
              <Button disabled={collectPending}>
                {collectPending && (
                  <LuLoader2 className="me-2 animate-spin text-base" />
                )}
                Collect
              </Button>
            )}
          {!!questions.length && !questions[0]?.chosen && !!deadline && (
            <Button disabled={submitPending}>
              {submitPending && (
                <LuLoader2 className="me-2 animate-spin text-base" />
              )}
              Submit
            </Button>
          )}
        </CollapsibleContent>
      </Collapsible>
    </form>
  );
}
