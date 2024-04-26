import { type QuizProps } from "./quiz";

export const data: QuizProps[] = [
  {
    id: "3",
    name: "Quiz #3",
    createdAt: new Date().toISOString(),
    deadline: new Date("2024-04-27T12:00:00").toISOString(),
    questions: [
      {
        id: "1",
        statement: "This is the first question",
        options: [
          {
            id: "1",
            body: "This is the first option",
          },
          {
            id: "2",
            body: "This is the second option",
          },
          {
            id: "3",
            body: "This is the third option",
          },
          {
            id: "4",
            body: "This is the fourth option",
          },
        ],
        points: 5,
      },
    ],
  },
  {
    id: "2",
    name: "Quiz #2",
    createdAt: new Date().toISOString(),
    deadline: new Date("2024-04-27T12:00:00").toISOString(),
    questions: [
      {
        points: 5,
        id: "1",
        chosen: "1",
        statement: "This is the first question",
        options: [
          {
            id: "1",
            body: "This is the first option",
          },
          {
            id: "2",
            body: "This is the second option",
          },
          {
            id: "3",
            body: "This is the third option",
          },
          {
            id: "4",
            body: "This is the fourth option",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    name: "Quiz #1",
    createdAt: new Date().toISOString(),
    deadline: new Date("2024-04-26T12:00:00").toISOString(),
    questions: [
      {
        id: "1",
        correct: "1",
        chosen: "1",
        statement: "This is the first question",
        options: [
          {
            id: "1",
            body: "This is the first option",
          },
          {
            id: "2",
            body: "This is the second option",
          },
          {
            id: "3",
            body: "This is the third option",
          },
          {
            id: "4",
            body: "This is the fourth option",
          },
        ],
        points: 10,
      },
    ],
  },
];
