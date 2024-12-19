import Header from "@/components/client/Header";
import Footer from "@/components/client/Footer";
import AccountPage from "@/components/client/Account";
export default function Home() {
  return (
    <main className="bg-gray-100">
      <Header />
      <div className="container pt-20 px-5 lg:px-10 md:px-5 mx-auto mb-10">
        <AccountPage />
      </div>
      <Footer />
    </main>
  );
}
