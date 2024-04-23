"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { HiPlus } from "react-icons/hi2";
import CreateClassDialog from "./create-class-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddButton() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  function handleSuccess() {
    router.refresh();
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-2 border-dashed border-primary bg-transparent hover:bg-primary/5"
        >
          <HiPlus className="text-base text-primary" />
        </Button>
      </DialogTrigger>
      <CreateClassDialog onSuccess={handleSuccess} />
    </Dialog>
  );
}
