import { index,text,datetime,mysqlEnum,timestamp ,int, mysqlTable, bigint, varchar } from 'drizzle-orm/mysql-core';
import { sql } from "drizzle-orm";
export const issues = mysqlTable('Issues', {
    id: int('id').primaryKey().autoincrement(),
    title: varchar('title', { length: 255 }),
    description: text('description'),
    status: mysqlEnum('status', ['OPEN', 'IN_PROGRESS', 'CLOSED']).default('OPEN'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
  });
  export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}
  