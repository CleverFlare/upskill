import type { StepType } from "./step-one";
import FieldInput from "@/components/input/field";

export default function StepTwo({ control }: StepType) {
  return (
    <div className="flex flex-col gap-5">
      <FieldInput
        control={control}
        name="firstName"
        label="First Name"
        placeholder="first name..."
        required
      />
      <FieldInput
        control={control}
        name="lastName"
        label="Last Name"
        placeholder="last name..."
        required
      />
    </div>
  );
}
