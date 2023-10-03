import { blogs } from "@/dbSchemas/blogs";
import { db } from "@/lib/database";
import { Params } from "@/lib/types";
import { eq } from "drizzle-orm";

export default async function BlogItem({ params }: Params<{ id: string }>) {
  const data = await db.select().from(blogs).where(eq(blogs.id, params.id));
  return (
    <div>
      myPost: {data.at(0)?.name} {data.at(0)?.content}
    </div>
  );
}
