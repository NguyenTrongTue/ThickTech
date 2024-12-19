import React from "react";
import ProductItem from "./ProductItem";

export default function ProductList({
  products,
  cartProducts,
  lessOfThisProduct,
  moreOfThisProduct,
  openModal,
}) {
  return (
    <div className="w-full table-auto border-collapse grid grid-cols-1 lg:grid-cols-2 gap-4">
      {products.map((product) => {
        const productQuantity = cartProducts.find(
          (item) => item.productId === product._id
        )?.quantity;
        return (
          <ProductItem
            key={product._id}
            product={product}
            quantity={productQuantity}
            lessOfThisProduct={lessOfThisProduct}
            moreOfThisProduct={moreOfThisProduct}
            openModal={openModal}
          />
        );
      })}
    </div>
  );
}
