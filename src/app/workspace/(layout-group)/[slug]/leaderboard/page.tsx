import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="size-20">
            <AvatarImage src="/avatars/avatar.jpg" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <p className="max-w-20 text-center text-sm font-bold">
            FirstName LastName
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar className="size-24">
            <AvatarImage />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <p className="max-w-20 text-center font-bold">FirstName LastName</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar className="size-20">
            <AvatarImage />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <p className="max-w-20 text-center text-sm font-bold">
            FirstName LastName
          </p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="w-5 rounded-es-lg rounded-ss-lg bg-gray-200 font-bold uppercase">
              #
            </TableHead>
            <TableHead className="bg-gray-200 font-bold uppercase">
              USER
            </TableHead>
            <TableHead className="rounded-ee-lg rounded-se-lg bg-gray-200 font-bold uppercase">
              POINTS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src="/avatars/avatar.jpg" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p>Muhammad Maher</p>
                  <p className="text-sm text-gray-500">@username</p>
                </div>
              </div>
            </TableCell>
            <TableCell>3,410</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
