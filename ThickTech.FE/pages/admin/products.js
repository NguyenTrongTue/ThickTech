import Layout from "@/components/admin/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import apiService from "@/services/api";
import ButtonLink from "@/components/client/button/ButtonLink";
import ActionBtn from "@/components/client/button/ActionBtn";
import Input from "@/components/client/input/InputText";
import ReactPaginate from "react-paginate"; // Import React Paginate
import Fuse from "fuse.js"; // Import fuse.js
import * as XLSX from "xlsx"; // Import thư viện xlsx
export default function Products() {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products after search
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [itemsPerPage, setItemsPerPage] = useState(15); // Items per page

  useEffect(() => {
    // Fetch products
    apiService.get("/api/products").then((response) => {
      const allProducts = response;
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setTotalPages(Math.ceil(allProducts.length / itemsPerPage)); // Calculate total pages
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
        <div className="w-full flex-1">
          <table className="basic mt-2">
            <thead>
              <tr>
                <td>Product name</td>
                <td className="text-center">Origin Price</td>
                <td className="text-center">Sell Price</td>
                <td className="text-center">Action</td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product) => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td className="text-center">{product.original_price}</td>
                  <td className="text-center">{product.selling_price}</td>
                  <td className="text-center">
                    <Link
                      className="p-2 text-blue-500 bg-blue-200 hover:bg-blue-500 hover:text-white border rounded"
                      href={"/admin/products/edit/" + product._id}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                    <Link
                      className="py-2 text-red-600 bg-red-200 hover:bg-red-300"
                      href={"/admin/products/delete/" + product._id}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </Link>
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
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
            </select>
            <ReactPaginate
              pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName="pagination flex items-center justify-between"
              pageClassName="page-itemborder mx-1 rounded hover:bg-gray-200"
              pageLinkClassName="page-link text-blue-500"
              previousClassName="previous-item border rounded hover:bg-gray-200"
              nextClassName="next-item border rounded hover:bg-gray-200"
              disabledClassName="disabled text-gray-400"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
