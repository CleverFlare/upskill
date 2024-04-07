import { Calendar } from "@/components/ui/calendar";
import {
  type Control,
  useController,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { HiCalendar } from "react-icons/hi2";
import { type DayPickerSingleProps } from "react-day-picker";

interface DateInputProps<T extends FieldValues>
  extends Omit<
    DayPickerSingleProps,
    "onChange" | "onError" | "value" | "name" | "mode"
  > {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  noHelperText?: boolean;
}

export default function DateInput<T extends FieldValues>({
  control,
  name,
  label,
  required,
  placeholder,
  noHelperText,
  ...props
}: DateInputProps<T>) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const labelId = crypto.randomUUID();

  return (
    <div className="flex flex-col gap-2">
      {!!label && (
        <Label htmlFor={labelId} required={required}>
          {label}
        </Label>
      )}

      <input
        type="text"
        className="hidden"
        value={value}
        onChange={() => onChange()}
        ref={ref}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={labelId}
            className={cn(
              "px-3 focus:ring-2 focus:ring-primary",
              !!error
                ? "border border-destructive focus:ring-destructive"
                : "focus:ring-primary",
            )}
            onBlur={() => onBlur()}
          >
            {value ? (
              <p className="font-normal">{format(value, "PPP")}</p>
            ) : (
              <p className="font-normal text-muted-foreground">
                {placeholder ?? "Date Input"}
              </p>
            )}
            <div className="ms-auto">
              <HiCalendar className="text-gray-500" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            fromYear={1600}
            toYear={2015}
            onSelect={(value) => onChange(value)}
            selected={value}
            {...props}
          />
        </PopoverContent>
      </Popover>

      {!!error && !noHelperText && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
}
