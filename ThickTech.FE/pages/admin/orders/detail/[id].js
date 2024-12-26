import AdminLayout from "@/components/admin/AdminLayout";
import OrderDetails from "@/components/admin/order/OrderDetails";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import apiService from "@/services/api";
import { toast } from "react-hot-toast";
const OrderDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query; // Lấy ID từ URL
  const [order, setOrder] = useState(null);
  useEffect(() => {
    if (id) {
      // Gọi API lấy chi tiết đơn hàng
      toast.success("Order deleted successfully!");
      apiService.get(`/api/order/${id}`).then((response) => {
        setOrder(response);
      });
    }
  }, [id]);
  if (!order) {
    return (
      <AdminLayout>
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div>{order && <OrderDetails order={order} />}</div>
    </AdminLayout>
  );
};

export default OrderDetailsPage;
