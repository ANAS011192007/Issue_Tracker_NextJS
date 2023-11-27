import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/mysql2";
import { createIssueSchema } from "../../ValidationSchemas";
import { db } from "@/app/db/index";
import { issues } from "@/app/db/schema";
export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    if(!validation.success)
    return NextResponse.json(validation.error.format(),{status: 400})
const newIssue= await db.insert(issues).values({
   title: body.title,
   description: body.description
})
return NextResponse.json(newIssue, {status:201})
}