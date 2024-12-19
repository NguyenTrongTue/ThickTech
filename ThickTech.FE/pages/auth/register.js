import SignUpForm from "@/components/auth/SignUpForm";
import { CartContextProvider } from "@/components/client/CartContext";
import Header from "@/components/client/Header";
import apiService from "@/services/api";

export default function Register() {
  return (
    <CartContextProvider>
      <Header />
      <div className="container pt-2 lx:pt-20 xl:pt-20 md:pt-20 flex justify-center flex-col mx-auto w-9/12">
        <SignUpForm />
      </div>
    </CartContextProvider>
  );
}
