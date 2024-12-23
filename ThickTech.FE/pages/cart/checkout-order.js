import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Checkout from "@/components/client/checkout/Checkout";
import MainLayer from "@/components/client/MainLayer";
import CheckoutSussess from "@/components/client/checkout/CheckoutSuccess";
import apiService from "@/services/api";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function CheckoutOrder() {
  // Sử dụng SearchParams
  const searchParams = useSearchParams();
  const [checkoutId, setCheckoutId] = useState(null);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  // Fetch danh sách sản phẩm từ API
  const fetchCheckout = async (ids) => {
    try {
      setLoading(true);
      const response = await apiService.get(`/api/order/${ids}`);
      setProducts(response); // Cập nhật danh sách sản phẩm
      setError(false);
    } catch (err) {
      setError(true);
      console.error("Error fetching products:", err);
      toast.error("Có lỗi xảy ra khi tải sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  // Lấy checkoutId khi SearchParams thay đổi
  useEffect(() => {
    const id = searchParams.get("checkout_id");
    if (id) {
      setCheckoutId(id);
    } else {
      setError(true);
    }
  }, [searchParams]);

  // Fetch dữ liệu khi checkoutId thay đổi
  useEffect(() => {
    if (checkoutId) {
      fetchCheckout(checkoutId);
    }
  }, [checkoutId]);

  if (loading) {
    return (
      <MainLayer>
        <Loading message="Đang tải sản phẩm..." />
      </MainLayer>
    );
  }

  if (error) {
    return (
      <MainLayer>
        <Error
          isError={error}
          message="Không thể tải thông tin đơn hàng. Vui lòng thử lại."
        />
      </MainLayer>
    );
  }

  return (
    <MainLayer>
      <div className="p-4 bg-white rounded-lg shadow-lg">
        {products ? (
          <CheckoutSussess checkoutData={products} />
        ) : (
          <Error isError message="Không có sản phẩm nào trong giỏ hàng." />
        )}
      </div>
    </MainLayer>
  );
}
