import Layout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import apiService from "@/services/api";
import ButtonLink from "@/components/button/ButtonLink";
import Fuse from "fuse.js"; // Import fuse.js
import { toast } from "react-hot-toast";
import { TextField, Tooltip } from "@mui/material";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@nextui-org/react";
import Pagination from "@/components/admin/Pagination";
import ConfirmModal from "@/components/Modal";
import { useRouter } from "next/router";
import moment from "moment";

export default function Ideas() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
  const [selectedBlog, setSelectedBlog] = useState(null); // Lưu dữ liệu chỉnh sửa
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const fetchBlogs = async () => {
    try {
      // Gọi API để lấy danh sách danh mục
      const response = await apiService.get("/api/blogs");
      const data = await response;
      setBlogs(data);
      setFilteredBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  useEffect(() => {
    fetchBlogs();
    // setBlogs(Data);
    // setFilteredBlogs(Data);
  }, []);

  const openModalDelete = (blog) => {
    setSelectedBlog(blog); // Gán dữ liệu danh mục cần xóa
    setIsDeleting(true); // Mở modal xác nhận xóa
  };
  const handleDelete = async () => {
    try {
      await apiService.delete(`/api/blogs/${selectedBlog._id}`); // Gửi yêu cầu xóa
      setIsDeleting(false); // Đóng modal
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(false); // Đóng modal
    }
  };

  const handleEdit = (blog) => {
    router.push(`/admin/blogs/edit/${blog._id}`);
  };
  useEffect(() => {
    if (searchTerm) {
      // Cấu hình Fuse.js
      const options = {
        includeScore: true, // Tính toán điểm độ khớp (score) cho kết quả
        threshold: 0.5, // Ngưỡng tìm kiếm, giá trị càng thấp, kết quả càng chính xác
        keys: ["title", "author"], // Các trường cần tìm kiếm trong mỗi sản phẩm
      };

      const fuse = new Fuse(blogs, options);
      // Tìm kiếm với từ khóa searchTerm
      const results = fuse.search(searchTerm); // Tìm kiếm gần đúng
      setFilteredBlogs(results.map((result) => result.item));
    } else {
      // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ danh sách sản phẩm
      setFilteredBlogs(blogs);
    }
  }, [searchTerm, blogs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Cập nhật từ khóa tìm kiếm
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredBlogs.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <Layout>
      <ConfirmModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={handleDelete}
        message="Bạn chắc chắn muốn bỏ danh mục này?"
        itemTitle={selectedBlog?.title}
      />
      <div className="space-y-4 p-4 bg-white rounded-lg shadow-md flex flex-col min-h-full">
        <div className="flex justify-between align-center text-center flex-wrap h-full ">
          <div className="w-full lg:w-1/3 md:w-1/2 xl:w-1/4 mb-2">
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              type="search"
              color="primary"
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              sx={{ flex: "1 1 auto", maxWidth: 300 }}
            />
          </div>
          <div className="flex items-center gap-2 flex-row">
            <ButtonLink href={"/admin/blogs/new"} className={"px-8"}>
              Add Blog
            </ButtonLink>
          </div>
        </div>
        <div className="w-full flex-1">
          <table className="basic mt-2">
            <thead>
              <tr>
                <td>Blog Author</td>
                <td className="">Title</td>
                <td className="text-center">Time Created</td>
                <td className="text-center">Action</td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((blog) => (
                <tr key={blog._id}>
                  <td>{blog.author}</td>
                  <td>
                    {blog.title && blog.title.length > 50 ? (
                      <Tooltip title={blog.title}>
                        <span>{`${blog.title.slice(0, 50)}...`}</span>
                      </Tooltip>
                    ) : (
                      <span>{blog.title}</span>
                    )}
                  </td>
                  <td className="text-center">
                    {moment(blog.createdAt).format("MM/DD/YYYY")}
                  </td>
                  <td className="text-center">
                    <Button
                      onClick={() => handleEdit(blog)}
                      isIconOnly
                      size="sm"
                      className="p-2 mr-2 border rounded bg-blue-200 text-blue-600 hover:bg-blue-400 hover:text-white"
                    >
                      <Edit2 size={13} />
                    </Button>
                    <Button
                      onClick={() => openModalDelete(blog)}
                      isLoading={isDeleting}
                      isDisabled={isDeleting}
                      isIconOnly
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
        <Pagination // Thêm component Pagination
          totalItems={filteredBlogs.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(value) => setItemsPerPage(value)}
        />
      </div>
    </Layout>
  );
}
