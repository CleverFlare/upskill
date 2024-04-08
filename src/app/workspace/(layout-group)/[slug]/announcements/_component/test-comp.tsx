"use client";
import { api } from "@/trpc/react";
import { useState } from "react";

export default function TestComp() {
  const [message, setMessage] = useState<string | null>();

  api.course.onTest.useSubscription(undefined, {
    onData: (data) => {
      setMessage(data as string);
      console.log(data);
    },
  });

  return <>{!!message && message}</>;
}
