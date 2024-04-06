"use client";
import { Button } from "@/components/ui/button";
import LoginSchema from "@/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {
  HiArrowLeftOnRectangle,
  HiExclamationCircle,
  HiOutlineUser,
} from "react-icons/hi2";
import type { z } from "zod";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "sonner";
import FieldInput from "@/components/input/field";

export default function Login() {
  const { control, handleSubmit } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function submitData(data: z.infer<typeof LoginSchema>) {
    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      setIsLoading(false);

      if (!res?.ok)
        toast.error(
          <div className="flex gap-2">
            <HiExclamationCircle className="text-2xl text-destructive" />
            <p className="font-bold text-destructive">{res?.error}</p>
          </div>,
        );
      else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="flex flex-col gap-[inherit]"
    >
      <FieldInput
        control={control}
        name="username"
        label="Username"
        placeholder="username..."
        required
      />
      <FieldInput
        control={control}
        name="password"
        label="Password"
        placeholder="password..."
        type="password"
        required
      />
      <Link href="/" className="text-sm text-primary hover:underline">
        Not ready to login? Go home.
      </Link>
      <Button className="flex gap-2" disabled={isLoading}>
        {!isLoading && <HiArrowLeftOnRectangle className="text-base" />}
        {isLoading && <LuLoader2 className="animate-spin" />}
        Login
      </Button>
      <Button variant="outline" className="flex gap-2" asChild>
        <Link href="/register">
          <HiOutlineUser className="text-base" />
          Register
        </Link>
      </Button>
    </form>
  );
}
