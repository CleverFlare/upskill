import type { StepType } from "./step-one";
import { SelectItem } from "@/components/ui/select";
import DateInput from "@/components/input/date";
import SelectInput from "@/components/input/select";
import FieldInput from "@/components/input/field";
import NumberInput from "@/components/input/number";

export default function StepThree({ control }: StepType) {
  return (
    <div className="flex flex-col gap-5">
      <DateInput
        control={control}
        name="birthDay"
        label="Birth Day"
        required
        placeholder="birth day..."
      />
      <SelectInput
        control={control}
        name="gender"
        label="Gender"
        required
        placeholder="gender..."
      >
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
      </SelectInput>
      <FieldInput
        control={control}
        name="email"
        required
        type="email"
        label="Email"
        placeholder="email..."
      />
      <NumberInput
        control={control}
        name="phone"
        label="Phone"
        required
        placeholder="phone..."
      />
    </div>
  );
}
