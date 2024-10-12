import { createGuest, fetchGuest } from '@/app/core/v1/services';
import prisma from '@/client';
import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('没有携带登陆凭证。');
        }

        const signature = credentials?.signature;
        if (signature === undefined) {
          throw new Error("没有携带指纹信息，无法完成游客登陆。")
        }

        let guest = await fetchGuest(prisma, signature);
        if (guest === null) {
          guest = await createGuest(
            prisma,
            { signature },
          );
        }

        return {
          id: guest.id.toString(),
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/guestLogin',
  },
  secret: process.env.NEXTAUTH_SECRET,  // 设置环境变量
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
