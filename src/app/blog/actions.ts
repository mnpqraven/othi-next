"use server";

import { NewBlog, blogs, insertBlogSchema } from "@/dbSchemas/blogs";
import { db } from "@/lib/database";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBlog(_prevState: any, formData: NewBlog) {
  console.log("@server Action: createBlog");
  try {
    const parsed: NewBlog = insertBlogSchema.parse(formData);

    await db.insert(blogs).values(parsed);

    revalidatePath("blog");

    return { message: "blog added", success: true };
  } catch (e) {
    console.error(e);
    return { message: "failed to create new blog", success: false };
  }
}

export async function deleteBlog(_prevState: any, id: string) {
  try {
    db.delete(blogs).where(eq(blogs.id, id));
    return { message: `Blog with id ${id} deleted`, success: true };
  } catch (e) {
    console.error(e);
    return { message: "failed to create new blog", success: false };
  }
}
