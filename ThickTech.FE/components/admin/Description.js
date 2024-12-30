import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ size: ["extra-small", "small", "medium", "large"] }],
    [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    ["clean"],
  ],
};

export default function Description({ value, onChange }) {
  return (
    <section className=" bg-white border p-2 rounded-md border-gray-400">
      <ReactQuill
        theme="snow"
        value={value ?? ""}
        onChange={onChange}
        modules={modules}
        placeholder="Enter your description here..."
      />
    </section>
  );
}
