import { useState, useEffect, useRef } from "react";

export default function ProductDescription({ description }) {
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái xem thêm/bớt
  const [isOverflow, setIsOverflow] = useState(false); // Trạng thái có cần nút "Xem thêm"
  const descriptionRef = useRef(null); // Tham chiếu đến thẻ mô tả

  // Kiểm tra chiều cao mô tả
  useEffect(() => {
    if (descriptionRef.current) {
      const isContentOverflow = descriptionRef.current.scrollHeight > 200;
      setIsOverflow(isContentOverflow);
    }
  }, [description]);

  return (
    <div>
      <div
        ref={descriptionRef}
        className={`overflow-hidden transition-all duration-500 text-sm ${
          isExpanded ? "max-h-full" : "max-h-[230px]"
        }`}
        dangerouslySetInnerHTML={{ __html: description }} // Hiển thị HTML an toàn
      />
      {isOverflow && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 font-medium mt-2 hover:underline"
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </button>
      )}
    </div>
  );
}
