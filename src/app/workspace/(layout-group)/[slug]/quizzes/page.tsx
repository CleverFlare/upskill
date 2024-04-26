import { db } from "@/server/db";
import Quiz, { type QuizProps } from "./_components/quiz";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerAuthSession();
  const quizzesData = await db.quiz.findMany({
    where: {
      courseId: params.slug,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      UserQuiz: {
        where: {
          userId: session!.user.id,
        },
      },
      questions: {
        include: {
          options: true,
          submissions: {
            where: {
              userId: session!.user.id,
            },
          },
        },
      },
    },
  });

  const data: QuizProps[] = quizzesData.map((quiz, index) => {
    // Convert deadline to Date object
    const deadlineDate = new Date(quiz.deadline);

    // Get current date and time
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const difference = deadlineDate.getTime() - currentDate.getTime();

    // Convert milliseconds to hours, minutes, and seconds
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const deadline = seconds > 0 ? quiz.deadline : null;

    const questions = quiz.questions.map((question) => ({
      id: question.id,
      statement: question.statement,
      points: question.points,
      ...(!!question.submissions.length &&
        !!question.submissions[0]!.answer && {
          chosen: question.submissions[0]!.answer as string,
        }),
      ...(!deadline && { correct: question.correct }),
      options: question.options.map((option) => ({
        id: option.id,
        body: option.body,
      })),
    }));

    return {
      deadline,
      id: quiz.id,
      name: quiz.name,
      createdAt: quiz.createdAt,
      defaultOpen: index === 0,
      questions,
      isCollected: quiz.UserQuiz[0]?.collected ?? false,
    };
  }) as unknown as QuizProps[];

  return (
    <div className="relative flex flex-col gap-2">
      {data.map((quiz) => (
        <Quiz {...quiz} isDeletable />
      ))}
      <Button
        size="icon"
        asChild
        className="fixed bottom-4 left-1/2 -translate-x-1/2 shadow-lg"
      >
        <Link href="quizzes/create">
          <HiPlus className="text-base" />
        </Link>
      </Button>
    </div>
  );
}
