import LoginForm from "@/components/auth/LoginForm";
import { CartContextProvider } from "@/components/client/CartContext";
import Header from "@/components/client/Header";
import apiService from "@/services/api";

export default function Login() {
  return (
    <CartContextProvider>
      <Header />
      <div className="container pt-20 flex justify-center flex-col mx-auto">
        <LoginForm />
      </div>
    </CartContextProvider>
  );
}
