import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/app/db/index";
import { NextAuthOptions } from "next-auth";
const authOptions:NextAuthOptions ={
        adapter: DrizzleAdapter(db),
        providers: [ GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })],
        session:{
            strategy: 'jwt'
        }
}
export default authOptions