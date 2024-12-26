import * as XLSX from "xlsx";
import ActionBtn from "@/components/button/ActionBtn";
const ExportButton = ({ products }) => {
  const exportToExcel = () => {
    const exportData = products.map((product) => ({
      "Product Name": product.title,
      "Origin Price": product.original_price,
      "Sell Price": product.selling_price,
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    XLSX.writeFile(wb, "products.xlsx");
  };

  return (
    <ActionBtn
      onClick={exportToExcel}
      color={"slate"}
      className={"outline-slate-400 border-slate-600"}
    >
      Export to Excel
    </ActionBtn>
  );
};

export default ExportButton;
