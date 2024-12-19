import Featured from "@/components/client/Featured";
import MainLayer from "@/components/client/MainLayer";
import NewProducts from "@/components/client/NewProducts";

import apiService from "@/services/api";
export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <MainLayer>
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </MainLayer>
  );
}

export async function getServerSideProps() {
  try {
    // // Gọi API để lấy featuredProduct
    // const featuredResponse = await apiService.get("/api/products/featured"
    // );

    // Gọi API để lấy newProducts
    const newProductsResponse = await apiService.get("/api/products");
    const newProducts = newProductsResponse;
    const featuredProduct = newProductsResponse[0];
    return {
      props: {
        featuredProduct,
        newProducts,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        featuredProduct: null,
        newProducts: [],
      },
    };
  }
}
