import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const body = await res.json();

        // If no error and we have user data, return it
        if (res.ok && body) {
          return {
            id: "",
            email: credentials?.username,
            username: credentials?.username,
            accessToken: body.access,
            refreshToken: body.refresh,
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (
        account &&
        account.access_token &&
        account.provider.toLowerCase() === "google"
      ) {
        const response = await fetch(
          "http://localhost:8000/api/user/signin-with-google/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: account.access_token }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          account.access_token = data.access; // Store the Django token in the user object
          account.refresh_token = data.refresh; // Store the Django token in the user object
          return true;
        } else {
          return false;
        }
      }

      if (
        user &&
        user.accessToken &&
        account?.provider.toLowerCase() === "credentials"
      ) {
        account.access_token = user.accessToken as string; // Store the Django token in the user object
        account.refresh_token = user.refreshToken as string; // Store the Django token in the user object
        return true;
      }

      return false;
    },
    async jwt({ token, account }) {
      // If the account is not null and accessToken is available, add it to the token
      if (account && account.access_token) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Forward the accessToken to the session
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
