import { db } from "@/app/db";
import React from "react";
import { eq } from "drizzle-orm";
import { issues } from "@/app/db/schema";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await db.query.issues.findMany({
    where: eq(issues.id, parseInt(params.id)),
  });
  if (!issue) notFound;
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt}</p>
    </div>
  );
};

export default IssueDetailPage;
