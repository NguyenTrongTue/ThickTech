import React, { useState } from "react";
import Input from "@/components/input/Input";
import ButtonLink from "@/components/button/ButtonLink";
import { BoxOrder } from "@/components/client/checkout/BoxOrder";
import Error from "@/components/Error";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import apiService from "@/services/api";
import { Button } from "@nextui-org/react";
export default function SearchOrder() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const handleSearch = async (e) => {
    e.preventDefault();
    // kiểm tra xem keyword có rỗng không
    if (!keyword) {
      toast.error("Vui lòng nhập số điện thoại hoặc email để tìm kiếm.");
      return;
    }
    setLoading(true);
    try {
      const response = await apiService.get("/api/orders/search", {
        keyword: keyword,
      });
      setOrders(response.orders || []);
      console.log(response);
      if (response?.message) {
        toast.error(response.message);
      } else toast.success("Tìm thấy đơn hàng.");
      setError(false);
    } catch (error) {
      setOrders([]);
      setError(true);
      toast.error(error.message);
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  return (
    <section className="flex gap-4 flex-col flex-1 justify-center items-center w-full">
      <div className="flex flex-roww-full ">
        <form className="flex flex-row p-4 md:w-96">
          <input
            type="search"
            label={"Tìm kiếm đơn hàng"}
            placeholder="Nhập số điện thoại hoặc email"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="rounded-l-lg flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 transition duration-200 ease-in-out sm:text-sm sm:leading-5 focus:outline-none s"
          />
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            onClick={handleSearch}
            color="blue"
            className="px-4 py-2 rounded-r-lg  bg-slate-500 text-white hover:bg-slate-700 shadow-md"
          >
            <Search className="w-5 h-5" />
          </Button>
        </form>
      </div>
      {error && (
        <Error
          isError={error}
          message="Không thể tìm thấy đơn hàng. Vui lòng thử lại."
        />
      )}
      {orders?.length === 0 && !error && (
        <Error isError={true} message="Không có đơn hàng nào." />
      )}
      {orders?.length > 0 && (
        <ul className="w-full bg-white shadow-lg rounded-lg">
          {orders.map((order) => (
            <li key={order._id} className="p-4">
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-500 py-2">
                  Ngày đặt hàng:{" "}
                  <strong>{new Date(order.order_date).toLocaleString()}</strong>{" "}
                </span>
              </div>
              <BoxOrder checkoutData={order} />
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-center w-full sm:w-96 mt-4">
        <ButtonLink
          href={"/products"}
          color="blue"
          className="px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 shadow-md"
        >
          Tiếp tục mua sắm
        </ButtonLink>
      </div>
    </section>
  );
}
