import Head from "next/head"; // Import Head
import Featured from "@/components/client/Featured";
import MainLayer from "@/components/client/MainLayer";
import apiService from "@/services/api";
import { Toaster } from "react-hot-toast"; // Import Toaster
export default function HomePage({ featuredProduct, meta }) {
  return (
    <MainLayer>
      {/* Meta Tags */}
      <Head>
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta property="og:title" content={meta?.title} />
        <meta property="og:description" content={meta?.description} />
        <meta property="og:image" content={meta?.image} />
        <meta property="og:url" content="https://yourwebsite.com/" />
        {/* Optional: Other meta tags for SEO */}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* Hiển thị thông báo */}
      {/* Nội dung chính */}
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
