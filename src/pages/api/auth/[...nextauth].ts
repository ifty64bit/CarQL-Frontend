import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions, Session, User } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async session({ session, token, user }): Promise<Session> {
            session.user.id = user.id;
            return session;
        },
    },
};
export default NextAuth(authOptions);
