import MainLayer from "@/components/client/MainLayer";
import SearchOrder from "@/components/client/checkout/SearchOrder";
import SeoHead from "@/components/SeoHead";
export default function OrderPage({ meta }) {
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
      <SearchOrder />
    </MainLayer>
  );
}

export async function getServerSideProps() {
  try {
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
        meta,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        meta: {
          title: "Trang chủ - ThickTech",
          description: "Lớp học đa dạng, uy tín về công nghệ thông tin.",
          image: "https://example.com/default-banner.jpg",
        },
      },
    };
  }
}
