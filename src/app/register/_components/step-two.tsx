import { Label } from "@/components/ui/label";
import type { StepType } from "./step-one";
import { Input } from "@/components/ui/input";
import { useController } from "react-hook-form";
import { cn } from "@/lib/utils";

export default function StepTwo({ control }: StepType) {
  const {
    field: {
      value: firstNameValue,
      onChange: firstNameChange,
      onBlur: firstNameBlur,
      ref: firstNameRef,
    },
    fieldState: { error: firstNameError },
  } = useController({ control, name: "firstName" });

  const {
    field: {
      value: lastNameValue,
      onChange: lastNameChange,
      onBlur: lastNameBlur,
      ref: lastNameRef,
    },
    fieldState: { error: lastNameError },
  } = useController({ control, name: "lastName" });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="first-name-field" required>
          First Name
        </Label>
        <Input
          placeholder="first name..."
          id="first-name-field"
          value={firstNameValue}
          onChange={(e) => firstNameChange(e.target.value)}
          onBlur={() => firstNameBlur()}
          ref={firstNameRef}
          className={cn(
            !!firstNameError
              ? "border border-destructive focus-visible:ring-destructive"
              : "",
          )}
        />
        {!!firstNameError && (
          <p className="text-sm text-destructive">{firstNameError.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="last-name-field" required>
          Last Name
        </Label>
        <Input
          placeholder="last name..."
          id="last-name-field"
          value={lastNameValue}
          onChange={(e) => lastNameChange(e.target.value)}
          onBlur={() => lastNameBlur()}
          ref={lastNameRef}
          className={cn(
            !!lastNameError
              ? "border border-destructive focus-visible:ring-destructive"
              : "",
          )}
        />
        {!!lastNameError && (
          <p className="text-sm text-destructive">{lastNameError.message}</p>
        )}
      </div>
    </div>
  );
}
