import Layout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import OrderSearchBar from "@/components/admin/order/OrderSearchBar";
import OrderList from "@/components/admin/order/OrderList";
import Pagination from "@/components/admin/Pagination";
import apiService from "@/services/api";
import OrderDetails from "@/components/admin/order/OrderDetails";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  useEffect(() => {
    // Lấy dữ liệu đơn hàng từ API
    apiService
      .get("/api/orders")
      .then((response) => setOrders(response))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  useEffect(() => {
    let result = orders;
    if (searchTerm) {
      result = orders.filter((order) =>
        order.address.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter) {
      result = result.filter((order) => order.status === statusFilter);
    }
    setFilteredOrders(result);
  }, [searchTerm, statusFilter, orders]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleDateFilter = (dates) => {
    setDateFilter(dates);
    // Thực hiện lọc theo ngày `dates.startDate` và `dates.endDate`
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <Layout>
      <div className="space-y-4 p-4 bg-white rounded-lg shadow-md flex flex-col min-h-full">
        <OrderSearchBar
          onSearch={handleSearch}
          onFilter={handleStatusFilter}
          onDateFilter={handleDateFilter}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          dateFilter={dateFilter}
        />
        <OrderList orders={currentOrders} />
        <Pagination
          totalItems={filteredOrders.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(value) => setItemsPerPage(parseInt(value))}
        />
      </div>
    </Layout>
  );
};

export default OrderManagement;
