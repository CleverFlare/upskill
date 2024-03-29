"use client";
import Container from "@/components/container";
import Step from "@/components/step";
import StepLine from "./_components/step-line";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterSchema from "@/schema/register";
import { LegacyRef, useRef, useState } from "react";
import steps from "./_components/steps";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/trpc/react";
import { LuLoader2 } from "react-icons/lu";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { HiExclamationTriangle } from "react-icons/hi2";
import { useRouter } from "next/navigation";

export default function Page() {
  const [stepNumber, setStepNumber] = useState<number>(0);
  const formRef = useRef<HTMLFormElement | undefined>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  if (stepNumber > steps.length - 1) setStepNumber(steps.length - 1);
  else if (stepNumber < 0) setStepNumber(0);

  const lastStep = stepNumber >= steps.length - 1;
  const firstStep = stepNumber <= 0;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { mutate } = api.auth.register.useMutation({
    onSuccess: async () => {
      try {
        const values = getValues();
        const res = await signIn("credentials", {
          username: values.username,
          password: values.password,
          redirect: false,
        });
        setIsLoading(false);
        if (!res?.ok)
          toast(
            <div className="flex gap-2">
              <HiExclamationTriangle className="text-2xl text-destructive" />
              <p className="text-destructive">Something Went Wrong!</p>
            </div>,
          );
        else {
          router.refresh();
          if (values.role === "instructor") router.push("/submit-success");
          else router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  function submitData(data: z.infer<typeof RegisterSchema>) {
    setIsLoading(true);
    mutate(data);
  }

  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <form
        className="flex w-full max-w-[400px] flex-col gap-4"
        onSubmit={handleSubmit(submitData)}
        ref={formRef as LegacyRef<HTMLFormElement>}
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
            type="button"
            disabled={isLoading}
            onClick={() => {
              setStepNumber((num) => (lastStep ? num : ++num));
              if (lastStep) formRef.current?.requestSubmit();
            }}
          >
            {isLoading && <LuLoader2 className="me-2 animate-spin" />}
            {stepNumber >= steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </Container>
  );
}
