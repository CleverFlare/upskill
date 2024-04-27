import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type FormEvent, useEffect, useState } from "react";
import { HiMagnifyingGlass, HiOutlineCog6Tooth } from "react-icons/hi2";
import { LuLoader2 } from "react-icons/lu";

function SelectRole({
  name,
  username,
  image,
  role,
  onRoleChange,
}: {
  name: string;
  username: string;
  image?: string;
  role: string;
  onRoleChange: (value: "head" | "instructor" | "none") => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={image} className="object-cover" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p>{name}</p>
        <p className="text-sm text-gray-500">{username}</p>
      </div>
      <div className="flex flex-1 justify-end">
        <Select value={role} onValueChange={onRoleChange}>
          <SelectTrigger
            className={cn(
              "max-w-[150px]",
              !role ? "text-muted-foreground" : "",
            )}
          >
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="instructor">Instructor</SelectItem>
            <SelectItem value="head">Head</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

type Instructor = {
  id: string;
  name: string;
  username: string;
  role: string;
  image?: string;
};

interface ManageInstructorsButtonProps {
  value: Instructor[];
  onChange: (value: Instructor[]) => void;
}

export default function ManageInstructorsButton({
  value,
  onChange,
}: ManageInstructorsButtonProps) {
  const [search, setSearch] = useState<string>("");

  const [roles, setRoles] = useState<Record<string, string>>({});
  const [instructors, setInstructors] = useState<Omit<Instructor, "role">[]>(
    [],
  );

  const [open, setOpen] = useState<boolean>(false);

  function setReceivedInstructor() {
    const instructorsWithoutRoles = value.map(({ role: _, ...rest }) => ({
      ...rest,
    }));

    setInstructors(instructorsWithoutRoles);
  }

  const { mutateAsync, isPending, data, reset } =
    api.user.getInstructors.useMutation();

  useEffect(() => {
    if (!open) return;
    reset();
    setSearch("");
    setReceivedInstructor();

    const modifiedRoles: Record<string, string> = {};

    value.map(({ id, role }) => {
      modifiedRoles[id] = role;
    });

    setRoles(modifiedRoles);
  }, [open]);

  function handleRoleChange(id: string, role: "instructor" | "head" | "none") {
    const isNone = role === "none";
    setRoles((prevRoles) => ({ ...prevRoles, [id]: isNone ? "" : role }));

    if (isNone)
      setInstructors((prevInstructors) =>
        prevInstructors.filter((instructor) => instructor.id !== id),
      );
    else if (!instructors.filter((instructor) => instructor.id === id).length)
      setInstructors((prevInstructors) => {
        const instructor = data?.find((instructor) => instructor.id === id);
        if (!instructor) return prevInstructors;
        return [
          ...prevInstructors,
          {
            name: `${instructor.firstName} ${instructor.lastName}`,
            username: instructor.username,
            image: instructor.image,
            id: instructor.id,
          } as Omit<Instructor, "role">,
        ];
      });
  }

  function handleSave() {
    const fullInstructorValues = instructors
      .map((instructor) => ({
        ...instructor,
        role: roles[instructor.id],
      }))
      .filter((instructor) => !!instructor.role) as Instructor[];
    onChange(fullInstructorValues);
  }

  async function handleSubmitSearch(e: FormEvent<HTMLFormElement>) {
    e.stopPropagation();
    e.preventDefault();

    if (!search) {
      reset();
      return;
    }

    const queriedInstructors = await mutateAsync(search);

    const modifiedInstructors = queriedInstructors.map((instructor) => ({
      name: `${instructor.firstName} ${instructor.lastName}`,
      username: instructor.username,
      id: instructor.id,
      image: instructor.image ?? undefined,
    }));

    setInstructors(modifiedInstructors);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <HiOutlineCog6Tooth className="me-2 text-base" />
          Manage
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>This is the dialog</DialogTitle>
          <DialogDescription>Manage course instructors here.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 overflow-x-visible">
          <form
            className="flex w-full rounded-md focus-within:ring-2 focus-within:ring-primary"
            onSubmit={handleSubmitSearch}
          >
            <Input
              type="search"
              placeholder="Search..."
              className="rounded-ee-none rounded-se-none focus-visible:outline-none focus-visible:ring-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="outline"
              size="icon"
              className="rounded-es-none rounded-ss-none"
            >
              <HiMagnifyingGlass className="text-lg" />
            </Button>
          </form>
          <div className="flex max-h-[200px] flex-col gap-[inherit] overflow-y-auto">
            {isPending && <LuLoader2 className="animate-spin text-2xl" />}
            {!isPending && !instructors.length && (
              <p className="text-xl font-bold">No Users Found</p>
            )}
            {!isPending &&
              !!data &&
              data.map((instructor) => (
                <SelectRole
                  name={`${instructor.firstName} ${instructor.lastName}`}
                  username={instructor.username}
                  image={instructor.image ?? undefined}
                  role={roles?.[instructor.id] ?? ""}
                  onRoleChange={(value: "head" | "instructor" | "none") =>
                    handleRoleChange(instructor.id, value)
                  }
                />
              ))}
            {!isPending &&
              !data &&
              !!instructors.length &&
              instructors.map((instructor) => (
                <SelectRole
                  name={instructor.name}
                  username={instructor.username}
                  image={instructor.image}
                  role={roles?.[instructor.id] ?? ""}
                  onRoleChange={(value: "head" | "instructor" | "none") =>
                    handleRoleChange(instructor.id, value)
                  }
                />
              ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => handleSave()}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
