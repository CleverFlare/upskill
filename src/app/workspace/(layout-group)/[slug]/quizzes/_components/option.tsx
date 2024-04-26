import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { HiCheck, HiXMark } from "react-icons/hi2";

const optionVariants = cva("group box-content flex justify-between px-2 py-1", {
  variants: {
    state: {
      default: "bg-white hover:bg-white dark:bg-black dark:hover:bg-black",
      selected: "bg-primary hover:bg-primary",
      correct: "bg-green-600 hover:bg-green-600",
      wrong: "bg-destructive hover:bg-destructive",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

const orderVariants = cva(
  "me-2 flex aspect-square w-8 items-center justify-center rounded-md text-base font-bold",
  {
    variants: {
      state: {
        default: "bg-slate-200 dark:bg-slate-700",
        selected: "bg-blue-500",
        correct: "bg-green-400 dark:bg-green-700",
        wrong: "bg-red-400 dark:bg-red-700",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

interface OptionProps {
  id: string;
  order: string;
  selected: string;
  correct?: string;
  chosen?: string;
  onSelect?: (id: string) => void;
  body: string;
}

export default function Option({
  id,
  selected,
  chosen,
  correct,
  onSelect,
  order,
  body,
}: OptionProps) {
  let state: "default" | "correct" | "wrong" | "chosen" | "selected" =
    "default";

  const isChoiceIncorrect =
    correct && chosen && correct !== chosen && chosen === id;

  if (correct && correct === id) state = "correct";
  else if (isChoiceIncorrect) state = "wrong";
  else if (selected && selected === id) state = "selected";

  return (
    <Button
      variant="outline"
      size="lg"
      className={cn(optionVariants({ state }))}
      onClick={() => onSelect && !correct && onSelect(id)}
      type="button"
    >
      <div className="flex items-center">
        <span className={cn(orderVariants({ state }))}>{order}</span>
        {body}
      </div>
      <div className="me-2">
        {correct && correct === id && (
          <HiCheck className="text-xl text-green-800" />
        )}
        {isChoiceIncorrect && <HiXMark className="text-xl text-red-700" />}
      </div>
    </Button>
  );
}
