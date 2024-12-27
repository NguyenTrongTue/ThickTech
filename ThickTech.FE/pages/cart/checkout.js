import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import Checkout from "@/components/client/checkout/Checkout";
import { CartContext } from "@/components/client/CartContext";
import Error from "@/components/Error";
import MainLayer from "@/components/client/MainLayer";
import { getCartProducts } from "@/api/product";

export default function CheckoutPage() {
  // Sử dụng CartContext
  const { cartProducts } = useContext(CartContext);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const productId = searchParams.get("productId");

  // Trạng thái dữ liệu
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  // Tính toán `productIdList` với useMemo để tránh bị tạo mới liên tục
  const productIdList = useMemo(() => {
    if (type === "buynow" && productId) {
      return [productId];
    }
    return cartProducts.map((item) => item.productId);
  }, [type, productId, cartProducts]);

  // Fetch danh sách sản phẩm từ API
  const fetchProducts = async (ids) => {
    try {
      // Fetch danh sách sản phẩm từ API
      const response = await getCartProducts(ids);
      // Xử lý số lượng dựa trên chế độ (mua ngay hoặc giỏ hàng)
      const mergedProducts = response.map((product) => {
        let quantity = 1; // Mặc định là 1 cho chế độ mua ngay

        if (type !== "buynow") {
          // Nếu là chế độ giỏ hàng, lấy số lượng từ CartContext
          const cartItem = cartProducts.find(
            (item) => item.productId === product._id
          );
          quantity = cartItem?.quantity || 0; // Nếu không tìm thấy trong giỏ hàng, số lượng là 0
        }

        return {
          ...product,
          quantity, // Gắn số lượng vào sản phẩm
        };
      });

      setProducts(mergedProducts); // Cập nhật danh sách sản phẩm
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(true);
      toast.error("Có lỗi xảy ra khi tải sản phẩm.");
    }
  };

  // Fetch sản phẩm từ API khi `productIdList` thay đổi
  useEffect(() => {
    if (!productIdList || productIdList.length === 0) {
      setError(true);
      return;
    }
    fetchProducts(productIdList);
  }, [productIdList]);

  if (error) {
    return (
      <MainLayer>
        <Error isError={error} message="Có lỗi xảy ra khi tải sản phẩm." />
      </MainLayer>
    );
  }

  return (
    <MainLayer>
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <Checkout productList={products} />
      </div>
    </MainLayer>
  );
}
