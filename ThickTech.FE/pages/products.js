import { useState } from "react";
import MainLayer from "@/components/client/MainLayer";
import NewProducts from "@/components/client/product/NewProducts";
import apiService from "@/services/api";
import Fuse from "fuse.js";

export default function HomePage({ featuredProduct, newProducts }) {
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState(newProducts);

  // Hàm xử lý tìm kiếm khi nhấn Enter
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      setSearchQuery(query);

      // Cấu hình Fuse.js
      if (query) {
        const options = {
          includeScore: false, // Không cần hiển thị điểm số
          threshold: 0.3, // Độ chính xác tìm kiếm
          keys: ["title"], // Các trường tìm kiếm
        };
        const fuse = new Fuse(newProducts, options);
        const results = fuse.search(query);
        setFilteredProducts(results.map((result) => result.item));
      } else {
        // Nếu không có từ khóa, hiển thị tất cả sản phẩm
        setFilteredProducts(newProducts);
      }
    }
  };

  return (
    <MainLayer>
      {/* Ô tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          onKeyDown={handleSearch}
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Hiển thị danh sách sản phẩm */}
      <NewProducts products={filteredProducts} />
    </MainLayer>
  );
}

export async function getServerSideProps() {
  try {
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
