import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema';
const poolConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "issue-tracker",
  password: "pass1234",
});
 
export const db = drizzle(poolConnection,{schema, mode:'default'});
