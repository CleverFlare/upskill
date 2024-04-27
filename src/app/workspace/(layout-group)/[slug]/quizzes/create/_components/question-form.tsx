import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type createQuizSchema from "@/schema/create-quiz";
import { HiCheck } from "react-icons/hi2";
import Markdown from "react-markdown";
import { NumericFormat } from "react-number-format";
import { type z } from "zod";
import { components } from "../../../assignments/_components/components";

interface QuestionFormProps {
  value: z.infer<typeof createQuizSchema>["questions"][number];
  onChange: (
    value: z.infer<typeof createQuizSchema>["questions"][number],
  ) => void;
}

export default function QuestionForm({ value, onChange }: QuestionFormProps) {
  function handleStatementChange(currentValue: string) {
    value.statement = currentValue;

    onChange(value);
  }

  function handleOptionChange(currentValue: string, index: number) {
    value.options[index] = currentValue;

    onChange(value);
  }

  function setCorrect(currentValue: number) {
    value.correct = currentValue;

    onChange(value);
  }

  function handleSetPoints(currentValue: number) {
    value.points = currentValue;

    onChange(value);
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-muted p-3">
      <Tabs
        defaultValue="write"
        className="mb-2 flex w-full flex-col items-start gap-2"
      >
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="w-full">
          <Textarea
            placeholder="statement..."
            value={value.statement}
            onChange={(e) => handleStatementChange(e.target.value)}
          />
        </TabsContent>
        <TabsContent value="preview" className="w-full">
          <div className="flex flex-col gap-2">
            {!value.statement && (
              <p className="text-muted-foreground">Nothing to preview</p>
            )}
            {!!value.statement && (
              <Markdown components={components}>{value.statement}</Markdown>
            )}
          </div>
        </TabsContent>
      </Tabs>
      {value.options.map((option, index) => (
        <div className="flex gap-2" key={`Option ${index}`}>
          <Button
            variant="outline"
            disabled={value.correct === index}
            size="icon"
            onClick={() => setCorrect(index)}
          >
            <HiCheck />
          </Button>
          <Input
            value={option}
            onChange={(e) => handleOptionChange(e.target.value, index)}
          />
        </div>
      ))}
      <NumericFormat
        customInput={Input}
        onChange={(e) => handleSetPoints(Number(e.currentTarget.value))}
        value={value.points}
        className="max-w-[100px]"
      />
    </div>
  );
}
