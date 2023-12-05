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
import { Card } from "@/components/ui/card";
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
async function IssuesTable({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issues; page: string };
}) {
  const columns: { label: string; value: keyof Issues; className?: string }[] =
    [
      { label: "Issue", value: "title" },
      { label: "Status", value: "status", className: "hidden md:table-cell" },
      {
        label: "Created",
        value: "createdAt",
        className: "hidden md:table-cell",
      },
    ];
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let all_issues, a, issueCount;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  if (searchParams.orderBy === "title") a = issues.title;
  else if (searchParams.orderBy === "status") a = issues.status;
  else a = issues.createdAt;
  if (status !== undefined) {
    all_issues = await db.query.issues.findMany({
      where: eq(issues.status!, status!),
      orderBy: [asc(a)],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
  } else {
    all_issues = await db.query.issues.findMany({
      orderBy: [asc(a)],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
  }
  return (
    <Card>
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.value} className={column.className}>
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </Link>

                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" /> // Placeholder for your ArrowUpIcon
                )}
              </TableHead>
            ))}
            <TableHead>Actions</TableHead>
            {/* <TableHead>Issue</TableHead> */}
            {/* <TableHead className="hidden md:table-cell">Status</TableHead>
    <TableHead className="hidden md:table-cell">Created</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {all_issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Link href={`/issues/${issue.id}`}>{String(issue.title)}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt?.toDateString()}
              </TableCell>
              <TableCell className="">
                <EditIssueButton issueHomepage={true} issueId={issue.id} />
                <DeleteIssueButton issueHomepage={true} issueId={issue.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
export const dynamic = "force-dynamic";
export default IssuesTable;
