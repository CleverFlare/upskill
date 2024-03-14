"use client";
import Container from "@/components/container";
import TeamMemberCard from "@/components/team-member-card";
import TechnologyCard from "@/components/tech-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { HiPlus, HiTrash } from "react-icons/hi2";

type TechnologiesStateType = Record<string, { name: string; image: Blob }>;

export default function Page() {
  const [title, setTitle] = useState<string>("Title");
  const [description, setDescription] = useState<string>("");
  const [prerequisites, setPrerequisites] = useState<string[]>([""]);
  const [technologies, setTechnologies] = useState<TechnologiesStateType>({});
  const [technologyName, setTechnologyName] = useState<string>("");
  const [technologyImage, setTechnologyImage] = useState<Blob | null>();

  function handleDeleteTechnology(id: string) {
    setTechnologies((technologies) => {
      delete technologies[id];
      console.log(technologies);
      return { ...technologies };
    });
  }

  function handleAddTechnology() {
    if (!technologyImage || !technologyName) return;
    setTechnologies((technologies) => ({
      ...technologies,
      [crypto.randomUUID()]: {
        name: technologyName,
        image: technologyImage,
      },
    }));
    setTechnologyName("");
    setTechnologyImage(null);
  }

  function handleSetPrerequisites(index: number, value: string) {
    setPrerequisites((arr) => {
      const before = arr.slice(0, index);
      const after = arr.slice(index + 1);

      return [...before, value, ...after];
    });
  }

  function handleDeletePrerequisite(index: number) {
    setPrerequisites((arr) => {
      const before = arr.slice(0, index);
      const after = arr.slice(index + 1);

      return [...before, ...after];
    });
  }

  return (
    <Container className="py-5">
      <form
        className="flex flex-col gap-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative h-[217px] w-full overflow-hidden rounded-xl bg-gray-400 p-5">
          <textarea
            className="z-20 h-full w-1/2 resize-none bg-transparent text-4xl text-border text-white outline-none"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
            track description
          </p>
          <Textarea
            placeholder="Description..."
            className="resize-y"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
            technologies
          </p>
          <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
            {Object.entries(technologies!).map(([id, technology]) => (
              <TechnologyCard
                key={id}
                logoUrl={URL.createObjectURL(technology.image)}
                name={technology.name}
                onDelete={() => handleDeleteTechnology(id)}
              />
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-screen max-h-24 w-full max-w-24  border-2 border-dashed border-primary hover:bg-primary/5"
                >
                  <HiPlus className="text-primary" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a Technology</DialogTitle>
                  <DialogDescription>
                    This will create a new technology.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                      value={technologyName}
                      onChange={(e) => setTechnologyName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="logoUrl" className="text-right">
                      Logo URL
                    </Label>
                    <Input
                      type="file"
                      id="logoUrl"
                      className="col-span-3"
                      onChange={(e) => {
                        if (!e?.target?.files?.[0]) return;
                        setTechnologyImage(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => handleAddTechnology()}>
                      Save changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
            team
          </p>
          <div className="box-content flex w-full snap-x snap-mandatory flex-wrap gap-4 overflow-x-auto pb-2 md:overflow-x-visible">
            <TeamMemberCard />
            <TeamMemberCard />
            <TeamMemberCard />
            <TeamMemberCard />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold uppercase text-gray-700 dark:text-gray-400">
            prerequisites
          </p>
          <div className="flex flex-col gap-[10px]">
            {prerequisites.map((prerequisite, index) => (
              <div className="flex gap-2" key={`prerequisites ${index}`}>
                <p className="h-full w-5 text-xl font-bold text-primary">
                  {index + 1}
                </p>
                <input
                  type="text"
                  className="w-full bg-transparent text-gray-500 dark:text-gray-300"
                  value={prerequisite}
                  onFocus={() => console.log(prerequisites)}
                  placeholder="prerequisite..."
                  onChange={(e) =>
                    handleSetPrerequisites(index, e.target.value)
                  }
                />
                <Button
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  size="icon"
                  onClick={() => handleDeletePrerequisite(index)}
                >
                  <HiTrash />
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              className="border-2 border-dashed border-primary hover:bg-primary/5"
              onClick={() => setPrerequisites((prev) => [...prev, ""])}
            >
              <HiPlus className="text-primary" />
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
}
