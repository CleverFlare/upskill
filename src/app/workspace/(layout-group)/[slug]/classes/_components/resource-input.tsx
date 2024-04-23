import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiOutlineMinusCircle } from "react-icons/hi2";

interface ResourceInputProps {
  name: string;
  url: string;
  onRemove: () => void;
  onChange: (type: "name" | "url", value: string) => void;
}

export default function ResourceInput({
  name,
  url,
  onRemove,
  onChange,
}: ResourceInputProps) {
  return (
    <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
      <Input
        placeholder="name..."
        value={name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <Input
        placeholder="url..."
        value={url}
        onChange={(e) => onChange("url", e.target.value)}
      />
      <Button variant="outline" size="icon" onClick={() => onRemove()}>
        <HiOutlineMinusCircle className="text-base text-destructive" />
      </Button>
    </div>
  );
}
