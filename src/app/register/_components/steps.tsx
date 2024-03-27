import { type ReactNode } from "react";
import StepOne from "./step-one";
import type { z } from "zod";
import { type FieldErrors, type Control } from "react-hook-form";
import type RegisterSchema from "@/schema/register";
import StepTwo from "./step-two";
import StepThree from "./step-three";
import StepFour from "./step-four";

type StepData = {
  title: string;
  description: string;
  step: (control: Control<z.infer<typeof RegisterSchema>>) => ReactNode;
  error: (errors: FieldErrors<z.infer<typeof RegisterSchema>>) => boolean;
};

export default [
  {
    title: "Registration Role",
    description: "Who are you registering as?",
    step: (control) => <StepOne control={control} />,
    error: (errors) => !!errors?.role,
  },
  {
    title: "Registrant Name",
    description: "What is your name?",
    step: (control) => <StepTwo control={control} />,
    error: (errors) => !!errors?.firstName ?? !!errors?.lastName,
  },
  {
    title: "Registrant Personal Data",
    description: "Almost there, we just need some personal information.",
    step: (control) => <StepThree control={control} />,
    error: (errors) =>
      !!errors?.email ??
      !!errors?.phone ??
      !!errors?.gender ??
      !!errors?.birthDay,
  },
  {
    title: "Personal Identity Data",
    description: "Last step, just fill in your desired username & password",
    step: (control) => <StepFour control={control} />,
    error: (errors) => !!errors?.username ?? !!errors?.password,
  },
] as StepData[];
