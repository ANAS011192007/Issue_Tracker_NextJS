import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
const IssueFormPage = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueFormPage />;
};

export default NewIssuePage;
