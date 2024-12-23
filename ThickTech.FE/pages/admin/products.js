import Layout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiService from "@/services/api";
import ButtonLink from "@/components/button/ButtonLink";
import ActionBtn from "@/components/button/Button";
import { Button } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Input from "@/components/input/Input";
import ReactPaginate from "react-paginate"; // Import React Paginate
import Fuse from "fuse.js"; // Import fuse.js
import * as XLSX from "xlsx"; // Import thư viện xlsx
export default function Products() {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products after search
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
  const router = useRouter();
  useEffect(() => {
    // Fetch products
    apiService.get("/api/products").then((response) => {
      const allProducts = response;
      console.log(allProducts);

      setProducts(allProducts);
      setFilteredProducts(allProducts);
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

  const exportToExcel = () => {
    // Tạo mảng chứa dữ liệu để xuất
    const exportData = filteredProducts.map((product) => ({
      "Product Name": product.title,
      "Origin Price": product.original_price,
      "Sell Price": product.selling_price,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    XLSX.writeFile(wb, "products.xlsx");
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Lấy dữ liệu của trang hiện tại
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  // Xử lý thay đổi trang
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <Layout>
      <div className="space-y-4 p-4 bg-white rounded-lg shadow-md flex flex-col min-h-full">
        <div className="flex justify-between align-center text-center flex-wrap h-full ">
          <div className="w-full lg:w-1/3 md:w-1/2 xl:w-1/4 mb-2">
            <Input
              type="search"
              value={searchTerm}
              placeholder="Search products"
              onChange={handleSearch}
              className=""
            />
          </div>
          <div className="flex items-center gap-2 flex-row">
            <ButtonLink href={"/admin/products/new"} className={"px-4"}>
              Add product
            </ButtonLink>
            <ActionBtn
              onClick={exportToExcel}
              color={"slate"}
              className={"outline-slate-400 border-slate-600"}
            >
              Export to Excel
            </ActionBtn>
          </div>
        </div>
        <div className="w-full">
          <table className="basic mt-2 table-auto">
            <thead>
              <tr>
                <td className="text-center hidden lg:table-cell">No.</td>
                <td>Product name</td>
                <td className="text-center whitespace-nowrap hidden lg:table-cell">
                  Origin Price
                </td>
                <td className="text-center whitespace-nowrap hidden lg:table-cell">
                  Sell Price
                </td>
                <td className="text-center whitespace-nowrap">Feature</td>
                <td className="text-center whitespace-nowrap">Action</td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, index) => (
                <tr key={product._id} className="text-sm hover:bg-gray-100">
                  <td className="text-center hidden lg:table-cell">
                    {index + 1}
                  </td>
                  <td
                    className="max-w-[200px] lg:max-w-[300px] md:max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap"
                    title={product.title}
                  >
                    {product.title}
                  </td>

                  <td className="text-center hidden lg:table-cell">
                    {product.original_price}
                  </td>
                  <td className="text-center hidden lg:table-cell">
                    {product.selling_price}
                  </td>
                  <td className="text-center hidden lg:table-cell">
                    <span
                      className={`p-1 text-[12px] rounded-md ${
                        product.is_featured == "true"
                          ? "text-green-600 bg-green-200"
                          : "text-red-600 bg-red-200"
                      }`}
                    >
                      {product.is_featured == "true" ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="text-center">
                    <Button
                      isIconOnly
                      size="sm"
                      onClick={() =>
                        router.push("/admin/products/edit/" + product._id)
                      }
                      className="p-2 mr-2 border rounded bg-blue-200 text-blue-600 hover:bg-blue-400 hover:text-white"
                    >
                      <Edit2 size={13} />
                    </Button>
                    <Button
                      isIconOnly
                      onClick={() =>
                        router.push("/admin/products/delete/" + product._id)
                      }
                      className="p-2 border rounded bg-red-200 text-red-600 hover:bg-red-400 hover:text-white"
                      size="sm"
                      color="danger"
                    >
                      <Trash2 size={13} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between bg-slate-400 p-2">
          <div className="text-center">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </div>
          <div className="text-center flex items-center whitespace-nowrap gap-2">
            Select page:
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              className="px-2 py-1 border rounded"
            >
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
            </select>
            <ReactPaginate
              pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              previousLabel={"<"}
              nextLabel={">"}
              containerClassName="pagination flex items-center justify-between"
              pageClassName="mx-1 rounded hover:bg-gray-200"
              pageLinkClassName="page-link text-blue-600 p-2 rounded focus:outline-none bg-white"
              activeLinkClassName="active_link bg-slate-600 text-white"
              previousClassName="previous-item bg-gray-200 hover:bg-slate-600 hover:text-white rounded p-1 px-3"
              nextClassName="next-item bg-gray-200 hover:bg-slate-600 hover:text-white rounded p-1 px-3"
              disabledClassName="disabled text-gray-400"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
