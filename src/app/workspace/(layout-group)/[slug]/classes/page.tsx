import SubTopic from "@/components/sub-topic";
import Topic from "@/components/topic";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-4xl font-bold">Roadmap</h2>
      <Topic title="JavaScript">
        <SubTopic href="classes/class" completed>
          Variable Declaration
        </SubTopic>
        <SubTopic href="classes/class">Variable Declaration</SubTopic>
      </Topic>
      <Topic title="Functions">
        <SubTopic href="classes/class">Function Declaration</SubTopic>
        <SubTopic href="classes/class">Parameters & Arguments</SubTopic>
      </Topic>
    </div>
  );
}
