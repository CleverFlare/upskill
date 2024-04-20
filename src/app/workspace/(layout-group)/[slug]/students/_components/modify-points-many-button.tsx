import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import ModifyPointsDialog from "./modify-points-dialog";
import { useState } from "react";

export default function ModifyPointsManyButton({
  ids,
  onSuccess,
}: {
  ids: [string, ...string[]];
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button disabled={!ids.length}>
          <HiOutlineArrowsUpDown className="me-2 text-base" />
          Modify Points
        </Button>
      </DialogTrigger>
      <ModifyPointsDialog
        ids={ids}
        onClose={() => setOpen(false)}
        onSuccess={onSuccess}
      />
    </Dialog>
  );
}
