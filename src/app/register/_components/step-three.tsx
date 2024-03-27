import { Label } from "@/components/ui/label";
import type { StepType } from "./step-one";
import { Button } from "@/components/ui/button";
import { NumericFormat } from "react-number-format";
import { HiCalendar } from "react-icons/hi2";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useController } from "react-hook-form";
import { format } from "date-fns";

export default function StepThree({ control }: StepType) {
  const {
    field: { value: birthValue, onChange: birthChange, onBlur: birthBlur },
    fieldState: { error: birthDayError },
  } = useController({
    control,
    name: "birthDay",
  });
  const {
    field: { value: genderValue, onChange: genderChange, onBlur: genderBlur },
    fieldState: { error: genderError },
  } = useController({
    control,
    name: "gender",
  });
  const {
    field: { value: emailValue, onChange: emailChange, onBlur: emailBlur },
    fieldState: { error: emailError },
  } = useController({
    control,
    name: "email",
  });
  const {
    field: { value: phoneValue, onChange: phoneChange, onBlur: phoneBlur },
    fieldState: { error: phoneError },
  } = useController({
    control,
    name: "phone",
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="birth-field" required>
          Birth Day
        </Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="birth-field"
              className={cn(
                "focus:ring-2 focus:ring-primary",
                !!birthDayError
                  ? "border border-destructive focus:ring-destructive"
                  : "focus:ring-primary",
              )}
              onBlur={() => birthBlur()}
            >
              {birthValue ? (
                format(birthValue, "PPP")
              ) : (
                <p className="text-gray-500">birth day...</p>
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
              onSelect={(value) => birthChange(value)}
              selected={birthValue}
            />
          </PopoverContent>
        </Popover>

        {!!birthDayError && (
          <p className="text-sm text-destructive">{birthDayError.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="gender-field" required>
          Gender
        </Label>

        <Select
          value={genderValue}
          onValueChange={(value) => genderChange(value)}
        >
          <SelectTrigger
            id="gender-field"
            className={cn(
              "focus:ring-2",
              !!genderError
                ? "border border-destructive focus:ring-destructive"
                : "focus:ring-primary",
              genderValue ? "" : "text-gray-500",
            )}
            onBlur={() => genderBlur()}
          >
            <SelectValue placeholder="gender..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>

        {!!genderError && (
          <p className="text-sm text-destructive">{genderError.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email-field" required>
          Email
        </Label>
        <Input
          placeholder="email..."
          id="email-field"
          className={cn(
            !!emailError
              ? "border border-destructive focus-visible:ring-destructive"
              : "",
          )}
          onChange={(e) => emailChange(e.target.value)}
          value={emailValue}
        />
        {!!emailError && (
          <p className="text-sm text-destructive">{emailError.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone-field" required>
          Phone Number
        </Label>
        <NumericFormat
          customInput={Input}
          placeholder="phone number..."
          id="phone-field"
          className={cn(
            !!phoneError
              ? "border border-destructive focus-visible:ring-destructive"
              : "",
          )}
          onChange={(e) => phoneChange(e.target.value)}
          value={phoneValue}
        />
        {!!phoneError && (
          <p className="text-sm text-destructive">{phoneError.message}</p>
        )}
      </div>
    </div>
  );
}
