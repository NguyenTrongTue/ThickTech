import { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductBox from "@/components/client/product/ProductBox";

export default function ProductsGrid({ products }) {
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const itemsPerPage = 20; // Số lượng sản phẩm mỗi trang

  // Tính toán danh sách sản phẩm hiển thị
  const offset = currentPage * itemsPerPage; // Vị trí bắt đầu
  const currentItems = products.slice(offset, offset + itemsPerPage); // Các sản phẩm của trang hiện tại
  const pageCount = Math.ceil(products.length / itemsPerPage); // Tổng số trang

  // Xử lý khi thay đổi trang
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="w-full">
      {/* Grid Sản phẩm */}
      <div className="flex flex-wrap justify-start">
        {currentItems?.length > 0 ? (
          currentItems.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))
        ) : (
          <p className="w-full text-center text-gray-500">
            Không có sản phẩm nào
          </p>
        )}
      </div>

      {/* Phân trang */}
      {products.length > itemsPerPage && (
        <div className="mt-6 flex justify-center">
          <ReactPaginate
            previousLabel={"Trước"}
            nextLabel={"Tiếp"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName="pagination flex items-center justify-between"
            activeClassName={"active"}
            previousClassName={"prev"}
            nextClassName={"next"}
            pageClassName={"page"}
            breakClassName={"break"}
            disabledClassName="text-gray-400"
          />
        </div>
      )}
    </div>
  );
}
