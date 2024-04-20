import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import ModifyPointsDialog from "./modify-points-dialog";
import { useState } from "react";

export default function ModifyPointsButton({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button size="icon">
          <HiOutlineArrowsUpDown className="text-base" />
        </Button>
      </DialogTrigger>
      <ModifyPointsDialog
        ids={[id]}
        onClose={() => setOpen(false)}
        onSuccess={onSuccess}
      />
    </Dialog>
  );
}
