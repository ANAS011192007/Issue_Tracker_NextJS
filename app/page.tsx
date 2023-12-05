import Pagination from "@/components/Pagination";
import Image from "next/image";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";
import { issues } from "./db/schema";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const open = await db
    .select({
      value: sql`count('*')`.mapWith(Number),
    })
    .from(issues)
    .where(eq(issues.status!, "OPEN"));
  const inProgress = await db
    .select({
      value: sql`count('*')`.mapWith(Number),
    })
    .from(issues)
    .where(eq(issues.status!, "IN_PROGRESS"));
  const closed = await db
    .select({
      value: sql`count('*')`.mapWith(Number),
    })
    .from(issues)
    .where(eq(issues.status!, "CLOSED"));
  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          open={open[0].value}
          inProgress={inProgress[0].value}
          closed={closed[0].value}
        />
        <IssueChart
          open={open[0].value}
          inProgress={inProgress[0].value}
          closed={closed[0].value}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
