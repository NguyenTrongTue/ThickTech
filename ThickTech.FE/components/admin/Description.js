import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ size: ["extra-small", "small", "medium", "large"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

export default function Description({ value, onChange }) {
  return (
    <section className=" bg-white border-2 p-2 rounded-xl">
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Enter your description here..."
      />
    </section>
  );
}
