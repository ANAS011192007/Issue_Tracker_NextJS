import { db } from "@/app/db/index";
import Link from "next/link";
import { IssueStatusBadge } from "@/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IssueActions from "./IssueActions";
// import { count } from "drizzle-orm";
import { eq, asc, sql, gt } from "drizzle-orm";
import { issues } from "@/app/db/schema";
import { ArrowUpIcon } from "lucide-react";
import EditIssueButton from "../[id]/EditIssueButton";
import DeleteIssueButton from "../[id]/DeleteIssueButton";
import Pagination from "@/components/Pagination";
import IssuesTable from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}
type Issues = {
  title: string;
  status: string;
  createdAt: Date;
};
async function IssuesPage({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issues; page: string };
}) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let issueCount;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  if (status !== undefined) {
    issueCount = await db
      .select({
        value: sql`count('*')`.mapWith(Number),
      })
      .from(issues)
      .where(eq(issues.status!, status!));
  } else {
    issueCount = await db
      .select({
        value: sql`count('*')`.mapWith(Number),
      })
      .from(issues);
  }
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssuesTable searchParams={searchParams} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        // itemCount={issueCount[0]?.value || 0}
        itemCount={issueCount[0]?.value || 0}
      />
    </Flex>
  );
}
export const dynamic = "force-dynamic";
export default IssuesPage;
export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
