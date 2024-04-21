import Rank, { type RankProps } from "../_components/rank";

export default function List({ students }: { students: RankProps[] }) {
  return (
    <div className="flex flex-col gap-2">
      {students.map((student, index) => (
        <Rank {...student} key={`Rank ${index}`} />
      ))}
    </div>
  );
}
