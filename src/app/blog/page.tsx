import { Button } from "@/components/ui/button";
import { blogs } from "@/dbSchemas/blogs";
import { db } from "@/lib/database";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Othi's Blog",
};

export default async function BlogPage() {
  const list = await db.select().from(blogs);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Blogs</h1>

      <Link href="/blog/create">
        <Button>New Post</Button>
      </Link>

      <div className="flex flex-col gap-2">
        {list.map(({ name, id }) => (
          <Link href={`/blog/${id}`} key={id}>
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
