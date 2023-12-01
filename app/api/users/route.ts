import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { asc } from 'drizzle-orm';
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest){
    const user = await db.query.users.findMany({
        orderBy: [asc(users.name)],
      });
      return NextResponse.json(user)
}