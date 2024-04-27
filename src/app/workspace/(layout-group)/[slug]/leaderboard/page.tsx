import Paginator from "@/components/pagination";
import Search from "./_components/search";
import { db } from "@/server/db";
import List from "./_organisms/list";
import { type RankProps } from "./_components/rank";
// import { data } from "./_components/mock-data";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | string[]> & {
    page: string;
    search: string;
  };
  params: { slug: string };
}) {
  const searchTerm = searchParams?.search ?? "";

  const studentsData = (await db.user.aggregateRaw({
    pipeline: [
      {
        $match: {
          role: "student",
        },
      },
      {
        $lookup: {
          from: "UserCourse",
          localField: "_id",
          foreignField: "userId",
          as: "userCourse",
        },
      },
      {
        $match: {
          "userCourse.courseId": { $oid: params.slug }, // Match courseId using ObjectId
          "userCourse.isAccepted": true,
        },
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          username: 1,
          image: 1,
          totalPoints: { $sum: "$userCourse.points" }, // Calculate total points
        },
      },
      { $sort: { totalPoints: -1 } },
      {
        $group: {
          _id: null,
          usernames: { $push: "$$ROOT.username" },
          users: { $push: "$$ROOT" },
        },
      },
      {
        $unwind: "$users",
      },
      {
        $set: {
          rank: { $indexOfArray: ["$usernames", "$users.username"] },
        },
      },
      {
        $project: {
          _id: "$users._id",
          firstName: "$users.firstName",
          lastName: "$users.lastName",
          username: "$users.username",
          image: "$users.image",
          points: "$users.totalPoints",
          rank: { $add: ["$rank", 1] },
        },
      },
      {
        $match: {
          $or: [
            { firstName: { $regex: `^${searchTerm}`, $options: "i" } },
            { lastName: { $regex: `^${searchTerm}`, $options: "i" } },
            { username: { $regex: `^${searchTerm}`, $options: "i" } },
          ],
        },
      },
      {
        $skip: ((searchParams?.page ? Number(searchParams.page) : 1) - 1) * 10,
      }, // Pagination: Skip
      { $limit: 10 }, // Pagination: Limit
    ],
  })) as unknown as {
    _id: { $oid: string };
    firstName: string;
    lastName: string;
    username: string;
    image: string | null;
    points: number;
    rank: number;
  }[];

  let studentsCount = await db.user.count({
    where: {
      AND: [
        {
          courses: {
            some: { AND: [{ courseId: params.slug }, { isAccepted: true }] },
          },
        },
        {
          OR: [
            {
              username: { startsWith: searchParams?.search ?? "" },
            },
            {
              firstName: { startsWith: searchParams?.search ?? "" },
            },
            {
              lastName: { startsWith: searchParams?.search ?? "" },
            },
          ],
        },
      ],
    },
  });

  studentsCount = Math.ceil(studentsCount / 10);

  const data: RankProps[] = studentsData.map(
    ({ firstName, _id, points, rank, image, lastName, username }) => ({
      id: _id.$oid,
      firstName,
      lastName,
      username,
      avatar: image ?? undefined,
      points,
      rank,
    }),
  );
  return (
    <div className="flex min-h-full flex-col gap-4">
      <h1 className="text-4xl font-bold">Leaderboard</h1>
      <Search />
      {!studentsData.length && (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-border">
          <p className="text-xl font-bold capitalize">No leaderboard yet</p>
          <p className="text-muted-foreground">
            No students available to display on the leaderboard
          </p>
        </div>
      )}
      {!!studentsData.length && <List students={data} />}
      {studentsCount > 1 && <Paginator total={studentsCount} />}
    </div>
  );
}
