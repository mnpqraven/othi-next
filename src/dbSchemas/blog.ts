import { sql, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const blog = sqliteTable('blog', {
  id: integer('id').primaryKey(),
  name: text('name', { length: 255 }).notNull(),
  content: text('content'),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMEPSTAMP`)
    .notNull()
});

export type Blog = InferSelectModel<typeof blog>;
export type BlogInsert = InferInsertModel<typeof blog>;

// export const blogCategory = sqliteTable('blog_category', {
//   blogId: integer('id').primaryKey(),
//   category: ,
// })
