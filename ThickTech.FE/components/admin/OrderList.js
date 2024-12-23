import Layout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {haha
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);                                
  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "YES" : "NO"}
                </td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city} {order.postalCode} {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data.name} x{l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}


import Featured from "@/components/client/Featured";
import MainLayer from "@/components/client/MainLayer";
import apiService from "@/services/api";
import SeoHead from "@/components/SeoHead";
export default function HomePage({ featuredProduct, meta }) {
  return (
    <MainLayer>
      <SeoHead
        title={meta.title}
        siteName={meta.siteName}
        description={meta.description}
        url={meta.url}
        type={meta.type}
        robots={meta.robots}
        image={meta.image}
        date={meta.date}
        author={meta.author}
        templateTitle={meta.templateTitle}
      />
      <Featured product={featuredProduct} />
    </MainLayer>
  );
}

export async function getServerSideProps() {
  try {
    // Gọi API để lấy dữ liệu sản phẩm
    const response = await apiService.get("/api/products");
    const featuredProduct = response;

    // Chuẩn bị meta tags động dựa vào sản phẩm đầu tiên
    const meta = {
      title: "Trang chủ - ThickTech",
      description:
        "Khám phá khóa học nổi bật và sản phẩm mới nhất tại lớp học của chúng tôi.",
      image:
        featuredProduct?.[0]?.images?.[0] ||
        "https://example.com/default-banner.jpg",
    };

    return {
      props: {
        featuredProduct,
        meta,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        featuredProduct: [],
        meta: {
          title: "Trang chủ - ThickTech",
          description: "Lớp học đa dạng, uy tín về công nghệ thông tin.",
          image: "https://example.com/default-banner.jpg",
        },
      },
    };
  }
}
