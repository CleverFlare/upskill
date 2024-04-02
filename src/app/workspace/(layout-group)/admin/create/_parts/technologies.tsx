import type createCourseSchema from "@/schema/create-course";
import createTechnologySchema from "@/schema/create-technology";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control, useController } from "react-hook-form";
import type { z } from "zod";
import { LogoField, NameField } from "./create-tech-fields";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPlus } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import TechnologyCard from "@/components/tech-card";
import { useState } from "react";

export type PropertyType<T, K extends keyof T> = T[K]; // Generic to represent property type

interface TechnologiesProps {
  control: Control<z.infer<typeof createCourseSchema>>;
  name: keyof z.infer<typeof createCourseSchema>;
  error?: string;
  isEdit?: boolean;
}

export default function Technologies({
  control: externalControl,
  name: externalName,
  error,
}: TechnologiesProps) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof createTechnologySchema>>({
    resolver: zodResolver(createTechnologySchema),
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const {
    field: { value: unknownValue, onChange },
  } = useController({
    control: externalControl,
    name: externalName,
  });

  const value = unknownValue as PropertyType<
    z.infer<typeof createCourseSchema>,
    "technologies"
  >;

  function submitData(data: z.infer<typeof createTechnologySchema>) {
    onChange({ ...value, [crypto.randomUUID()]: data });
    setOpenDialog(false);
    reset();
  }

  function handleDeleteTechnology(id: string) {
    onChange(() => {
      delete value[id];
      return { ...value };
    });
  }

  function handleOpenChange(open: boolean) {
    if (open) return;
    reset();
    setOpenDialog(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
        technologies
      </p>
      <div className="flex flex-col gap-2">
        <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
          {Object?.entries(value ?? {})?.map(([id, { name, logo }]) => (
            <TechnologyCard
              key={id}
              logoUrl={URL.createObjectURL(logo)}
              name={name}
              onDelete={() => handleDeleteTechnology(id)}
            />
          ))}
          <Dialog onOpenChange={handleOpenChange} open={openDialog}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="h-screen max-h-24 w-full max-w-24  border-2 border-dashed border-primary hover:bg-primary/5"
                type="button"
                onClick={() => setOpenDialog(true)}
              >
                <HiPlus className="text-primary" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form
                onSubmit={(e) => {
                  e.stopPropagation();
                  return handleSubmit(submitData)(e);
                }}
              >
                <DialogHeader>
                  <DialogTitle>Add a Technology</DialogTitle>
                  <DialogDescription>
                    This will create a new technology.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <NameField
                    control={control}
                    name="name"
                    error={errors?.name?.message}
                  />
                  <LogoField
                    control={control}
                    name="logo"
                    onError={(message) =>
                      setError("logo", { type: "custom", message })
                    }
                    error={errors?.logo?.message}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {!!error && (
          <p className="text-sm text-destructive">
            {typeof error === "object" ? JSON.stringify(error) : error}
          </p>
        )}
      </div>
    </div>
  );
}
