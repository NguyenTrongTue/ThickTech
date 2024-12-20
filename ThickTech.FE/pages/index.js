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
