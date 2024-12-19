import Layout from "@/components/admin/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import apiService from "@/services/api";
export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    apiService.get(`/api/products/${id}`).then((response) => {
      setProductInfo(response);
    });
  }, [id]);
  return (
    <Layout>
      {productInfo && (
        <ProductForm {...productInfo} headerTitle="Edit Product" />
      )}
    </Layout>
  );
}
