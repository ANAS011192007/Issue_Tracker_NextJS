import 'dotenv/config';
import type { Config } from 'drizzle-kit';
 
export default {
	schema: './app/db/schema.ts',
	out: './drizzle/migrations',
	driver: 'mysql2', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
    host: "localhost",
    user: "root",
    password: "pass1234",
    database: "issue-tracker",
	},
} satisfies Config;