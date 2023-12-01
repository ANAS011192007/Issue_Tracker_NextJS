import { IssueStatusBadge } from "@/components/badge";
import { Card } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
type Issue = {
  id: number;
  title: string | null;
  description: string | null;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED" | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};
const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {issue?.title}
      </h1>
      <div className="flex space-x-3 my-2">
        <IssueStatusBadge status={issue.status} />
        <p>{issue?.createdAt?.toDateString()}</p>
      </div>
      <Card className="prose max-w-full mt-4">
        <ReactMarkdown>{String(issue?.description)}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
