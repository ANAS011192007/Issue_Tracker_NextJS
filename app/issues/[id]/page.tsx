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
  return <div>Hello</div>;
};

export default IssueDetailPage;
