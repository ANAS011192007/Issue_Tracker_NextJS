import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const EditIssueButton = ({
  issueId,
  issueHomepage,
}: {
  issueId: number;
  issueHomepage: boolean;
}) => {
  return (
    <Button className={issueHomepage ? "w-12" : ""}>
      <Link className="ml-1" href={`/issues/edit/${issueId}`}>
        {issueHomepage ? <Pencil2Icon /> : "Edit Issue"}
      </Link>
    </Button>
  );
};
export default EditIssueButton;
