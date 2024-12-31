import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios"; // Sử dụng axios hoặc fetch để gọi API backend
const instance = axios.create({
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: false, // Bỏ qua việc kiểm tra chứng chỉ SSL
  }),
});
export const authOptions = {
  providers: [
    // Đăng nhập bằng Google
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // Đăng nhập bằng email và mật khẩu (sử dụng API backend để lấy token)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        // Gọi API backend để đăng nhập và lấy JWT token
        try {
          const response = await instance.post(
            "https://localhost:7273/api/users/login",
            {
              email,
              password,
            }
          );

          const token = response.data;

          if (token) {
            return { token }; // Trả về token để lưu vào session
          }

          return null; // Nếu không nhận được token, trả về null
        } catch (error) {
          console.error("Login failed:", error);
          return null; // Nếu có lỗi, trả về null
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin", // Trang đăng nhập tùy chỉnh
    error: "/auth/error", // Trang lỗi (nếu có)
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await axios.post("https://localhost:7273/api/users/google-login", {
            email: user.email,
            name: user.name,
            image: user.image,
          });
        } catch (error) {
          console.error("Error saving Google user:", error);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        // Lưu token vào JWT khi người dùng đăng nhập thành công
        token.authToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Lưu token vào session
        session.user.authToken = token.authToken;
      }
      return session;
    },
  },

  secret: process.env.JWT_SECRET, // Đảm bảo rằng bạn đặt secret cho JWT
  session: {
    strategy: "jwt", // Sử dụng JWT cho session
  },
  cookies: {
    // Cấu hình cookie để lưu token
    sessionToken: {
      name: "auth_token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Đảm bảo cookie chỉ gửi qua HTTPS ở môi trường production
        sameSite: "strict", // Cài đặt SameSite để ngăn chặn CSRF
        path: "/", // Cookie có thể truy cập trên toàn bộ trang web
        maxAge: 60 * 60 * 24 * 7, // Thời gian sống của cookie, ở đây là 1 tuần
      },
    },
  },
};

export default NextAuth(authOptions);

// import NextAuth, { getServerSession } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "@/lib/mongodb";

// const adminEmails = ["quangdung812202@gmail.com"];

// export const authOptions = {
//   secret: process.env.SECRET,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
//   adapter: MongoDBAdapter(clientPromise),
//   callbacks: {
//     session: async ({ session, token, user }) => {
//       if (adminEmails.includes(session?.user?.email)) {
//         session.isAdmin = true; // Thêm isAdmin vào session
//       } else {
//         session.isAdmin = false;
//       }
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);

// // export async function isAdminRequest(req, res) {
// //   const session = await getServerSession(req, res, authOptions);
// //   if (!adminEmails.includes(session?.user?.email)) {
// //     res.status(401);
// //     res.end();
// //     throw "not an admin";
// //     // Nếu không phải admin thì trả đi tới trang của client
// //     res.redirect("/");
// //   } else if (adminEmails.includes(session?.user?.email)) {
// //     res.redirect("/admin");
// //   } else {
// //     // nếu email lỗi thì trả về trang chủ
// //     res.status(401);
// //     res.end();
// //   }
// // }
