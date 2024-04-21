import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export interface RankProps {
  rank: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar?: string;
  points: number;
}
export default function Rank({
  rank,
  firstName,
  lastName,
  username,
  avatar,
  points,
}: RankProps) {
  return (
    <div className="grid grid-cols-[minmax(auto,50px)_1fr_auto] items-center rounded-lg bg-gray-500/10 p-3">
      {rank > 0 && rank < 4 && (
        <Image
          src={`/Rank_${rank}.png`}
          width={100}
          height={100}
          alt="rank"
          className="w-4/5 object-cover"
        />
      )}
      {rank >= 4 && (
        <p className="justify-self-center text-3xl font-bold">{rank}</p>
      )}
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>
            {firstName[0]?.toUpperCase()}
            {lastName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>
            {firstName} {lastName}
          </p>
          <p className="text-sm text-muted-foreground">{username}</p>
        </div>
      </div>
      <p className="text-xl font-bold">{points}</p>
    </div>
  );
}
