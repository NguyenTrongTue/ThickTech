import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Checkout from "@/components/client/Checkout";
import { CartContext } from "@/components/client/CartContext";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import apiService from "@/services/api";
import MainLayer from "@/components/client/MainLayer";

export default function CheckoutPage() {
  // Sử dụng CartContext
  const { cartProducts } = useContext(CartContext);

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const productId = searchParams.get("productId");

  // Trạng thái dữ liệu
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
      setError(true);
      toast.error("Có lỗi xảy ra khi tải sản phẩm.");
    } finally {
      setIsLoading(false);
    }
  };
  // Fetch sản phẩm từ API
  useEffect(() => {
    if (!productIdsList || productIdsList.length === 0) {
      setIsLoading(false);
      setError(false);
      return;
    }

    // fetchProducts(productIdsList);
  }, [productIdsList]);

  // Loading và Error handling
  if (isLoading) {
    return (
      <MainLayer>
        <div className="flex justify-center items-center h-[300px]">
          <Loading isLoading={isLoading} />
        </div>
      </MainLayer>
    );
  }

  if (error) {
    return (
      <MainLayer>
        <Error isError={error} message="Có lỗi xảy ra khi tải sản phẩm." />
      </MainLayer>
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
    <MainLayer>
      <div className="p-4 bg-white rounded-lg shadow-md">
        {" "}
        <Checkout productList={productList} />
      </div>
    </MainLayer>
  );
}
