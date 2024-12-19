import Layout from "@/components/admin/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiService from "@/services/api";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    apiService.get("/api/products/" + id).then((response) => {
      setProductInfo(response || null);
    });
  }, [id]);

  function goBack() {
    router.push("/admin/products");
  }

  async function deleteProduct() {
    await apiService.delete("/api/products/" + id);
    goBack();
  }

  return (
    <Layout>
      <div className="flex justify-center items-center mt-12">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full shadow-slate-900">
          <h2 className="text-xl font-semibold text-center mb-6">
            Are you sure you want to delete the product?
          </h2>
          <h3 className="text-center text-lg text-gray-700 mb-4">
            {productInfo ? productInfo.title : "Không có dữ liệu"}
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={deleteProduct}
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-200"
            >
              Yes, Delete
            </button>
            <button
              onClick={goBack}
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
