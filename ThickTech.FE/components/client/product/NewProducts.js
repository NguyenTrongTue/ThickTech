import ProductsGrid from "@/components/client/product/ProductsGrid";

export default function NewProducts({ products }) {
  return (
    <>
      <ProductsGrid products={products} />
    </>
  );
}
