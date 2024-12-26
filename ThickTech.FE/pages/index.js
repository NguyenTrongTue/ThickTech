import Featured from "@/components/client/Featured";
import MainLayer from "@/components/client/MainLayer";
import apiService from "@/services/api";
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
    const response = await apiService.get("/api/products");
    const featuredProduct = response;

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
