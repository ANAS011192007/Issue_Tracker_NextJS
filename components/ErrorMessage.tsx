import React, { PropsWithChildren, ReactNode } from "react";

export function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) return null;
  return <p className="text-red-500">{children}</p>;
}
