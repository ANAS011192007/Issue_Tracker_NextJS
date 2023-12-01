import { db } from "@/app/db";
import { issues } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
const IssueFormPage = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
interface Props {
  params: { id: string };
}
const EditIssuePage = async ({ params }: Props) => {
  const issue = await db.query.issues.findFirst({
    where: eq(issues.id, parseInt(params.id)),
  });
  if (issue === undefined) notFound();
  return <IssueFormPage issue={issue} />;
};

export default EditIssuePage;
