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
import { experimental_useFormStatus as useFormStatus } from "react-dom";
// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
  message: null,
};
export default function Page() {
  const form = useForm<NewBlog>({
    resolver: zodResolver(insertBlogSchema),
  });
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createBlog, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (!!state.message) {
      // BUG: disappears instantly because redirection
      toast({ description: state.message });
    }
  }, [state]);

  return (
    <div>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          action={formAction}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
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
                  <Input placeholder="content" {...field} />
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
