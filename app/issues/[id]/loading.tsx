import { Box, Card } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        <Skeleton />
      </h1>
      <div className="flex space-x-3 my-2">
        <Skeleton width="5 rem" />
        <Skeleton width="8 rem" />
      </div>

      <Card className="prose mt-4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
