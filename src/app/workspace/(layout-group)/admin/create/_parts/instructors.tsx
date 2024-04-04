import type createCourseSchema from "@/schema/create-course";
import { useController, type Control } from "react-hook-form";
import type { z } from "zod";
import TeamMemberCardWithOptions from "../../_components/team-member-card-with-options";

interface InstructorsProps {
  control: Control<z.infer<typeof createCourseSchema>>;
  name: keyof z.infer<typeof createCourseSchema>;
}

type InstructorType = {
  name: string;
  id: string;
  role: string;
  image: string;
};

export default function Instructors({ name, control }: InstructorsProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  function handleDelete(id: string) {
    const newValue = (value as InstructorType[]).filter(
      (instructor) => instructor.id !== id,
    );
    onChange(newValue);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          team
        </p>
      </div>
      <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
        {(value as InstructorType[]).map(({ name, role, image, id }) => (
          <TeamMemberCardWithOptions
            name={name}
            role={role}
            image={image}
            onDelete={() => handleDelete(id)}
          />
        ))}
      </div>
      {!!error && (
        <p className="text-sm text-destructive">
          {typeof error === "object" ? JSON.stringify(error) : error}
        </p>
      )}
    </div>
  );
}
