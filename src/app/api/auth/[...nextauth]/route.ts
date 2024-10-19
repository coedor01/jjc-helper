import bcrypt from "bcrypt";
import prisma from "@/client";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchUserByEmail } from "@/app/core/v1/services";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "email-password-login",
      name: "邮箱密码",
      async authorize(credentials) {
        if (!credentials?.password || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await fetchUserByEmail(prisma, credentials?.email);
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.uid,
        };
      },
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // 设置环境变量,
  pages: {
    signIn: "/auth/login", // 自定义登录页面路径
    error: "/auth/error", // 失败时的重定向页面
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
