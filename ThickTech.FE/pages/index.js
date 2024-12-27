import Featured from "@/components/client/Featured";
import MainLayer from "@/components/client/MainLayer";
import apiService from "@/services/api";
import React from "react";
import { getAllProducts } from "@/api/product";
export default function HomePage({ featuredProduct }) {
  return (
    <MainLayer
      title="Trang chủ - ThickTech"
      description="Lớp học đa dạng, uy tín về công nghệ thông tin."
    >
      <Featured product={featuredProduct} />
    </MainLayer>
  );
}

export async function getServerSideProps() {
  try {
    // Gọi API để lấy dữ liệu sản phẩm
    const featuredProduct = await getAllProducts();
    return {
      props: {
        featuredProduct,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        featuredProduct: [],
      },
    };
  }
}
