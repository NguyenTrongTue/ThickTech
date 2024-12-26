import { useState } from "react";
import ModalConfirm from "@/components/Modal";
import { toast } from "react-hot-toast";
import apiService from "@/services/api";
import OrderAction from "@/components/admin/order/OrderAction";
import { useRouter } from "next/router";
const OrderList = ({ orders }) => {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState(null); // Order được chọn để xóa
  const [isModalOpen, setModalOpen] = useState(false); // Trạng thái mở modal

  const handleViewClick = (order) => {
    router.push(`/admin/orders/detail/${order._id}`); // Chuyển sang trang chi tiết với ID đơn hàng
  };
  const handleDeleteClick = (order) => {
    setSelectedOrder(order); // Lưu order cần xóa
    setModalOpen(true); // Hiển thị modal
  };
  const handleConfirmDelete = async () => {
    try {
      await apiService.delete(`/api/orders/${selectedOrder._id}`); // Gửi yêu cầu xóa
      toast.success("Order deleted successfully!");
      setModalOpen(false); // Đóng modal
      // Refresh danh sách orders nếu cần (hoặc cập nhật lại state)
    } catch (error) {
      toast.error("Failed to delete order!");
    }
  };
  return (
    <div>
      {/* Modal */}
      <ModalConfirm
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)} // Đóng modal
        onConfirm={handleConfirmDelete} // Xác nhận xóa
        message="Bạn có chắc chắn muốn xóa order này?"
        itemTitle={selectedOrder?.address.fullName || ""}
      />
      <table className="basic mt-2 table-auto w-full">
        <thead>
          <tr>
            <td className="text-center hidden lg:table-cell">ID</td>
            <td>Customer</td>
            <td>Mail</td>
            <td>Order Date</td>
            <td className="text-center">Status</td>
            <td className="text-center hidden lg:table-cell">Total Items</td>
            <td className="text-center">Action</td>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                <span className="text-gray-500 m-2">No orders found!</span>
              </td>
            </tr>
          )}
          {/* Render danh sách orders */}
          {orders.map((order, index) => (
            <tr key={order._id} className="text-sm hover:bg-gray-100">
              <td className="text-center hidden lg:table-cell">{index + 1}</td>
              <td>{order.address.fullName}</td>
              <td>{order.address.email}</td>
              <td>{new Date(order.order_date).toLocaleString()}</td>
              <td className="text-center">
                <span
                  className={`p-1 text-[12px] rounded-md ${
                    order.status === "completed"
                      ? "text-green-600 bg-green-200"
                      : order.status === "pending"
                      ? "text-yellow-600 bg-yellow-200"
                      : "text-red-600 bg-red-200"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="text-center hidden lg:table-cell">
                {order.products.length}
              </td>
              <OrderAction
                order={order}
                onView={(order) => handleViewClick(order)}
                onDelete={(order) => handleDeleteClick(order)}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
