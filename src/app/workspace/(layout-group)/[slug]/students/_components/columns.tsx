"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Request = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar?: string;
  points: number;
};

export const columns: ColumnDef<Request>[] = [
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
    accessorKey: "points",
    header: "Points",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      row;
      return (
        <div className="flex gap-2">
          <EditPoints id={row.original.id} />
          <DeleteButton id={row.original.id} />
        </div>
      );
    },
  },
];
