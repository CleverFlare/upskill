import TeamMemberCard, {
  type TeamMemberCardProps,
} from "@/components/team-member-card";
import { Button } from "@/components/ui/button";
import { HiTrash } from "react-icons/hi2";

interface TeamMemberCardWithOptionsProps extends TeamMemberCardProps {
  onDelete: () => void;
}

export default function TeamMemberCardWithOptions({
  onDelete,
  ...props
}: TeamMemberCardWithOptionsProps) {
  return (
    <div className="relative">
      <TeamMemberCard {...props} />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 text-destructive hover:text-destructive"
        onClick={() => onDelete()}
      >
        <HiTrash className="text-base" />
      </Button>
    </div>
  );
}
