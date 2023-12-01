import { issueSchema } from "@/app/ValidationSchemas";
import authOptions from "@/app/auth/authoptions";
import { db } from "@/app/db";
import { issues } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest,{params}: {params:{id:string}}){
  const session= await getServerSession(authOptions)
  if(!session)
  return NextResponse.json({},{status: 401})  
  const body = await request.json()
    const validation = issueSchema.safeParse(body)
    if(!validation.success)
    return NextResponse.json(validation.error.format(),{status:400})
    const issue = await db.query.issues.findFirst({
        where: eq(issues.id, parseInt(params.id)),
      });
    if (issue === undefined) return NextResponse.json({error: 'Invalid issue'},{status: 404})
   const UpdatedIssue = await db.update(issues)
  .set({
    title: body.title,
    description:body.description})
  .where(eq(issues.id, parseInt(params.id)));

  return NextResponse.json(UpdatedIssue)
}   

export async function DELETE(request: NextRequest,{params}: {params:{id:string}}){
  const session= await getServerSession(authOptions)
  if(!session)
  return NextResponse.json({},{status: 401})
  const issue = await db.query.issues.findFirst({
    where: eq(issues.id, parseInt(params.id)),
  });
  if (issue === undefined) return NextResponse.json({error: 'Invalid issue'},{status: 404})
  await db.delete(issues)
  .where(eq(issues.id, parseInt(params.id)));
  return NextResponse.json({})
}