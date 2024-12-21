import Layout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import apiService from "@/services/api";
import { Edit2, Trash2 } from "lucide-react";
import Input from "@/components/input/Input";
import ReactPaginate from "react-paginate"; // Import React Paginate
import Fuse from "fuse.js"; // Import fuse.js
import ButtonCustom from "@/components/button/Button";
import { Button } from "@nextui-org/react";
import CategoryForm from "@/components/admin/CategoryForm";
import ConfirmModal from "@/components/Modal";
import { toast } from "react-hot-toast";
export default function Categories() {
  const [categories, setCategories] = useState([]); // All categories
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
  const [selectedCategory, setSelectedCategory] = useState(null); // Lưu dữ liệu chỉnh sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hàm mở modal
  const openModal = (category = null) => {
    setSelectedCategory(category); // Gán dữ liệu danh mục nếu chỉnh sửa
    setIsModalOpen(true); // Mở modal
  };

  // Hàm đóng modal
  const closeModal = () => {
    setSelectedCategory(null); // Reset dữ liệu sau khi đóng
    setIsModalOpen(false); // Đóng modal
  };

  const fetchCategories = async () => {
    try {
      // Gọi API để lấy danh sách danh mục
      const response = await apiService.get("/api/categories");
      const data = await response;
      setCategories(data);
      setFilteredCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
    // setCategories(Data);
    // setFilteredCategories(Data);
  }, []);

  //  delete category
  const openModalDelete = (category) => {
    console.log(category);

    setSelectedCategory(category); // Gán dữ liệu danh mục cần xóa
    setIsDeleting(true); // Mở modal xác nhận xóa
  };
  const handleDelete = async () => {
    try {
      // Gọi API xóa danh mục
      await apiService.delete(`/api/categories/${selectedCategory._id}`);
      toast.success("Category deleted successfully");
      fetchCategories(); // Lấy lại danh sách sau khi xóa
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    } finally {
      setIsDeleting(false);
      closeModal(); // Đóng modal sau khi xóa
    }
  };

  // Tìm kiếm sản phẩm
  useEffect(() => {
    if (searchTerm) {
      // Cấu hình Fuse.js
      const options = {
        includeScore: true,
        threshold: 0.5,
        keys: ["category_name"],
      };
      const fuse = new Fuse(categories, options);
      const results = fuse.search(searchTerm); // Tìm kiếm gần đúng
      setFilteredCategories(results.map((result) => result.item));
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Cập nhật từ khóa tìm kiếm
  };

  // Tính toán vị trí bắt đầu và kết thúc của trang hiện tại
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredCategories.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <Layout>
      {/* modal delete */}
      <ConfirmModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={handleDelete}
        message="Bạn chắc chắn muốn bỏ danh mục này?"
        itemTitle={selectedCategory?.category_name}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded shadow-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-semibold">
                {selectedCategory ? "Edit Category" : "Add Category"}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
            <CategoryForm
              _id={selectedCategory?._id || null} // Nếu có dữ liệu, gửi ID để sửa
              category_name={selectedCategory?.category_name || ""} // Gửi tên danh mục
              category_slug={selectedCategory?.category_slug || ""} // Gửi slug danh mục
              headerTitle={selectedCategory ? "Edit Category" : "Add Category"}
              onClose={closeModal} // Đóng modal sau khi lưu
              onSave={fetchCategories}
            />
          </div>
        </div>
      )}

      <div className="space-y-4 p-4 bg-white rounded-lg shadow-md flex flex-col min-h-full">
        <div className="flex justify-between align-center text-center flex-wrap h-full ">
          <div className="w-full lg:w-1/3 md:w-1/2 xl:w-1/4 mb-2">
            <Input
              type="search"
              name="search"
              label="Tìm kiếm"
              value={searchTerm}
              placeholder="Search categories"
              onChange={handleSearch}
              className=""
            />
          </div>
          <ButtonCustom onClick={() => openModal()} className="px-4">
            Add Category
          </ButtonCustom>
        </div>
        <div className="w-full ">
          <table className="basic mt-2">
            <thead>
              <tr>
                <td className="text-center hidden lg:table-cell">No.</td>
                <td>Category name</td>
                <td>Category slug</td>

                <td className="text-center whitespace-nowrap">Action</td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item._id} className="text-sm hover:bg-gray-100">
                  <td className="text-center hidden lg:table-cell">
                    {index + 1}
                  </td>
                  <td
                    className="max-w-[200px] lg:max-w-[300px] md:max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap"
                    title={item.category_name}
                  >
                    {item.category_name}
                  </td>
                  <td
                    className="max-w-[200px] lg:max-w-[300px] md:max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap"
                    title={item.category_slug}
                  >
                    {item.category_slug}
                  </td>
                  <td className="text-center">
                    <Button
                      onClick={() => openModal(item)}
                      isLoading={isModalOpen}
                      isDisabled={isModalOpen}
                      isIconOnly
                      size="sm"
                      className="mr-2 border rounded bg-blue-200 text-blue-600 hover:bg-blue-400 hover:text-white"
                    >
                      <Edit2 size={13} />
                    </Button>
                    <Button
                      onClick={() => openModalDelete(item)}
                      isLoading={isDeleting}
                      isDisabled={isDeleting}
                      isIconOnly
                      className="border rounded bg-red-200 text-red-600 hover:bg-red-400 hover:text-white"
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
            {Math.min(endIndex, filteredCategories.length)} of{" "}
            {filteredCategories.length} products
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
              pageCount={Math.ceil(filteredCategories.length / itemsPerPage)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              previousLabel={"<"}
              nextLabel={">"}
              containerClassName="pagination flex items-center justify-between"
              pageClassName="mx-1 rounded hover:bg-gray-200"
              pageLinkClassName="page-link text-red-600 p-2 rounded focus:outline-none bg-white"
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
