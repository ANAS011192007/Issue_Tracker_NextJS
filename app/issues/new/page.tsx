"use client";
import "easymde/dist/easymde.min.css";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Alert } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/ValidationSchemas";
import { z } from "zod";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Spinner } from "@/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
export default function NewIssuePage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
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
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setIsSubmitting(false);
            setError("An unexpected error occured.");
          }
        })}
      >
        <Input placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner></Spinner>}
        </Button>
      </form>
    </div>
  );
}
