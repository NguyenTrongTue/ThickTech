export default function ModalConfirm({
  isOpen,
  onClose,
  onConfirm,
  message,
  itemTitle,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full mx-4">
        <div className="p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-red-500">
            {message || "Bạn chắc chắn muốn bỏ sản phẩm này?"}
          </h2>
        </div>
        <div className="p-4">
          <p className="text-gray-600">{itemTitle}</p>
        </div>
        <div className="flex justify-end items-center gap-4 p-4 border-t border-gray-300">
          <button
            onClick={onClose}
            className="px-8 py-2 text-sm text-gray-900 bg-gray-300 hover:bg-gray-500 rounded-md"
          >
            Huỷ
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 text-sm text-white bg-red-500 hover:bg-red-700 rounded-md"
          >
            Có
          </button>
        </div>
      </div>
    </div>
  );
}
