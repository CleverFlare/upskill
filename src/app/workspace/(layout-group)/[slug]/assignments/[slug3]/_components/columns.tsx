"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiLink } from "react-icons/hi2";
import RejectButton from "./reject-button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Submission = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar?: string;
  link: string;
};

export const columns: ColumnDef<Submission>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src={row.original.avatar} />
            <AvatarFallback>
              {row.original.firstName[0]?.toUpperCase()}
              {row.original.lastName[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p>
              {row.original.firstName} {row.original.lastName}
            </p>
            <p className="text-sm text-gray-500">{row.original.username}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => (
      <a
        href={row.original.link}
        target="_blank"
        className="flex w-max items-center overflow-hidden truncate rounded-full bg-primary p-1 px-2 text-white"
      >
        <HiLink className="me-2 text-base text-white" />
        Link
      </a>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      row;
      return (
        <div className="flex gap-2">
          <RejectButton id={row.original.id} />
        </div>
      );
    },
  },
];
