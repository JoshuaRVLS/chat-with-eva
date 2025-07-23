import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

type UserInput = {
  username: string;
  password: string;
};

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {},
      authorize: async (credentials) => {
        const { username, password } = credentials as UserInput;

        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/users/validate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            }
          );

          const data = await response.json();

          if (!data.success) {
            console.log(data);
            throw new Error(data.message);
          }

          const { userId } = data;
          console.log("Logged in");
          return {
            id: userId as string,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("An unknown error occurred");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom sign-in page
    error: "/login", // Redirect to login page on errors
  },
});

export { handler as GET, handler as POST };
