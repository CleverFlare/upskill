"use client";
import { useEffect, useState } from "react";
import Option from "./option";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import { components } from "../../assignments/_components/components";

export interface QuestionProps {
  id: string;
  statement: string;
  options: { id: string; body: string }[];
  correct?: string;
  chosen?: string;
  points: number;
  onSelect?: (id: string, choice: string) => void;
}

const orders = ["A", "B", "C", "D"];

export default function Question({
  id,
  statement,
  options,
  correct,
  chosen,
  points,
  onSelect,
}: QuestionProps) {
  const [selected, setSelected] = useState<string>(chosen ?? "");

  function handleSelect(id: string) {
    setSelected(id);
  }

  useEffect(() => {
    onSelect && onSelect(id, selected);
  }, [selected]);

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-muted p-3">
      <div className="flex flex-col gap-2">
        <Markdown components={components}>{statement}</Markdown>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option, index) => (
          <Option
            id={option.id}
            body={option.body}
            selected={selected}
            onSelect={!chosen ? handleSelect : () => undefined}
            order={orders[index] ?? `${index + 1}`}
            correct={correct}
            chosen={chosen}
            key={`Option ${option.id}`}
          />
        ))}
      </div>
      <p className="font-bold">
        Points:{" "}
        <span
          className={cn(
            correct
              ? correct === chosen
                ? "text-green-500"
                : "text-red-500"
              : "",
          )}
        >
          {points}
        </span>
      </p>
    </div>
  );
}
