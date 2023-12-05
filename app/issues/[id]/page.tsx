import { db } from "@/app/db";
import { issues } from "@/app/db/schema";
import { Box, Grid } from "@radix-ui/themes";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import { cache } from "react";
// import AssigneeSelect from "@/components/AssigneeSelect";
interface Props {
  params: { id: string };
}
const fetchUser = cache((issueId: number) => {
  return db.query.issues.findFirst({
    where: eq(issues.id, issueId),
  });
});

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();
  // if (typeof params.id !== "number") notFound();
  const issue = await fetchUser(parseInt(params.id));
  if (issue === undefined) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <div className="flex flex-col gap-4">
            {/* <AssigneeSelect /> */}
            <EditIssueButton issueHomepage={false} issueId={issue.id} />
            <DeleteIssueButton issueHomepage={false} issueId={issue.id} />
          </div>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue" + issue?.id,
  };
}
