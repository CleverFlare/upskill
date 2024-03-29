import { cn } from "@/lib/utils";
import type RegisterSchema from "@/schema/register";
import Image from "next/image";
import { useController, type Control } from "react-hook-form";
import type { z } from "zod";

export interface StepType {
  control: Control<z.infer<typeof RegisterSchema>>;
}

export default function StepOne({ control }: StepType) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ control, name: "role" });

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div
          className={cn(
            "flex aspect-square flex-1 cursor-pointer flex-col items-center gap-2 rounded-lg border p-3 shadow",
            value === "student" ? "bg-primary/10 ring-2 ring-primary" : "",
          )}
          onClick={() => onChange("student")}
          onBlur={() => onBlur()}
        >
          <Image
            src="/student.png"
            alt="Student Illustration Image"
            width={143}
            height={143}
          />
          <p className="text-lg font-bold">Student</p>
        </div>
        <div
          className={cn(
            "flex aspect-square flex-1 cursor-pointer flex-col items-center gap-2 rounded-lg border p-3 shadow",
            value === "instructor" ? "bg-primary/10 ring-2 ring-primary" : "",
          )}
          onClick={() => onChange("instructor")}
          onBlur={() => onBlur()}
        >
          <Image
            src="/teacher.png"
            alt="Instructor Illustration Image"
            width={143}
            height={143}
          />
          <p className="text-lg font-bold">Instructor</p>
        </div>
      </div>
      {!!error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
