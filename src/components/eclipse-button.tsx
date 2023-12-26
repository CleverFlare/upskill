"use client";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function EclipseButton() {
  const { setTheme, theme } = useTheme();

  function handleToggleTheme() {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={handleToggleTheme}
    >
      <HiOutlineMoon className="scale-100 transition-all dark:scale-0" />
      <HiOutlineSun className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 transition-all dark:scale-100" />
    </Button>
  );
}
