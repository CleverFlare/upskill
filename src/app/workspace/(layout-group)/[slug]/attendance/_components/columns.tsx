"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import AttendButton from "./attend-button";
import AbsentButton from "./absent-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar?: string;
  attended: boolean;
};

export const columns: ColumnDef<Student>[] = [
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
    accessorKey: "attended",
    header: "Attended",
    cell: ({ row }) => (
      <p
        className={cn(
          "w-max rounded-md px-2 py-[2px]",
          row.original.attended
            ? "bg-green-500/20 text-green-500"
            : "bg-red-500/20 text-red-500",
        )}
      >
        {row.original.attended ? "Attendant" : "Unattendant"}
      </p>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({
      row: {
        original: { attended, id },
      },
    }) => {
      return (
        <div className="flex gap-2">
          {!attended && <AttendButton id={id} />}
          {attended && <AbsentButton id={id} />}
        </div>
      );
    },
  },
];
