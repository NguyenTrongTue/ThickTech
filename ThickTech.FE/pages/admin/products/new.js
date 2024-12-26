import ProductForm from "@/components/admin/product/ProductForm";
import Layout from "@/components/admin/AdminLayout";

export default function NewProduct() {
  return (
    <Layout>
      <ProductForm headerTitle="New Product" />
    </Layout>
  );
}
