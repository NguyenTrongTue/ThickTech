import { useSession, signIn } from "next-auth/react";
import Header from "@/components/client/Header";
import Footer from "@/components/client/Footer";
import { Toaster } from "react-hot-toast";
export default function MainLayer({ children }) {
  const { data: session } = useSession();

  return (
    <main className="bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col min-h-screen">
        <Header session={session} />
        <div className="container flex justify-center flex-col flex-1 px-5 lg:px-10 md:px-5 py-5 sm:px-10 sm:my-8 md:py-10 lg:pt-20 xl:px-10  mx-auto bg-gray-100">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
}
