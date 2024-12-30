import Layout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import apiService from "@/services/api";
import ButtonLink from "@/components/button/ButtonLink";
import Fuse from "fuse.js"; // Import fuse.js
import { toast } from "react-hot-toast";
import { TextField } from "@mui/material";
import Pagination from "@/components/admin/Pagination";
import ConfirmModal from "@/components/Modal";
import ClubList from "@/components/admin/club/ClubList";

export default function ClubPageAdmin() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
  const [selectedClub, setSelectedClub] = useState(null); // Lưu dữ liệu chỉnh sửa
  const [isDeleting, setIsDeleting] = useState(false);
  const fetchClubs = async () => {
    try {
      const response = await apiService.get("/api/clubs");
      const data = await response;
      setClubs(data);
      setFilteredClubs(data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };
  useEffect(() => {
    fetchClubs();
  }, []);
  useEffect(() => {
    if (searchTerm) {
      // Cấu hình Fuse.js
      const options = {
        includeScore: true, // Tính toán điểm độ khớp (score) cho kết quả
        threshold: 0.5, // Ngưỡng tìm kiếm, giá trị càng thấp, kết quả càng chính xác
        keys: ["club_title", "club_name"], // Các trường cần tìm kiếm trong mỗi sản phẩm
      };

      const fuse = new Fuse(clubs, options);
      // Tìm kiếm với từ khóa searchTerm
      const results = fuse.search(searchTerm); // Tìm kiếm gần đúng
      results.map((result) => result.item);
    } else {
      // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ danh sách sản phẩm
      setFilteredClubs(clubs);
    }
  }, [searchTerm, clubs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Cập nhật từ khóa tìm kiếm
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredClubs.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const openModalDelete = (club) => {
    setSelectedClub(club); // Gán dữ liệu danh mục cần xóa
    setIsDeleting(true); // Mở modal xác nhận xóa
  };
  const handleDelete = async () => {
    try {
      await apiService.delete(`/api/clubs/${selectedClub._id}`); // Gửi yêu cầu xóa
      setIsDeleting(false); // Đóng modal
      toast.success("Club deleted successfully");
      fetchClubs();
    } catch (error) {
      console.error("Error deleting club:", error);
      toast.error("Failed to delete club");
    } finally {
      setIsDeleting(false); // Đóng modal
    }
  };
  return (
    <Layout>
      <ConfirmModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={handleDelete}
        message="Bạn chắc chắn muốn bỏ club này?"
        itemTitle={selectedClub?.club_name}
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
              Add Club
            </ButtonLink>
          </div>
        </div>
        <ClubList clubs={currentItems} handleDelete={openModalDelete} />
        <Pagination // Thêm component Pagination
          totalItems={filteredClubs.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(value) => setItemsPerPage(value)}
        />
      </div>
    </Layout>
  );
}
