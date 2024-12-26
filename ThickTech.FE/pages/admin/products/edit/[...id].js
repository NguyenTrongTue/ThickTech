import Layout from "@/components/admin/AdminLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductForm from "@/components/admin/product/ProductForm";
import apiService from "@/services/api";
import Spinner from "@/components/Spinner";
export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  async function fetchProduct() {}

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    apiService
      .get(`/api/products/${id}`)
      .then((response) => {
        setProductInfo(response);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        router.push("/admin/products");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full bg-gray-100">
          <div className="text-center">
            <Spinner />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {productInfo && (
        <ProductForm {...productInfo} headerTitle="Edit Product" />
      )}
    </Layout>
  );
}
