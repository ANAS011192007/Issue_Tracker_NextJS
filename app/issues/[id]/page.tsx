import { db } from "@/app/db";
import React from "react";
import { eq } from "drizzle-orm";
import { issues } from "@/app/db/schema";
import { notFound } from "next/navigation";
import { IssueStatusBadge } from "@/components/badge";
interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  // if (typeof params.id !== "number") notFound();
  const issue = await db.query.issues.findFirst({
    where: eq(issues.id, parseInt(params.id)),
  });
  if (issue === undefined) notFound();
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {issue?.title}
      </h1>
      <div>
        <IssueStatusBadge status={issue.status} />
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {issue?.description}
        </p>
      </div>
      <p>{issue?.createdAt?.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
