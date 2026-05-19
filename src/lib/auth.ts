import NextAuth, { type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import prisma from "./prisma";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's Role. */
      role: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async  signIn({profile, account}) {
      try {
        if(!profile || !account) return false;
        const provider = account.provider;
        const name = provider === "google" ? `${profile.given_name} ${profile.family_name}` : profile.name || "";
        if(!profile.email) return false;
        await prisma.user.upsert({
          where: { email: profile.email },
          update: { name: name, image: profile.picture ?? profile.avatar_url as string ?? "" },
          create: { email: profile.email, name: name, image: profile.picture ?? profile.avatar_url as string ?? "" },
        });
        return true;
      } catch (error) {
        console.log("Sign in error", error);
        return false;
      }
    },
    async jwt({ token, profile, account }) {
      if (!profile || !account || !profile.email) return token;
      const provider = account.provider;
      const user = await prisma.user.findUnique({ where: { email: profile.email } });
      token.fullName = provider === "google" ? `${profile.given_name} ${profile.family_name}` : profile.name || "";
      token.imageUrl = profile.picture ?? profile.avatar_url as string ?? "";
      token.email = profile.email;
      token.role = user?.role;
      return token;
    },
    async session({ session, token }) {
      // expose to frontend
      if(!token) return session
      session.user.name = token.fullName as string;
      session.user.email = token.email as string;
      session.user.image = token.imageUrl as string;
      session.user.role = token.role as string;
      return session;
    }
  }

});