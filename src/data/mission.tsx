import { atom } from "jotai";

type MissionType = {
  headline: string;
  text: string;
};

export const mission = atom<MissionType[]>([
  {
    headline: "We curate experiences, not just content.",
    text: "Our courses are more than just lectures and dry textbooks. They're interactive projects, real-world challenges, and hands-on workshops that ignite your learning fire.",
  },
  {
    headline: "We connect you with mentors, not just instructors.",
    text: "We believe in the power of mentorship. Our passionate experts are more than just teachers; they're guides, cheerleaders, and partners on your learning journey.",
  },
  {
    headline: "We foster a community, not just a classroom.",
    text: "UpSkill is more than just a platform; it's a vibrant network of learners, entrepreneurs, and experts from all walks of life. We believe in the power of collaboration and shared experiences to accelerate individual progress.",
  },
  {
    headline: "We celebrate mistakes, not failures.",
    text: "We believe that every misstep is a stepping stone. We create a safe space where you can experiment, push boundaries, and learn without fear of judgment.",
  },
  {
    headline: "We empower you to transform, not just train.",
    text: "We're not just about acquiring skills; we're about unlocking your full potential. We equip you with the knowledge, confidence, and agility to thrive in a world that's constantly changing.",
  },
]);
