"use client";
import { issueSchema } from "@/app/ValidationSchemas";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Spinner } from "@/components/Spinner";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { Toaster } from "sonner";
import { z } from "zod";
type Issue = {
  id: number;
  title: string | null;
  description: string | null;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED" | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};
type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}
export default function IssueFormPage({ issue }: Props) {
  const [error, setError] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  return (
    <div className="max-w-xl">
      <Toaster richColors />
      {error && (
        <Alert className="mb-5" variant="destructive">
          An unexpected error occured.
        </Alert>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            if (issue === undefined) await axios.post("/api/issues", data);
            else await axios.patch("/api/issues/" + issue.id, data);
            router.push("/issues/list");
            router.refresh();
          } catch (error) {
            setIsSubmitting(false);
            setError("An unexpected error occured.");
          }
        })}
      >
        <Input
          defaultValue={issue?.title ?? ""}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description ?? ""}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner></Spinner>}
        </Button>
      </form>
    </div>
  );
}
