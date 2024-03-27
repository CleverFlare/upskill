"use client";
import Container from "@/components/container";
import Step from "@/components/step";
import StepLine from "./_components/step-line";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterSchema from "@/schema/register";
import { useState } from "react";
import steps from "./_components/steps";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/trpc/react";
import { LuLoader2 } from "react-icons/lu";

export default function Page() {
  const [stepNumber, setStepNumber] = useState<number>(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  if (stepNumber > steps.length - 1) setStepNumber(steps.length - 1);
  else if (stepNumber < 0) setStepNumber(0);

  const lastStep = stepNumber >= steps.length - 1;
  const firstStep = stepNumber <= 0;

  const { mutate, isLoading } = api.post.register.useMutation();

  function submitData(data: z.infer<typeof RegisterSchema>) {
    mutate(data);
  }

  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <form
        className="flex w-full max-w-[400px] flex-col gap-4"
        onSubmit={handleSubmit(submitData)}
      >
        <div className="flex w-full items-center">
          {steps.map(({ error }, index: number) => {
            const state: "selected" | "checked" | null =
              stepNumber === index
                ? "selected"
                : stepNumber > index
                  ? "checked"
                  : null;

            const lineCheck = stepNumber >= index + 1 ? true : false;

            const stepComp = (
              <Step
                state={state}
                isError={error(errors)}
                onClick={() => setStepNumber(index)}
              />
            );
            if (index === steps.length - 1) return stepComp;

            return (
              <>
                {stepComp}
                <StepLine checked={lineCheck} isError={error(errors)} />
              </>
            );
          })}
        </div>
        <p className="text-3xl font-bold">{steps[stepNumber]!.title}</p>
        <p className="text-gray-500">{steps[stepNumber]!.description}</p>
        {steps[stepNumber]!.step(control)}
        <Link href="/login" className="text-sm text-primary hover:underline">
          Already have an accouent? Go to login.
        </Link>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={stepNumber <= 0}
            onClick={() => setStepNumber((num) => (firstStep ? num : --num))}
          >
            Previous
          </Button>
          <Button
            type={lastStep ? "submit" : "button"}
            disabled={isLoading}
            onClick={() => setStepNumber((num) => (lastStep ? num : ++num))}
          >
            {isLoading && <LuLoader2 className="me-2 animate-spin" />}
            {stepNumber >= steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </Container>
  );
}
