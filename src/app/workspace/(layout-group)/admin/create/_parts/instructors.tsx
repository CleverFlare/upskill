import type createCourseSchema from "@/schema/create-course";
import { useController, type Control } from "react-hook-form";
import type { z } from "zod";
import ManageInstructorsButton from "../../_components/manage-instructors-button";
import TeamMemberCard from "@/components/team-member-card";

interface InstructorsProps {
  control: Control<z.infer<typeof createCourseSchema>>;
  name: keyof z.infer<typeof createCourseSchema>;
}

type InstructorType = {
  name: string;
  id: string;
  role: string;
  username: string;
  image: string;
};

export default function Instructors({ name, control }: InstructorsProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  console.log("error", error);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
          team
        </p>
        <ManageInstructorsButton
          value={value as InstructorType[]}
          onChange={onChange}
        />
      </div>
      <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
        {(value as InstructorType[]).map(({ name, role, image }) => (
          <TeamMemberCard name={name} role={role} image={image} />
        ))}
      </div>
      {!!error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
