"use client";
import { type ComponentProps } from "react";
import YouTubePlayer from "react-youtube";
export default function YouTube({
  ...props
}: ComponentProps<typeof YouTubePlayer>) {
  return <YouTubePlayer {...props} />;
}
