import type { StepType } from "./step-one";
import FieldInput from "@/components/input/field";

export default function StepFour({ control }: StepType) {
  return (
    <div className="flex flex-col gap-5">
      <FieldInput
        control={control}
        name="username"
        label="Username"
        placeholder="username..."
        required
      />
      <FieldInput
        control={control}
        name="password"
        label="Password"
        placeholder="password..."
        type="password"
        required
      />
    </div>
  );
}
