import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/app/db/index";
import { issues } from "@/app/db/schema";
import { drizzle } from "drizzle-orm/mysql2";
import { Status } from "@/app/db/schema";
import delay from "delay";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IssueStatusBadge } from "@/components/badge";
import IssueActions from "./IssueActions";
async function IssuesPage() {
  const all_issues = await db.query.issues.findMany();
  return (
    <div>
      <IssueActions />
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead>Issue</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {all_issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default IssuesPage;
