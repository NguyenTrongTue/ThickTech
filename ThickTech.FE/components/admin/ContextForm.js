import ReactQuill from "react-quill"; // Thư viện Quill.js cho React
import "react-quill/dist/quill.snow.css"; // Giao diện mặc định

export default function ContextForm({ children, ...props }) {
  return (
    <ReactQuill
      {...props}
      theme="snow"
      modules={{
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          ["link", "image", "video"],
          ["clean"],
        ],
      }}
    />
  );
}
