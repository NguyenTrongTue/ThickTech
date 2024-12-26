import Layout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiService from "@/services/api";
import Input from "@/components/input/Input";
import ProductTable from "@/components/admin/product/ProductTable";
import Pagination from "@/components/admin/Pagination";
import ExportButton from "@/components/admin/product/ExportButton";
import ButtonLink from "@/components/button/ButtonLink";
import Fuse from "fuse.js";
import { TextField } from "@mui/material";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useRouter();

  useEffect(() => {
    // Fetch products
    apiService.get("/api/products").then((response) => {
      setProducts(response);
      setFilteredProducts(response);
    });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      // Cấu hình Fuse.js
      const options = {
        includeScore: true, // Tính toán điểm độ khớp (score) cho kết quả
        threshold: 0.5, // Ngưỡng tìm kiếm, giá trị càng thấp, kết quả càng chính xác
        keys: ["title"], // Các trường cần tìm kiếm trong mỗi sản phẩm
      };

      const fuse = new Fuse(products, options);
      // Tìm kiếm với từ khóa searchTerm
      const results = fuse.search(searchTerm); // Tìm kiếm gần đúng
      setFilteredProducts(results.map((result) => result.item));
    } else {
      // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ danh sách sản phẩm
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Cập nhật từ khóa tìm kiếm
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  return (
    <Layout>
      <div className="space-y-4 p-4 bg-white rounded-lg shadow-md flex flex-col min-h-full">
        <div className="flex justify-between align-center text-center flex-wrap h-full">
          <div className="w-full lg:w-1/3 md:w-1/2 xl:w-1/4 mb-2">
            <TextField
              id="outlined-select-currency"
              label="Search"
              variant="outlined"
              size="small"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              sx={{
                flex: "1 1 auto",
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <ButtonLink href={"/admin/products/new"} className={"px-4"}>
              Add product
            </ButtonLink>
            <ExportButton products={filteredProducts} />
          </div>
        </div>
        <ProductTable products={currentItems} router={router} />
        <Pagination
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(value) => setItemsPerPage(parseInt(value))}
        />
      </div>
    </Layout>
  );
}
