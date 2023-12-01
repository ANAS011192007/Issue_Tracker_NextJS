import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/mysql2";
import { issueSchema } from "../../ValidationSchemas";
import { db } from "@/app/db/index";
import { issues } from "@/app/db/schema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authoptions";
export async function POST(request: NextRequest) {
    const session= await getServerSession(authOptions)
    if(!session)
    return NextResponse.json({},{status: 401})
    const body = await request.json()
    const validation = issueSchema.safeParse(body)
    if(!validation.success)
    return NextResponse.json(validation.error.format(),{status: 400})
const newIssue= await db.insert(issues).values({
   title: body.title,
   description: body.description
})
return NextResponse.json(newIssue, {status:201})
}