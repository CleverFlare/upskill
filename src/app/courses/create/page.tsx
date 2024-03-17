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
import Image from "next/image";
import { FormEvent, FormEventHandler, createRef, useState } from "react";
import { HiPencil, HiPhoto, HiPlus, HiTrash } from "react-icons/hi2";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import base64 from "next-base64";
import { toBase64 } from "@/lib/to-base64";

type TechnologiesStateType = Record<string, { name: string; image: Blob }>;

export default function Page() {
  const [title, setTitle] = useState<string>("Title");
  const [description, setDescription] = useState<string>("");
  const [prerequisites, setPrerequisites] = useState<string[]>([""]);
  const [technologies, setTechnologies] = useState<TechnologiesStateType>({});
  const [banner, setBanner] = useState<Blob | null>();
  const [thumbnail, setThumbnail] = useState<Blob | null>();
  const [technologyName, setTechnologyName] = useState<string>("");
  const [technologyImage, setTechnologyImage] = useState<Blob | null>();
  const bannerFileInputRef = createRef<HTMLInputElement>();
  const thumbnailFileInputRef = createRef<HTMLInputElement>();
  const router = useRouter();

  const createCourse = api.post.createCourse.useMutation({
    onSuccess: () => {
      router.push("/courses");
    },
  });

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log(thumbnail);
    const encodedThumbnail = await toBase64(thumbnail!);
    const encodedBanner = await toBase64(banner!);
    const technologiesWithEncodedLogos = await Promise.all(
      Object.entries(technologies).map(async ([_, data]) => {
        const logo = (await toBase64(data.image as File)) as string;
        return {
          name: data.name,
          logo,
        };
      }),
    );
    createCourse.mutate({
      name: title,
      prerequisites,
      technologies: technologiesWithEncodedLogos,
      description,
      thumbnail: encodedThumbnail as string,
      banner: encodedBanner as string,
    });
  }

  return (
    <Container className="py-5">
      <form className="flex flex-col gap-10" onSubmit={(e) => handleSubmit(e)}>
        <div className="relative h-[217px] w-full overflow-hidden rounded-xl p-5">
          <textarea
            className="z-20 h-full w-1/2 resize-none bg-transparent text-4xl text-border text-white outline-none"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="absolute right-4 top-4 flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-white dark:hover:bg-gray-500/20"
                >
                  <HiPhoto />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Course Thumbnail</DialogTitle>
                  <DialogDescription>
                    This will set the course thumbnail.
                  </DialogDescription>
                </DialogHeader>
                <div
                  className="relative aspect-video h-[200px] cursor-pointer overflow-hidden rounded-xl bg-gray-200"
                  onClick={() => thumbnailFileInputRef.current?.click()}
                >
                  {!!thumbnail && (
                    <Image
                      src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt="thumbnail"
                    />
                  )}
                  <input
                    type="file"
                    ref={thumbnailFileInputRef}
                    className="hidden"
                    onChange={(e) => setThumbnail(e?.target?.files?.[0])}
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setThumbnail(null)}
                    className="text-destructive hover:text-destructive"
                    type="button"
                  >
                    Remove
                  </Button>
                  <DialogClose asChild>
                    <Button type="button">Save</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white dark:hover:bg-gray-500/20"
              onClick={() => bannerFileInputRef.current?.click()}
              type="button"
            >
              <HiPencil />
            </Button>
          </div>
          <input
            type="file"
            ref={bannerFileInputRef}
            onChange={(e) => setBanner(e?.target?.files?.[0] ?? null)}
            className="hidden"
          />
          <Image
            src={banner ? URL.createObjectURL(banner) : ""}
            layout="fill"
            objectFit={banner ? "cover" : "contain"}
            objectPosition="center"
            className="-z-10 bg-gray-200"
            alt="banner"
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
            {Object.entries(technologies).map(([id, technology]) => (
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
                  type="button"
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
                    <Button onClick={() => handleAddTechnology()} type="button">
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
                  type="button"
                >
                  <HiTrash />
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              className="border-2 border-dashed border-primary hover:bg-primary/5"
              onClick={() => setPrerequisites((prev) => [...prev, ""])}
              type="button"
            >
              <HiPlus className="text-primary" />
            </Button>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button disabled={createCourse.isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Container>
  );
}
