// IssueStatusBadge.tsx

import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@/app/db/schema"; // Adjust the path

interface IssueStatusBadgeProps {
  status: "OPEN" | "IN_PROGRESS" | "CLOSED" | null;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

export function IssueStatusBadge({ status }: IssueStatusBadgeProps) {
  if (status === null) {
    return <Badge color="gray">Unknown</Badge>;
  }

  // Handle the case where status is a valid Status value
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}
