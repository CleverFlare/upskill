import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiArrowRightOnRectangle,
  HiOutlineUser,
  HiOutlineWindow,
} from "react-icons/hi2";

interface AuthenticatedUserProps {
  firstName: string;
  lastName: string;
  username: string;
  image?: string;
}

export default function AuthenticatedUser({
  firstName,
  lastName,
  username,
  image,
}: AuthenticatedUserProps) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut({
      redirect: false,
    });
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden rounded-full"
        >
          <HiOutlineUser className="text-lg text-gray-500" />
          {!!image && (
            <Image
              src={image}
              width={50}
              height={50}
              alt="avatar"
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-screen max-w-[300px]">
        <div className="flex gap-2 p-2">
          <Avatar>
            <AvatarImage src={image} className="object-cover" />
            <AvatarFallback>
              {firstName[0]!.toUpperCase() + lastName[0]!.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-base">
              {firstName} {lastName}
            </p>
            <p className="text-sm text-muted-foreground">{username}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/workspace">
            <HiOutlineWindow className="me-2 text-base" />
            Workspace
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:bg-destructive-foreground focus:text-destructive"
          onClick={handleSignOut}
        >
          <HiArrowRightOnRectangle className="me-2 text-base" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
