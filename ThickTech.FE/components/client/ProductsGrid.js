import ProductBox from "@/components/client/ProductBox";

export default function ProductsGrid({ products }) {
  return (
    <div className="flex flex-wrap w-full justify-start">
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox key={product._id} {...product} isBestSeller={true} />
        ))}
    </div>
  );
}
