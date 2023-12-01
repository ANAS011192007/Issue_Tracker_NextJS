import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link className="ml-1" href={`/issues/edit/${issueId}`}>
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditIssueButton;
