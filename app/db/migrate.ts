import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db } from "./index";

async function main() {
    console.log("Migration started");
    await migrate(db,{migrationsFolder:"drizzle"})
    console.log("Migration Ended")
    process.exit(0)
}

main().catch((err) =>{
    console.log(err)
    process.exit(0)
})