import { useEffect, useState } from "react";
import MainLayer from "@/components/client/MainLayer";
import NewProducts from "@/components/client/product/NewProducts";
import apiService from "@/services/api";
import Fuse from "fuse.js";
import toast from "react-hot-toast";

export default function HomePage({ categories, newProducts }) {
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState(newProducts);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Hàm xử lý tìm kiếm khi nhấn Enter
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      setSearchQuery(query);

      if (query) {
        const options = {
          includeScore: false,
          threshold: 0.3,
          keys: ["title"],
        };
        const fuse = new Fuse(newProducts, options);
        const results = fuse.search(query).map((result) => result.item);
        setFilteredProducts(results);
      } else {
        setFilteredProducts(newProducts); // Hiển thị tất cả nếu không có từ khóa
      }
    }
  };

  const handleCategoryChange = (id) => {
    const updatedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((c) => c !== id)
      : [...selectedCategories, id];

    setSelectedCategories(updatedCategories);

    // Lọc theo danh mục
    if (updatedCategories.length > 0) {
      const filteredByCategory = newProducts.filter((product) =>
        updatedCategories.includes(product.product_category)
      );
      setFilteredProducts(filteredByCategory);
    } else {
      setFilteredProducts(newProducts); // Hiển thị tất cả nếu không chọn danh mục nào
    }
  };
  return (
    <MainLayer>
      <div className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-md shadow-md">
        {/* Sidebar Bộ Lọc */}
        <aside className="w-full lg:w-1/4 p-4 bg-gray-100 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
          <ul className="space-y-2">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category._id}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(
                        category._id.toString()
                      )}
                      onChange={() =>
                        handleCategoryChange(category._id.toString())
                      }
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{category.category_name}</span>
                  </label>
                </li>
              ))
            ) : (
              <li>Không có danh mục nào</li>
            )}
          </ul>
        </aside>

        {/* Nội dung chính */}
        <main className="w-full lg:w-3/4">
          {/* Ô tìm kiếm */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              onKeyDown={handleSearch} // Lắng nghe sự kiện Enter
              className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hiển thị số kết quả nếu tìm kiếm hoặc lọc */}
          {(searchQuery || selectedCategories.length > 0) && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm
              </p>
            </div>
          )}

          {/* Hiển thị danh sách sản phẩm */}
          <NewProducts products={filteredProducts} />
        </main>
      </div>
    </MainLayer>
  );
}

export async function getServerSideProps() {
  try {
    const newProductsResponse = await apiService.get("/api/products");
    const categoriesResponse = await apiService.get("/api/categories");
    const newProducts = newProductsResponse;
    const categories = categoriesResponse;

    return {
      props: {
        categories,
        newProducts,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categories: [],
        newProducts: [],
      },
    };
  }
}
