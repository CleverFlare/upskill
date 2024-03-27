"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import LoginSchema from "@/schema/login";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useController, useForm } from "react-hook-form";
import {
  HiArrowLeftOnRectangle,
  HiArrowRightOnRectangle,
  HiOutlineUser,
} from "react-icons/hi2";
import type { z } from "zod";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const {
    field: {
      value: usernameValue,
      onChange: usernameChange,
      onBlur: usernameBlur,
      ref: usernameRef,
    },
  } = useController({
    control,
    name: "username",
  });
  const {
    field: {
      value: passwordValue,
      onChange: passwordChange,
      onBlur: passwordBlur,
      ref: passwordRef,
    },
  } = useController({
    control,
    name: "password",
  });

  const router = useRouter();

  const { mutate: login } = api.post.login.useMutation({
    onSuccess: () => {
      router.refresh();
      router.push("/");
    },
  });

  function submitData(data: z.infer<typeof LoginSchema>) {
    login(data);
  }

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="flex flex-col gap-[inherit]"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="username-field" required>
          Username
        </Label>
        <Input
          placeholder="username..."
          id="username-field"
          value={usernameValue}
          onChange={(e) => usernameChange(e.target.value)}
          onBlur={() => usernameBlur()}
          ref={usernameRef}
          className={cn(
            errors?.username
              ? "border border-destructive focus-visible:ring-destructive"
              : "",
          )}
        />
        {!!errors?.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password-field" required>
          Password
        </Label>
        <Input
          placeholder="password..."
          id="password-field"
          value={passwordValue}
          onChange={(e) => passwordChange(e.target.value)}
          onBlur={() => passwordBlur()}
          ref={passwordRef}
          className={cn(
            errors?.password
              ? "border border-destructive focus-visible:ring-destructive"
              : "",
          )}
        />
        {!!errors?.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>
      <Link href="/" className="text-sm text-primary hover:underline">
        Not ready to login? Go home.
      </Link>
      <Button className="flex gap-2">
        <HiArrowLeftOnRectangle className="text-base" />
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
