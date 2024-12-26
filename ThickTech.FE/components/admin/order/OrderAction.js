import { useState } from "react";
import { EyeIcon, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@nextui-org/react";
export default function OrderActions({ order, onView, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <td className="text-center relative">
      {/* Nút dấu ba chấm */}
      <button
        className="lg:hidden p-2 border rounded bg-gray-200 text-gray-600"
        onClick={toggleMenu}
      >
        <MoreHorizontal size={13} />
      </button>

      {/* Menu hiển thị khi nhấn nút */}
      {showMenu && (
        <div className="absolute top-full right-0 bg-white border shadow-md rounded-lg py-2 z-10">
          <button
            onClick={() => {
              setShowMenu(false);
              onView(order);
            }}
            className="block px-4 py-2 text-left hover:bg-gray-100 w-full text-sm"
          >
            Chi tiết
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              onDelete(order);
            }}
            className="block px-4 py-2 text-left text-red-600 hover:bg-gray-100 w-full text-sm"
          >
            Xóa
          </button>
        </div>
      )}

      {/* Hiển thị icon khi màn hình lớn */}
      <div className="hidden lg:flex gap-2 justify-center">
        <Button
          size="sm"
          onClick={() => onView(order)}
          className="p-2 border rounded bg-blue-200 text-blue-600"
        >
          <EyeIcon size={13} />
        </Button>
        <Button
          size="sm"
          onClick={() => onDelete(order)}
          className="p-2 border rounded bg-red-200 text-red-600"
        >
          <Trash size={13} />
        </Button>
      </div>
    </td>
  );
}
