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
  onRoleChange: (value: string) => void;
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

type Instructors = {
  id: string;
  name: string;
  username: string;
  role: string;
  image?: string;
};

interface ManageInstructorsButtonProps {
  value: Instructors[];
  onChange: (value: Instructors[]) => void;
}

export default function ManageInstructorsButton({
  value,
  onChange,
}: ManageInstructorsButtonProps) {
  const [search, setSearch] = useState<string>("");
  const [instructors, setInstructors] = useState(value ?? []);

  const { mutateAsync, isLoading } = api.user.getInstructors.useMutation();

  function handleRoleChange(id: string, role: string) {
    const isNone = role === "none";

    if (isNone && !search)
      setInstructors((users) => users.filter((user) => user.id !== id));
    else
      setInstructors((users) =>
        users.map((user) =>
          user.id === id ? { ...user, role: isNone ? "" : role } : { ...user },
        ),
      );
  }

  function handleSave() {
    console.log(instructors);
    onChange(instructors.filter((instructor) => !!instructor.role));
  }

  async function handleSubmitSearch(e: FormEvent<HTMLFormElement>) {
    e.stopPropagation();
    e.preventDefault();
    const instructorsReturned = await mutateAsync(search);

    setInstructors(
      instructorsReturned.map(
        ({ firstName, id, lastName, image, username }) => ({
          name: firstName + " " + lastName,
          image,
          username,
          role: "",
          id,
        }),
      ) as Instructors[],
    );
  }

  useEffect(() => {
    if (!search)
      setInstructors((prev) => prev.filter((instructor) => !!instructor.role));
  }, [search]);

  return (
    <Dialog>
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
        <div className="flex flex-col gap-6">
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
            {isLoading && <LuLoader2 className="animate-spin text-2xl" />}
            {!isLoading && !instructors.length && (
              <p className="text-xl font-bold">No Users Found</p>
            )}
            {!isLoading &&
              !!instructors.length &&
              instructors.map((instructor) => {
                return (
                  <SelectRole
                    name={instructor.name}
                    username={instructor.username}
                    image={instructor.image}
                    role={instructor.role}
                    onRoleChange={(value) =>
                      handleRoleChange(instructor.id, value)
                    }
                  />
                );
              })}
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
