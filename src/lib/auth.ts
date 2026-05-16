import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import prisma from "./prisma";

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
      if (!profile || !account) return token;
      const provider = account.provider;

      token.fullName = provider === "google" ? `${profile.given_name} ${profile.family_name}` : profile.name || "";
      token.imageUrl = profile.picture ?? profile.avatar_url as string ?? "";
      token.email = profile.email;

      return token;
    },
    async session({ session, token }) {
      // expose to frontend
      if(!token) return session
      session.user.name = token.fullName as string;
      session.user.email = token.email as string;
      session.user.image = token.imageUrl as string;
      return session;
    }
  }

});