import { Label } from "@/components/ui/label";
import type { StepType } from "./step-one";
import { Input } from "@/components/ui/input";
import { useController } from "react-hook-form";
import { cn } from "@/lib/utils";

export default function StepFour({ control }: StepType) {
  const {
    field: {
      value: usernameValue,
      onChange: usernameChange,
      onBlur: usernameBlur,
      ref: usernameRef,
    },
    fieldState: { error: usernameError },
  } = useController({ control, name: "username" });

  const {
    field: {
      value: passwordValue,
      onChange: passwordChange,
      onBlur: passwordBlur,
      ref: passwordRef,
    },
    fieldState: { error: passwordError },
  } = useController({ control, name: "password" });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="first-name-field" required>
          Username
        </Label>
        <Input
          placeholder="username..."
          id="first-name-field"
          value={usernameValue}
          onChange={(e) => usernameChange(e.target.value)}
          onBlur={() => usernameBlur()}
          ref={usernameRef}
          className={cn(
            !!usernameError
              ? "border border-destructive focus-visible:ring-destructive"
              : "",
          )}
        />
        {!!usernameError && (
          <p className="text-sm text-destructive">{usernameError.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="last-name-field" required>
          Password
        </Label>
        <Input
          placeholder="password..."
          id="last-name-field"
          type="password"
          value={passwordValue}
          onChange={(e) => passwordChange(e.target.value)}
          onBlur={() => passwordBlur()}
          ref={passwordRef}
          className={cn(
            !!passwordError
              ? "border border-destructive focus-visible:ring-destructive"
              : "",
          )}
        />
        {!!passwordError && (
          <p className="text-sm text-destructive">{passwordError.message}</p>
        )}
      </div>
    </div>
  );
}
