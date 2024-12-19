import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminEmails = ["quangdung812202@gmail.com"];

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        session.isAdmin = true; // Thêm isAdmin vào session
      } else {
        session.isAdmin = false;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

// export async function isAdminRequest(req, res) {
//   const session = await getServerSession(req, res, authOptions);
//   if (!adminEmails.includes(session?.user?.email)) {
//     res.status(401);
//     res.end();
//     throw "not an admin";
//     // Nếu không phải admin thì trả đi tới trang của client
//     res.redirect("/");
//   } else if (adminEmails.includes(session?.user?.email)) {
//     res.redirect("/admin");
//   } else {
//     // nếu email lỗi thì trả về trang chủ
//     res.status(401);
//     res.end();
//   }
// }
