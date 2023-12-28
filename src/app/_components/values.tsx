"use client";
import { values as valuesData } from "@/data/values";
import { useAtom } from "jotai";

export default function Values() {
  const [values] = useAtom(valuesData);
  return values.map((value) => (
    <div className="flex gap-4" key={`key ${value.headline}`}>
      <div>
        <value.Icon className="text-xl text-primary" />
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        <span className="font-bold text-foreground">{value.headline}</span>{" "}
        {value.text}
      </p>
    </div>
  ));
}
