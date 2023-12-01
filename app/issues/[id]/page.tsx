import { db } from "@/app/db";
import { issues } from "@/app/db/schema";
import { Box, Grid } from "@radix-ui/themes";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import AssigneeSelect from "@/components/AssigneeSelect";
interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();
  // if (typeof params.id !== "number") notFound();
  const issue = await db.query.issues.findFirst({
    where: eq(issues.id, parseInt(params.id)),
  });
  if (issue === undefined) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <div className="flex flex-col gap-4">
            <AssigneeSelect />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </div>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
