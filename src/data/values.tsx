import { atom } from "jotai";

import {
  HiArrowUp,
  HiCog6Tooth,
  HiFire,
  HiPuzzlePiece,
  HiSparkles,
  HiUserGroup,
} from "react-icons/hi2";
import { type IconType } from "react-icons";

type ValuesType = {
  headline: string;
  Icon: IconType;
  text: string;
};

export const values = atom<ValuesType[]>([
  {
    headline: "Transformation, not just training.",
    Icon: HiCog6Tooth as IconType,
    text: "We believe in empowering individuals to unlock their full potential through transformative learning experiences, not just rote memorization.",
  },
  {
    headline: "Adaptability in the face of change.",
    Icon: HiPuzzlePiece as IconType,
    text: "We embrace the ever-evolving landscape of knowledge and equip learners with the skills and agility to thrive in a dynamic world.",
  },
  {
    headline: "Engaging learning, every step of the way.",
    Icon: HiSparkles as IconType,
    text: "We prioritize curiosity and passion over dry lectures, making learning an adventure, not a chore.",
  },
  {
    headline: "Community that fuels growth.",
    Icon: HiUserGroup as IconType,
    text: "We foster a vibrant network of learners, mentors, and experts where collaboration and shared experiences accelerate individual progress.",
  },
  {
    headline: "Embrace mistakes, champion progress.",
    Icon: HiArrowUp as IconType,
    text: "We believe mistakes are stepping stones, not setbacks. We celebrate the journey of learning and encourage continuous improvement.",
  },
  {
    headline: "Passion fuels knowledge.",
    Icon: HiFire as IconType,
    text: "We are driven by a shared passion for learning and believe in the transformative power of knowledge for individuals and communities.",
  },
]);
