"use client";
import { mission as missionItems } from "@/data/mission";
import { useAtom } from "jotai";

export default function Mission() {
  const [mission] = useAtom(missionItems);
  return mission.map((item, index: number) => (
    <div className="flex gap-4" key={`mission ${index}`}>
      <div className="text-xl font-bold text-primary">{index + 1}</div>
      <p className="text-gray-600 dark:text-gray-400">
        <span className="font-bold text-foreground">{item.headline}</span>{" "}
        {item.text}
      </p>
    </div>
  ));
}
