import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Checkout from "@/components/client/Checkout";
import { CartContext } from "@/components/client/CartContext";
import Loading from "@/components/Loading";
import apiService from "@/services/api";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const productId = searchParams.get("productId");
  const router = useRouter();

  // Sử dụng CartContext
  const { cartProducts } = useContext(CartContext);

  // Trạng thái dữ liệu
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Danh sách ID sản phẩm
  const productIdsList =
    type === "buynow"
      ? [productId]
      : cartProducts.map((item) => item.productId);
  const fetchProducts = async (ids) => {
    try {
      setIsLoading(true);
      const response = await apiService.post("/api/cart", { ids });
      setProducts(response); // Cập nhật danh sách sản phẩm
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
      toast.error("Có lỗi xảy ra khi tải sản phẩm.");
    } finally {
      setIsLoading(false);
    }
  };
  // Fetch sản phẩm từ API
  useEffect(() => {
    if (!productIdsList || productIdsList.length === 0) {
      setIsLoading(false);
      setError("No products found.");
      return;
    }

    // fetchProducts(productIdsList);
  }, [productIdsList]);

  // Loading và Error handling
  // if (isLoading) {
  //   return <Loading />;
  // }

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  // Xây dựng danh sách sản phẩm cho Checkout
  const productList =
    type === "buynow"
      ? [
          {
            productId: productId,
            quantity: 1,
            product: products[0],
          },
        ]
      : cartProducts?.map((item) => {
          return {
            ...item,
            product: products?.find((e) => e?.id === item?.productId),
          };
        });

  return (
    <main className="p-5 flex flex-col gap-4">
      <h1 className="text-xl">Checkout</h1>
      <Checkout productList={productList} />
    </main>
  );
}
