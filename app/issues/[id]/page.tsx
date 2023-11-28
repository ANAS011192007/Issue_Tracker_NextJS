import { db } from "@/app/db";
import { issues } from "@/app/db/schema";
import { IssueStatusBadge } from "@/components/badge";
import { Button } from "@/components/ui/button";
import { Box, Card, Grid } from "@radix-ui/themes";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {issue?.title}
        </h1>
        <div className="flex space-x-3 my-2">
          <IssueStatusBadge status={issue.status} />
          <p>{issue?.createdAt?.toDateString()}</p>
        </div>
        <Card className="prose mt-4">
          <ReactMarkdown>{String(issue?.description)}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link className="ml-1" href={`/issues/${issue.id}/edit`}>
            Edit Issue
          </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
