import type createCourseSchema from "@/schema/create-course";
import { useController, type Control } from "react-hook-form";
import type { z } from "zod";
import type { PropertyType } from "./technologies";
import { Button } from "@/components/ui/button";
import { HiPlus, HiTrash } from "react-icons/hi2";

interface PrerequisitesProps {
  control: Control<z.infer<typeof createCourseSchema>>;
  name: keyof z.infer<typeof createCourseSchema>;
}
export default function Prerequisites({ control, name }: PrerequisitesProps) {
  const {
    field: { value: untypedValue, onChange },
  } = useController({
    control,
    name,
  });

  const value = untypedValue as PropertyType<
    z.infer<typeof createCourseSchema>,
    "prerequisites"
  >;

  function handleSetPrerequisite(index: number, newValue: string) {
    const before = value.slice(0, index);
    const after = value.slice(index + 1);
    onChange([...before, newValue, ...after]);
  }

  function handleDeletePrerequisite(index: number) {
    const before = value.slice(0, index);
    const after = value.slice(index + 1);
    onChange([...before, ...after]);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
        prerequisites
      </p>
      <div className="flex flex-col gap-[10px]">
        {(value ?? []).map((prerequisite, index) => (
          <div className="flex gap-2" key={`prerequisites ${index}`}>
            <p className="h-full w-5 text-xl font-bold text-primary">
              {index + 1}
            </p>
            <input
              type="text"
              className="w-full bg-transparent text-gray-500 dark:text-gray-300"
              value={prerequisite}
              placeholder="prerequisite..."
              onChange={(e) => handleSetPrerequisite(index, e.target.value)}
            />
            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive"
              size="icon"
              onClick={() => handleDeletePrerequisite(index)}
              type="button"
            >
              <HiTrash />
            </Button>
          </div>
        ))}
        <Button
          variant="ghost"
          className="border-2 border-dashed border-primary hover:bg-primary/5"
          onClick={() => onChange([...value, ""])}
          type="button"
        >
          <HiPlus className="text-primary" />
        </Button>
      </div>
    </div>
  );
}
