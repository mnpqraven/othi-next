"use server";

import { NewBlog, blogs, insertBlogSchema } from "@/dbSchemas/blogs";
import { db } from "@/lib/database";
import { revalidatePath } from "next/cache";

export async function createBlog(_prevState: any, formData: FormData) {
  const parsed: NewBlog = insertBlogSchema.parse({
    name: formData.get("name"),
    content: formData.get("content"),
  });

  console.log('Server Action: "createBlog"', parsed);
  try {
    const res = await db.insert(blogs).values(parsed).returning();
    console.log("created", res);
    revalidatePath("blog");

    return { message: "blog added" };
  } catch (e) {
    return { message: "failed to create new blog" };
  }
}
