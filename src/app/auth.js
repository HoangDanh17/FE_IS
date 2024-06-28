import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        // Lưu code vào user object
        user.googleAuthCode = account.code;
      }
      return true;
    },
    async session({ session, user, token }) {
      // Thêm googleAuthCode vào session
      session.googleAuthCode = token.googleAuthCode;
      return session;
    },
    async jwt({ token, user, account }) {
      if (account) {
        // Lưu code vào token
        token.googleAuthCode = account.code;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
});