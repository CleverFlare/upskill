import { type AssignmentProps } from "./assignment";

export const data: AssignmentProps[] = [
  {
    id: "3",
    title: "First",
    createdAt: new Date().toISOString(),
    dueDate: new Date("10-22-2024").toISOString(),
    content: "This is the third assignment",
  },
  {
    id: "2",
    title: "Second",
    createdAt: new Date().toISOString(),
    dueDate: new Date("10-22-2023").toISOString(),
    content: "This is the second assignment",
    isSubmitted: true,
  },
  {
    id: "1",
    title: "Third",
    createdAt: new Date().toISOString(),
    dueDate: new Date("10-22-2023").toISOString(),
    content: "This is the first assignment",
  },
];
