"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSearchParam from "@/hooks/useSearchParams";
import { useEffect, useState } from "react";

export default function ClassDropDown({
  classes,
}: {
  classes: { name: string; id: string }[];
}) {
  const [value, setValue] = useState<string>();
  const { set } = useSearchParam();

  useEffect(() => {
    if (value) set("id", value);
  }, [value]);

  return (
    <Select value={value} onValueChange={(value) => setValue(value)}>
      <SelectTrigger className="max-w-[350px]">
        <SelectValue placeholder="Select class" />
      </SelectTrigger>
      <SelectContent>
        {classes.map((item) => (
          <SelectItem value={item.id}>{item.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
