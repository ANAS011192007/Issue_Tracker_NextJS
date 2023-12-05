import React from "react";
import { db } from "./db";
import { asc, desc } from "drizzle-orm";
import { issues } from "@/app/db/schema";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "@/components/badge";
import { Card } from "@/components/ui/card";
const LatestIssues = async () => {
  const all_issues = await db.query.issues.findMany({
    orderBy: [desc(issues.createdAt)],
    limit: 5,
  });
  return (
    <Card>
      <Heading size="4" m="2">
        Latest Issues
      </Heading>
      <Table>
        <TableBody>
          {all_issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                </Flex>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default LatestIssues;
