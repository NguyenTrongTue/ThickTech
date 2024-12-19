import "@/styles/globals.css"; // Import global CSS
import "@/styles/globals-client.css";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider để quản lý session NextAuth
import { AuthProvider } from "@/components/auth/AuthContext"; // Import AuthProvider của bạn
import { CartContextProvider } from "@/components/client/CartContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
