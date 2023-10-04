"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewBlog, insertBlogSchema } from "@/dbSchemas/blogs";
import { createBlog } from "../actions";
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";
// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const initialState: { message: string | null; success: boolean } = {
  message: null,
  success: false,
};
export default function Page() {
  const form = useForm<NewBlog>({
    resolver: zodResolver(insertBlogSchema),
    defaultValues: { name: "", content: "" },
  });
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createBlog, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (!!state.message) {
      toast({
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      form.reset({ name: "", content: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function onSubmit(values: NewBlog) {
    console.log("@client onSubmit", values);
    formAction(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="name" autoComplete="off" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Textarea placeholder="content" autoComplete="" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={pending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
